import "./styles.css";
import React, { useState } from "react";
import { InputTodo } from "./components/InputTodo";
import { IncompleteTodo } from "./components/IncompleteTodo";
import { CompleteTodo } from "./components/CompleteTodo";

export const App = () => {
  const [todoText, setTodoText] = useState("");
  const [incompleteTodos, setIncompleteTodos] = useState([]);
  const [completeTodos, setCompleteTodos] = useState([]);

  const onChangeTodoText = (event) => {
    setTodoText(event.target.value);
  };

  const onClickAdd = (event) => {
    if (todoText === "") return;
    const newTodos = [...incompleteTodos, todoText];
    setIncompleteTodos(newTodos);
    setTodoText("");
  };

  const onClickDelete = (index) => {
    const newTodos = [...incompleteTodos];
    newTodos.splice(index, 1);
    setIncompleteTodos(newTodos);
  };

  const onClickComplete = (index) => {
    const newIncompTodo = [...incompleteTodos];
    newIncompTodo.splice(index, 1);

    const newCompTodos = [...completeTodos, incompleteTodos[index]];
    setIncompleteTodos(newIncompTodo);
    setCompleteTodos(newCompTodos);
  };

  const onClickBack = (index) => {
    const newCompTodos = [...completeTodos];
    newCompTodos.splice(index, 1);

    const newIncompTodo = [...incompleteTodos, completeTodos[index]];
    setCompleteTodos(newCompTodos);
    setIncompleteTodos(newIncompTodo);
  };

  return (
    <>
      <InputTodo
        todoText={todoText}
        onChange={onChangeTodoText}
        onClick={onClickAdd}
        disabled={incompleteTodos.length >= 5}
      />
      {incompleteTodos.length >= 5 && (
        <p style={{ color: "red" }}>登録できるToDoは5個まで。消化するべし。</p>
      )}
      <IncompleteTodo
        todos={incompleteTodos}
        onClickComplete={onClickComplete}
        onClickDelete={onClickDelete}
      />
      <CompleteTodo todos={completeTodos} onClickBack={onClickBack} />
    </>
  );
};
