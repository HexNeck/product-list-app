import React, { useState, ChangeEvent, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Product } from '../types/Product';

interface ProductDetailsProps {
    products: Product[];
    setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ products, setProducts }) => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const productIndex = id ? parseInt(id) : -1;

    const [details, setDetails] = useState<Product>(() => {
        if (productIndex >= 0 && productIndex < products.length) {
            return products[productIndex];
        }
        return { name: '', number: '', description: '', images: [] };
    });
    const [newImageUrl, setNewImageUrl] = useState<string>('');

    useEffect(() => {
        if (productIndex < 0 || productIndex >= products.length) {
            navigate('/');
        }
    }, [productIndex, products.length, navigate]);

    if (productIndex < 0 || productIndex >= products.length) {
        return null;
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setDetails({ ...details, [name]: value });
    };

    const handleAddImage = () => {
        if (newImageUrl.trim() !== '') {
            setDetails({ ...details, images: [...details.images, { url: newImageUrl, name: '' }] });
            setNewImageUrl('');
        }
    };

    const handleRemoveImage = (index: number) => {
        const updatedImages = details.images.filter((_, i) => i !== index);
        setDetails({ ...details, images: updatedImages });
    };

    const handleSave = () => {
        const updatedProducts = [...products];
        updatedProducts[productIndex] = details;
        setProducts(updatedProducts);
        localStorage.setItem('products', JSON.stringify(updatedProducts));
        navigate('/');
    };

    const handleBack = () => {
        navigate('/');
    }

    return (
        <div style={styles.container as React.CSSProperties}>
            <h1 style={styles.header as React.CSSProperties}>Product Details</h1>
            <div style={styles.field as React.CSSProperties}>
                <label style={styles.label as React.CSSProperties}>Name: </label>
                <input
                    type="text"
                    name="name"
                    value={details.name}
                    onChange={handleChange}
                    style={styles.input as React.CSSProperties}
                />
            </div>
            <div style={styles.field as React.CSSProperties}>
                <label style={styles.label as React.CSSProperties}>Number: </label>
                <input
                    type="text"
                    name="number"
                    value={details.number}
                    onChange={handleChange}
                    style={styles.input as React.CSSProperties}
                />
            </div>
            <div style={styles.field as React.CSSProperties}>
                <label style={styles.label as React.CSSProperties}>Description: </label>
                <input
                    type="text"
                    name="description"
                    value={details.description}
                    onChange={handleChange}
                    style={styles.input as React.CSSProperties}
                />
            </div>
            <div style={styles.field as React.CSSProperties}>
                <label style={styles.label as React.CSSProperties}>Images:</label>
                <ul style={styles.imageList as React.CSSProperties}>
                    {details.images.map((image, index) => (
                        <li key={index} style={styles.imageListItem as React.CSSProperties}>
                            <img
                                src={image.url}
                                alt={image.name}
                                style={styles.image as React.CSSProperties}
                                onError={(e) => (e.currentTarget.src = 'https://via.placeholder.com/100x100?text=Image+Not+Available')}
                            />
                            <button onClick={() => handleRemoveImage(index)}
                                    style={styles.removeButton as React.CSSProperties}>Remove
                            </button>
                        </li>
                    ))}
                </ul>
                <input
                    type="text"
                    value={newImageUrl}
                    onChange={(e) => setNewImageUrl(e.target.value)}
                    placeholder="Add a new image URL"
                    style={styles.input as React.CSSProperties}
                />
                <button onClick={handleAddImage} style={styles.addButton as React.CSSProperties}>Add Image</button>
            </div>
            <div style={styles.buttonContainer as React.CSSProperties}>
                <button onClick={handleBack} style={styles.goBackButton as React.CSSProperties}>Go Back</button>
                <button onClick={handleSave} style={styles.saveButton as React.CSSProperties}>Save</button>
            </div>
        </div>
    );
};

const styles = {
    container: {
        maxWidth: '600px',
        margin: '0 auto',
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '8px',
        backgroundColor: '#f9f9f9',
    },
    header: {
        textAlign: 'center' as 'center',
        marginBottom: '20px',
    },
    field: {
        marginBottom: '15px',
    },
    label: {
        display: 'block',
        marginBottom: '5px',
        fontWeight: 'bold',
    },
    input: {
        width: '100%',
        padding: '8px',
        boxSizing: 'border-box' as 'border-box',
    },
    imageList: {
        listStyleType: 'none',
        paddingLeft: '0',
    },
    imageListItem: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '10px',
    },
    image: {
        width: '100px',
        height: '100px',
        objectFit: 'cover' as 'cover',
        marginRight: '10px',
    },
    removeButton: {
        padding: '5px 10px',
        backgroundColor: '#e74c3c',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    },
    addButton: {
        padding: '10px 20px',
        backgroundColor: '#3498db',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        display: 'block',
        marginTop: '10px',
    },
    buttonContainer: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    goBackButton: {
        padding: '10px 20px',
        backgroundColor: '#f39c12',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        width: '48%',
    },
    saveButton: {
        padding: '10px 20px',
        backgroundColor: '#2ecc71',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        width: '48%',
    },
};

export default ProductDetails;
