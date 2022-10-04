"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core = require("@actions/core");
const exec_1 = require("@actions/exec");
const github_1 = require("@actions/github");
const axios_1 = require("axios");
const child_process_1 = require("child_process");
function shouldSkip(projectName) {
    const changedFiles = (0, child_process_1.execSync)("git diff --name-only HEAD HEAD~1").toString().trim().split("\n");
    const relevantFiles = changedFiles.filter(file => file.startsWith(projectName) || // obvious
        file.startsWith("packages") || // dependencies
        file.startsWith(".github"));
    return relevantFiles.length === 0;
}
async function getProjectIds(projectName, token) {
    const { data } = await axios_1.default.get(`https://api.vercel.com/v9/projects/${projectName}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    const orgId = data.accountId;
    const projectId = data.id;
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
        sha: github_1.context.sha,
        actor: github_1.context.actor,
        ref: github_1.context.ref.replace(/^refs\/heads\//, ""),
        message: JSON.stringify((github_1.context.payload.head_commit?.message ?? "").split("\n")[0]),
    };
    await (0, exec_1.exec)("pnpm", ["build"], { cwd: "packages/theme" });
    await (0, exec_1.exec)("vercel", ["pull", "--yes", "--environment=production", `--token=${token}`], config);
    await (0, exec_1.exec)("vercel", ["build", "--prod"], config);
    let output = "unknown";
    await (0, exec_1.exec)("vercel", [
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
    ], { ...config, listeners: { stdout: data => (output += data.toString()) } });
    core.notice(`Deployed successfully to ${output}`);
}
try {
    main();
}
catch (error) {
    core.setFailed(error.message);
}
