import { PlaygroundClient } from "@/components/code-editor/PlaygroundClient";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("Code Playground", "Run and preview code in the EJISCHOOL interactive playground.", "/playground");

export default function PlaygroundPage() {
  return <PlaygroundClient />;
}
