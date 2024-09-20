import dynamic from 'next/dynamic';

const ShopPage = dynamic(() => import('./pageContent'), {ssr: false});


export default ShopPage;