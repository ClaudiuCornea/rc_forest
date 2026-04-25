"use client";

import { useTina } from "tinacms/dist/react";
import { Blocks } from "@/components/blocks";
import { PageQuery } from "@/tina/__generated__/types";
import ErrorBoundary from "@/components/error-boundary";

export interface ClientPageProps {
  data: {
    page: PageQuery["page"];
  };
  variables: {
    relativePath: string;
  };
  query: string;
}

/**
 * ClientPage is the primary entry point for localized pages.
 * It uses the useTina hook to enable real-time visual editing when 
 * accessed via the Tina CMS admin panel.
 */
export default function ClientPage(props: ClientPageProps) {
  // useTina handles the logic of switching between static data (production)
  // and live-synchronized data (visual editor).
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });

  if (!data?.page) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <p className="font-display text-2xl tracking-widest animate-pulse">Page Content Loading...</p>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <Blocks {...data.page} />
    </ErrorBoundary>
  );
}
