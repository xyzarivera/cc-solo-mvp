import React from "react";
import { useEffect, useState } from "react";
import { getFunctions, httpsCallable } from "firebase/functions";
import { getApp } from "firebase/app";
import { getAuth, signOut } from "firebase/auth";
import { useAuthState } from "../firebase";
import { Link } from "react-router-dom";
import moment from "moment";

export const Home = () => {
  const { user } = useAuthState();
  const [entries, setEntries] = useState([]);
  const [request_state, setRequestState] = useState("idle");

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

  useEffect(() => {
    readAll();
  }, []);

  return (
    <>
      {console.log(request_state)}
      <div>
        <Link to="/form">Create Entry</Link>
      </div>
      <div>
        <h1>Welcome {user?.email}</h1>
        <button onClick={() => signOut(getAuth())}>Sign out</button>
      </div>
      {request_state === "pending" ? "loading" : ""}
      {request_state === "rejected" ? "please refresh" : ""}
      {request_state === "fulfilled" && entries.length === 0
        ? "You dont have an entry yet"
        : <div>
        {entries.length !== 0 ? (
          <div>
            {request_state === "fulfilled" &&
              entries.map((entry) => (
                <div key={entry.id}>
                  <Link key={entry.timestamp} to={`entry/${entry.id}`}>
                    {moment(entry.timestamp)
                      .format("MMM DD, YYYY hh:mm A")
                      .toString()}
                  </Link>
                </div>
              ))}
          </div>
        ) : null}
      </div>}
    </>
  );
};

export default Home;
