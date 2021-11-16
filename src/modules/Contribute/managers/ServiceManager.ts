import { addCommentToIssue, createIssue, searchIssue } from 'modules/Github/api';

const [GITHUB_OTA_OWNER, GITHUB_OTA_REPO] = (process.env.GITHUB_REPO || '')?.split('/');

const commonParams = {
  owner: GITHUB_OTA_OWNER,
  repo: GITHUB_OTA_REPO,
  accept: 'application/vnd.github.v3+json',
};

export const addService = async ({
  name,
  documentType,
  json,
  url,
}: {
  name: string;
  documentType: string;
  json: any;
  url: string;
}) => {
  if (!process.env.GITHUB_REPO) {
    return {};
  }

  const issueTitle = `Add ${name} - ${documentType}`;
  const issueBodyCommon = `
You can see the work done by the awesome contributor here:
${url}

Or you can see the JSON generated here:
\`\`\`json
${JSON.stringify(json, null, 2)}
\`\`\`

You will need to create the following file in the root of the project: \`services/${name}.json\`

`;
  // test
  let existingIssue = await searchIssue({
    ...commonParams,
    // baseUrl should be the way to go but it goes with a 404 using octokit
    // baseUrl: `https://api.github.com/${GITHUB_REPO}`,
    q: `is:issue "${issueTitle}"`,
  });

  if (existingIssue) {
    await addCommentToIssue({
      ...commonParams,
      issue_number: existingIssue.number,
      body: `
Addition has been requested again through the contribution tool

${issueBodyCommon}
`,
    });
  } else {
    existingIssue = await createIssue({
      ...commonParams,
      title: issueTitle,
      body: `
New service addition requested through the contribution tool

${issueBodyCommon}
`,
      labels: [process.env.GITHUB_REPO || 'add'],
    });
  }

  return existingIssue;
};
