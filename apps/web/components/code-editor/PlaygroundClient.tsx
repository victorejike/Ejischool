"use client";

import { Play, RotateCcw } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { courseCatalog, courseMap, type Course } from "@/data/courseCatalog";

type PlaygroundKind = "web" | "javascript" | "sql" | "markup" | "terminal" | "simulated";

type PlaygroundProfile = {
  kind: PlaygroundKind;
  language: string;
  starter: string;
  preview: string;
};

const outputPlaceholder = "Output will appear here.";

const baseHtml = `<!doctype html>
<html>
  <head>
    <style>
      body {
        font-family: Arial, sans-serif;
        background: #ffffff;
        color: #111827;
        padding: 24px;
      }
      strong { color: #0aa36e; }
    </style>
  </head>
  <body>
    <h1>Hello EJISCHOOL</h1>
    <p>Edit the code and run it.</p>
    <strong>Build while you learn.</strong>
  </body>
</html>`;

export function PlaygroundClient() {
  const searchParams = useSearchParams();
  const requestedCourse = courseMap.get(searchParams.get("course") ?? "") ?? courseCatalog[0];
  const initialProfile = profileForCourse(requestedCourse);
  const [selectedCourse, setSelectedCourse] = useState(requestedCourse.slug);
  const [profile, setProfile] = useState(initialProfile);
  const [code, setCode] = useState(initialProfile.starter);
  const [preview, setPreview] = useState(initialProfile.preview);
  const [consoleOutput, setConsoleOutput] = useState(outputPlaceholder);
  const activeCourse = courseMap.get(selectedCourse) ?? courseCatalog[0];
  const canReset = useMemo(() => code !== profile.starter || preview !== profile.preview || consoleOutput !== outputPlaceholder, [code, consoleOutput, preview, profile.preview, profile.starter]);

  function switchCourse(slug: string) {
    const nextCourse = courseMap.get(slug) ?? courseCatalog[0];
    const nextProfile = profileForCourse(nextCourse);
    setSelectedCourse(nextCourse.slug);
    setProfile(nextProfile);
    setCode(nextProfile.starter);
    setPreview(nextProfile.preview);
    setConsoleOutput(outputPlaceholder);
  }

  function resetCode() {
    setCode(profile.starter);
    setPreview(profile.preview);
    setConsoleOutput(outputPlaceholder);
  }

  function runCode() {
    if (profile.kind === "web" || profile.kind === "markup") {
      setPreview(profile.kind === "markup" ? markupPreview(activeCourse, code) : code);
      setConsoleOutput(`${profile.language} preview updated.`);
      return;
    }

    if (profile.kind === "javascript") {
      setConsoleOutput(runJavaScript(code));
      return;
    }

    setConsoleOutput(simulateOutput(activeCourse, profile, code));
  }

  const resultTitle = profile.kind === "web" || profile.kind === "markup" ? "Preview" : "Output";

  return (
    <div className="mx-auto grid min-h-[calc(100vh-9rem)] w-full max-w-[1500px] gap-4 p-3 sm:p-4 lg:grid-cols-[minmax(0,1fr)_minmax(22rem,0.85fr)]">
      <section className="overflow-hidden rounded-md border border-white/10 bg-[#071014]">
        <div className="flex flex-col gap-3 border-b border-white/10 px-3 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-4">
          <div className="min-w-0">
            <p className="text-xs font-black uppercase tracking-widest text-brand-cyan">{profile.language} Playground</p>
            <h1 className="mt-1 truncate text-lg font-black text-white">{activeCourse.title}</h1>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <select
              className="focus-ring h-10 min-w-0 rounded-md border border-white/10 bg-black/25 px-2 text-sm font-bold text-white outline-none"
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
            <button
              className="focus-ring inline-grid h-10 w-10 place-items-center rounded-md border border-white/10 text-white/75 disabled:opacity-40"
              type="button"
              aria-label="Reset code"
              disabled={!canReset}
              onClick={resetCode}
            >
              <RotateCcw size={18} />
            </button>
            <button className="focus-ring inline-flex h-10 items-center gap-2 rounded-md bg-brand-cyan px-4 text-sm font-black text-brand-ink" type="button" onClick={runCode}>
              <Play size={17} aria-hidden />
              Run
            </button>
          </div>
        </div>
        <textarea
          className="h-[54vh] min-h-80 w-full resize-y bg-transparent p-4 font-mono text-sm leading-6 text-white outline-none lg:h-[calc(100vh-14rem)]"
          value={code}
          onChange={(event) => setCode(event.target.value)}
          spellCheck={false}
          aria-label={`${profile.language} source code`}
        />
      </section>

      <section className="overflow-hidden rounded-md border border-white/10 bg-white">
        <div className="flex min-h-12 items-center justify-between border-b border-black/10 bg-slate-100 px-4 py-3 text-sm font-black text-slate-900">
          <span>{resultTitle}</span>
          <span className="rounded bg-white px-2 py-1 text-xs text-slate-600">{profile.language}</span>
        </div>
        {profile.kind === "web" || profile.kind === "markup" ? (
          <iframe title="Playground output" srcDoc={preview} className="h-[54vh] min-h-80 w-full bg-white lg:h-[calc(100vh-14rem)]" sandbox="allow-scripts" />
        ) : (
          <pre className="h-[54vh] min-h-80 overflow-auto whitespace-pre-wrap bg-slate-950 p-4 font-mono text-sm leading-6 text-cyan-100 lg:h-[calc(100vh-14rem)]">{consoleOutput}</pre>
        )}
      </section>
    </div>
  );
}

