import "./App.css";
import Feed from "./components/Feed";
import Login from "./components/Login";
import { useState, useEffect } from "react";

export default function App() {
  const [user, setUser] = useState();
  useEffect(() => {
    const _user = localStorage.getItem("user");
    if (_user !== "") {
      setUser(_user);
    }
  }, []);
  return (
    <main className="App">
      <div className="App-header">
        {!user ? (
          <Login setUser={setUser} />
        ) : (
          <>
            <Feed setUser={setUser} />
          </>
        )}
      </div>
    </main>
  );
}
