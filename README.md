# The Source AI Explorer

An AI-native vision demo for construction procurement at [The Source](https://www.thesource.ai). Built to demonstrate how AI can transform every step of procurement — from spec extraction and vendor matching to bid review and multi-agent orchestration.

## Screens

| Screen | Description |
|--------|-------------|
| **Home** | Dashboard with animated stats ($6.5B procured, 1225+ projects, 97% on-time) and navigation cards |
| **AI Landscape** | Industry trends, protocol stack, and framework analysis for AI in construction |
| **AI Problems** | Three systemic problems teams face when adopting AI at scale |
| **Agent Strategy** | Intelligence vs judgment, agent orchestration, what-is-an-agent explainer, and roadmap |
| **Interactive Demos** | Live AI-powered demos — spec extraction, vendor matching, procurement chat |
| **Bid Review** | AI-powered bid comparison and analysis deep dive |
| **Architecture** | Proposed AWS-focused tech stack with Claude Opus 4.6+ and Aurora pgvector |
| **Evals** | Testing pyramid, grader types, live eval examples, framework comparison, reliability metrics |
| **AI Coding** | Production-grade AI coding agents adapted from Stripe's Minions architecture |
| **About** | About the engineer behind the demo |

## Tech Stack

- **Framework:** [Next.js 14](https://nextjs.org) (App Router)
- **AI Integration:** [CopilotKit](https://copilotkit.ai) + OpenAI GPT-4o
- **UI:** React 18, Tailwind CSS, [Framer Motion](https://www.framer.com/motion/) animations
- **Charts:** [Recharts](https://recharts.org)
- **Diagrams:** [React Flow](https://reactflow.dev)
- **Icons:** [Lucide React](https://lucide.dev)
- **Language:** TypeScript

## Getting Started

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Add your OPENAI_API_KEY to .env.local

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Project Structure

```
src/
├── app/
│   ├── about/          # About page
│   ├── ai-coding/      # AI Coding at Scale (Stripe case study)
│   ├── api/copilotkit/ # CopilotKit runtime API route
│   ├── architecture/   # Architecture diagrams & proposed tech stack
│   ├── bid-review/     # Bid review demo
│   ├── demos/          # Interactive AI demos
│   ├── evals/          # AI agent evaluation guide
│   ├── landscape/      # AI landscape analysis
│   ├── problems/       # Three problems with AI at scale
│   ├── strategy/       # Agent strategy & roadmap
│   ├── layout.tsx      # Root layout with CopilotKit + Sidebar + PasswordGate
│   └── page.tsx        # Home dashboard
├── components/
│   ├── AnimatedCounter  # Animated stat counters
│   ├── InsightCard      # Reusable insight display card
│   ├── PasswordGate     # Site-wide password protection
│   ├── SectionHeader    # Page section headers
│   ├── Sidebar          # App navigation sidebar
│   └── StatCard         # Stat display card
docs/
├── speaker-notes.md                  # Walkthrough notes for presenting the demo
├── ai-native-procurement-research.md # Market research & strategic positioning
├── arch-research.md                  # Technical architecture research
├── evaluting-ai.md                   # AI agent evaluation deep dive
├── stripe-case-study.md              # Stripe Minions case study analysis
└── thesource-interview-notes.md      # Interview dossier
```

## Author

**Ahmed Khan** — Senior AI Engineer

- [LinkedIn](https://www.linkedin.com/in/ahmedkhan25/)
- [Personal Site](https://www.ahmedkhan-ai.com)
- [Email](mailto:ahmedkhan25@gmail.com)

## License

Private — built as a demonstration for The Source.
