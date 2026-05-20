import { notFound } from "next/navigation";
import { RightRail } from "@/components/tutorial/RightRail";
import { TutorialContent } from "@/components/tutorial/TutorialContent";
import { TutorialSidebar } from "@/components/tutorial/TutorialSidebar";
import { tutorialMap, tutorials } from "@/data/tutorials";
import { pageMetadata } from "@/lib/seo";

type TutorialPageProps = {
  params: {
    slug: string;
  };
};

export function generateStaticParams() {
  return tutorials.map((tutorial) => ({ slug: tutorial.slug }));
}

export function generateMetadata({ params }: TutorialPageProps) {
  const tutorial = tutorialMap.get(params.slug);
  if (!tutorial) {
    return pageMetadata("Tutorial Not Found", "The requested EJISCHOOL tutorial could not be found.");
  }
  return pageMetadata(tutorial.title, tutorial.description, `/tutorials/${tutorial.slug}`);
}

export default function TutorialPage({ params }: TutorialPageProps) {
  const tutorial = tutorialMap.get(params.slug);

  if (!tutorial) {
    notFound();
  }

  return (
    <div className="grid min-w-0 lg:grid-cols-[15rem_minmax(0,1fr)] xl:h-[calc(100vh-7.5rem)] xl:grid-cols-[15rem_minmax(0,1fr)_15.5rem] xl:overflow-hidden">
      <TutorialSidebar tutorial={tutorial} />
      <TutorialContent tutorial={tutorial} />
      <RightRail tutorial={tutorial} />
    </div>
  );
}
