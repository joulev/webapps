import Circles from "~/components/circle";
import Logo from "~/components/logo";

export default function Page() {
  return (
    <main className="w-screen h-screen grid place-items-center [&_path]:!fill-daw-main-900 relative">
      <Logo />
      <div className="absolute left-1/2 -translate-x-1/2">
        <Circles />
      </div>
    </main>
  );
}
