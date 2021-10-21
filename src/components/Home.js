import React from "react";
import { useEffect } from "react";
import { getFunctions, httpsCallable } from "firebase/functions";
import { getApp } from "firebase/app";
import { getAuth, signOut } from 'firebase/auth'
import { useAuthState } from '../firebase'

export const Home = () => {
  const { user } = useAuthState()

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

  const write = async () => {
    try {
      const functions = getFunctions(getApp(), "asia-east2");
      const createEntry = httpsCallable(functions, "createEntry");
      const response = await createEntry();
      console.log("createEntry", response.data);
      return response.data;
    } catch (err) {
      console.error(err);
    }
  };

  const readAll = async () => {
    try {
      const functions = getFunctions(getApp(), "asia-east2");
      const getAllStandupEntries = httpsCallable(functions, "getAllStandupEntries");
      const response = await getAllStandupEntries();
      console.log("getAllStandupEntries", response.data);
      return response.data;
    } catch (err) {
      console.error(err);
    }
  };

  const read = async () => {
    try {
      const functions = getFunctions(getApp(), "asia-east2");
      const getStandupEntry = httpsCallable(functions, "getStandupEntry");
      const response = await getStandupEntry();
      console.log("getStandupEntry", response.data);
      return response.data;
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    res();
    write();
    readAll();
    read();
  }, []);

  return (
    <>
      <h1>Welcome {user?.email}</h1>
      <button onClick={() => signOut(getAuth())}>Sign out</button>
    </>
  )
}

export default Home