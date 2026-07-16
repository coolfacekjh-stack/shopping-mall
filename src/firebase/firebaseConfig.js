import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyD1a35O0K5-1cxMGU2_4DXyoGw35blrjRs",
  authDomain: "shoppingmall-52492.firebaseapp.com",
  projectId: "shoppingmall-52492",
  storageBucket: "shoppingmall-52492.firebasestorage.app",
  messagingSenderId: "503456884797",
  appId: "1:503456884797:web:ede40e4b17896b4c842254"
};

// Firebase 앱 초기화
const app = initializeApp(firebaseConfig);

// Firebase Authentication 인스턴스
export const auth = getAuth(app);

// Google 로그인 프로바이더
export const googleProvider = new GoogleAuthProvider();

export default app;
