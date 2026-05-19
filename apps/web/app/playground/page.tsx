import { Suspense } from "react";
import { PlaygroundClient } from "@/components/code-editor/PlaygroundClient";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("Code Playground", "Run and preview code in the EJISCHOOL interactive playground.", "/playground");

export default function PlaygroundPage() {
  return (
    <Suspense fallback={<div className="p-6 text-sm text-white/70">Loading playground...</div>}>
      <PlaygroundClient />
    </Suspense>
  );
}
