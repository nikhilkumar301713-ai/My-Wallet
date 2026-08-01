import { Link } from "react-router-dom";
import {
  Wallet,
  PieChart,
  Bot,
  BellRing,
  TrendingUp,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import ReceiptStack from "../components/ReceiptStack.jsx";

const FEATURES = [
  {
    icon: PieChart,
    title: "See it, not just track it",
    body: "Every rupee sorted into categories with clean charts — monthly trends, six-month history, and where your money actually goes.",
  },
  {
    icon: Bot,
    title: "An assistant that knows your numbers",
    body: "Ask it to summarize the month, point out what crept up, or suggest where to cut back — grounded in your real transactions.",
  },
  {
    icon: BellRing,
    title: "Never miss a bill",
    body: "Set up recurring bills once. MyWallet keeps a running tab on what's due and what's already paid.",
  },
  {
    icon: TrendingUp,
    title: "Budgets that hold you accountable",
    body: "Set a monthly budget and watch your balance in real time as income and expenses come in.",
  },
];

const STEPS = [
  { n: "01", title: "Create your Wallet", body: "Sign up with email or Google in a few seconds." },
  { n: "02", title: "Log as you go", body: "Add expenses and income with a category, amount, and note." },
  { n: "03", title: "Let it think for you", body: "Check your dashboard or ask the AI assistant what's going on." },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Nav */}
      <header className="flex items-center justify-between px-6 md:px-8 py-5 max-w-6xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-lg bg-primary-600 flex items-center justify-center">
            <Wallet className="text-white" size={18} />
          </div>
          <span className="text-xl font-bold text-gray-800 dark:text-gray-100">MyWallet</span>
        </div>
        <div className="flex gap-3">
          <Link
            to="/login"
            className="px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition"
          >
            Log in
          </Link>
          <Link
            to="/signup"
            className="px-4 py-2 text-sm font-medium bg-primary-600 text-white rounded-full hover:bg-primary-700 transition shadow-soft"
          >
            Get Started
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-6 py-16 md:grid-cols-2 md:py-24">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-50 dark:bg-primary-500/10 px-3 py-1 text-xs font-medium text-primary-700 dark:text-primary-300">
            <Sparkles size={12} /> Now with an AI money assistant
          </span>
          <h1 className="mt-5 text-4xl font-semibold leading-[1.1] text-gray-800 dark:text-gray-50 md:text-5xl">
            Keep your money story in one warm, honest ledger.
          </h1>
          <p className="mt-5 max-w-md text-base leading-relaxed text-gray-500 dark:text-gray-400">
            MyWallet is where your everyday spending turns into something you can actually
            read — clear charts, gentle reminders, and an assistant that tells you the truth about
            your month.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              to="/signup"
              className="flex items-center gap-2 rounded-full bg-primary-600 px-6 py-3 text-sm font-medium text-white shadow-soft transition hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-400"
            >
              Start tracking free <ArrowRight size={16} />
            </Link>
            <Link
              to="/login"
              className="rounded-full border border-gray-300 dark:border-gray-700 px-6 py-3 text-sm font-medium text-gray-700 dark:text-gray-200 transition hover:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-400"
            >
              I already have an account
            </Link>
          </div>
        </div>
        <ReceiptStack />
      </section>

      {/* Features */}
      <section className="border-y border-gray-200 dark:border-gray-800 bg-gray-100/60 dark:bg-gray-900/40 py-20">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="max-w-md text-3xl font-semibold text-gray-800 dark:text-gray-50">
            Everything a personal ledger should do — nothing it shouldn't.
          </h2>
          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2">
            {FEATURES.map(({ icon: Icon, title, body }) => (
              <div
                key={title}
                className="rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-6 shadow-soft"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-600 text-white">
                  <Icon size={18} />
                </span>
                <h3 className="mt-4 text-lg font-semibold text-gray-800 dark:text-gray-100">
                  {title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-500 dark:text-gray-400">
                  {body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-50">
          Three steps in.
        </h2>
        <div className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-3">
          {STEPS.map((s, i) => (
            <div key={s.n} className="relative">
              <p className="text-5xl font-semibold text-primary-200 dark:text-primary-900">
                {s.n}
              </p>
              <h3 className="mt-3 text-lg font-semibold text-gray-800 dark:text-gray-100">
                {s.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-500 dark:text-gray-400">
                {s.body}
              </p>
              {i < STEPS.length - 1 && (
                <div className="absolute -right-5 top-6 hidden h-px w-10 bg-gray-300 dark:bg-gray-700 md:block" />
              )}
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary-800 dark:bg-primary-900 py-16">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-6 md:flex-row md:items-center">
          <h2 className="max-w-md text-2xl font-semibold text-white md:text-3xl">
            Your next expense is thirty seconds from being organized.
          </h2>
          <Link
            to="/signup"
            className="flex shrink-0 items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-primary-800 shadow-soft transition hover:bg-primary-50 focus:outline-none focus:ring-2 focus:ring-white"
          >
            Create your Wallet <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      <footer className="py-8 text-center text-xs text-gray-400 dark:text-gray-600">
        MyWallet — built for people who'd rather glance than dig.
      </footer>
    </div>
  );
}