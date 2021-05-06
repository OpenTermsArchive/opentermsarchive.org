import { block_urls, commons, rules } from './extension/data/rules';

import fse from 'fs-extra';
import path from 'path';
import puppeteer from 'puppeteer';

/**
 * All code in there is adapted from the `context-menu.js` which present in the chrome extension
 * if it changes, you may need to change the code inside there too
 */

const cached_rules: any = {};

// Load files from chrome extension
export const extensionPath = path.join(
  path.resolve(),
  'src/modules/Scraper/i-dont-care-about-cookies/extension'
);
const extensionDataPath = path.join(extensionPath, 'data');

const embeds = fse.readFileSync(path.resolve(extensionDataPath, 'js', 'embeds.js'), 'utf8');
const commonFile = fse.readFileSync(path.resolve(extensionDataPath, 'js', 'common.js'), 'utf8');
const css = fse.readFileSync(path.resolve(extensionDataPath, 'css', 'common.css'), 'utf8');

export const interceptCookieUrls = (url: string, host_levels: string[]) => {
  var clean_url = url.split('?')[0];

  // To shorten the checklist, many filters are grouped by keywords

  for (var group in block_urls.common_groups) {
    if (url.indexOf(group) > -1) {
      var group_filters = (block_urls as any).common_groups[group];

      for (var i in group_filters) {
        if (
          (group_filters[i].q && url.indexOf(group_filters[i].r) > -1) ||
          (!group_filters[i].q && clean_url.indexOf(group_filters[i].r) > -1)
        ) {
          // Check for exceptions
          if (group_filters[i].e && host_levels.length > 0)
            for (var level in host_levels)
              for (var exception in group_filters[i].e)
                if (group_filters[i].e[exception] == host_levels[level]) return false;

          return true;
        }
      }
    }
  }

  // Check ungrouped filters

  var group_filters: any = block_urls.common;

  for (var i in group_filters) {
    if (
      (group_filters[i].q && url.indexOf(group_filters[i].r) > -1) ||
      (!group_filters[i].q && clean_url.indexOf(group_filters[i].r) > -1)
    ) {
      // Check for exceptions

      if (group_filters[i].e && host_levels.length > 0)
        for (var level in host_levels)
          for (var exception in group_filters[i].e)
            if (group_filters[i].e[exception] == host_levels[level]) return false;

      return true;
    }
  }

  // Site specific filters
  if (host_levels.length > 0) {
    for (var level in host_levels) {
      if ((block_urls as any).specific[host_levels[level]]) {
        var rules = (block_urls as any).specific[host_levels[level]];
        for (var i in rules) if (url.indexOf(rules[i]) > -1) return true;
      }
    }
  }

  return false;
};

export const getHostname = (url: string, cleanup?: boolean) => {
  try {
    if (url.indexOf('http') != 0) throw true;

    var a = new URL(url);

    return typeof cleanup == 'undefined' ? a.hostname : a.hostname.replace(/^w{2,3}\d*\./i, '');
  } catch (error) {
    return '';
  }
};

export const getHostlevels = (hostname: string = '') => {
  const subparts = hostname.split(/\.(?![^.]*$)/gim);
  if (subparts.length <= 1) {
    return [];
  }
  return subparts
    .filter((hostnamePart) => hostnamePart !== hostname)
    .map((_, i) => [...subparts].slice(i).join('.'));
};

export const removeCookieBanners = async (page: puppeteer.Page, hostname: string) => {
  const activateDomain = async (hostname: string) => {
    if (!cached_rules[hostname]) cached_rules[hostname] = (rules as any)[hostname] || {};

    if (!cached_rules[hostname]) return false;

    let r = cached_rules[hostname],
      status = false;

    if (typeof r.s !== 'undefined') {
      await page.addStyleTag({ content: r.s });
      status = true;
    } else if (typeof r.c !== 'undefined') {
      await page.addStyleTag({ content: (commons as any)[r.c] });
      status = true;
    }

    if (typeof r.j !== 'undefined') {
      const js = fse.readFileSync(
        path.resolve(extensionDataPath, 'js', `${r.j > 0 ? 'common' + r.j : hostname}.js`),
        'utf8'
      );

      await page.addScriptTag({
        content: js,
      });
      status = true;
    }

    return status;
  };

  await page.addStyleTag({ content: css });
  await page.addScriptTag({ content: embeds });
  const status = await activateDomain(hostname || '');

  if (!status) {
    await page.addScriptTag({ content: commonFile });
  }

  // To give the time to the popup to actually close. 1s seemed too short
  await new Promise((resolve) => setTimeout(resolve, 1.5 * 1000));
};
