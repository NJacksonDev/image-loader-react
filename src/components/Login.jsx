import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { Button } from "antd";

const firebaseConfig = {
  apiKey: "AIzaSyBcm7LwmgXHX-2LnWzaybUzuUy1GsjN5l8",
  authDomain: "upload-storage-nj.firebaseapp.com",
  projectId: "upload-storage-nj",
  storageBucket: "upload-storage-nj.appspot.com",
  messagingSenderId: "470398372734",
  appId: "1:470398372734:web:f94220590546776878412f",
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
