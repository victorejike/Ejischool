"use client";

import { Bot, Send } from "lucide-react";
import { useState } from "react";

export function AITutorPanel() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("Ask a focused question about the lesson and the tutor will guide you with hints first.");

  return (
    <section className="rounded-lg border border-white/10 bg-white/[0.045] p-5">
      <div className="flex items-center gap-3">
        <div className="grid h-10 w-10 place-items-center rounded-md bg-brand-cyan/10 text-brand-cyan">
          <Bot size={20} />
        </div>
        <div>
          <h2 className="font-bold">AI Tutor</h2>
          <p className="text-sm text-white/58">Hints, examples, debugging steps, and study prompts.</p>
        </div>
      </div>
      <p className="mt-4 rounded-md bg-black/20 p-3 text-sm leading-6 text-white/72">{answer}</p>
      <form
        className="mt-4 flex gap-2"
        onSubmit={(event) => {
          event.preventDefault();
          setAnswer(question ? `Hint: break "${question}" into one concept, one example, and one practice task.` : answer);
          setQuestion("");
        }}
      >
        <input
          className="focus-ring min-w-0 flex-1 rounded-md border border-white/10 bg-black/20 px-3 py-2 text-sm text-white"
          value={question}
          onChange={(event) => setQuestion(event.target.value)}
          placeholder="Ask about this lesson"
        />
        <button className="focus-ring inline-grid h-10 w-10 place-items-center rounded-md bg-brand-cyan text-brand-ink" type="submit" aria-label="Send question">
          <Send size={18} />
        </button>
      </form>
    </section>
  );
}
