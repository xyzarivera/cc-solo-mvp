import { useCallback } from 'react'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { useEffect } from "react";
import { getFunctions, httpsCallable } from "firebase/functions";
import { getApp } from "firebase/app";

const Login = () => {
  const handleSubmit = useCallback(async e => {
    e.preventDefault()

    const { email, password } = e.target.elements
    const auth = getAuth()
    try {
      await signInWithEmailAndPassword(auth, email.value, password.value)
    } catch (e) {
      alert(e.message)
    }
  }, [])

  const res = async () => {
    try {
      const functions = getFunctions(getApp(), "asia-east2");
      const helloWorld = httpsCallable(functions, "helloWorld");
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
    <>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input name="email" placeholder="email" type="email" />
        <input name="password" placeholder="password" type="password" />
        <button type="submit">Login</button>
      </form>
    </>
  )
}

export default Login