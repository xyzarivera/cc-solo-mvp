import { useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Form from "./components/Form";
import { getFunctions, httpsCallable } from "firebase/functions";
import { getApp } from "firebase/app";

function App() {
  const res = async () => {
    try {
      const functions = getFunctions(getApp(), "asia-east2");
      const helloWorld = httpsCallable(functions, "helloWorld2");
      const response = await helloWorld({ message: "nada" });
      console.log("response", response.data);
      return response.data;
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    res();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          hello
        </a>
        <Navbar />
        <Home />
        <Form />
      </header>
    </div>
  );
}

export default App;
