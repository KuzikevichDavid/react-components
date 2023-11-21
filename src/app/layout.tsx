import { Metadata } from "next";

export const metadata: Metadata = {
  title: "React. Next.JS",
  description: "RSSchool study course task."
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <html lang="en">
        <body>
          <div id="root">{children}</div>
        </body>
      </html>
    </>
  );
}