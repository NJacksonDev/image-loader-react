import "./App.css";
import Header from "./components/Header";
import Feed from "./components/Feed";

function App() {
  return (
    <main className="App">
      <Header />
      <div className="App-header">
        <Feed />
      </div>
    </main>
  );
}

export default App;
