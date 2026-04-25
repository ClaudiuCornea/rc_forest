"use client";

import dynamic from "next/dynamic";
import { tinaField } from "tinacms/dist/react";
import { Page, PageBlocks } from "../../tina/__generated__/types";
import { Hero } from "./hero";
import { useRef, useState, useEffect } from "react";

const SectionLoading = () => <div className="min-h-[20rem] bg-club-black/20 animate-pulse" />;

// Dynamic imports for blocks that are likely below the fold to reduce the initial bundle size.
// We keep ssr: true (default) so they are rendered on the server for SEO.
const About = dynamic(() => import("./about").then((mod) => mod.About), { loading: SectionLoading, ssr: true });
const Team = dynamic(() => import("./team").then((mod) => mod.Team), { loading: SectionLoading, ssr: true });
const Match = dynamic(() => import("./match").then((mod) => mod.Match), { loading: SectionLoading, ssr: true });
const Gallery = dynamic(() => import("./gallery").then((mod) => mod.Gallery), { loading: SectionLoading, ssr: true });
const Contact = dynamic(() => import("./contact").then((mod) => mod.Contact), { loading: SectionLoading, ssr: true });

export const Blocks = (props: Omit<Page, "id" | "_sys" | "_values">) => {
  if (!props.blocks) return null;
  return (
    <>
      {props.blocks.map(function (block, i) {
        if (!block) return null;

        // The Hero is always visible and critical for LCP, so we don't lazy-load it.
        if (block.__typename === "PageBlocksHero") {
          return (
            <div key={i} data-tina-field={tinaField(block)}>
              <Block {...block} />
            </div>
          );
        }

        // For all other blocks, we use LazyBlock which ensures visibility for SEO
        // while deferring full client-side hydration until scroll.
        return <LazyBlock key={i} block={block} />;
      })}
    </>
  );
};

const LazyBlock = ({ block }: { block: PageBlocks }) => {
  // We initialize to true for SSR/SEO, but set to false on mount to enable lazy loading for users.
  // This ensures crawlers see the content, but the browser doesn't execute the full JS 
  // until the section enters the viewport.
  const [isVisible, setIsVisible] = useState(true);
  const [hasMounted, setHasMounted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setHasMounted(true);
    
    // Check if we are in the Tina CMS editor
    const isTina = window.location.search.includes('tina') || window.parent !== window;
    
    if (isTina) {
      setIsVisible(true);
      return;
    }

    // On the client, we start as not visible to save on heavy execution (TBT)
    setIsVisible(false);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "600px" } // Load well before it enters the viewport
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  // During SSR (before hydration), isVisible is true, so search engines see the block.
  // After hydration, isVisible becomes false (via useEffect) and then true on scroll.
  return (
    <div ref={ref} data-tina-field={tinaField(block)}>
      {isVisible || !hasMounted ? <Block {...block} /> : <SectionLoading />}
    </div>
  );
};

const Block = (block: PageBlocks) => {
  switch (block.__typename) {
    case "PageBlocksHero":
      return <Hero data={block} />;
    case "PageBlocksAbout":
      return <About data={block} />;
    case "PageBlocksTeam":
      return <Team data={block} />;
    case "PageBlocksMatch":
      return <Match data={block} />;
    case "PageBlocksGallery":
      return <Gallery data={block} />;
    case "PageBlocksContact":
      return <Contact data={block} />;
    default:
      return null;
  }
};
