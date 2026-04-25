import { Template } from "tinacms";
import { iconSchema } from "../fields/icon";
import { CroppableImageField } from "../fields/croppable-image";

export const heroBlockSchema: Template = {
  name: "hero",
  label: "Hero",
  ui: {
    previewSrc: "/blocks/hero.webp",
    defaultItem: {
      year: "2007",
      subTagline: "Est. 2007 — Brussels, Belgium",
      headline: "FOREST VORST RUGBY",
      tagline: "One club, one family. Rooted in Forest-Vorst, forged on the pitch. Where passion meets the scrum.",
      logoImage: "/uploads/logo.webp",
      actions: [
        {
          label: "Join the Club",
          type: "button",
          link: "#contact",
        },
        {
          label: "Our Story",
          type: "link",
          link: "#about",
        },
      ],
    },
  },
  fields: [
    {
      type: "string",
      label: "Year (e.g., 2007)",
      name: "year",
    },
    {
      type: "string",
      label: "Sub Tagline (e.g., Est. 2007 — Brussels, Belgium)",
      name: "subTagline",
    },
    {
      type: "string",
      label: "Headline",
      name: "headline",
    },
    {
      type: "string",
      label: "Tagline",
      name: "tagline",
    },
    {
      name: "logoImage",
      label: "Main Logo Image",
      type: "image",
      description: "The primary logo or emblem displayed in the hero section. Recommended size: 360x360px.",
    },
    {
      name: "logoImageAlt",
      label: "Logo Image Alt Text",
      type: "string",
    },
    {
      label: "Actions",
      name: "actions",
      type: "object",
      list: true,
      ui: {
        defaultItem: {
          label: "Action Label",
          type: "button",
          link: "/",
        },
        itemProps: (item) => ({ label: item.label }),
      },
      fields: [
        {
          label: "Label",
          name: "label",
          type: "string",
        },
        {
          label: "Type",
          name: "type",
          type: "string",
          options: [
            { label: "Button", value: "button" },
            { label: "Link", value: "link" },
          ],
        },
        {
          label: "Link",
          name: "link",
          type: "string",
        },
      ],
    },
  ],
};

export const aboutBlockSchema: Template = {
  name: "about",
  label: "About",
  ui: {
    previewSrc: "/blocks/content.png",
    defaultItem: {
      backgroundText: "FVRC",
      sectionNumber: "01",
      sectionLabel: "Who We Are",
      headline: "About the Club",
      tagline: "Founded in 2007, the Forest-Vorst Rugby Club was born from a simple idea: bring together the diverse, multicultural community of Forest and Vorst around the love of rugby.",
      valuesList: [
        {
          icon: { name: "Bolt", color: "club-red", style: "regular" },
          title: "Competitive Spirit",
          paragraph: "We play to win, every single match.",
        },
        {
          icon: { name: "Users", color: "club-red", style: "regular" },
          title: "Brotherhood",
          paragraph: "Rugby forges bonds that last a lifetime.",
        },
        {
          icon: { name: "Globe", color: "club-red", style: "regular" },
          title: "Inclusivity",
          paragraph: "Open to all, regardless of origin or level.",
        },
        {
          icon: { name: "Heart", color: "club-red", style: "regular" },
          title: "Passion for Rugby",
          paragraph: "The sport is in our DNA since day one.",
        },
      ],
    },
  },
  fields: [
    {
      type: "string",
      label: "Background Text (e.g., FVRC)",
      name: "backgroundText",
    },
    {
      type: "string",
      label: "Section Number (e.g., 01)",
      name: "sectionNumber",
    },
    {
      type: "string",
      label: "Section Label (e.g., Who We Are)",
      name: "sectionLabel",
    },
    {
      type: "string",
      label: "Headline",
      name: "headline",
    },
    {
      type: "string",
      label: "Tagline (Main Description)",
      name: "tagline",
      ui: {
        component: "textarea",
      },
    },
    {
      type: "object",
      label: "Values List",
      name: "valuesList",
      list: true,
      ui: {
        itemProps: (item) => ({ label: item?.title }),
      },
      fields: [
        {
          type: "string",
          label: "Title",
          name: "title",
        },
        {
          type: "string",
          label: "Paragraph",
          name: "paragraph",
          ui: {
            component: "textarea",
          },
        },
        iconSchema as any,
      ],
    },
  ],
};

