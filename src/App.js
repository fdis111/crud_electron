import React, {useState, useEffect} from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';

import UsersList from "./usersList";
import Form from "./formAddUser";

const {ipcRenderer} = window.require('electron');

const getUsers = () => {
  return new Promise((resolve) => {
    ipcRenderer.once('asynchronous-reply', (_, arg) => {
        resolve(arg);
    });
    ipcRenderer.send('get-users');
  });
}

const postUser = (data) => {
  return new Promise(resolve =>{
    ipcRenderer.once('asynchronous-reply', (_, arg) => {
      resolve(arg);
    });
    ipcRenderer.send('post-user', data);
  })
}

const deleteUser = (userId) => {
  return new Promise(resolve => {
    ipcRenderer.once('asynchronous-reply', (_, arg) => {
      resolve(arg);
    });

    ipcRenderer.send('delete-user', userId)
  })
}






function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");


  const _handleChange = (e) => {
    switch (e.target.name) {
        case "name":
            setName(e.target.value)
            break;
        case "email":
            setEmail(e.target.value)
            break;
        default:
            break;
    }
  }


  const _handleSumit = (e) => {
    postUser({
      name, 
      email
    })
    setName("")
    setEmail("")
    e.preventDefault();
  }

  const _handleDelete = (userId) => {
    if (window.confirm("Voulez-vous supprimer cet utiulustaeur?")) {
      deleteUser(userId)
    }
   
  }

  useEffect(() => {
   getUsers().then(data => setUsers(data)) 
  })



  return (
    <div className="container">
      <h1>Liste des utilisateurs</h1>
      <Form name={name} email={email} _handleChange={_handleChange} onSubmit={_handleSumit} />
      <UsersList userDelete={_handleDelete} users={users} />
    </div>
  );
}

export default App;
