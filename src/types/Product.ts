export interface Product {
    name: string;
    number: string;
    description: string;
    images: { url: string; name: string }[];
}

export default Product;