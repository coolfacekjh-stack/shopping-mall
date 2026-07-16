import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { onAuthStateChanged, getRedirectResult } from 'firebase/auth';
import { auth } from './firebase/firebaseConfig';
import { setUser, clearUser, setError } from './store/slices/authSlice';

import Header from './components/common/Header';
import Footer from './components/common/Footer';
import ProtectedRoute from './components/common/ProtectedRoute';

import HomePage from './pages/HomePage';
import ProductListPage from './pages/ProductListPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import LoginPage from './pages/LoginPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    let unsubscribe = null;

    // getRedirectResult 완료 후 onAuthStateChanged 구독
    // → redirect 결과를 처리하기 전에 onAuthStateChanged가 null을 발동시키는 타이밍 버그 방지
    getRedirectResult(auth)
      .then((result) => {
        if (result?.user) {
          const u = result.user;
          dispatch(
            setUser({
              uid: u.uid,
              displayName: u.displayName,
              email: u.email,
              photoURL: u.photoURL,
            })
          );
        }
      })
      .catch((err) => {
        console.error('getRedirectResult 오류:', err.code, err.message);
        if (err.code !== 'auth/no-auth-event') {
          dispatch(setError(`리다이렉트 에러: ${err.code}`));
        }
      })
      .finally(() => {
        // redirect 결과 처리 완료 후 onAuthStateChanged 구독
        unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
          if (firebaseUser) {
            dispatch(
              setUser({
                uid: firebaseUser.uid,
                displayName: firebaseUser.displayName,
                email: firebaseUser.email,
                photoURL: firebaseUser.photoURL,
              })
            );
          } else {
            dispatch(clearUser());
          }
        });
      });

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [dispatch]);

  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductListPage />} />
          <Route path="/products/:id" element={<ProductDetailPage />} />
          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <CartPage />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
