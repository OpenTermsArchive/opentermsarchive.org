const nextTranslate = require('next-translate');
const fs = require('fs');
const path = require('path');
const matter = require('gray-matter'); // can't use @mdx-js/mdx as not in es module

const srcPagePermalinks = require('../permalinks.json');
const CONTENT_FOLDER = 'content';
const STATIC_PAGES_FOLDER = 'pages';

const getI18nContentFilePaths = (
  folder,
  locale,
  { subfolder, absolute = false, extension = true } = {}
) => {
  let files = [];
  const folderParts = [CONTENT_FOLDER, STATIC_PAGES_FOLDER];
  const pathParts = [...folderParts, locale];
  if (subfolder) {
    pathParts.push(subfolder);
  }
  const folderPath = path.join(process.cwd(), ...pathParts);

  const filesAndFolders = fs.readdirSync(folderPath, {
    withFileTypes: true,
  });

  for (const fileOrFolder of filesAndFolders) {
    if (fileOrFolder.isDirectory()) {
      files = [
        ...files,
        ...getI18nContentFilePaths(folder, locale, {
          subfolder: fileOrFolder.name,
          absolute,
          extension,
        }).files,
      ];
    } else {
      const fileName = extension ? fileOrFolder.name : path.parse(fileOrFolder.name).name;
      files.push(path.join(absolute ? folderPath : subfolder || '', fileName));
    }
  }

  return { files, folder: path.join(process.cwd(), ...folderParts), i18nFolder: folderPath };
};

const getMdxPagePermalinks = (locales, defaultLocale) => {
  let mdxPagePermalinks = {};

  const {
    files: filenames,
    folder,
    i18nFolder,
  } = getI18nContentFilePaths('pages', 'en', {
    absolute: false,
  });

  filenames.forEach((filename) => {
    const filePath = path.join(i18nFolder, filename);
    const uri = `/${filename.replace(path.extname(filename), '')}`;
    const pagePermalinks = { [uri]: {} };

    locales
      .filter((locale) => locale !== defaultLocale)
      .forEach((locale) => {
        const i18nFilepath = path.join(folder, locale, filename);
        try {
          const { data } = matter(fs.readFileSync(i18nFilepath).toString());

          if (data.permalink) {
            pagePermalinks[uri] = { [locale]: data.permalink };
          }
        } catch (e) {
          // File could not be read or frontmatter could not be parsed. Skip.
          console.error(`${i18nFilepath} does not exist or is malformed`);
          console.error(e);
        }
      });

    if (Object.keys(pagePermalinks[uri]).length > 0) {
      mdxPagePermalinks = { ...mdxPagePermalinks, ...pagePermalinks };
    }
  });

  return mdxPagePermalinks;
};

const getSrcPagePermalinks = () => {
  // TODO read from files directly
  return srcPagePermalinks;
};

const getI18nPermalinks = (locales, defaultLocale) => {
  return {
    ...getSrcPagePermalinks(),
    ...getMdxPagePermalinks(locales, defaultLocale),
  };
};

module.exports = { getI18nContentFilePaths, getI18nPermalinks };
