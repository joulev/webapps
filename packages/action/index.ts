import * as core from "@actions/core";
import { exec } from "@actions/exec";
import { context } from "@actions/github";
import axios from "axios";
import { execSync } from "child_process";
import { PushEvent } from "@octokit/webhooks-types";

function shouldSkip(projectName: string) {
  const changedFiles = execSync("git diff --name-only HEAD HEAD~1").toString().trim().split("\n");
  const relevantFiles = changedFiles.filter(
    file =>
      file.startsWith(projectName) || // obvious
      file.startsWith("packages") || // dependencies
      file.startsWith(".github"), // build settings
  );
  return relevantFiles.length === 0;
}

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
  if (shouldSkip(projectName)) {
    core.notice(`No changes in ${projectName}, skipping`);
    return;
  }

  const token = core.getInput("vercel-token");
  const { orgId, projectId } = await getProjectIds(projectName, token);
  core.setSecret(token);
  core.setSecret(orgId);
  core.setSecret(projectId);
  const config = {
    cwd: `apps/${projectName}`,
    env: { VERCEL_ORG_ID: orgId, VERCEL_PROJECT_ID: projectId },
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
  await exec(
    "vercel",
    [
      "deploy",
      "--prod",
      "--prebuilt",
      `--token=${token}`,
      `-m githubCommitSha=${commitInfo.sha}`,
      `-m githubCommitAuthorName=${commitInfo.actor}`,
      `-m githubCommitAuthorLogin=${commitInfo.actor}`,
      "-m githubDeployment=1",
      "-m githubOrg=joulev",
      "-m githubCommitOrg=joulev",
      "-m githubRepo=webapps",
      "-m githubCommitRepo=webapps",
      `-m githubCommitMessage=${commitInfo.message}`,
      `-m githubCommitRef=${commitInfo.ref}`,
    ],
    { ...config, listeners: { stdout: data => (output += data.toString()) } },
  );

  core.notice(`Deployed successfully to ${output}`);
}

try {
  main();
} catch (error: any) {
  core.setFailed(error.message);
}
