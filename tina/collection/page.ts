import type { Collection } from 'tinacms';
import { 
  heroBlockSchema, 
  aboutBlockSchema, 
  teamBlockSchema, 
  matchBlockSchema, 
  galleryBlockSchema, 
  contactBlockSchema 
} from '../schemas/blocks';

const Page: Collection = {
  label: 'Pages',
  name: 'page',
  path: 'content/pages',
  format: 'mdx',
  fields: [
    {
      type: 'object',
      name: 'seo',
      label: 'SEO',
      fields: [
        {
          type: 'string',
          name: 'title',
          label: 'Title',
        },
        {
          type: 'string',
          name: 'description',
          label: 'Description',
          ui: {
            component: 'textarea',
          },
        },
      ],
    },
    {
      type: 'object',
      list: true,
      name: 'blocks',
      label: 'Sections',
      ui: {
        visualSelector: true,
      },
      templates: [
        heroBlockSchema,
        aboutBlockSchema,
        teamBlockSchema,
        matchBlockSchema,
        galleryBlockSchema,
        contactBlockSchema,
      ],
    },
  ],
};

export default Page;
