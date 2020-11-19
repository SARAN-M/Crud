import 'primeicons/primeicons.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';

import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import React, { useState} from "react";
import { v4 } from "uuid";

//redux
import { connect } from "react-redux";
import { addTodo } from "../action/todo";

const TodoForm = ({ addTodo }) => {
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (code === "" || name === "" || category ==="") {
      return alert("Please enter all the fields");
    }
    let todo = {
        id:v4(),
        code:code,
        name:name,
        category:category 
    
      };

    addTodo(todo);

    setCode("");
    setName("");
    setCategory("");
  };

  return (
    <div>
    <InputText type="text" value={code} placeholder="Enter code" onChange={(e) => setCode(e.target.value)}/><br/><br/>
    <InputText type="text" value={name} placeholder="Enter Name" onChange={(e) => setName(e.target.value)}></InputText><br/><br/>
    <InputText type="text" value={category} placeholder="Enter category"  onChange={(e) => setCategory(e.target.value)}></InputText><br/><br/>
    <Button id='list' onClick={handleSubmit}>Add</Button>
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
  addTodo: (todo) => {
    dispatch(addTodo(todo));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoForm);
