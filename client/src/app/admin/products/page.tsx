import dynamic from "next/dynamic";

const ProductsPage = dynamic(() => import('./pageContent'), {ssr: false});


export default ProductsPage;