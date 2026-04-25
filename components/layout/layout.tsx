import React, { PropsWithChildren } from "react";
import { LayoutProvider } from "./layout-context";
import client from "../../tina/__generated__/client";
import { Header } from "./nav/header";
import { Footer } from "./nav/footer";
import { ThemeStyles } from "./theme-styles";

type LayoutProps = PropsWithChildren & {
  locale: string;
};

export default async function Layout({ children, locale }: LayoutProps) {
  // Fetch localized settings (header, footer) and shared theme in parallel
  let globalData, themeData;
  try {
    [globalData, themeData] = await Promise.all([
      client.queries.global({
        relativePath: `${locale}/index.json`,
      }),
      client.queries.theme({
        relativePath: `theme.json`,
      })
    ]);
  } catch (error) {
    console.error(`CRITICAL: Error fetching layout data for ${locale}. Ensure Tina server is running.`);
    throw error;
  }

  if (!globalData?.data?.global || !themeData?.data?.theme) {
    return (
      <main className="overflow-x-hidden">
        {children}
      </main>
    );
  }

  return (
    <LayoutProvider globalSettings={globalData.data.global as any} locale={locale}>
      <ThemeStyles theme={themeData.data.theme as any} />
      <Header />
      <main className="overflow-x-hidden">
        {children}
      </main>
      <Footer />
    </LayoutProvider>
  );
}
