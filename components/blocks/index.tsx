"use client";

import dynamic from "next/dynamic";
import { tinaField } from "tinacms/dist/react";
import { Page, PageBlocks } from "../../tina/__generated__/types";
import { Hero } from "./hero";
import { useRef, useState, useEffect } from "react";

const SectionLoading = () => <div className="min-h-[20rem] bg-club-black/20 animate-pulse" />;

// Dynamic imports for blocks that are likely below the fold to reduce the initial bundle size
const About = dynamic(() => import("./about").then((mod) => mod.About), { loading: SectionLoading });
const Team = dynamic(() => import("./team").then((mod) => mod.Team), { loading: SectionLoading });
const Match = dynamic(() => import("./match").then((mod) => mod.Match), { loading: SectionLoading });
const Gallery = dynamic(() => import("./gallery").then((mod) => mod.Gallery), { loading: SectionLoading });
const Contact = dynamic(() => import("./contact").then((mod) => mod.Contact), { loading: SectionLoading });

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

        // For all other blocks, we use LazyBlock which hydrates on scroll in production,
        // but renders immediately if we detect we're in the Tina CMS editor.
        return <LazyBlock key={i} block={block} />;
      })}
    </>
  );
};

const LazyBlock = ({ block }: { block: PageBlocks }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // If we're in the Tina CMS editor, we want to skip lazy loading so all fields are editable.
    const isTina = window.location.search.includes('tina') || window.parent !== window;
    if (isTina) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "400px" } // Start loading well before it enters the viewport
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} data-tina-field={tinaField(block)}>
      {isVisible ? <Block {...block} /> : <SectionLoading />}
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
