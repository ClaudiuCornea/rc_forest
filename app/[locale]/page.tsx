import React from "react";
import client from "@/tina/__generated__/client";
import ClientPage from "./client-page";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const dynamic = "force-static";

export function generateStaticParams() {
  return [
    { locale: "en" },
    { locale: "fr" },
    { locale: "nl" },
  ];
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  try {
    const data = await client.queries.page({
      relativePath: `${locale}/home.mdx`,
    });

    const seo = data?.data?.page?.seo;

    if (seo?.title || seo?.description) {
      return {
        title: seo.title,
        description: seo.description,
      };
    }
  } catch (error) {
    console.error("Error fetching SEO metadata:", error);
  }

  return {}; // Fallback to layout metadata
}

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  
  let data;
  try {
    data = await client.queries.page({
      relativePath: `${locale}/home.mdx`,
    });
  } catch (error) {
    console.error(`CRITICAL: Error fetching page data for ${locale}. Ensure Tina server is running.`);
    throw error;
  }

  if (!data?.data?.page) {
    notFound();
  }

  // Pass query, variables, and data to ClientPage
  // In production (non-edit mode), useTina will just return data.
  return (
    <ClientPage {...data} />
  );
}
