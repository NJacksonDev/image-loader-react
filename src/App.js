import "./App.css";
import Header from "./components/Header";
import Feed from "./components/Feed";
import Login from "./components/Login";
import Logout from "./components/Logout"
import { useState } from 'react'

function App() {
  const [user, setUser] = useState()
  return (

    <main className="App">
      <Header />
      <div className="App-header">
      {!user
     ? 
     <Login setUser={setUser} />
     :
     <>
     <Feed/>
     <Logout setUser={setUser}/>
     </>   
    }

      </div>
    </main>
  );
}

export default App;
