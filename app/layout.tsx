import type { Metadata } from "next";
import { buildMetadata, organizationJsonLd } from "@/lib/seo";
import PageWrapper from "@/components/layout/PageWrapper";
import "./globals.css";

export const metadata: Metadata = buildMetadata({
  title: "IBEX Vehicle Restoration | Special Purpose Vehicle Engineering & Manufacturing",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body>
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd()) }}
        />
        <PageWrapper>{children}</PageWrapper>
      </body>
    </html>
  );
}
