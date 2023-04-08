import Motion from "~/components/motion";

export default function NotFound() {
  return (
    <div>
      <main className="mt-36 flex flex-col gap-9">
        <div className="flex flex-col gap-3">
          <Motion as="h1" className="text-3xl sm:text-4xl font-medium">
            404 Not Found
          </Motion>
          <Motion as="p">The page cannot be found.</Motion>
        </div>
        {/* <Motion as="div">
          <Button href="/" primary>
            Go back home
          </Button>
        </Motion> */}
      </main>
    </div>
  );
}
