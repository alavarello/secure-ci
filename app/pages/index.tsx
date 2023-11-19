import type { NextPage } from 'next';
import '@fontsource/lexend/300.css';
import '@fontsource/lexend/400.css';
import '@fontsource/lexend/500.css';
import '@fontsource/lexend/700.css';
import SCIHome from "./sciIndex";
import CowHome from "./cowIndex";
import ScamHome from "./scamIndex";


const Home: NextPage = () => {

  if(typeof window !== "undefined" && window.location.origin.includes('cowswap')) return <CowHome />;
  if(typeof window !== "undefined" && window.location.origin.includes('scam')) return <ScamHome />;

  return <SCIHome />
};

export default Home;
