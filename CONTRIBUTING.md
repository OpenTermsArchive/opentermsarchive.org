# CONTRIBUTING

## Referencing your reuse

If you have built a product or a study with Open Terms Archive, we would love to reference it in the [public showcase](https://opentermsarchive.org/#reuses)!

This is a good way for you to gain more visibility, but it is also a very important contribution to Open Terms Archive. Doing so helps the Core team make connections between similar reusers and raise funds for maintaining the ecosystem alive and adding features to the software.

Referencing your reuse is fast and easy. Follow the instructions below and [contact us](mailto:contact@opentermsarchive.org?subject=Referencing%20reuse) if you encounter any problem!

### Describe your reuse

Create a YAML file in the [`data/reuses/` folder](https://github.com/OpenTermsArchive/opentermsarchive.org/tree/master/data/reuses), in [snake case](https://en.wikipedia.org/wiki/Snake_case). For example, if your reuse is called “Research on the impact on human rights”, you would create a file named `research-on-the-impact-on-human-rights.yml`.

Fill in that file with information following the template below:

```yml
title: # in both languages, 50 characters max
  en: Research on the impact on human rights
  fr: Recherche sur l'impact sur les droits humains # deepl.com can be used for automated translation
author: # in both languages, 50 characters max
  en: Lab-LEX, University of Brest
  fr: Lab-LEX, Université de Brest
description: # in both languages, 150 characters max
  en: Research paper on the impact on human rights of the evolution of social media terms of use.
  fr: Papier de recherche sur l'impact sur les droits de l’homme de l’évolution des conditions d’utilisation des réseaux sociaux. # deepl.com can be used for automated translation
website: https://grsomedia.wordpress.com/2023/10/10/publication-du-rapport-les-conditions-dutilisation-des-reseaux-sociaux-et-leur-impact-sur-les-droits-de-lhomme/ # prefer HTTPS over HTTP
```

### Add an illustration

Add an image in the PNG format to the [`assets/images/reuses/` folder](https://github.com/OpenTermsArchive/opentermsarchive.org/tree/master/assets/images/reuses/), with the same name as the `.yml` file. For example: `research-on-the-impact-on-human-rights.png`.

The file should be in 529 × 310 pixels. To ensure fast loading and minimise the environmental impact of the Open Terms Archive website, the maximum allowed picture weight is 400 kB.

It is strongly recommended to use an image compression tool such as [ImageOptim](https://imageoptim.com) to reduce the image weight. Choosing “lossy” settings at 90% quality will usually yield over 50% compression gains.

If you need to use different illustrations depending on the language of the site, you can do so by adding a suffix to the name of your image file. Supported suffix values are `en` and `fr` and it must be preceded by a `-`. For example: `research-on-the-impact-on-human-rights-fr.png`.

## Contributing code

### Pull requests

We follow the [GitHub Flow](https://guides.github.com/introduction/flow/): all code contributions are submitted via a pull request towards the `main` branch.

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

### CSS naming convention

Use [BEM methodology](https://getbem.com/) to create reusable components and facilitate code sharing.

## Add a contributor

Contributors to Open Terms Archive are listed publicly on the website.

### For contributors with a GitHub account

This is made possible by the use of the [All Contributors bot](https://allcontributors.org/docs/en/bot/overview), that enables adding a contributor with a comment on an issue or pull request, without writing code. To do this, please use the [dedicated issue](https://github.com/OpenTermsArchive/opentermsarchive.org/issues/271) on this repository and write a comment with a command like `@all-contributors please add @<username> for <contributions>`.

### For contributors who do not have a GitHub account

1. Edit the `.all-contributorsrc` file at the root of this repository and use the following format to add a contributor:

```json
{
  ...,
  "contributors": [
    {
      "name": "<contributor_name>",
      "profile": "<contributor_website>",
      "contributions": ["<type_of_contribution>"]
    }
  ]
}
```

2. Add a picture to `assets/images/contributors/` folder which respects the following constraints:

- square format, 420x420px
- in [optimised](https://imageoptim.com) JPEG
- slugify the filename and use `jpg` as an extension, for example: `contributor-name.jpg`

### How to add a type of contribution to a contributor

You can do this by editing the `.all-contributorsrc` file or by using the bot with `@all-contributors please add @<already_listed_contributor> for <new_contribution_type>`
