"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const SITE_PASSWORD = "source";
const STORAGE_KEY = "source-ai-auth";

export default function PasswordGate({ children }: { children: React.ReactNode }) {
  const [authed, setAuthed] = useState(false);
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    if (sessionStorage.getItem(STORAGE_KEY) === "1") {
      setAuthed(true);
    }
    setChecking(false);
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (input === SITE_PASSWORD) {
      sessionStorage.setItem(STORAGE_KEY, "1");
      setAuthed(true);
    } else {
      setError(true);
      setInput("");
    }
  }

  if (checking) return null;

  if (authed) return <>{children}</>;

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F7F7F7]">
      <div className="w-full max-w-sm rounded-xl border border-source-border bg-white p-8 shadow-lg">
        <div className="mb-6 flex justify-center">
          <Image
            src="/source-logo.png"
            alt="The Source Logo"
            width={160}
            height={40}
            className="h-10 w-auto"
          />
        </div>
        <h2 className="text-center text-lg font-bold text-source-black">
          The Source AI Explorer
        </h2>
        <p className="mt-1 text-center text-sm text-source-muted">
          Enter password to continue
        </p>
        <form onSubmit={handleSubmit} className="mt-6">
          <input
            type="password"
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              setError(false);
            }}
            placeholder="Password"
            autoFocus
            className={`w-full rounded-lg border px-4 py-2.5 text-sm text-source-black outline-none transition-colors placeholder:text-source-muted/50 focus:border-source-green focus:ring-1 focus:ring-source-green ${
              error ? "border-red-400 ring-1 ring-red-400" : "border-source-border"
            }`}
          />
          {error && (
            <p className="mt-2 text-xs text-red-500">Incorrect password</p>
          )}
          <button
            type="submit"
            className="mt-4 w-full rounded-lg bg-source-green px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-source-green/90"
          >
            Enter
          </button>
        </form>
      </div>
    </div>
  );
}
