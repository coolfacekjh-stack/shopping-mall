function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={styles.footer}>
      <p style={styles.text}>
        © {currentYear} ShopMall. All rights reserved.
      </p>
      <p style={styles.subText}>
        상품 데이터 제공:{' '}
        <a
          href="https://fakestoreapi.com"
          target="_blank"
          rel="noopener noreferrer"
          style={styles.link}
        >
          Fake Store API
        </a>
      </p>
    </footer>
  );
}

const styles = {
  footer: {
    textAlign: 'center',
    padding: '1.5rem',
    borderTop: '1px solid #e5e7eb',
    backgroundColor: '#f9fafb',
    marginTop: 'auto',
  },
  text: {
    margin: '0 0 0.3rem',
    fontSize: '0.9rem',
    color: '#6b7280',
  },
  subText: {
    margin: 0,
    fontSize: '0.8rem',
    color: '#9ca3af',
  },
  link: {
    color: '#6b7280',
    textDecoration: 'underline',
  },
};

export default Footer;
