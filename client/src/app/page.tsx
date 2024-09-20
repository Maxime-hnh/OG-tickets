import dynamic from "next/dynamic";

const HomePage = dynamic(() => import('./pageContent'), {ssr: false});

export default HomePage;