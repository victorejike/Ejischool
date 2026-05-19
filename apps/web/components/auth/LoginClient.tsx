"use client";

import { Github, Mail } from "lucide-react";
import { useState } from "react";
import { apiRequest } from "@/lib/api";

type Session = {
  userId: string;
  email: string;
  accessToken: string;
  expiresAt: string;
};

export function LoginClient() {
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("learner");
  const [status, setStatus] = useState("Ready to connect to the database-backed account system.");
  const [busy, setBusy] = useState(false);

  async function submit() {
    setBusy(true);
    setStatus("Connecting...");
    try {
      const session = await apiRequest<Session>(mode === "signup" ? "/v1/auth/signup" : "/v1/auth/login", {
        method: "POST",
        body: JSON.stringify(mode === "signup" ? { name, email, password, role } : { email, password })
      });
      window.localStorage.setItem("ejischool-session", JSON.stringify(session));
      setStatus(`Signed in as ${session.email}. Session saved on this device.`);
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Authentication failed.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="rounded-lg border border-white/10 bg-white/[0.055] p-6 shadow-glow">
      <div className="flex rounded-md border border-white/10 bg-black/10 p-1">
        {(["signin", "signup"] as const).map((item) => (
          <button
            key={item}
            className={`focus-ring min-h-10 flex-1 rounded px-3 text-sm font-black ${mode === item ? "bg-brand-cyan text-brand-ink" : "text-white/70"}`}
            type="button"
            onClick={() => setMode(item)}
          >
            {item === "signin" ? "Sign In" : "Sign Up"}
          </button>
        ))}
      </div>
      <form className="mt-6 grid gap-4" onSubmit={(event) => event.preventDefault()}>
        {mode === "signup" ? (
          <label className="grid gap-2 text-sm font-semibold text-white/80">
            Name
            <input className="focus-ring rounded-md border border-white/10 bg-black/20 px-3 py-3 text-white" value={name} onChange={(event) => setName(event.target.value)} placeholder="Your name" />
          </label>
        ) : null}
        <label className="grid gap-2 text-sm font-semibold text-white/80">
          Email
          <input className="focus-ring rounded-md border border-white/10 bg-black/20 px-3 py-3 text-white" type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" />
        </label>
        <label className="grid gap-2 text-sm font-semibold text-white/80">
          Password
          <input className="focus-ring rounded-md border border-white/10 bg-black/20 px-3 py-3 text-white" type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="At least 6 characters" />
        </label>
        {mode === "signup" ? (
          <label className="grid gap-2 text-sm font-semibold text-white/80">
            Role
            <select className="focus-ring rounded-md border border-white/10 bg-black/20 px-3 py-3 text-white" value={role} onChange={(event) => setRole(event.target.value)}>
              <option value="learner">Learner</option>
              <option value="admin">Admin</option>
            </select>
          </label>
        ) : null}
        <button className="focus-ring rounded-md bg-brand-cyan px-4 py-3 text-sm font-black text-brand-ink disabled:opacity-60" type="button" disabled={busy} onClick={submit}>
          {busy ? "Working..." : mode === "signin" ? "Sign In" : "Create Account"}
        </button>
      </form>
      <p className="mt-4 rounded-md border border-white/10 bg-black/15 p-3 text-sm leading-6 text-white/70">{status}</p>
      <div className="mt-5 grid gap-3">
        <button className="focus-ring inline-flex items-center justify-center gap-2 rounded-md border border-white/10 px-4 py-3 text-sm font-bold" type="button" onClick={() => setStatus("GitHub OAuth button is ready for provider keys.")}>
          <Github size={18} aria-hidden />
          Continue with GitHub
        </button>
        <button className="focus-ring inline-flex items-center justify-center gap-2 rounded-md border border-white/10 px-4 py-3 text-sm font-bold" type="button" onClick={() => setStatus("Magic link flow is ready for email provider credentials.")}>
          <Mail size={18} aria-hidden />
          Send Magic Link
        </button>
      </div>
    </section>
  );
}
