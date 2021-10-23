import React from "react";
import { useEffect, useState } from "react";
import { getFunctions, httpsCallable } from "firebase/functions";
import { getApp } from "firebase/app";
import { getAuth, signOut } from "firebase/auth";
import { useAuthState } from "../firebase";
import { Link, useRouteMatch } from "react-router-dom";
import moment from "moment";

export const Home = () => {
  const { user } = useAuthState();
  const [entries, setEntries] = useState([]);
  const [request_state, setRequestState] = useState("idle");

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

  const readAll = async () => {
    setRequestState("pending");
    try {
      const functions = getFunctions(getApp(), "asia-east2");
      const getAllStandupEntries = httpsCallable(
        functions,
        "getAllStandupEntries"
      );
      const response = await getAllStandupEntries();
      setEntries(response.data.data);
      console.log("getAllStandupEntries", response.data);
      setRequestState("fulfilled");
      return response.data;
    } catch (err) {
      setRequestState("rejected");
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
    // res();
    readAll();
    // read();
    console.log({ entries });
  }, []);

  return (
    <>
      {request_state === "pending" ? "loading" : ""}
      {request_state === "rejected" ? "refresh" : ""}
      <div>
        <Link to="/form">Create Entry</Link>
      </div>
      <div>
        <h1>Welcome {user?.email}</h1>
        <button onClick={() => signOut(getAuth())}>Sign out</button>
      </div>
      {request_state === "fulfilled" ? (
        <div>
          {entries.length !== 0 ? (
            <div>
              {entries.map((entry) => (
                <div><Link key={entry.timestamp}
                to={`entry/${entry.timestamp}`}>{ moment(entry.timestamp).format('MMM DD, YYYY hh:mm A').toString()}</Link>
                </div>
              ))}
            </div>
          ) : null}
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Home;
