import { addCommentToIssue, createIssue, searchIssue } from 'modules/Github/api';

export const addService = async ({
  destination,
  name,
  documentType,
  json,
  url,
}: {
  destination: string;
  name: string;
  documentType: string;
  json: any;
  url: string;
}) => {
  if (!destination) {
    return {};
  }
  const [githubOrganization, githubRepository] = (destination || '')?.split('/');

  const commonParams = {
    owner: githubOrganization,
    repo: githubRepository,
    accept: 'application/vnd.github.v3+json',
  };

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
  let existingIssue = await searchIssue({
    ...commonParams,
    title: issueTitle,
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
      labels: [process.env.GITHUB_LABEL_ADD || 'add'],
    });
  }

  return existingIssue;
};
