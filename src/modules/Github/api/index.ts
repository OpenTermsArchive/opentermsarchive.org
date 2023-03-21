const TERMS_TYPES_URL = 'https://opentermsarchive.org/data/api/list_documentTypes/v1/';
export const CONTRIBUTORS_URL = 'https://api.github.com/repos/OpenTermsArchive/engine/contributors';
export const VERSIONS_CONTRIBUTOR_COMMITS_ACTIVITY =
  'https://api.github.com/repos/OpenTermsArchive/contrib-versions/stats/contributors';
export const LAST_VERSIONS_COMMITS =
  'https://api.github.com/repos/OpenTermsArchive/contrib-versions/commits';

import { Octokit } from 'octokit';
import axios from 'axios';

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

export interface GitHubAuthor {
  login: string;
  id: number;
  node_id: number;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  susbscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
}

export interface ContributorActivityWeek {
  w: number; //Start of the week, given as a Unix timestamp.
  a: number; //Number of additions
  d: number; //Number of deletions
  c: number; //Number of commits
}

export interface ContributorActivity {
  total: number;
  weeks: ContributorActivityWeek[];
  author: GitHubAuthor;
}

export type ContributorsActivity = ContributorActivity[];

export interface Commit {
  url: string;
  sha: string;
  html_url: string;
  commit: {
    message: string;
    author: {
      date: string;
    };
  };
  author: {
    login: string;
    avatar_url: string;
    html_url: string;
  };
}

export type Commits = Commit[];

export interface Contributor {
  login: string;
  avatar_url: string;
  html_url: string;
  contributions: number;
  type: string;
}

export type Contributors = Contributor[];

export const getTermsTypes: any = async () => {
  try {
    const { data: termsTypes } = await axios.get(TERMS_TYPES_URL);
    return [...new Set(Object.keys(termsTypes))].sort();
  } catch (e) {
    console.error(e);
    return [];
  }
};

export const getContributors = async () => {
  try {
    const { data }: { data: Contributors } = await octokit.request(`GET ${CONTRIBUTORS_URL}`);
    return data;
  } catch (e) {
    console.error(e);
    return [];
  }
};

export const getAllVersionsContributorCommitActivity = async () => {
  try {
    const { data }: { data: ContributorsActivity } = await octokit.request(
      `GET ${VERSIONS_CONTRIBUTOR_COMMITS_ACTIVITY}`
    );
    return data || [];
  } catch (e) {
    console.error(e);
    return [];
  }
};

export const getLastVersionsCommits = async () => {
  try {
    const per_page = 10;
    const { data }: { data: Commits } = await octokit.request(`GET ${LAST_VERSIONS_COMMITS}`, {
      per_page,
    });
    return data;
  } catch (e) {
    console.error(e);
    return [];
  }
};
