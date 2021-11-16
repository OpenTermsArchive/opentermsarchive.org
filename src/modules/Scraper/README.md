# Scraper Module

The scraper is used to download the full html page and show it within an iframe.
This is done to bypass CORS policy on every website we will try to scrape.

It is using a well known extension called `I don't care about cookies` to prevent GDPR banners from polluting the UX of the contribution tool

## Cookie banner update

In order to have the latest code of the extension, you need to manually download it from the chrome extensions website https://chrome.google.com/webstore/detail/i-dont-care-about-cookies/fihnjjcciajhdojfnbdddfaoknhalnja?hl=en and install it in Brave browser.

**NOTE** if you're using chrome, you will need to manually change the value of BROWSER_EXTENSIONS_FOLDER in the `copy-to-folder.sh` file

and then launch

```
npm run update-cookie-extension
git add ./src/modules/Scraper/i-dont-care-about-cookies
git commit -m "chore: update i-dont-care-about-cookies definitions"
```

## Further doc

[Extension Readme.md](./src/modules/Scraper/i-dont-care-about-cookies/extension/README.md)
