import type { Product } from "./ProductPage";
import ProductCard from "./ProductCard";

type ProductListProps = {
  products: Product[];
  onToggle: (id: number) => void;
};

function ProductList({products, onToggle}: ProductListProps) {
  return (
    <ul>
      {products.map(product => (
          <ProductCard key={product.id} product={product} onToggle={onToggle}/>
        )
      )}
    </ul>
  );
}

export default ProductList