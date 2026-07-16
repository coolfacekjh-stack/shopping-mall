import ProductCard from './ProductCard';

function ProductList({ products }) {
  if (!products || products.length === 0) {
    return (
      <p style={styles.empty}>표시할 상품이 없습니다.</p>
    );
  }

  return (
    <div style={styles.grid}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

const styles = {
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
    gap: '1.5rem',
    padding: '1rem 0',
  },
  empty: {
    textAlign: 'center',
    color: '#9ca3af',
    padding: '3rem',
    fontSize: '1rem',
  },
};

export default ProductList;
