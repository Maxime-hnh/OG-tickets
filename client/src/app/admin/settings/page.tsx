import dynamic from "next/dynamic";

const SettingsPage = dynamic(() => import('./pageContent'), {ssr: false});


export default SettingsPage;