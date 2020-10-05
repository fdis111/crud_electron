import React from 'react';
import { Table, Button } from 'reactstrap';
// import { AiOutlineDelete } from "react-icons/all"



 

function UsersList({users, userDelete, updateUser}) {

    const renderUsers = () => {
        if (users) {
          return users.map(user => {
            return (
            // <h1 key={user.id}>{user.name}</h1>
                <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td><Button onClick={() => updateUser(user)} color="primary">Edit</Button></td>
                    <td><Button onClick={ () => userDelete(user.id)} color="danger">Delete</Button></td>
                </tr>
            )
          })
        }
    }


    return (
        <div className="mt-5">
            <Table>
                <thead>
                    <tr>
                    <th>id</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Update</th>
                    <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                   {renderUsers()}
                </tbody>
            </Table>
        </div>
    )
}

export default UsersList
