import { Metadata } from 'next'
import { Html, Head, Main, NextScript } from 'next/document'

export const metadata: Metadata = {
  title: "React. Next.JS",
  description: "RSSchool study course task."
}

export default function Document() {
  return (
    <Html lang="en">
      <Head title='gfuck' />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
