# Portfolio

The personal portfolio of [**Aitezaz Sikandar**](https://github.com/aitezazdev). Built with Next.js 15, GSAP, and Lenis, it features scroll-driven animations, animated page transitions, smooth scrolling, and a working contact form.

**Live Site:** [aitezaz.xyz](https://aitezaz.xyz)

## Features

- Scroll-driven GSAP animations using ScrollTrigger
- Smooth scrolling powered by Lenis
- Animated page transitions using next-transition-router
- Custom cursor with interactive hover states
- Film grain overlay, marquee strips, and dynamic interactive background
- Contact form backed by Nodemailer with validation and spam checks
- Live browser voice call with a Vapi AI agent (mic-only, no phone number needed)
- Vercel Analytics and Google Analytics integration
- Fully typed with TypeScript

## Getting Started

**Prerequisites:** Node.js 18+ and npm.

```bash
git clone https://github.com/aitezazdev/Portfolio.git
cd Portfolio
npm install
```

Create a `.env.local` file in the root:

```env
GMAIL_APP_PASSWORD=your_gmail_app_password
NEXT_PUBLIC_GA_ID=your_google_analytics_id

# Vapi voice agent (browser calls)
NEXT_PUBLIC_VAPI_PUBLIC_KEY=your_vapi_public_key
NEXT_PUBLIC_VAPI_ASSISTANT_ID=your_vapi_assistant_id
VAPI_PRIVATE_KEY=your_vapi_private_key
```

The voice widget only renders once `NEXT_PUBLIC_VAPI_PUBLIC_KEY` is set. See
[Voice agent](#voice-agent) for the details.

Start the development server:

```bash
npm run dev
```

## Voice agent

Visitors can talk to the Vapi assistant straight from the browser — a floating mic
button (bottom-left) and a CTA in the contact section both open the call panel, which
shows a live transcript, a voice-reactive orb, mute, and a call timer.

| Variable | Where | Notes |
|---|---|---|
| `NEXT_PUBLIC_VAPI_PUBLIC_KEY` | Browser | Required. This is the key the web SDK authenticates with; it is meant to be public. |
| `NEXT_PUBLIC_VAPI_ASSISTANT_ID` | Browser | Optional. Falls back to the assistant ID baked into `src/lib/vapi.ts`. |
| `VAPI_PRIVATE_KEY` | Server only | Not used by browser calls. Never prefix it with `NEXT_PUBLIC_` — it can create calls and read transcripts. |

Because the public key ships to every visitor, `CALL_LIMITS` in `src/lib/vapi.ts`
caps a single call at 5 minutes and a single browser at 5 calls per day. The Vapi
SDK is code-split and only downloaded when someone actually opens the widget.

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Create production build |
| `npm run start` | Serve production build |
| `npm run lint` | Run ESLint |
| `npm run lint:fix` | Run ESLint with auto-fix |
| `npm run format` | Format code with Prettier |

## Project Structure

```
src/
├── app/                  # App Router pages, layouts, and API routes
│   ├── api/              # Backend handlers (contact form)
│   └── projects/         # Individual project pages
├── components/
│   ├── canvas/           # Canvas background components
│   ├── project/          # Project detail components
│   ├── providers/        # Lenis smooth scroll provider
│   ├── sections/         # Page sections (Banner, About, Projects, Contact)
│   ├── shared/           # Navbar, Footer, Preloader, Custom Cursor
│   └── ui/               # Animated text and button components
├── lib/                  # Metadata, navigation config, project data
└── utils/                # Utility functions
```

## Contributing

Contributions are welcome. See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## License

Licensed under the MIT License. See [LICENSE](LICENSE) for details.
