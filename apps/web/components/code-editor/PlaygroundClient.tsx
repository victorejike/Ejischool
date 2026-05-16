"use client";

import { Play, RotateCcw } from "lucide-react";
import { useMemo, useState } from "react";

type Mode = "html" | "javascript";

const starter = `<!doctype html>
<html>
  <head>
    <style>
      body {
        font-family: Arial, sans-serif;
        background: #071115;
        color: #effcff;
        padding: 24px;
      }
      strong { color: #11D7F5; }
    </style>
  </head>
  <body>
    <h1>Hello EJISCHOOL</h1>
    <p>Edit the code and run it.</p>
    <strong>Build while you learn.</strong>
  </body>
</html>`;

const javascriptStarter = `const skills = ['HTML', 'CSS', 'JavaScript'];

skills.forEach((skill, index) => {
  console.log(\`\${index + 1}. Practice \${skill}\`);
});`;

export function PlaygroundClient() {
  const [mode, setMode] = useState<Mode>("html");
  const [code, setCode] = useState(starter);
  const [preview, setPreview] = useState(starter);
  const [consoleOutput, setConsoleOutput] = useState("Output will appear here.");
  const activeStarter = mode === "html" ? starter : javascriptStarter;
  const canReset = useMemo(() => code !== activeStarter || preview !== starter || consoleOutput !== "Output will appear here.", [activeStarter, code, consoleOutput, preview]);

  function switchMode(nextMode: Mode) {
    setMode(nextMode);
    setCode(nextMode === "html" ? starter : javascriptStarter);
    setPreview(starter);
    setConsoleOutput("Output will appear here.");
  }

  function runCode() {
    if (mode === "html") {
      setPreview(code);
      setConsoleOutput("HTML preview updated.");
      return;
    }

    const logs: string[] = [];
    try {
      const runner = new Function("console", `"use strict";\n${code}`);
      runner({
        log: (...items: unknown[]) => logs.push(items.map((item) => String(item)).join(" ")),
        error: (...items: unknown[]) => logs.push(items.map((item) => String(item)).join(" "))
      });
      setConsoleOutput(logs.length ? logs.join("\n") : "Script ran successfully.");
    } catch (error) {
      setConsoleOutput(error instanceof Error ? error.message : "Script failed.");
    }
  }

  return (
    <div className="grid min-h-[calc(100vh-10rem)] gap-4 p-4 lg:grid-cols-2">
      <section className="overflow-hidden rounded-lg border border-white/10 bg-[#071014]">
        <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
          <div>
            <h1 className="text-base font-bold">Code Playground</h1>
            <div className="mt-2 flex gap-1">
              {(["html", "javascript"] as const).map((item) => (
                <button
                  key={item}
                  className={`focus-ring rounded-md px-3 py-1 text-xs font-bold ${mode === item ? "bg-brand-cyan text-brand-ink" : "border border-white/10 text-white/65"}`}
                  type="button"
                  onClick={() => switchMode(item)}
                >
                  {item === "html" ? "HTML" : "JavaScript"}
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              className="focus-ring inline-grid h-10 w-10 place-items-center rounded-md border border-white/10 text-white/75 disabled:opacity-40"
              type="button"
              aria-label="Reset code"
              disabled={!canReset}
              onClick={() => {
                setCode(activeStarter);
                setPreview(starter);
                setConsoleOutput("Output will appear here.");
              }}
            >
              <RotateCcw size={18} />
            </button>
            <button
              className="focus-ring inline-flex h-10 items-center gap-2 rounded-md bg-brand-cyan px-4 text-sm font-bold text-brand-ink"
              type="button"
              onClick={runCode}
            >
              <Play size={17} aria-hidden />
              Run
            </button>
          </div>
        </div>
        <textarea
          className="h-[calc(100%-4.25rem)] min-h-96 w-full resize-none bg-transparent p-4 font-mono text-sm leading-6 text-white outline-none"
          value={code}
          onChange={(event) => setCode(event.target.value)}
          spellCheck={false}
          aria-label="Playground source code"
        />
      </section>
      <section className="overflow-hidden rounded-lg border border-white/10 bg-white">
        <div className="border-b border-black/10 bg-slate-100 px-4 py-3 text-sm font-bold text-slate-900">{mode === "html" ? "Preview" : "Console"}</div>
        {mode === "html" ? (
          <iframe title="Playground output" srcDoc={preview} className="h-[calc(100%-3rem)] min-h-96 w-full bg-white" sandbox="allow-scripts" />
        ) : (
          <pre className="h-[calc(100%-3rem)] min-h-96 whitespace-pre-wrap bg-slate-950 p-4 font-mono text-sm leading-6 text-cyan-100">{consoleOutput}</pre>
        )}
      </section>
    </div>
  );
}
