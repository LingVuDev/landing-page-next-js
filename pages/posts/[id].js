import Layout from "../../components/layout";
import Head from "next/head";
import { createClient } from "../../prismicio";
import Date from '../../components/date';
import { getParseMarkdown } from '../../lib/posts';

import utilStyles from "../../styles/utils.module.css";

export default function Post({ postData }) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.creationDate} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.content }} />
      </article>
    </Layout>
  );
}

export async function getStaticPaths() {
  const client = createClient();
  const allPostsData = await client.getAllByType("post");

  const paths = allPostsData.map(post => `/posts/${post.id}`);

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const client = createClient();
  const allPostsData = await client.getAllByType("post");

  const { data: postData } = allPostsData.find(post => post.id === params.id);

  // Parse markdown to html
  postData.content = await getParseMarkdown(postData.content);

  return {
    props: {
      postData,
    },
  };
}
