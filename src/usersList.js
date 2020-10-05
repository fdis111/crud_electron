import React from 'react';
import { Table, Button } from 'reactstrap';
// import { AiOutlineDelete } from "react-icons/all"



 

function UsersList({users, userDelete}) {

    const renderUsers = () => {
        if (users) {
          return users.map(({id, name, email}) => {
            return (
            // <h1 key={user.id}>{user.name}</h1>
                <tr key={id}>
                    <td>{id}</td>
                    <td>{name}</td>
                    <td>{email}</td>
                    <td><Button color="primary">Edit</Button></td>
                    <td><Button onClick={ () => userDelete(id)} color="danger">Delete</Button></td>
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
