import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ProductList from '../components/ProductList';
import { Product } from '../types/Product';

const mockProducts: Product[] = [
    {
        name: 'Product 1',
        number: '12345',
        description: 'Description 1',
        images: [{ url: 'https://picsum.photos/400/300', name: 'Image 1' }]
    },
    {
        name: 'Product 2',
        number: '67890',
        description: 'Description 2',
        images: []
    }
];

const mockSetProducts = jest.fn();

test('renders ProductList component', () => {
    render(
        <BrowserRouter>
            <ProductList products={mockProducts} setProducts={mockSetProducts} />
        </BrowserRouter>
    );

    expect(screen.getByText('Product List')).toBeInTheDocument();
    expect(screen.getByText('12345')).toBeInTheDocument();
    expect(screen.getByText('67890')).toBeInTheDocument();
});

test('deletes a product', () => {
    render(
        <BrowserRouter>
            <ProductList products={mockProducts} setProducts={mockSetProducts} />
        </BrowserRouter>
    );

    fireEvent.click(screen.getAllByText('Delete')[0]);
    expect(mockSetProducts).toHaveBeenCalledWith([mockProducts[1]]);
});
