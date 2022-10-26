"use client";

import Contact from "~/components/contact";
import Footer from "~/components/footer";
import Header from "~/components/header";
import Now from "~/components/now";
import Projects from "~/components/projects";
import Skills from "~/components/skills";

export default function PageClient({ updated }: { updated: string }) {
  return (
    <div>
      <main className="mb-24 mt-36 flex flex-col gap-24">
        <Header />
        <Skills />
        <Projects />
        <Now />
        <Contact />
      </main>
      <Footer updated={updated} />
      <div className="fixed top-0 inset-x-0 h-36 bg-gradient-to-b from-daw-main-100 to-transparent backdrop-blur-sm mask pointer-events-none" />
    </div>
  );
}
