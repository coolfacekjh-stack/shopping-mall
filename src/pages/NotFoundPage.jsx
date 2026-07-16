import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <div style={styles.container}>
      <h1 style={styles.code}>404</h1>
      <p style={styles.message}>페이지를 찾을 수 없습니다.</p>
      <p style={styles.sub}>
        요청하신 페이지가 존재하지 않거나 이동되었습니다.
      </p>
      <Link to="/" style={styles.homeLink}>
        홈으로 돌아가기
      </Link>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 'calc(100vh - 120px)',
    textAlign: 'center',
    padding: '2rem',
  },
  code: {
    fontSize: '6rem',
    fontWeight: 'bold',
    color: '#e5e7eb',
    margin: '0 0 1rem',
    lineHeight: 1,
  },
  message: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#111827',
    margin: '0 0 0.75rem',
  },
  sub: {
    fontSize: '0.95rem',
    color: '#9ca3af',
    marginBottom: '2rem',
  },
  homeLink: {
    display: 'inline-block',
    padding: '0.75rem 2rem',
    backgroundColor: '#111827',
    color: '#ffffff',
    textDecoration: 'none',
    borderRadius: '8px',
    fontWeight: '600',
    fontSize: '0.95rem',
  },
};

export default NotFoundPage;
