import { defineConfig } from "tinacms";
import nextConfig from '../next.config'

import { Settings, Theme } from "./collection/global";
import Page from "./collection/page";

const config = defineConfig({
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID!,
  branch:
    process.env.NEXT_PUBLIC_TINA_BRANCH! || // custom branch env override
    process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF! || // Vercel branch env
    process.env.HEAD!, // Netlify branch env
  token: process.env.TINA_TOKEN!,
  media: {
    // If you wanted cloudinary do this
    // loadCustomStore: async () => {
    //   const pack = await import("next-tinacms-cloudinary");
    //   return pack.TinaCloudCloudinaryMediaStore;
    // },
    // this is the config for the tina cloud media store
    tina: {
      publicFolder: "public",
      mediaRoot: "uploads",
    },
  },
  build: {
    publicFolder: "public", // The public asset folder for your framework
    outputFolder: "admin", // within the public folder
    basePath: nextConfig.basePath?.replace(/^\//, '') || '', // The base path of the app (could be /blog)
  },
  schema: {
    collections: [
      {
        ...Page,
        path: "content/pages",
        ui: {
          ...Page.ui,
          router: ({ document }) => {
            const locale = document._sys.breadcrumbs[0];
            const filepath = document._sys.breadcrumbs.slice(1).join('/');
            if (filepath === 'home') {
              return `/${locale}`;
            }
            return `/${locale}/${filepath}`;
          },
        },
      },
      {
        ...Settings,
        path: "content/global",
      },
      {
        ...Theme,
        path: "content/global",
        ui: {
          ...Theme.ui,
          router: () => `/`,
        },
      },
    ],
  },
});

export default config;
