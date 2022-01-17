# CONTRIBUTING

## Markdown Guidelines

Although we use the MDX format which sometimes allows the instantiation of React components in mdx files (see the [Readme section on this subject](/README.md#MDX)), it is recommended to avoid doing so to facilitate the contribution.

Prefer Markdown over strings for translations, as soon as there are multiple paragraphs.

## Copywriting

### Common to all languages

- The name of the product is “Open Terms Archive”.
- Open Terms Archive is a brand name, not a common noun. It does not have a determiner.
- It is singular. It is not “Open Terms Archives”.
- It has spaces. It is not “OpenTermsArchive”.
- As often as possible, non-breakable spaces should be used to separate the three words, in order to avoid line breaks in the middle of the name.
- While the “OTA” abbreviation can be used in internal documents and discussions, it is not used publicly (at least not by us).

### English examples

```diff
- OTA enables activists to identify misleading terms.
- The Open Terms Archive enables activists to identify misleading terms.
- OpenTermsArchive enables activists to identify misleading terms.
+ Open Terms Archive enables activists to identify misleading terms.
```

### Exemples en français

- Open Terms Archive est un nom féminin, car il s'agit de l'archive, la base de données.

```diff
- OTA permet aux parlementaires de suivre l'application de leurs lois.
- L’Open Terms Archive permet aux parlementaires de suivre l'application de leurs lois.
- OpenTermsArchive permet aux parlementaires de suivre l'application de leurs lois.
+ Open Terms Archive permet aux parlementaires de suivre l'application de leurs lois.
```

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
