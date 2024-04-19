import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import { useResetPasswordEmailMutation } from '../services/UserAuthApi';


const ResetPasswordEmail = () => {

    const [user, setUser] = useState({
        email: ""
    })


    let name, value;
    const handleInputs = (e) => {

        const { name, value } = e.target;
        setUser({
            ...user,
            [name]: value
        });
    }


    const [ResetPasswordEmail, { isLoading }] = useResetPasswordEmailMutation()
    const getData = (e) => {
        e.preventDefault();
        console.log(user);
        ResetPasswordEmail(user)

        setUser({
            email: ""
        })

    }

    return (
        <>
           <div className="container d-flex justify-content-center mt-5" >
           <Form onSubmit={getData}>
                <Form.Group className="mb-3" >
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" required name='email' id='email' placeholder="Enter email"
                        onChange={handleInputs}
                        value={user.email}
                    />
                </Form.Group>
               
                <Button variant="danger" type="submit">
                    Submit
                </Button>
            </Form>
           </div>
        </>
    )

}

export default ResetPasswordEmail