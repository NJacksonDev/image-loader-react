import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { Button } from "antd";

const firebaseConfig = {
  apiKey: "AIzaSyC3axfbGmwFpFKpkyBqgCr2TRlN__yTolA",
  authDomain: "image-loader-nj.firebaseapp.com",
  projectId: "image-loader-nj",
  storageBucket: "image-loader-nj.appspot.com",
  messagingSenderId: "260378560798",
  appId: "1:260378560798:web:6e6d79937f48363133610f",
};

export default function Login({ setUser }) {
  const handleGoogleLogin = async () => {
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();
    const response = await signInWithPopup(auth, provider).catch(alert);
    setUser(response.user);
  };
  return (
    <div className="login">
      <h4 className="login-text">Image Loader</h4>
      <h5 className="login-text">Upload your favorite images with ease.</h5>
      <Button onClick={handleGoogleLogin} type="primary">
        Sign in with Google
      </Button>
    </div>
  );
}
