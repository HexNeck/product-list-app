import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductList from './components/ProductList';
import ProductDetails from './components/ProductDetails';
import CreateProduct from './components/CreateProduct';
import { Product } from './types/Product';

const initialProducts: Product[] = [
  {
    name: 'b0006se5bq',
    number: 'singing coach unlimited',
    description: 'singing coach unlimited - electronic learning products (win me nt 2000 xp)',
    images: [
      {
        url: 'https://picsum.photos/400/300',
        name: 'singing coach',
      },
      {
        url: 'https://broken.link.for.testing.notexistingtopleveldomain/400/300',
        name: 'front side',
      },
    ],
  },
  {
    name: 'b00021xhzw',
    number: 'adobe after effects professional 6.5 upgrade from standard to professional',
    description: 'upgrade only; installation of after effects standard new disk caching tools speed up your interactive work save any combination of animation parameters as presets',
    images: [],
  },
  {
    name: 'b00021xhzw',
    number: 'domino designer/developer v5.0',
    description: 'reference domino designer/developer r5 doc pack includes the following titles: application development with domino designer (intermediate-advanced) 536 pages',
    images: [
      { url: 'https://picsum.photos/400/300', name: 'cover' },
    ],
  },
];

const App: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const storedProducts = localStorage.getItem('products');
    if (storedProducts) {
      setProducts(JSON.parse(storedProducts));
    } else {
      setProducts(initialProducts);
      localStorage.setItem('products', JSON.stringify(initialProducts));
    }
  }, []);

  return (
      <Router>
        <Routes>
          <Route path="/" element={<ProductList products={products} setProducts={setProducts} />} />
          <Route path="/product/:id" element={<ProductDetails products={products} setProducts={setProducts} />} />
          <Route path="/create" element={<CreateProduct products={products} setProducts={setProducts} />} />
        </Routes>
      </Router>
  );
};

export default App;
