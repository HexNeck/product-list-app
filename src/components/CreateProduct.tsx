import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Product } from '../types/Product';

interface CreateProductProps {
    products: Product[];
    setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}

const CreateProduct: React.FC<CreateProductProps> = ({ products, setProducts }) => {
    const [newProduct, setNewProduct] = useState<Product>({
        name: '',
        number: '',
        description: '',
        images: [],
    });
    const [newImageUrl, setNewImageUrl] = useState<string>('');
    const navigate = useNavigate();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewProduct({ ...newProduct, [name]: value });
    };

    const handleAddImage = () => {
        if (newImageUrl.trim() !== '') {
            setNewProduct({ ...newProduct, images: [...newProduct.images, { url: newImageUrl, name: '' }] });
            setNewImageUrl('');
        }
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        const updatedProducts = [...products, newProduct];
        setProducts(updatedProducts);
        localStorage.setItem('products', JSON.stringify(updatedProducts));
        setNewProduct({ name: '', number: '', description: '', images: [] });
        navigate('/');
    };

    const handleBack = () => {
        navigate('/');
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.header}>Create Product</h1>
            <form onSubmit={handleSubmit}>
                <div style={styles.field}>
                    <label style={styles.label}>Name: </label>
                    <input
                        type="text"
                        name="name"
                        value={newProduct.name}
                        onChange={handleChange}
                        style={styles.input}
                    />
                </div>
                <div style={styles.field}>
                    <label style={styles.label}>Number: </label>
                    <input
                        type="text"
                        name="number"
                        value={newProduct.number}
                        onChange={handleChange}
                        style={styles.input}
                    />
                </div>
                <div style={styles.field}>
                    <label style={styles.label}>Description: </label>
                    <input
                        type="text"
                        name="description"
                        value={newProduct.description}
                        onChange={handleChange}
                        style={styles.input}
                    />
                </div>
                <div style={styles.field}>
                    <label style={styles.label}>Images:</label>
                    <ul style={styles.imageList}>
                        {newProduct.images.map((image, index) => (
                            <li key={index} style={styles.imageListItem}>
                                <img
                                    src={image.url}
                                    alt={image.name}
                                    style={styles.image}
                                    onError={(e) => (e.currentTarget.src = 'https://via.placeholder.com/100x100?text=Image+Not+Available')}
                                />
                            </li>
                        ))}
                    </ul>
                    <input
                        type="text"
                        value={newImageUrl}
                        onChange={(e) => setNewImageUrl(e.target.value)}
                        placeholder="Add a new image URL"
                        style={styles.input}
                    />
                    <button type="button" onClick={handleAddImage} style={styles.addButton}>Add Image</button>
                </div>
                <div style={styles.buttonContainer}>
                    <button type="button" onClick={handleBack} style={styles.goBackButton}>Go Back</button>
                    <button type="submit" style={styles.saveButton}>Create Product</button>
                </div>
            </form>
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

export default CreateProduct;
