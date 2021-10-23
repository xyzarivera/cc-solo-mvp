import React from "react";
import { useCallback } from "react";
import { getFunctions, httpsCallable } from "firebase/functions";
import { getApp } from "firebase/app";

const Form = () => {
  const submitEntry = async (standup_did, standup_do, standup_blocker) => {
    try {
      const functions = getFunctions(getApp(), "asia-east2");
      const createEntry = httpsCallable(functions, "createEntry");
      const response = await createEntry({
        standup_did,
        standup_do,
        standup_blocker,
      });
      console.log("createEntry", response.data);
      return response.data;
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();

    const { standup_did, standup_do, standup_blocker } = e.target.elements;
    try {
      console.log(standup_did.value, standup_do.value, standup_blocker.value);
      const res = await submitEntry(
        standup_did.value,
        standup_do.value,
        standup_blocker.value
      );
      console.log("res", res);
    } catch (e) {
      alert(e.message);
    }
  }, []);

  return (
    <>
      <h1>StandUp</h1>
      <form onSubmit={handleSubmit}>
        <label for="standup_did">What did you do yesterday?</label>
        <br />
        <textarea id="standup_did" name="standup_did" required="required" />
        <br />
        <label for="standup_do">What will you do today?</label>
        <br />
        <textarea
          id="standup_do"
          name="standup_do"
          type="password"
          required="required"
        />
        <br />
        <label for="standup_blocker">
          What (if anything) is blocking your progress?
        </label>
        <br />
        <textarea
          id="standup_blocker"
          name="standup_blocker"
          type="password"
          required="required"
        />
        <br />
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default Form;
