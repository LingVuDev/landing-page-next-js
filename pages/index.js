import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
import utilStyles from "../styles/utils.module.css";
import { getSortedPostsData } from "../lib/posts";
import Link from "next/link";
import Date from "../components/date";
import { PrismicText, PrismicRichText } from "@prismicio/react";
import { createClient } from "../prismicio";

export default function Home({ allPostsData, page }) {
  return (
    <Layout home={page.data}>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>{page.data.description[0].text}</p>
        <p>
          Want to learn more about me?{" "}
          <a href="https://www.linkedin.com/in/lingvu/">LinkedIn</a>
        </p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>
                <a>{title}</a>
              </Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}

export async function getStaticProps() {
  const client = createClient();
  const page = await client.getSingle("homepage");
  // Todo replace this
  const allPostsData = getSortedPostsData();

  return {
    props: {
      allPostsData,
      page,
    },
  };
}
