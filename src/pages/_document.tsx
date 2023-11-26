import { Html, Head, Main, NextScript } from 'next/document';

const metadata = {
  title: 'React. Next.JS',
  description: 'RSSchool study course task.',
};

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="og:title" content={metadata.title} />
        <meta name="description" content={metadata.description} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
