import * as core from "@actions/core";
import { exec } from "@actions/exec";
import { context } from "@actions/github";
import axios from "axios";
import { PushEvent } from "@octokit/webhooks-types";

async function getProjectIds(projectName: string, token: string) {
  const { data } = await axios.get(`https://api.vercel.com/v9/projects/${projectName}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const orgId = data.accountId as string;
  const projectId = data.id as string;
  return { orgId, projectId };
}

async function main() {
  const projectName = core.getInput("project");
  const token = core.getInput("vercel-token");

  const { orgId, projectId } = await getProjectIds(projectName, token);
  core.setSecret(token);
  core.setSecret(orgId);
  core.setSecret(projectId);
  const config = {
    cwd: `apps/${projectName}`,
    env: { ...process.env, VERCEL_ORG_ID: orgId, VERCEL_PROJECT_ID: projectId },
  };
  const commitInfo = {
    sha: context.sha,
    actor: context.actor,
    ref: context.ref.replace(/^refs\/heads\//, ""),
    message: JSON.stringify(
      ((context.payload as PushEvent).head_commit?.message ?? "").split("\n")[0],
    ),
  };

  await exec("pnpm", ["build"], { cwd: "packages/theme" });
  await exec("vercel", ["pull", "--yes", "--environment=production", `--token=${token}`], config);
  await exec("vercel", ["build", "--prod"], config);

  let output = "unknown";
  await exec("vercel", ["deploy", "--prebuilt", "--prod", `--token=${token}`], {
    ...config,
    listeners: { stdout: data => (output += data.toString()) },
  });

  core.notice(`Deployed successfully to ${output}`);
}

try {
  main();
} catch (error: any) {
  core.setFailed(error.message);
}
