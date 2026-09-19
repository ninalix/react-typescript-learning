import type { Product } from "./ProductPage";

type ProductCardProps = {
  product: Product;
  onToggle: (id: number) => void;
};

function ProductCard({product, onToggle}: ProductCardProps) {
  return (
    <li>
      <h2>{product.name}</h2>
      <p>{product.price}</p>
      <p>{product.inStock ? "In stock" : "Out of stock"}</p>

      <button onClick={() => onToggle(product.id)}>Toggle stock</button>
    </li>
  );
}

export default ProductCard