export const teamBlockSchema: Template = {
  name: "team",
  label: "Team",
  ui: {
    previewSrc: "/blocks/content.png",
    defaultItem: {
      sectionNumber: "02",
      sectionLabel: "The Squad",
      title: "Team & Players",
      players: [
        {
          name: "Thomas Marchal",
          role: "Captain · Flanker",
          jerseyNumber: "7",
          height: "188 cm",
          weight: "98 kg",
          age: 27,
          image: "https://placehold.co/300x300/1a1a1a/CC0000?text=TM",
        },
      ],
    },
  },
  fields: [
    {
      type: "string",
      label: "Background Text (e.g., SQUAD)",
      name: "backgroundText",
    },
    {
      type: "string",
      label: "Section Number (e.g., 02)",
      name: "sectionNumber",
    },
    {
      type: "string",
      label: "Section Label (e.g., The Squad)",
      name: "sectionLabel",
    },
    {
      type: "string",
      label: "Title",
      name: "title",
    },
    {
      type: "object",
      label: "Players",
      name: "players",
      list: true,
      ui: {
        itemProps: (item) => ({ label: item.name }),
      },
      fields: [
        {
          type: "image",
          label: "Image",
          name: "image",
          ui: {
            component: CroppableImageField as any,
            // @ts-ignore
            uploadDir: 'uploads/team'
          },
        },
        {
          type: "string",
          label: "Image Alt Text",
          name: "imageAlt",
        },
        {
          type: "string",
          label: "Name",
          name: "name",
        },
        {
          type: "string",
          label: "Role / Position",
          name: "role",
          options: [
            { label: "Prop", value: "Prop" },
            { label: "Hooker", value: "Hooker" },
            { label: "Lock", value: "Lock" },
            { label: "Flanker", value: "Flanker" },
            { label: "Number 8", value: "Number 8" },
            { label: "Scrum-half", value: "Scrum-half" },
            { label: "Fly-half", value: "Fly-half" },
            { label: "Centre", value: "Centre" },
            { label: "Wing", value: "Wing" },
            { label: "Full-back", value: "Full-back" },
            { label: "Coach", value: "Coach" },
          ],
        },
        {
          type: "number",
          label: "Age",
          name: "age",
        },
        {
          type: "string",
          label: "Height",
          name: "height",
        },
        {
          type: "string",
          label: "Weight",
          name: "weight",
        },
      ],
    },
  ],
};

export const matchBlockSchema: Template = {
  name: "match",
  label: "Match",
  ui: {
    previewSrc: "/blocks/content.png",
    defaultItem: {
      backgroundText: "MATCHES",
      sectionNumber: "03",
      sectionLabel: "Upcoming & Recent",
      title: "Match Schedule",
      matches: [
        {
          opponent: "Forest-Vorst RC",
          vsOpponent: "RFC Waterloo",
          date: "22 Feb 2025",
          time: "15:00",
          opponentLocation: "Terrain du Bempt, Forest",
          status: "TBD",
          isHomeGame: true,
        },
      ],
    },
  },
  fields: [
    {
      type: "string",
      label: "Background Text (e.g., MATCHES)",
      name: "backgroundText",
    },
    {
      type: "string",
      label: "Section Number (e.g., 03)",
      name: "sectionNumber",
    },
    {
      type: "string",
      label: "Section Label (e.g., Upcoming & Recent)",
      name: "sectionLabel",
    },
    {
      type: "string",
      label: "Title",
      name: "title",
    },
    {
      type: "object",
      label: "Matches",
      name: "matches",
      list: true,
      ui: {
        itemProps: (item) => ({ label: `${item.opponent} vs ${item.vsOpponent}` }),
      },
      fields: [
        { type: "string", label: "Opponent", name: "opponent" },
        { type: "string", label: "vs Opponent", name: "vsOpponent" },
        { type: "datetime", label: "Date & Time", name: "date" },
        { type: "string", label: "Location", name: "opponentLocation" },
        {
          type: "string",
          label: "Status/Result (e.g., W, L, TBD)",
          name: "status",
          options: ["W", "L", "TBD", "Postponed"],
        },
        { type: "string", label: "Result Score (optional)", name: "resultScore" },
        { type: "boolean", label: "Home Game?", name: "isHomeGame" },
      ],
    },
  ],
};

