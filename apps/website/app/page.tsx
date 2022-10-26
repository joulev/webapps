import { FC } from "react";
import ClientHome from "./page-client";

const Home: FC<{}> = () => {
  const updated = new Date().toISOString();
  return <ClientHome updated={updated} />;
};

export default Home;
