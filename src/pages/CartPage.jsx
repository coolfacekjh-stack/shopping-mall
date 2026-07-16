import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectCartItems } from '../store/slices/cartSlice';
import CartItem from '../components/cart/CartItem';
import CartSummary from '../components/cart/CartSummary';

function CartPage() {
  const cartItems = useSelector(selectCartItems);

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>🛒 장바구니</h2>

      {cartItems.length === 0 ? (
        // 장바구니가 비어있을 때
        <div style={styles.empty}>
          <p style={styles.emptyText}>장바구니가 비어 있습니다.</p>
          <Link to="/products" style={styles.shopLink}>
            상품 둘러보기 →
          </Link>
        </div>
      ) : (
        // 장바구니 상품이 있을 때
        <div style={styles.layout}>
          {/* 왼쪽: 상품 목록 */}
          <div style={styles.itemList}>
            {cartItems.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>

          {/* 오른쪽: 주문 요약 */}
          <div style={styles.summaryArea}>
            <CartSummary />
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '1100px',
    margin: '0 auto',
    padding: '2rem 1.5rem',
  },
  heading: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: '1.5rem',
  },
  empty: {
    textAlign: 'center',
    padding: '4rem 2rem',
  },
  emptyText: {
    fontSize: '1.1rem',
    color: '#9ca3af',
    marginBottom: '1.5rem',
  },
  shopLink: {
    display: 'inline-block',
    padding: '0.75rem 2rem',
    backgroundColor: '#111827',
    color: '#ffffff',
    textDecoration: 'none',
    borderRadius: '8px',
    fontWeight: '600',
  },
  layout: {
    display: 'grid',
    gridTemplateColumns: '1fr 320px',
    gap: '2rem',
    alignItems: 'start',
  },
  itemList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  summaryArea: {
    // CartSummary 내부에서 sticky 처리
  },
};

export default CartPage;
