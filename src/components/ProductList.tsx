import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types/Product';

interface ProductListProps {
    products: Product[];
    setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}

const ProductList: React.FC<ProductListProps> = ({ products, setProducts }) => {
    const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
        e.currentTarget.src = 'https://via.placeholder.com/100x100?text=Image+Not+Available';
    };

    const handleDelete = (index: number) => {
        const updatedProducts = products.filter((_, i) => i !== index);
        setProducts(updatedProducts);
        localStorage.setItem('products', JSON.stringify(updatedProducts));
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.header}>Product List</h1>
            <Link to="/create" style={styles.createLink}>Create New Product</Link>
            <ul style={styles.list}>
                {products.map((product, index) => (
                    <li key={index} style={styles.listItem}>
                        <Link to={`/product/${index}`} style={styles.link}>
                            <div style={styles.productContainer}>
                                {product.images.length > 0 ? (
                                    product.images.map((image, imgIndex) => (
                                        <img
                                            key={imgIndex}
                                            src={image.url}
                                            alt={image.name}
                                            onError={handleImageError}
                                            style={styles.image}
                                        />
                                    ))
                                ) : (
                                    <img
                                        src="https://via.placeholder.com/100x100?text=No+Image"
                                        alt="No image available"
                                        style={styles.image}
                                    />
                                )}
                                <p style={styles.productNumber}>{product.number}</p>
                            </div>
                        </Link>
                        <button onClick={() => handleDelete(index)} style={styles.deleteButton}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

const styles = {
    container: {
        padding: '20px',
    },
    header: {
        textAlign: 'center' as 'center',
        marginBottom: '20px',
    },
    createLink: {
        display: 'block',
        textAlign: 'center' as 'center',
        marginBottom: '20px',
        color: '#3498db',
        textDecoration: 'none' as 'none',
    },
    list: {
        paddingLeft: '0',
    },
    listItem: {
        display: 'flex',
        alignItems: 'center',
        listStyleType: 'none' as 'none',
        marginBottom: '10px',
    },
    link: {
        textDecoration: 'none' as 'none',
        color: 'inherit',
        display: 'flex',
        alignItems: 'center',
    },
    productContainer: {
        display: 'flex',
        flexDirection: 'row' as 'row',
        alignItems: 'center',
    },
    image: {
        width: '100px',
        height: '100px',
        objectFit: 'cover' as 'cover',
        marginRight: '5px',
    },
    productNumber: {
        marginLeft: '10px',
    },
    deleteButton: {
        padding: '5px 10px',
        backgroundColor: '#e74c3c',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        marginLeft: '10px',
    },
};

export default ProductList;
