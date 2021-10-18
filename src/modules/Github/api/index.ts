const DOCUMENT_TYPES_URL =
  'https://opentermsarchive.org/data/api/list_documentTypes/v1/';
export const CONTRIBUTORS_URL = 'https://api.github.com/repos/ambanum/OpenTermsArchive/contributors';
export const VERSIONS_CONTRIBUTOR_COMMIT_ACTIVITY = 'https://api.github.com/repos/ambanum/OpenTermsArchive-versions/stats/contributors';

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

export interface Contributor {
  login: string;
  avatar_url: string;
  html_url: string;
  contributions: number;
  type: string;
}

export type Contributors = Contributor[];

export const getContributors = async () => {
  try {
    const  { data } : { data : Contributors }  = await octokit.request(`GET ${CONTRIBUTORS_URL}`)
    return data;
  } catch (e) {
    console.error(e);
    return {};
  }
}

export interface GitHubAuthor {
  login: string;
  id: number;
  node_id: number;
  avatar_url: string;
  gravatar_id: string;
  url:string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  susbscriptions_url: string;
  organizations_url: string;
  repos_url:string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
}

export interface ContributorActivityWeeks{
  w:number; //Start of the week, given as a Unix timestamp.
  a:number; //Number of additions
  d:number; //Number of deletions
  c:number; //Number of commits
}

export interface ContributorActivity {
  total:number;
  weeks:ContributorActivityWeeks[];
  author:GitHubAuthor;
}

export const getAllVersionsContributorCommitActivity = async () => {
  try {
    const  { data } : { data: ContributorActivity } = await octokit.request(`GET ${VERSIONS_CONTRIBUTOR_COMMIT_ACTIVITY}`);
    return data;
  } catch (e) {
    console.error(e);
    return {};
  }
}
