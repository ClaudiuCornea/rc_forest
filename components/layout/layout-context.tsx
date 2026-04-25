"use client";
import React, { useState, useContext } from "react";
import { GlobalQuery } from "../../tina/__generated__/types";

// ✅ Fixed: single source of truth for default theme values.
// Update this object if theme.json defaults change — don't duplicate them.
export const DEFAULT_THEME = {
  primaryColor: "#CC0000",
  backgroundColor: "#0D0D0D",
  offBlackColor: "#1A1A1A",
  textWhiteColor: "#F5F5F5",
  textGrayColor: "#888888",
  successColor: "#15803D",
  errorColor: "#DC2626",
  darkMode: "dark",
} as const;

interface LayoutState {
  globalSettings: GlobalQuery["global"];
  setGlobalSettings: React.Dispatch<React.SetStateAction<GlobalQuery["global"]>>;
  theme: typeof DEFAULT_THEME;
  locale: string;
}

const LayoutContext = React.createContext<LayoutState | undefined>(undefined);

export const useLayout = () => {
  const context = useContext(LayoutContext);
  return (
    context || {
      theme: DEFAULT_THEME,
      globalSettings: undefined,
      setGlobalSettings: () => {},
      locale: "en",
    }
  );
};

interface LayoutProviderProps {
  children: React.ReactNode;
  globalSettings: GlobalQuery["global"];
  locale: string;
}

export const LayoutProvider: React.FC<LayoutProviderProps> = ({
  children,
  globalSettings: initialGlobalSettings,
  locale,
}) => {
  const [globalSettings, setGlobalSettings] = useState<GlobalQuery["global"]>(
    initialGlobalSettings
  );

  const theme = { ...DEFAULT_THEME, ...((globalSettings as any).theme || {}) };

  return (
    <LayoutContext.Provider
      value={{
        globalSettings,
        setGlobalSettings,
        theme,
        locale,
      }}
    >
      {children}
    </LayoutContext.Provider>
  );
};
