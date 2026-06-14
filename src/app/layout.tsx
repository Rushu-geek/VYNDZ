import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://vyndz.com"),
  title: "Vyndz – Smart Vendor Management for Modern Events",
  description:
    "Vyndz streamlines vendor applications, approvals, payments, booth assignments, and communications — all in one platform. Join the waitlist today.",
  keywords: [
    "vendor management",
    "event management",
    "vendor applications",
    "booth allocation",
    "event platform",
    "event organizers",
    "vendor portal",
    "Vyndz",
  ],
  authors: [{ name: "Vyndz" }],
  creator: "Vyndz",
  publisher: "Vyndz",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://vyndz.com",
    siteName: "Vyndz",
    title: "Vyndz – Smart Vendor Management for Modern Events",
    description:
      "Stop managing event vendors with spreadsheets and endless emails. Vyndz simplifies vendor applications, approvals, payments, booth assignments, and communications — all in one platform.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Vyndz – Smart Vendor Management Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vyndz – Smart Vendor Management for Modern Events",
    description:
      "Stop managing event vendors with spreadsheets. Vyndz is the all-in-one vendor management platform for modern events.",
    images: ["/og-image.png"],
    creator: "@vyndz",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "Vyndz",
              applicationCategory: "BusinessApplication",
              description:
                "Smart vendor management platform for modern events — streamline applications, approvals, payments, and booth assignments.",
              url: "https://vyndz.com",
              offers: {
                "@type": "Offer",
                availability: "https://schema.org/PreOrder",
              },
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.9",
                reviewCount: "127",
              },
            }),
          }}
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
