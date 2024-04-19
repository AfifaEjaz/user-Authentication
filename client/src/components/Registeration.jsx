import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useRegisterUserMutation } from '../services/UserAuthApi.js';


const Registeration = () => {

    const [errorMessage, setErrorMessage] = useState(""); 

    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        tc: false
    })


    let name, value;
    const handleInputs = (e) => {

        const { name, value, type, checked } = e.target;
        const inputValue = type === 'checkbox' ? checked : value;
        setUser({
            ...user,
            [name]: inputValue
        });
    }

    const navigate = useNavigate()
    const [registerUser, { isLoading }] = useRegisterUserMutation()
    const getData = async (e) => {
        e.preventDefault();

        try {
            const res = await registerUser(user);
            console.log(res);

            if (res.data.message !== "Missing Required Field") {
                if (res.data.message !== "User already Exist") {
                    if (res.data.message !== "Password does not match confirm password") {
                        setErrorMessage(res.data.message);
                    } else {
                        setErrorMessage(res.data.message);
                    }
                } else {
                    setErrorMessage(res.data.message);
                }
            } else {
                setErrorMessage(res.data.message);
            }

            setUser({
                name: "",
                email: "",
                password: "",
                password_confirmation: "",
                tc: false
            });

            setTimeout(() => {
                navigate('/loginReg');
            }, 3000);
        } catch (error) {
            console.error("Registration error:", error);
        }
    };

    return (
        <>
            <Form onSubmit={getData}>
            {errorMessage && <p className="text-danger">{errorMessage}</p>} 
                <Form.Group className="mb-3" >
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" required name='name' id='name' placeholder="Enter Name"
                        onChange={handleInputs}
                        value={user.name}
                    />
                </Form.Group>
                <Form.Group className="mb-3" >
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" required name='email' id='email' placeholder="Enter email"
                        onChange={handleInputs}
                        value={user.email}
                    />
                </Form.Group>
                <Form.Group className="mb-3" >
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" required name='password' id='password' placeholder="Password"
                        onChange={handleInputs}
                        value={user.password}
                    />
                </Form.Group>
                <Form.Group className="mb-3" >
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type="password" required name='password_confirmation' id='password_confirmation' placeholder="Confirm Password"
                        onChange={handleInputs}
                        value={user.password_confirmation}
                    />
                </Form.Group>
                <Form.Group className="mb-3" >
                    <Form.Check required type="checkbox" label="Agree to Terms & condition"
                        name='tc' id='tc'
                        onChange={handleInputs}
                        checked={user.tc} />
                </Form.Group>
                <Button variant="danger" type="submit">
                    Submit
                </Button>
            </Form>
        </>
    )
}

export default Registeration