import { GetStaticProps, GetStaticPropsContext } from 'next';

import { MDXRemoteSerializeResult } from 'next-mdx-remote';
import fs from 'fs';
import { serialize } from 'next-mdx-remote/serialize';
import path from 'path';

type HasCallback<T> = T extends undefined
  ? GetStaticProps<MdxPageProps>
  : Promise<GetStaticPropsContext & MdxPageProps>;

interface WithMdxOptions {
  load: 'mdx';
  filename: string;
  folder: string;
}

const CONTENT_FOLDER = 'content';

export interface MdxPageProps {
  mdxContent?: MDXRemoteSerializeResult;
  frontMatter?: any;
}

export type WithMdxResult = GetStaticPropsContext & MdxPageProps;

export const loadMdxFile = async (options: WithMdxOptions, locale?: string) => {
  const folder = path.join(process.cwd(), CONTENT_FOLDER, options.folder);

  // This is here to force copying those files on vercel
  // extrapolation of `options.folder` does not seem to be working
  fs.readdirSync(path.join(process.cwd(), 'content'));

  let fileContent = '';

  try {
    fileContent = fs
      .readFileSync(`${folder}/${locale}/${options?.filename}.${options?.load}`)
      .toString();
  } catch (e) {
    try {
      fileContent = fs
        .readFileSync(`${folder}/${'en'}/${options?.filename}.${options?.load}`)
        .toString();
    } catch (e) {
      if (options?.filename.includes('home')) {
        console.error(`Could not find ${folder}/${'en'}/${options?.filename}.${options?.load}`);
      }
      fileContent = '';
    }
  }

  if (!fileContent) {
    return {};
  }

  return {
    mdxContent: await serialize(fileContent, {
      // Indicates whether or not to parse the frontmatter from the mdx source
      parseFrontmatter: true,
    }),
  };
};

const withMdx =
  (options: WithMdxOptions | undefined) => (callback?: GetStaticProps<WithMdxResult>) => {
    const getResponseWithMdxProps: HasCallback<typeof callback> = async (props) => {
      const computedProps: WithMdxResult = {
        ...props,
        ...(options && options?.load === 'mdx' ? await loadMdxFile(options, props.locale) : {}),
      };

      if (!callback) {
        return JSON.parse(
          JSON.stringify({
            props: computedProps,
            revalidate: 60 * 30,
          })
        );
      }

      return callback(computedProps);
    };

    return getResponseWithMdxProps;
  };

export default withMdx;
