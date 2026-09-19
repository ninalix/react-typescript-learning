import { useState } from "react";
import ProductFilter from './ProductFilter'
import ProductList from './ProductList'

export type Product = {
  id: number;
  name: string;
  price: number;
  inStock: boolean;
};

const initialProducts: Product[] = [
  {
    id: 1,
    name: "Keyboard",
    price: 120,
    inStock: true
  },
  {
    id: 2,
    name: "Mouse",
    price: 60,
    inStock: false
  },
  {
    id: 3,
    name: "Monitor",
    price: 450,
    inStock: true
  }
];

function ProductPage() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [showInStockOnly, setShowInStockOnly] = useState(false);

  function toggleProduct(id: number) {
    setProducts(prevProducts => 
      prevProducts.map(product =>
        product.id === id
        ? {...product, inStock: !product.inStock}
        : product
      )
    )
  }

  const filteredProducts = showInStockOnly ? products.filter(product => product.inStock) : products;

  return(
    <div>
      <ProductFilter showInStockOnly={showInStockOnly} onShowInStockOnlyChange={setShowInStockOnly}/>
      <ProductList products={filteredProducts} onToggle={toggleProduct} />
    </div>
  );
}

export default ProductPage;