type ProductFilterProps = {
  showInStockOnly: boolean;
  onShowInStockOnlyChange: (value: boolean) => void;
};

function ProductFilter({showInStockOnly, onShowInStockOnlyChange}: ProductFilterProps) {
  return (
    <label>
      <input 
        type="checkbox"
        checked={showInStockOnly}
        onChange={(event => onShowInStockOnlyChange(event.target.checked))}
      />Show in-stock products only
    </label>
    
  );
}

export default ProductFilter