function profileForCourse(course: Course): PlaygroundProfile {
  if (["html", "how-to", "bootstrap"].includes(course.slug)) {
    return { kind: "web", language: course.label, starter: course.starterCode, preview: course.starterCode };
  }

  if (["css", "w3css", "sass"].includes(course.slug)) {
    const starter = cssDocument(course);
    return { kind: "web", language: course.label, starter, preview: starter };
  }

  if (["javascript", "jquery", "react", "nodejs", "typescript", "angular", "vue", "ai", "genai", "dsa"].includes(course.slug)) {
    return { kind: "javascript", language: course.label, starter: javascriptForCourse(course.label), preview: baseHtml };
  }

  if (["sql", "mysql", "postgresql", "mongodb"].includes(course.slug)) {
    return { kind: "sql", language: course.label, starter: course.starterCode, preview: baseHtml };
  }

  if (course.slug === "xml") {
    return { kind: "markup", language: course.label, starter: course.starterCode, preview: markupPreview(course, course.starterCode) };
  }

  if (["git", "cybersecurity"].includes(course.slug)) {
    return { kind: "terminal", language: course.label, starter: course.starterCode, preview: baseHtml };
  }

  return { kind: "simulated", language: course.label, starter: simulatedStarter(course), preview: baseHtml };
}

function cssDocument(course: Course) {
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
      <button>Try it</button>
    </section>
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

function simulatedStarter(course: Course) {
  const label = course.label;
  if (course.slug === "go") {
    return `package main

import "fmt"

func main() {
  fmt.Println("Hello ${label}")
}`;
  }

  if (course.slug === "python") {
    return `course = "${label}"
topics = ["syntax", "practice", "project"]

for index, topic in enumerate(topics, start=1):
    print(f"{index}. Learn {course} {topic}")`;
  }

  if (course.slug === "java") {
    return `class Main {
  public static void main(String[] args) {
    System.out.println("Hello ${label}");
  }
}`;
  }

  if (course.slug === "php") {
    return `<?php
$course = "${label}";
echo "Hello " . $course;
?>`;
  }

  return course.starterCode;
}

function runJavaScript(source: string) {
  const logs: string[] = [];
  try {
    const runner = new Function("console", `"use strict";\n${source}`);
    runner({
      log: (...items: unknown[]) => logs.push(items.map((item) => String(item)).join(" ")),
      error: (...items: unknown[]) => logs.push(items.map((item) => String(item)).join(" "))
    });
    return logs.length ? logs.join("\n") : "Script ran successfully.";
  } catch (error) {
    return error instanceof Error ? error.message : "Script failed.";
  }
}

function simulateOutput(course: Course, profile: PlaygroundProfile, source: string) {
  const trimmed = source.trim();
  if (!trimmed) {
    return "Write some code, then run it again.";
  }

  if (profile.kind === "sql") {
    return `Query accepted for ${course.label}.
Result preview:
name          progress
${course.label.padEnd(13)} 100
practice     75

This browser playground validates learning examples. Connect compiler workers for production execution.`;
  }

  if (profile.kind === "terminal") {
    return trimmed
      .split("\n")
      .filter(Boolean)
      .map((line) => `$ ${line}\ncommand noted for ${course.label} practice`)
      .join("\n");
  }

  const printMatches = [
    ...trimmed.matchAll(/(?:fmt\.Println|System\.out\.println|console\.log|print|echo)\s*\(?\s*["'`]([^"'`]+)["'`]?/g)
  ].map((match) => match[1]);

  if (printMatches.length) {
    return printMatches.join("\n");
  }

  return `${course.label} example checked.
This lesson playground can run browser JavaScript directly and gives guided output for compiled/interpreted languages.`;
}

function markupPreview(course: Course, source: string) {
  return `<!doctype html>
<html>
  <body style="font-family: Arial, sans-serif; padding: 24px;">
    <h1>${course.label} Markup Preview</h1>
    <pre style="white-space: pre-wrap; background: #f1f5f9; padding: 16px; border-radius: 6px;">${escapeHtml(source)}</pre>
  </body>
</html>`;
}

function escapeHtml(value: string) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
