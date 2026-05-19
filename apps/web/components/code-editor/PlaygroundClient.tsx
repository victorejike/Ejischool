"use client";

import { Play, RotateCcw } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { courseCatalog, courseMap } from "@/data/courseCatalog";

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
  const searchParams = useSearchParams();
  const requestedCourse = courseMap.get(searchParams.get("course") ?? "") ?? courseCatalog[0];
  const initialMode = requestedCourse.playgroundMode;
  const initialCode = initialMode === "html" ? starterForCourse(requestedCourse.slug) : javascriptForCourse(requestedCourse.label);
  const [mode, setMode] = useState<Mode>(initialMode);
  const [selectedCourse, setSelectedCourse] = useState(requestedCourse.slug);
  const [code, setCode] = useState(initialCode);
  const [preview, setPreview] = useState(initialMode === "html" ? initialCode : starter);
  const [consoleOutput, setConsoleOutput] = useState("Output will appear here.");
  const activeCourse = courseMap.get(selectedCourse) ?? courseCatalog[0];
  const activeStarter = mode === "html" ? starterForCourse(activeCourse.slug) : javascriptForCourse(activeCourse.label);
  const canReset = useMemo(() => code !== activeStarter || preview !== starter || consoleOutput !== "Output will appear here.", [activeStarter, code, consoleOutput, preview]);

  function switchMode(nextMode: Mode) {
    setMode(nextMode);
    const nextStarter = nextMode === "html" ? starterForCourse(activeCourse.slug) : javascriptForCourse(activeCourse.label);
    setCode(nextStarter);
    setPreview(nextMode === "html" ? nextStarter : starter);
    setConsoleOutput("Output will appear here.");
  }

  function switchCourse(slug: string) {
    const nextCourse = courseMap.get(slug) ?? courseCatalog[0];
    const nextMode = nextCourse.playgroundMode;
    const nextStarter = nextMode === "html" ? starterForCourse(nextCourse.slug) : javascriptForCourse(nextCourse.label);
    setSelectedCourse(nextCourse.slug);
    setMode(nextMode);
    setCode(nextStarter);
    setPreview(nextMode === "html" ? nextStarter : starter);
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
            <div className="mt-2 flex flex-wrap gap-2">
              <select
                className="focus-ring h-8 rounded-md border border-white/10 bg-black/20 px-2 text-xs font-bold text-white outline-none"
                value={selectedCourse}
                onChange={(event) => switchCourse(event.target.value)}
                aria-label="Choose playground course"
              >
                {courseCatalog.map((course) => (
                  <option key={course.slug} value={course.slug}>
                    {course.label}
                  </option>
                ))}
              </select>
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
                setPreview(mode === "html" ? activeStarter : starter);
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

function starterForCourse(slug: string) {
  const course = courseMap.get(slug);
  if (!course) {
    return starter;
  }

  if (["html", "how-to", "bootstrap"].includes(course.slug)) {
    return course.starterCode;
  }

  if (["css", "w3css", "sass"].includes(course.slug)) {
    return `<!doctype html>
<html>
  <head>
    <style>
${course.starterCode.split("\n").map((line) => `      ${line}`).join("\n")}
    </style>
  </head>
  <body>
    <section class="lesson-card">
      <h1>${course.label} Playground</h1>
      <p>Edit the styles and run the preview.</p>
    </section>
  </body>
</html>`;
  }

  return `<!doctype html>
<html>
  <body>
    <h1>${course.label} Playground</h1>
    <pre>${escapeHtml(course.starterCode)}</pre>
  </body>
</html>`;
}

function javascriptForCourse(label: string) {
  return `const course = "${label}";
const topics = ["introduction", "syntax", "patterns", "project"];

topics.forEach((topic, index) => {
  console.log(\`\${index + 1}. Practice \${course} \${topic}\`);
});`;
}

function escapeHtml(value: string) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
