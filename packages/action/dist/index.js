"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core = __importStar(require("@actions/core"));
const exec_1 = require("@actions/exec");
const github_1 = require("@actions/github");
const axios_1 = __importDefault(require("axios"));
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
    const token = core.getInput("vercel-token");
    const { orgId, projectId } = await getProjectIds(projectName, token);
    core.setSecret(token);
    core.setSecret(orgId);
    core.setSecret(projectId);
    const config = {
        cwd: `apps/${projectName}`,
        env: { ...process.env, VERCEL_ORG_ID: orgId, VERCEL_PROJECT_ID: projectId },
    };
    const commitMessage = (github_1.context.payload.head_commit?.message ?? "").split("\n")[0];
    await (0, exec_1.exec)("pnpm", ["build"], { cwd: "packages/theme" });
    await (0, exec_1.exec)("vercel", ["pull", "--yes", "--environment=production", `--token=${token}`], config);
    await (0, exec_1.exec)("vercel", ["build", "--prod"], config);
    let output = "";
    await (0, exec_1.exec)("vercel", [
        "deploy",
        "--prebuilt",
        "--prod",
        `--token=${token}`,
        ...["-m", `githubCommitSha=${github_1.context.sha}`],
        ...["-m", `githubCommitAuthorName=${github_1.context.actor}`],
        ...["-m", `githubCommitAuthorLogin=${github_1.context.actor}`],
        ...["-m", `githubDeployment=1`],
        ...["-m", `githubOrg=${github_1.context.repo.owner}`],
        ...["-m", `githubRepo=${github_1.context.repo.repo}`],
        ...["-m", `githubCommitOrg=${github_1.context.repo.owner}`],
        ...["-m", `githubCommitRepo=${github_1.context.repo.repo}`],
        ...["-m", `githubCommitMessage=${commitMessage}`],
        ...["-m", `githubCommitRef=${github_1.context.ref.replace("refs/heads/", "")}`],
    ], {
        ...config,
        listeners: { stdout: data => (output += data.toString()) },
    });
    core.notice(`Deployed successfully to ${output === "" ? "unknwon" : output}`);
}
try {
    main();
}
catch (error) {
    core.setFailed(error.message);
}
