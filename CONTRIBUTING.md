# CONTRIBUTING

## Markdown Guidelines

Although we use the MDX format which sometimes allows the instantiation of React components in mdx files (see the [Readme section on this subject](/README.md#MDX)), it is recommended to avoid doing so to facilitate the contribution.

Prefer Markdown over strings for translations, as soon as there are multiple paragraphs.

## Destination repository

The contribution interface can be used against any repository on which ota@opentermsarchive.org github user has issue creation rights.

This repo must be passed by an url parameter called `destination`

Here are some examples for contributing to different projects using

- /en/contribute?destination=OpenTermsArchive/services-all
- /en/contribute?destination=OpenTermsArchive/services-dating
- /en/contribute?destination=ambanum/test-repo (For tests)
- /fr/contribute?destination=ambanum/test-repo2 (For tests)

## Local creation of services from contribution interface

If you are interested in setting up a local instance where you can locally save the result of the contribution interface, you have to specify where to save it.
This can be done with a url parameter called `localPath`.

It takes a full local path string and must point to the exact folder containing the declarations.
See below examples:

```
/en/contribute?destination=OpenTermsArchive/services-all&localPath=/Users/username/Workspace/ambanum/OpenTermsArchive/services-all/declarations
/en/contribute?destination=OpenTermsArchive/services-dating&localPath=/Users/username/Workspace/somewhere-else/services-dating/declarations
```

This way, a `Save on local` button will appear on the contribution interface. By clicking on it, it will add or modify the service declaration (saved as a `.json` file) in the corresponding directory.

### Automatically generating history file

As we want to ensure we can retrace the whole history of selectors we used to retrieve the corresponding documents, a history file should be created **every time you change the service declaration** (See the corresponding [decision record](./decision-record/0002-service-history.md).
As this is a very time consuming thing to do (retrieve the last version date, format it in ISO format and pasting it in a history file), you can use a new url parameter called `versionsRepo` which will fetch the date of the last commit successfully retrieved from Github and populate the history file accordingly and automatically.

**CAUTION**: You need to have a `localPath` query param (described in the previous paragraph) in the url for this to happen.

```
/en/contribute?destination=OpenTermsArchive/services-all&localPath=/Users/username/Workspace/ambanum/OpenTermsArchive/services-all/declarations&versionsRepo=ambanum/OpenTermsArchive-versions
/en/contribute?destination=OpenTermsArchive/services-dating&localPath=/Users/username/Workspace/OpenTermsArchive/services-dating/declarations&versionsRepo=ambanum/OpenTermsArchive/versions-dating
```

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
