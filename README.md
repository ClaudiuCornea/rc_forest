# Rugby Club de Forest-Vorst (FVRC) 🏉

Official website for the Rugby Club de Forest-Vorst (Rugby Club Vorst), a multicultural rugby community based in Brussels, Belgium. Built with a modern, high-performance stack and integrated with TinaCMS for seamless content management.

## 🚀 Tech Stack

- **Framework:** [Next.js 15 (App Router)](https://nextjs.org/)
- **CMS:** [TinaCMS](https://tina.io/) (Headless, Git-based)
- **Styling:** [Tailwind CSS 4](https://tailwindcss.com/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Language Support:** English (EN), French (FR), Dutch (NL)

## ✨ Key Features

- **Visual Editing:** Real-time page building and editing via the `/admin` dashboard.
- **Multilingual:** Fully localized routing and content for Brussels' diverse community.
- **Dynamic Theming:** Primary and utility colors can be adjusted directly from the CMS.
- **Block-Based Architecture:** Easily reorder or add sections like Hero, Team Squad, Match Schedules, and Galleries.
- **Performance Optimized:** Dynamic imports and image optimization for lightning-fast load times.

## 🛠️ Getting Started

### Prerequisites

- Node.js (Active LTS)
- pnpm (Recommended)

### Installation

```bash
pnpm install
```

### Local Development

Run the development server with TinaCMS:

```bash
pnpm dev
```

- **Website:** [http://localhost:3000](http://localhost:3000)
- **CMS Admin:** [http://localhost:3000/admin](http://localhost:3000/admin)

### Build for Production

```bash
pnpm build
```

## 📝 Content Management

The site uses TinaCMS to manage content. All content is stored as MDX and JSON files within the `/content` directory.

- **Pages:** `/content/pages/` (organized by locale)
- **Global Settings:** `/content/global/` (Header, Footer, and Theme)
- **Media:** Assets are managed in the `public/uploads` directory.

## 🚢 Deployment

This project is optimized for deployment on **Vercel**. Ensure the following environment variables are set:

- `NEXT_PUBLIC_TINA_CLIENT_ID`
- `TINA_TOKEN`
- `NEXT_PUBLIC_TINA_BRANCH`

---

Built for **Rugby Club de Forest-Vorst**. One club, one family. 🔴⚫
