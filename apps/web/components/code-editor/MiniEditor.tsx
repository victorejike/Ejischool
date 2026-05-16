"use client";

import { Play } from "lucide-react";
import { useMemo, useState } from "react";

type MiniEditorProps = {
  code: string;
  language: string;
};

export function MiniEditor({ code, language }: MiniEditorProps) {
  const [value, setValue] = useState(code);
  const output = useMemo(() => {
    if (language.includes("javascript")) {
      return "Ready to run in the playground.";
    }
    if (language.includes("html")) {
      return "Preview this HTML in the playground.";
    }
    return "Code sample loaded.";
  }, [language]);

  return (
    <div className="mt-5 overflow-hidden rounded-lg border border-white/10 bg-[#071014]">
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
        <span className="text-xs font-bold uppercase tracking-widest text-brand-cyan">{language}</span>
        <button className="focus-ring inline-flex items-center gap-2 rounded-md border border-brand-cyan/35 px-3 py-2 text-xs font-bold text-brand-cyan" type="button">
          <Play size={14} aria-hidden />
          Run
        </button>
      </div>
      <textarea
        className="min-h-44 w-full resize-y bg-transparent p-4 font-mono text-sm leading-6 text-white outline-none"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        spellCheck={false}
        aria-label="Editable code sample"
      />
      <div className="border-t border-white/10 bg-white/[0.035] px-4 py-3 text-sm text-white/65">{output}</div>
    </div>
  );
}
