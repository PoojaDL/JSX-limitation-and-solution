import React, { useState, useRef } from "react";

import Card from "../UI/Card";
import Button from "../UI/Button";
import ErrorModal from "../UI/ErrorModal";
import classes from "./AddUser.module.css";
import Wrapper from "../Helper/Wrapper";

const AddUser = (props) => {
  const nameRef = useRef();
  const ageRef = useRef();
  const clgRef = useRef();
  const [error, setError] = useState();

  const addUserHandler = (event) => {
    event.preventDefault();
    const name = nameRef.current.value;
    const age = ageRef.current.value;
    const college = clgRef.current.value;
    if (
      name.trim().length === 0 ||
      age.trim().length === 0 ||
      college.trim().length === 0
    ) {
      setError({
        title: "Invalid input",
        message:
          "Please enter a valid name, age, and college (non-empty values).",
      });
      return;
    }
    if (+age < 1) {
      setError({
        title: "Invalid age",
        message: "Please enter a valid age (> 0).",
      });
      return;
    }
    props.onAddUser(name, age, college);
  };

  const errorHandler = () => {
    setError(null);
  };

  return (
    <Wrapper>
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onConfirm={errorHandler}
        />
      )}
      <Card className={classes.input}>
        <form onSubmit={addUserHandler}>
          <label htmlFor="username">Username</label>
          <input id="username" type="text" ref={nameRef} />
          <label htmlFor="age">Age (Years)</label>
          <input id="age" type="number" ref={ageRef} />
          <label htmlFor="clgname">College name</label>
          <input id="clgname" type="text" ref={clgRef} />
          <Button type="submit">Add User</Button>
        </form>
      </Card>
    </Wrapper>
  );
};

export default AddUser;
