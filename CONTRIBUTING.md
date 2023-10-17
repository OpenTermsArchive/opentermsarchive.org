# CONTRIBUTING

## Markdown Guidelines

Although we use the MDX format which sometimes allows the instantiation of React components in mdx files (see the [Readme section on this subject](/README.md#MDX)), it is recommended to avoid doing so to facilitate the contribution.

Prefer Markdown over strings for translations, as soon as there are multiple paragraphs.

## Contributing code

### Pull requests

We follow the [GitHub Flow](https://guides.github.com/introduction/flow/): all code contributions are submitted via a pull request towards the `master` branch.

Opening a Pull Request means you want that code to be merged. If you want to only discuss it, send a link to your branch along with your questions through whichever communication channel you prefer.

#### Peer reviews

All pull requests must be reviewed by at least one person who is not their original author.

To help reviewers, make sure to describe your pull request with a **clear text explanation** of your changes.

### Commit messages

We strive to follow this [recommendation](https://chris.beams.io/posts/git-commit) to write our commit messages, which contains the following rules:

- [Separate subject from body with a blank line](https://chris.beams.io/posts/git-commit/#separate).
- [Limit the subject line to 50 characters](https://chris.beams.io/posts/git-commit/#limit-50).
- [Capitalize the subject line](https://chris.beams.io/posts/git-commit/#capitalize).
- [Do not end the subject line with a period](https://chris.beams.io/posts/git-commit/#end).
- [Use the imperative mood in the subject line](https://chris.beams.io/posts/git-commit/#imperative).
- [Wrap the body at 72 characters](https://chris.beams.io/posts/git-commit/#wrap-72).
- [Use the body to explain what and why vs. how](https://chris.beams.io/posts/git-commit/#why-not-how).

We add this additional rule:

- Do not rely on GitHub issue reference numbers in commit messages, as we have no guarantee the host system and its autolinking will be stable in time. Make sure the context is self-explanatory. If an external reference is given, use its full URL.

## Add a contributor

Contributors to Open Terms Archive are listed publicly on the website.

### For contributors with a GitHub account

This is made possible by the use of the [All Contributors bot](https://allcontributors.org/docs/en/bot/overview), that enables adding a contributor with a comment on an issue or pull request, without writing code. To do this, please use the [dedicated issue](https://github.com/OpenTermsArchive/opentermsarchive.org/issues/271) on this repository and write a comment with a command like `@all-contributors please add @<username> for <contributions>`.

### For contributors who do not have a GitHub account

1. Edit the `.all-contributorsrc` file at the root of this repository and use the following format to add a contributor:

```json
{
  ...,
  "contributors": [
    {
      "name": "<contributor_name>",
      "profile": "<contributor_website>",
      "avatar_url": "https://opentermsarchive.org/images/contributors/<slugify-contributor-name>.jpg",
      "contributions": ["<type_of_contribution>"]
    }
  ]
}
```

2. Add a picture to `public/images/contributors` folder which respects the following constraints:

- square format, 420x420px
- in optimised `jpg`
- slugify the filename, for exemple: `contributor-name.jpg`

3. Generate the contributors table with `npx all-contributors generate`.

### How to add a type of contribution to a contributor

You can do this by editing the `.all-contributorsrc` file or by using the bot with `@all-contributors please add @<already_listed_contributor> for <new_contribution_type>`

The types of contribution that can be used are listed [here](https://allcontributors.org/docs/en/emoji-key).

### How to remove a contributor

1. Edit the `.all-contributorsrc` file and remove the contributor
2. If present, delete the picture in the `public/images/contributors` folder
3. Generate the contributors table with `npx all-contributors generate`
