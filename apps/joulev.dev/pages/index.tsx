import { GetStaticProps, NextPage } from "next";
import Contact from "~/components/contact";
import Footer from "~/components/footer";
import Header from "~/components/header";
import Now from "~/components/now";
import Projects from "~/components/projects";
import Seo from "~/components/seo";
import Skills from "~/components/skills";

type Props = {
  updated: string;
};

const Home: NextPage<Props> = ({ updated }) => (
  <div>
    <Seo />
    <main className="mb-24 mt-32 flex flex-col gap-24">
      <Header />
      <Skills />
      <Projects />
      <Now />
      <Contact />
    </main>
    <Footer updated={updated} />
    <div className="fixed top-0 inset-x-0 h-32 bg-gradient-to-b from-c-100 dark:from-c-900 to-transparent backdrop-blur-sm mask pointer-events-none" />
  </div>
);

export const getStaticProps: GetStaticProps<Props> = () => ({
  props: { updated: new Date().toISOString() },
});

export default Home;
