"use client";
import React from "react";
import { useLayout } from "../layout-context";
import { tinaField } from "tinacms/dist/react";
import { Instagram, Facebook, Twitter, Youtube } from "lucide-react";

const SocialIcon = React.memo(({ platform, className }: { platform: string; className?: string }) => {
  switch (platform) {
    case "Instagram": return <Instagram className={className} />;
    case "Facebook": return <Facebook className={className} />;
    case "Twitter": return <Twitter className={className} />;
    case "YouTube": return <Youtube className={className} />;
    default: return null;
  }
});

SocialIcon.displayName = "SocialIcon";

export const Footer = React.memo(() => {
  const { globalSettings } = useLayout();
  const { header, footer } = globalSettings!;

  const currentYear = new Date().getFullYear();
  const startYear = footer?.copyrightStartYear ?? currentYear.toString();

  return (
    <footer className="relative py-16 md:py-20 bg-club-offblack overflow-hidden">
      {/* Background Ghost Text */}
      {footer?.backgroundText && (
        <span className="absolute left-1/2 bottom-0 -translate-x-1/2 font-display ghost-text text-white/[0.03] select-none pointer-events-none text-[15vw] leading-none whitespace-nowrap">
          {footer.backgroundText}
        </span>
      )}

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">

          {/* Brand Column */}
          <div className="md:col-span-5 space-y-6">
            <span className="font-display text-2xl sm:text-3xl tracking-[0.2rem] block">
              {header?.name?.split(' ')[0]?.toUpperCase()}
              <span className="text-club-red">-</span>
              {header?.name?.split(' ')[1]?.toUpperCase()}{' '}
              <span className="text-club-red">RC</span>
            </span>
            {footer?.description && (
              <p
                className="font-cond text-sm text-club-gray max-w-sm leading-relaxed"
                data-tina-field={tinaField(footer, 'description')}
              >
                {footer.description}
              </p>
            )}
          </div>

          {/* Social Column */}
          <div className="md:col-span-4 space-y-6">
            <strong className="block font-cond font-bold text-[0.625rem] tracking-[0.25rem] uppercase text-club-red">
              Follow the Scrum
            </strong>
            <div className="flex gap-4">
              {footer?.socialLinks?.map((social, index) => (
                <a
                  key={index}
                  href={social?.link || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Follow us on ${social?.platform || "Social Media"}`}
                  className="p-3 bg-white/5 hover:bg-club-red transition-all group rounded-none"
                  data-tina-field={tinaField(social)}
                >
                  <SocialIcon
                    platform={social?.platform || ""}
                    className="size-5 text-white group-hover:scale-110 transition-transform"
                  />
                </a>
              ))}
            </div>
          </div>

          {/* Copyright Column */}
          <div className="md:col-span-3 space-y-6 md:text-right">
            <strong className="block font-cond font-bold text-[0.625rem] tracking-[0.25rem] uppercase text-club-red">
              Status
            </strong>
            <div className="space-y-1">
              <p className="text-xs text-club-gray">
                © {startYear} – {currentYear} {header?.name}.
              </p>
              {footer?.footerText && (
                <span className="font-display text-sm tracking-[0.125rem] text-club-red block" data-tina-field={tinaField(footer, 'footerText')}>
                  {footer.footerText}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Accent Line */}
        <div className="mt-16 h-0.5 w-full bg-gradient-to-r from-transparent via-club-red/30 to-transparent" />
      </div>
    </footer>
  );
});

Footer.displayName = "Footer";
