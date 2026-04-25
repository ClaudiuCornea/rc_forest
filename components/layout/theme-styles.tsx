import React from "react";
import { Theme } from "../../tina/__generated__/types";

// Helper to convert hex to rgb for rgba usage
const hexToRgb = (hex: string) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
    : "0, 0, 0";
};

export const ThemeStyles = ({ theme }: { theme?: Theme | null }) => {
  if (!theme) return null;

  const primaryColor = theme.primaryColor || "#CC0000";
  const backgroundColor = theme.backgroundColor || "#0D0D0D";
  const offBlackColor = theme.offBlackColor || "#1A1A1A";
  const textWhiteColor = theme.textWhiteColor || "#FFFFFF";
  const textGrayColor = theme.textGrayColor || "#999999";
  const successColor = theme.successColor || "#00CC00";
  const errorColor = theme.errorColor || "#CC0000";

  const cssVariables = `
    :root {
      --primary-color: ${primaryColor};
      --primary-color-rgb: ${hexToRgb(primaryColor)};
      --background-color: ${backgroundColor};
      --background-color-rgb: ${hexToRgb(backgroundColor)};
      --off-black-color: ${offBlackColor};
      --off-black-color-rgb: ${hexToRgb(offBlackColor)};
      --text-white-color: ${textWhiteColor};
      --text-white-color-rgb: ${hexToRgb(textWhiteColor)};
      --text-gray-color: ${textGrayColor};
      --text-gray-color-rgb: ${hexToRgb(textGrayColor)};
      --success-color: ${successColor};
      --success-color-rgb: ${hexToRgb(successColor)};
      --error-color: ${errorColor};
      --error-color-rgb: ${hexToRgb(errorColor)};
    }

    /* CRITICAL CSS: Prevent flash of unstyled content & delay of paint */
    body { 
      background-color: ${backgroundColor} !important; 
      color: ${textWhiteColor} !important;
      margin: 0;
      padding: 0;
      font-family: var(--font-barlow), ui-sans-serif, system-ui;
      -webkit-font-smoothing: antialiased;
    }
    
    /* Ensure hero background colors are available immediately */
    #contact, section { background-color: ${backgroundColor}; }
    .bg-club-black { background-color: ${backgroundColor} !important; }
  `;

  return (
    <style dangerouslySetInnerHTML={{ __html: cssVariables }} />
  );
};
