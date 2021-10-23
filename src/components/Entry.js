import React from "react";
import { useEffect, useState } from "react";
import { getFunctions, httpsCallable } from "firebase/functions";
import { getApp } from "firebase/app";
import { useParams } from "react-router-dom";

const Entry = () => {
  let { id } = useParams();
  const [standup, setStandup] = useState([]);
  const [timestamp, setTimestamp] = useState([]);
  const [entry, setEntry] = useState([]);
  const [request_state, setRequestState] = useState("idle");

  const read = async () => {
    setRequestState("pending");
    try {
      const functions = getFunctions(getApp(), "asia-east2");
      const getStandupEntry = httpsCallable(functions, "getStandupEntry");
      const response = await getStandupEntry({ id });
      console.log("getStandupEntry", response.data);
      setStandup(response.data.data.standup);
      setTimestamp(response.data.standup);
      setRequestState("fulfilled");
      return response.data;
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    read();
  }, []);

  return (
    <>
      <h1>Entry</h1>
      {request_state === "pending" ? "loading" : ""}
      {request_state === "rejected" ? "please refresh" : ""}
      {request_state === "fulfilled" ? (
      <div>
        <div>
          <p>What did you do yesterday?</p>
          <p>{standup.did}</p>
        </div>
        <div>
          <p>What will you do today?</p>
          <p>{standup.do}</p>
        </div>
        <div>
          <p>What (if anything) is blocking your progress?</p>
          <p>{standup.blocker}</p>
        </div>
      </div>
      ) : null}
    </>
  );
};

export default Entry;
