"use client";

import { Bot, Send, Sparkles } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { apiRequest } from "@/lib/api";

type AITutorPanelProps = {
  courseSlug?: string;
  courseTitle?: string;
  currentTopic?: string;
  topics?: string[];
  compact?: boolean;
};

type TutorResponse = {
  answer: string;
  nextAction?: string;
};

type ProgressDetail = {
  courseSlug: string;
  seconds: number;
  completedIds: string[];
  activeTopic?: string;
};

function formatTime(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  if (minutes < 1) {
    return `${seconds}s`;
  }
  return `${minutes}m ${seconds.toString().padStart(2, "0")}s`;
}

function localTutorAnswer(question: string, courseTitle: string, topic: string, progressText: string) {
  const normalized = question.toLowerCase();
  const focus = topic || courseTitle || "this lesson";

  if (normalized.includes("stuck") || normalized.includes("confus") || normalized.includes("error")) {
    return `You look stuck around ${focus}. Start by writing what the code or idea should do in one sentence, then compare each line with that sentence. ${progressText} Try changing only one thing, run it, and tell me the exact result.`;
  }

  if (normalized.includes("example") || normalized.includes("sample")) {
    return `For ${focus}, make a tiny example first: one input, one action, and one visible result. After it works, add a second case. ${progressText}`;
  }

  if (normalized.includes("explain") || normalized.includes("what is") || normalized.includes("why")) {
    return `${focus} is easier when you separate the idea from the syntax. First name the concept, then identify the symbols or keywords that express it. ${progressText} Ask me for a simpler example if any word still feels cloudy.`;
  }

  return `Good question. For ${focus}, break it into three steps: define the goal, inspect the example, then create a small variation yourself. ${progressText} Your next useful move is to write one line or answer one part, then check it before continuing.`;
}

export function AITutorPanel({ courseSlug, courseTitle = "this course", currentTopic = "", topics = [], compact = false }: AITutorPanelProps) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("Ask a focused question about the lesson. I will use your current topic and progress to guide you with hints first.");
  const [nextAction, setNextAction] = useState("Keep reading until a topic feels unclear, then ask from that exact spot.");
  const [progress, setProgress] = useState({ seconds: 0, completedIds: [] as string[] });
  const [activeTopic, setActiveTopic] = useState(currentTopic);
  const [isThinking, setIsThinking] = useState(false);

  useEffect(() => {
    setActiveTopic(currentTopic);
  }, [currentTopic]);

  useEffect(() => {
    function handleProgress(event: Event) {
      const detail = (event as CustomEvent<ProgressDetail>).detail;
      if (!detail || (courseSlug && detail.courseSlug !== courseSlug)) {
        return;
      }
      setProgress({ seconds: detail.seconds, completedIds: detail.completedIds });
      if (detail.activeTopic) {
        setActiveTopic(detail.activeTopic);
      }
    }

    window.addEventListener("ejischool-progress", handleProgress);
    return () => window.removeEventListener("ejischool-progress", handleProgress);
  }, [courseSlug]);

  const progressText = useMemo(() => {
    if (!courseSlug) {
      return "I am ready to help with hints, examples, and debugging steps.";
    }

    const topicCount = topics.length;
    const completed = progress.completedIds.length;
    return `I can see you have spent ${formatTime(progress.seconds)} here and reached ${completed}/${topicCount} topics.`;
  }, [courseSlug, progress.completedIds.length, progress.seconds, topics.length]);

  return (
    <section className={`rounded-md border border-white/10 bg-white/[0.045] ${compact ? "p-3" : "p-5"}`}>
      <div className="flex items-center gap-3">
        <div className={`${compact ? "h-8 w-8" : "h-10 w-10"} grid shrink-0 place-items-center rounded-md bg-brand-cyan/10 text-brand-cyan`}>
          <Bot size={compact ? 17 : 20} />
        </div>
        <div className="min-w-0">
          <h2 className="font-bold">AI Tutor</h2>
          <p className={`${compact ? "truncate text-xs" : "text-sm"} text-white/58`}>{activeTopic ? `Watching: ${activeTopic}` : "Hints, examples, debugging steps, and study prompts."}</p>
        </div>
      </div>
      <p className={`${compact ? "mt-3 p-2 text-xs leading-5" : "mt-4 p-3 text-sm leading-6"} inline-flex items-start gap-2 rounded-md border border-brand-cyan/25 bg-brand-cyan/10 text-white/72`}>
        <Sparkles className="mt-0.5 shrink-0 text-brand-cyan" size={compact ? 14 : 16} aria-hidden />
        <span>{progressText}</span>
      </p>
      <p className={`${compact ? "mt-3 max-h-32 overflow-y-auto p-2 text-xs leading-5" : "mt-4 p-3 text-sm leading-6"} rounded-md bg-black/20 text-white/72`}>{answer}</p>
      <p className={`${compact ? "mt-2 text-xs leading-5" : "mt-3 text-sm leading-6"} text-white/62`}>
        <span className="font-bold text-brand-cyan">Next:</span> {nextAction}
      </p>
      <form
        className={`${compact ? "mt-3" : "mt-4"} flex gap-2`}
        onSubmit={async (event) => {
          event.preventDefault();
          const trimmedQuestion = question.trim();
          if (!trimmedQuestion) {
            return;
          }
          setIsThinking(true);
          setQuestion("");
          try {
            if (!courseSlug) {
              throw new Error("No course context");
            }
            const response = await apiRequest<TutorResponse>("/v1/ai/tutor", {
              method: "POST",
              body: JSON.stringify({
                courseSlug,
                courseTitle,
                currentTopic: activeTopic,
                question: trimmedQuestion,
                secondsSpent: progress.seconds,
                completedTopics: progress.completedIds.length,
                totalTopics: topics.length
              })
            });
            setAnswer(response.answer);
            setNextAction(response.nextAction ?? "Try the hint, then ask again with what happened.");
          } catch {
            setAnswer(localTutorAnswer(trimmedQuestion, courseTitle, activeTopic, progressText));
            setNextAction("Try one small change or one short answer, then ask me to check your reasoning.");
          } finally {
            setIsThinking(false);
          }
        }}
      >
        <input
          className="focus-ring min-w-0 flex-1 rounded-md border border-white/10 bg-black/20 px-3 py-2 text-sm text-white"
          value={question}
          onChange={(event) => setQuestion(event.target.value)}
          placeholder="Ask about this lesson"
        />
        <button className={`${compact ? "h-9 w-9" : "h-10 w-10"} focus-ring inline-grid shrink-0 place-items-center rounded-md bg-brand-cyan text-brand-ink disabled:cursor-not-allowed disabled:opacity-60`} type="submit" aria-label="Send question" disabled={isThinking}>
          <Send size={compact ? 16 : 18} />
        </button>
      </form>
    </section>
  );
}
