"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useLayout } from "../layout-context";
import { Menu, X, Globe } from "lucide-react";
import { tinaField } from "tinacms/dist/react";
import { cn } from "@/lib/utils";

const LOCALES = [
  { code: "en", label: "ENG" },
  { code: "fr", label: "FR" },
  { code: "nl", label: "NL" },
];

function useLanguageSwitcher() {
  const { locale } = useLayout();
  const pathname = usePathname();
  const router = useRouter();

  const handleLanguageChange = (newLocale: string) => {
    if (!pathname) return;
    const segments = pathname.split("/");
    if (["en", "fr", "nl"].includes(segments[1])) {
      segments[1] = newLocale;
    } else {
      segments.splice(1, 0, newLocale);
    }
    router.push(segments.join("/") || "/");
  };

  return { locale, handleLanguageChange };
}

interface LanguageSwitcherProps {
  onSelect?: () => void;
  mobile?: boolean;
}

const LanguageSwitcher = React.memo(({ onSelect, mobile = false }: LanguageSwitcherProps) => {
  const { locale, handleLanguageChange } = useLanguageSwitcher();

  if (mobile) {
    return (
      <div className="flex flex-col items-center gap-6 pb-12">
        <div className="flex items-center gap-2 text-club-gray font-cond text-xs tracking-widest uppercase">
          <Globe className="size-3" /> Select Language
        </div>
        <div className="flex gap-8">
          {LOCALES.map((l) => (
            <button
              key={l.code}
              onClick={() => {
                handleLanguageChange(l.code);
                onSelect?.();
              }}
              className={cn(
                "font-display text-3xl tracking-widest transition-all",
                locale === l.code ? "text-club-red scale-110 font-bold" : "text-white/30 hover:text-white"
              )}
            >
              {l.label}
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-4 border-l border-white/10 ml-6 pl-6">
      {LOCALES.map((l) => (
        <button
          key={l.code}
          onClick={() => handleLanguageChange(l.code)}
          className={cn(
            "font-cond font-bold text-xs tracking-[0.125rem] transition-all",
            locale === l.code
              ? "text-club-red scale-110"
              : "text-club-gray hover:text-white"
          )}
        >
          {l.label}
        </button>
      ))}
    </div>
  );
});

LanguageSwitcher.displayName = "LanguageSwitcher";

export const Header = React.memo(() => {
  const { globalSettings, locale } = useLayout();
  const header = globalSettings!.header!;
  const [menuState, setMenuState] = React.useState(false);
  const pathname = usePathname();

  // Handle scroll lock
  useEffect(() => {
    if (menuState) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
    return () => document.body.classList.remove('no-scroll');
  }, [menuState]);

  // Close menu on route change
  useEffect(() => {
    setMenuState(false);
  }, [pathname]);

  const getHref = (href: string) => {
    if (href.startsWith("#")) return href;
    return `/${locale}${href.startsWith("/") ? href : `/${href}`}`;
  };

  const nameParts = header.name?.split(' ') || [];
  const logoSrc = (header as any).logo || "/uploads/logo.webp";

  return (
    <header className="relative z-[100]">
      <nav
        className="fixed top-0 left-0 right-0 py-4 transition-all duration-300"
        style={{
          background: 'rgba(13,13,13,0.92)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid rgba(255,255,255,0.08)'
        }}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <Link
            href={`/${locale}`}
            className="group flex items-center gap-2 sm:gap-4 font-display hover:text-club-red transition-colors whitespace-nowrap min-w-0 flex-shrink"
            data-tina-field={tinaField(header, 'name')}
          >
            <div className="relative w-8 h-8 sm:w-10 sm:h-10 shrink-0">
              <Image
                src={logoSrc}
                alt="Logo"
                fill
                className="object-contain"
                data-tina-field={tinaField(header, 'logo' as any)}
              />
            </div>
            <div className="flex items-center text-lg sm:text-xl tracking-[0.125rem] sm:tracking-[0.1875rem]">
              <span className="flex items-center">
                {nameParts[0]?.toUpperCase()}
                {nameParts.length > 1 && <span className="text-club-red mx-0.5 sm:mx-1">-</span>}
                {nameParts[1]?.toUpperCase()}
              </span>
              {nameParts.length > 2 && (
                <span className="text-club-red sm:ml-2"> RC</span>
              )}
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center">
            <ul className="flex gap-8 mr-8">
              {header.nav!.map((item, index) => (
                <li key={index} data-tina-field={tinaField(item)}>
                  <Link
                    href={getHref(item!.href!)}
                    className="relative font-cond font-bold text-[0.6875rem] tracking-[0.125rem] uppercase text-club-gray hover:text-white transition-colors group"
                  >
                    {item!.label}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-club-red transition-all group-hover:w-full"></span>
                  </Link>
                </li>
              ))}
            </ul>

            {header.joinButton && (
              <Link
                href={getHref(header.joinButton.link!)}
                className="btn-skew bg-club-red text-white font-cond font-bold text-[0.6875rem] tracking-[0.125rem] uppercase px-6 py-2.5 shadow-[0_0_1.25rem_rgba(var(--primary-color-rgb),0.3)] hover:shadow-[0_0_1.875rem_rgba(var(--primary-color-rgb),0.5)] transition-all hover:-translate-y-0.5"
                data-tina-field={tinaField(header.joinButton)}
              >
                {header.joinButton.label}
              </Link>
            )}

            <LanguageSwitcher />
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setMenuState(!menuState)}
              aria-label={menuState ? 'Close Menu' : 'Open Menu'}
              className="relative z-50 p-2 text-white hover:text-club-red transition-colors"
            >
              {menuState ? <X className="size-7" /> : <Menu className="size-7" />}
            </button>
          </div>
        </div>

        {/* Mobile menu content */}
        {menuState && (
          <div className="fixed inset-0 top-0 left-0 w-full h-[100dvh] bg-[#0D0D0D]/98 backdrop-blur-xl z-40 flex flex-col lg:hidden animate-slide-down overflow-y-auto">
            <div className="flex-1 flex flex-col items-center justify-center p-8 space-y-10 pt-24">
              <div className="flex flex-col items-center gap-4 mb-4">
                <div className="relative w-16 h-16">
                  <Image src={logoSrc} alt="Logo" fill className="object-contain" />
                </div>
                <span className="font-display text-2xl tracking-[0.25rem] text-white">
                  {nameParts[0]} <span className="text-club-red">-</span> {nameParts[1]}
                </span>
              </div>

              <ul className="space-y-6 text-center w-full">
                {header.nav!.map((item, index) => (
                  <li
                    key={index}
                    className="reveal animate visible"
                    style={{ animationDelay: `${index * 50}ms` }}
                    data-tina-field={tinaField(item)}
                  >
                    <Link
                      href={getHref(item!.href!)}
                      className="font-display text-4xl sm:text-5xl tracking-[0.2rem] text-white hover:text-club-red transition-all block py-2"
                      onClick={() => setMenuState(false)}
                    >
                      {item!.label}
                    </Link>
                  </li>
                ))}
                {header.joinButton && (
                  <li className="pt-4 reveal animate visible" style={{ animationDelay: `${header.nav!.length * 50}ms` }}>
                    <Link
                      href={getHref(header.joinButton.link!)}
                      className="btn-skew inline-block bg-club-red text-white font-cond font-bold text-lg tracking-[0.2rem] uppercase px-12 py-5"
                      onClick={() => setMenuState(false)}
                      data-tina-field={tinaField(header.joinButton)}
                    >
                      {header.joinButton.label}
                    </Link>
                  </li>
                )}
              </ul>

              <div className="w-12 h-0.5 bg-club-red/30"></div>

              <LanguageSwitcher mobile onSelect={() => setMenuState(false)} />
            </div>
          </div>
        )}
      </nav>
    </header>
  );
});

Header.displayName = "Header";
