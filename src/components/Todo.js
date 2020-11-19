
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import ReactDOM from 'react-dom';

import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { ListGroup, ListGroupItem } from "reactstrap";
import { FaCheckDouble } from "react-icons/fa";

//redux
import { connect } from "react-redux";
import { removeTodo } from "../action/todo";




const Todo = ({ todos, markComplete }) => {

const [products, setProducts] = useState([]);

const statuses = [
  { label: 'Male', value: 'Male' },
  { label: 'Female', value: 'Female' }
 
];

let editingCellRows = {};
let originalRows = {};

const dataTableFuncMap = {
  'products':setProducts
};

const onRowEditInit = (event) => {
  originalRows[event.index] = { ...products[event.index] };
}

const onRowEditCancel = (event) => {
  let products = [...todos];
  products[event.index] = originalRows[event.index];
  delete originalRows[event.index];

  setProducts(products);
}
const onEditorValueChange = (productKey, props, value) => {
  let updatedProducts = [...props.value];
  updatedProducts[props.rowIndex][props.field] = value;
  dataTableFuncMap[`${productKey}`](updatedProducts);
}

const inputTextEditor = (productKey, props, field) => {
  return <InputText type="text" value={props.rowData[field]} onChange={(e) => onEditorValueChange(productKey, props, e.target.value)} />;
}

const codeEditor = (productKey, props) => {
  return inputTextEditor(productKey, props, 'code');
}

const nameEditor = (productKey, props) => {
  return inputTextEditor(productKey, props, 'name');
}
const categoryEditor = (productKey, props) => {
  return inputTextEditor(productKey, props, 'category');
}
console.log(todos);
  return (
    <div className="card">
    <h5>CRUD</h5>
    <DataTable value={todos} editMode="row" dataKey="id" onRowEditInit={onRowEditInit} onRowEditCancel={onRowEditCancel} on>
        <Column field="code" header="code" editor={(props) => codeEditor('products', props)}></Column>
        <Column field="name" header="Username" editor={(props) => nameEditor('products', props)}></Column>
        <Column field="category" header="category" editor={(props) => categoryEditor('products', props)}></Column>
        <Column rowEditor headerStyle={{ width: '7rem' }} bodyStyle={{ textAlign: 'center' }}></Column>
    </DataTable>
  
</div>

  );
}
const mapStateToProps = (state) => ({
  todos: state.todos,
});

const mapDispatchToProps = (dispatch) => ({
  markComplete: (id) => {
    dispatch(removeTodo(id));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Todo);
