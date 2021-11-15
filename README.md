# OpenTermsArchive.org

## Development

Copy `.env.example` to `.env` file at the root of the project

```
NODE_PATH="src"
```

Then launch

```
yarn
yarn dev
```

### Test to your local IP address

When building responsive applications, it is very important to be able to test on mobile and other devices in real-time.

Get your local IP

```
ipconfig getifaddr en0
```

Run

```
yarn dev -H YOUR.LOCAL.IP.ADRESS
```

### Local creation of services

If you're a developer and a contributor of [OpenTermsArchive](https://github.com/ambanum/openTermsArchive), you can be interested in setting up a local instance where you can directly save the result of the contribution in the corresponding folder in OTA project, and thus test it on your local environment.

If so, you can add the following to your `.env.local`

```
NEXT_PUBLIC_OTA_SERVICES_PATH="/Users/username/Workspace/ambanum/OpenTermsArchive/services"
```

This way, in "Expert Mode", a button `Save on local` will appear and will add the content of the JSON to the directory

## Contribution interface

The contribution interface, located at `/contribute` will help the user to create new services easily

Clicking on `Validate` can automatically create an issue in a github repository.

For this, you need to setup some [Environment variables](#environment-variables) config files in your `.env.local`

## Environment variables

These environment variables can be provided in a `.env` file at the root of the repository. See `.env.example` for an example of such a file.

##### `GITHUB_TOKEN`, `GITHUB_REPO` and `GITHUB_LABEL_ADD`

In order for the service to automatically create issues in Github when a service is failing, you need to provide:

- `GITHUB_TOKEN`: A token with repository privileges which allow access to the [GitHub API](https://github.com/settings/tokens).
- `GITHUB_REPO`: A repository which will be used to create the issues. For example `OpenTermsArchive/services-all`
- `GITHUB_LABEL_ADD`: The name of the label used on the repo to categorize issues corresponding to a service that needs to be added (default is `add`)

**Note**: OTA.org will automatically create issues with a label defined by `GITHUB_LABEL_ADD`. **This specific label has to exist in the corresponding repository for the automatic issue creation works.**

In case this automatic creation does not work, a fallback on the previous email system will occur, opening a `mailto` link with prepopulated data.

## Modules documentation

- [I18n](./src/modules/I18n/README.md)
- [Analytics](./src/modules/Analytics/README.md)
- [Scraper](./src/modules/Scraper/README.md)
