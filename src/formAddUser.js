import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

function FormAddUser({onSubmit, _handleChange, name, email}) {



    return (
        <div>
             <Form onSubmit={onSubmit}>
                <FormGroup>
                    <Label htmlFor="name">Name</Label>
                    <Input 
                        type="text"
                        name="name" 
                        id="name" 
                        placeholder="Your name" 
                        value={name}
                        onChange={_handleChange}
                    />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="email">Email</Label>
                    <Input 
                        type="email" 
                        name="email" 
                        id="email" 
                        placeholder="Your email adress" 
                        value={email}
                        onChange={_handleChange}
                    />
                </FormGroup>
                <FormGroup >
                    <Button disabled={!(name && email)} color="primary">Submit</Button>
                </FormGroup>
            </Form>
        </div>
    )
}

export default FormAddUser
