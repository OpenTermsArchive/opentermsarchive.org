export function getI18nContentFilePaths(
  folder: string,
  locale: string,
  options?: { subfolder?: string; absolute?: boolean; extension?: boolean }
): { files: string[]; folder: string; i18nFolder: string };

export function getI18nPermalinks(
  locales: string[],
  defaultLocale: string
): { [path: string]: { [locale: string]: string } };
