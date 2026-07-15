import type { NextConfig } from "next";

const isGithubActions = process.env.GITHUB_ACTIONS === "true";
const repoName = process.env.GITHUB_REPOSITORY 
  ? `/${process.env.GITHUB_REPOSITORY.split('/')[1]}`
  : "";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  basePath: isGithubActions ? repoName : "",
  env: {
    NEXT_PUBLIC_BASE_PATH: isGithubActions ? repoName : "",
  },
  allowedDevOrigins: ['172.20.161.39'],
};

export default nextConfig;
