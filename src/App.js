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


const updateUser = (user) => {
  return new Promise(resolve => {
    ipcRenderer.once('asynchronous-reply', (_, arg) => {
      resolve(arg);
    });
    
    ipcRenderer.send('update-user', user);
  })
}




function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [operation, setOperation] = useState("Save");
  const [userId, setUserId] = useState(null)


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
    if (operation === "Save") {
      postUser({
        name, 
        email
      })
    } else if(operation === "Update"){
      const user = {
        name: name,
        email: email,
        id: userId
      }
      console.log(user);
      updateUser(user)
    }
    setName("")
    setEmail("")
    e.preventDefault();
  }

  const _handleDelete = (userId) => {
    if (window.confirm("Voulez-vous supprimer cet utiulustaeur?")) {
      deleteUser(userId)
    }
   
  }

  const _handleUpdateUser = (user) => {
    setName(user.name)
    setEmail(user.email)
    setUserId(user.id)
    setOperation("Update")
  }

  useEffect(() => {
   getUsers().then(data => setUsers(data)) 
  })



  return (
    <div className="container">
      <h1>Liste des utilisateurs</h1>
      <Form operation={operation} name={name} email={email} _handleChange={_handleChange} onSubmit={_handleSumit} />
      <UsersList userDelete={_handleDelete} updateUser={_handleUpdateUser} users={users} />
    </div>
  );
}

export default App;
