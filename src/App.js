import "./App.css";
import Header from "./components/Header";
import Feed from "./components/Feed";
import Login from "./components/Login";
import { useState } from "react";

export default function App() {
  const [user, setUser] = useState();
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
