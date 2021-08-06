const DOCUMENT_TYPES_URL =
  'https://raw.githubusercontent.com/ambanum/OpenTermsArchive/master/src/app/types.json';

import { Octokit } from 'octokit';
import axios from 'axios';

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN_CREATE_ISSUE });

export const getDocumentTypes: any = async () => {
  try {
    const { data: documentTypes } = await axios.get(DOCUMENT_TYPES_URL);
    return [...new Set(Object.keys(documentTypes))].sort();
  } catch (e) {
    console.error(e);
    return [];
  }
};

export const createIssue: any = async (
  params: Parameters<typeof octokit.rest.issues.create>[0]
) => {
  try {
    const { data } = await octokit.rest.issues.create(params);

    return data;
  } catch (e) {
    console.error(e);
    return null;
  }
};

export const searchIssue = async (
  params: Parameters<typeof octokit.rest.search.issuesAndPullRequests>[0] & {
    owner: string;
    repo: string;
  }
) => {
  try {
    const { data } = await octokit.rest.search.issuesAndPullRequests(params);

    // baseUrl should be the way to go instead of this ugly filter
    // that may not work in case there are too many issues
    // but it goes with a 404 using octokit
    // baseUrl: `https://api.github.com/${GITHUB_OTA_OWNER}/${GITHUB_OTA_REPO}`,
    return (data?.items || []).filter((item) =>
      item.repository_url.endsWith(`${params.owner}/${params.repo}`)
    )[0];
  } catch (e) {
    console.error(e);
    return null;
  }
};
export const addCommentToIssue = async (
  params: Parameters<typeof octokit.rest.issues.createComment>[0]
) => {
  try {
    const { data } = await octokit.rest.issues.createComment(params);
    return data;
  } catch (e) {
    console.error(e);
    return null;
  }
};