export const galleryBlockSchema: Template = {
  name: "gallery",
  label: "Gallery",
  ui: {
    previewSrc: "/blocks/content.png",
    defaultItem: {
      backgroundText: "GALLERY",
      sectionNumber: "04",
      sectionLabel: "Photos",
      title: "Gallery",
    },
  },
  fields: [
    { type: "string", label: "Background Text", name: "backgroundText" },
    { type: "string", label: "Section Number", name: "sectionNumber" },
    { type: "string", label: "Section Label", name: "sectionLabel" },
    { type: "string", label: "Title", name: "title" },
    {
      type: "object",
      label: "Albums",
      name: "albums",
      list: true,
      ui: { itemProps: (item) => ({ label: item.name }) },
      fields: [
        { type: "string", label: "Album Name", name: "name" },
        {
          type: "object",
          label: "Images",
          name: "images",
          list: true,
          ui: { itemProps: (item) => ({ label: item.alt || "Image" }) },
          fields: [
            { type: "image", label: "Image Source", name: "src" },
            { type: "string", label: "Alt Text", name: "alt" },
          ],
        },
      ],
    },
  ],
};

export const contactBlockSchema: Template = {
  name: "contact",
  label: "Contact Section",
  ui: {
    previewSrc: "/blocks/content.png",
    defaultItem: {
      backgroundText: "JOIN US",
      sectionNumber: "05",
      sectionLabel: "Get Involved",
      title: "Contact & Join Us",
      mainHeadline: 'READY TO<br><span class="text-outline-dim">PLAY</span><br>WITH US?',
      mainParagraph: "Whether you're a seasoned rugby player or have never touched a ball — we welcome everyone.",
    },
  },
  fields: [
    { type: "string", label: "Background Text", name: "backgroundText" },
    { type: "string", label: "Section Number", name: "sectionNumber" },
    { type: "string", label: "Section Label", name: "sectionLabel" },
    { type: "string", label: "Title", name: "title" },
    { type: "string", label: "Main Headline", name: "mainHeadline", ui: { component: "textarea" } },
    { type: "string", label: "Main Paragraph", name: "mainParagraph", ui: { component: "textarea" } },
    {
      type: "object",
      label: "Contact Information",
      name: "contact_info",
      list: true,
      ui: { itemProps: (item) => ({ label: item?.title }) },
      fields: [
        {
          type: "object",
          label: "Icon",
          name: "icon",
          fields: [
            { type: "string", label: "Icon Name", name: "name" },
            { type: "string", label: "SVG Path", name: "svgPath", ui: { component: "textarea" } },
            { type: "string", label: "Color", name: "color" },
            {
              name: "style",
              label: "Style",
              type: "string",
              options: [
                { label: "Circle", value: "circle" },
                { label: "Float", value: "float" },
                { label: "Regular", value: "regular" },
              ],
            },
          ],
        },
        { type: "string", label: "Title", name: "title" },
        { type: "string", label: "Details", name: "details", ui: { component: "textarea" } },
      ],
    },
    {
      type: "object",
      label: "Contact Form",
      name: "form",
      fields: [
        { type: "string", label: "Form Title", name: "title" },
        { type: "string", label: "First Name Label", name: "firstNameLabel" },
        { type: "string", label: "Last Name Label", name: "lastNameLabel" },
        { type: "string", label: "Email Label", name: "emailLabel" },
        { type: "string", label: "Rugby Experience Label", name: "rugbyExperienceLabel" },
        { type: "string", label: "Message Label", name: "messageLabel", ui: { component: "textarea" } },
        { type: "string", label: "Button Text", name: "buttonText" },
      ],
    },
    { type: "string", label: "Map Iframe Source", name: "mapIframeSrc", ui: { component: "textarea" } },
  ],
};
