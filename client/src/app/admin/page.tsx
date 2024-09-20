import dynamic from "next/dynamic";

const AdminPage = dynamic(() => import('./pageContent'), {ssr: false});

export default AdminPage;