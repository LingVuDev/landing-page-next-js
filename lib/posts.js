import { remark } from 'remark';
import html from 'remark-html';

export async function getParseMarkdown(content) {
  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(html)
    .process(content);

  const contentHtml = processedContent.toString();

  return contentHtml;
}