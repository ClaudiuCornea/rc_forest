import type { Collection } from "tinacms";
import { iconSchema } from "../fields/icon";

export const Settings: Collection = {
  label: "Global Settings",
  name: "global",
  path: "content/global",
  format: "json",
  ui: {
    global: true,
  },
  fields: [
    {
      type: "object",
      label: "Header",
      name: "header",
      fields: [
        {
          type: "image",
          label: "Logo",
          name: "logo",
        },
        {
          type: "string",
          label: "Name",
          name: "name",
        },
        {
          type: "object",
          label: "Nav Links",
          name: "nav",
          list: true,
          ui: {
            itemProps: (item) => {
              return { label: item?.label };
            },
            defaultItem: {
              href: "home",
              label: "Home",
            },
          },
          fields: [
            {
              type: "string",
              label: "Link",
              name: "href",
            },
            {
              type: "string",
              label: "Label",
              name: "label",
            },
          ],
        },
        {
          type: "object",
          label: "Join Button",
          name: "joinButton",
          fields: [
            {
              type: "string",
              label: "Label",
              name: "label",
            },
            {
              type: "string",
              label: "Link",
              name: "link",
            },
          ],
        },
      ],
    },
    {
      type: "object",
      label: "Footer",
      name: "footer",
      fields: [
        {
          type: "string",
          label: "Background Ghost Text (e.g., FOREST VORST)",
          name: "backgroundText",
        },
        {
          type: "string",
          label: "Footer Description",
          name: "description",
          ui: {
            component: "textarea"
          }
        },
        {
          type: "string",
          label: "Copyright Start Year",
          name: "copyrightStartYear",
          description: "e.g., 2007",
        },
        {
          type: "string",
          label: "Footer Text (e.g., FVRC)",
          name: "footerText",
        },
        {
          type: "object",
          label: "Social Links",
          name: "socialLinks",
          list: true,
          ui: {
            itemProps: (social) => ({ label: (social as any)?.platform }),
          },
          fields: [
            {
              type: "string",
              label: "Platform",
              name: "platform",
              options: ["Instagram", "Facebook", "Twitter", "YouTube"],
            },
            {
              type: "string",
              label: "Link",
              name: "link",
            },
          ],
        },
      ],
    },
  ],
};

export const Theme: Collection = {
  label: "Theme",
  name: "theme",
  path: "content/global",
  ui: {
    global: true,
    allowedActions: {
      create: false,
      delete: false,
    },
  },
  fields: [
    {
      type: "string",
      label: "Primary Color",
      name: "primaryColor",
      ui: {
        component: "color",
      },
    },
    {
      type: "string",
      label: "Background Color",
      name: "backgroundColor",
      ui: {
        component: "color",
      },
    },
    {
      type: "string",
      label: "Off-Black Color (Cards/Inputs)",
      name: "offBlackColor",
      ui: {
        component: "color",
      },
    },
    {
      type: "string",
      label: "Text White Color",
      name: "textWhiteColor",
      ui: {
        component: "color",
      },
    },
    {
      type: "string",
      label: "Text Gray Color",
      name: "textGrayColor",
      ui: {
        component: "color",
      },
    },
    {
      type: "string",
      label: "Success/Win Color",
      name: "successColor",
      ui: {
        component: "color",
      },
    },
    {
      type: "string",
      label: "Error/Loss Color",
      name: "errorColor",
      ui: {
        component: "color",
      },
    },
    {
      type: "string",
      name: "font",
      label: "Font Family",
      options: [
        { label: "System Sans", value: "sans" },
        { label: "Nunito", value: "nunito" },
        { label: "Lato", value: "lato" },
      ],
    },
    {
      type: "string",
      name: "darkMode",
      label: "Dark Mode",
      options: [
        { label: "System", value: "system" },
        { label: "Light", value: "light" },
        { label: "Dark", value: "dark" },
      ],
    },
  ],
};
