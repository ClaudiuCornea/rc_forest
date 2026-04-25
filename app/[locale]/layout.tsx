import React from "react";
import { Metadata, Viewport } from "next";
import { TailwindIndicator } from "@/components/ui/breakpoint-indicator";
import Layout from "@/components/layout/layout";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1.0,
  themeColor: "#cc0000",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const baseUrl = "https://test-app.vercel.app";
  
  const titles: Record<string, string> = {
    en: "Rugby Club de Forest - Vorst | Official Website",
    fr: "Rugby Club de Forest - Vorst | Site Officiel",
    nl: "Rugby Club de Forest - Vorst | Officiële Website",
  };

  const descriptions: Record<string, string> = {
    en: "Official website of Rugby Club de Forest - Rugby Club Vorst in Brussels.",
    fr: "Site officiel du Rugby Club de Forest - Rugby Club Vorst à Bruxelles.",
    nl: "Officiële website van Rugby Club de Forest - Rugby Club Vorst in Brussel.",
  };

  return {
    title: {
      template: "%s | Rugby Club de Forest",
      default: titles[locale] || titles.en,
    },
    description: descriptions[locale] || descriptions.en,
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: `/${locale}`,
      languages: {
        en: "/en",
        fr: "/fr",
        nl: "/nl",
      },
    },
    icons: {
      icon: "/uploads/logo.webp",
      shortcut: "/uploads/logo.webp",
      apple: "/uploads/logo.webp",
    },
    openGraph: {
      type: "website",
      locale: locale,
      url: `${baseUrl}/${locale}`,
      siteName: "Rugby Club de Forest",
      images: [
        {
          url: "/uploads/logo.webp",
          width: 800,
          height: 600,
          alt: "Rugby Club de Forest Logo",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: titles[locale],
      description: descriptions[locale],
      images: ["/uploads/logo.webp"],
    },
  };
}

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "fr" }, { locale: "nl" }];
}

export const dynamicParams = false;

export default async function LocaleRootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return (
    <>
      <Layout locale={locale}>{children}</Layout>
      <TailwindIndicator />
    </>
  );
}
