import React from 'react'
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useUpdateUserMutation } from '../services/UserAuthApi';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink, useNavigate } from 'react-router-dom';
import { useGetLoggedDataQuery } from '../services/UserAuthApi';

const UserUpdate = () => {

    //Get Logged User Data
    const token = localStorage.getItem('token')
    const { data, isSuccess } = useGetLoggedDataQuery(token)
    console.log(data);

    useEffect(() => {
        if (data && isSuccess) {
            setUserData({
                name: data.user.name,
                email: data.user.email
            })
        }
    }, [data, isSuccess])

    // const navigate = useNavigate()
    const [userData, setUserData] = useState({
        email: "",
        name: ""
    })

    // const logout = () => {
    //     console.log("User Logout")
    //     const token = localStorage.removeItem('token')

    //     setTimeout(() => {
    //         // setIsLoggedIn(false);
    //         navigate('/');
    //     }, 2000);
    // }

    //update Section
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [user, setUser] = useState({
        password: "",
        cn_password: ""
    })

    let name, value;
    const handleInputs = (e) => {

        const { name, value } = e.target;
        setUser({
            ...user,
            [name]: value
        });
    }

    const [updateUser] = useUpdateUserMutation()
    // const token = localStorage.getItem('token')

    const getData = async (e) => {
        e.preventDefault();

        try {
            if (user.password !== user.cn_password) {
                console.log("Password does not match confirm password!");
            }
            else {
                const res = await updateUser({ user, token })
                console.log(res);
                if (res.data.status === "Successfull") {
                    console.log("Password Successfully Updated");
                }
            }

        } catch (error) {
            console.error("Update Password error:", error);

        }
        setUser({
            password: "",
            cn_password: ""
        })
    }

    //Log Out
    const navigate = useNavigate()
    const logout = () => {
        console.log("User Logout")
        const token = localStorage.removeItem('token')

        setTimeout(() => {
            // setIsLoggedIn(false);
            navigate('/');
        }, 2000);
    }


    return (
        <>
            <NavDropdown title={userData.name} id="basic-nav-dropdown">
                <NavDropdown.Item onClick={handleShow}>Update Password</NavDropdown.Item>
                <NavDropdown.Item onClick={logout}>Log Out</NavDropdown.Item>
            </NavDropdown>


            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Your Profile Here</Modal.Title>
                </Modal.Header>
                <Modal.Body><Form onSubmit={getData}>
                    <Form.Group className="mb-3" >
                        <Form.Label>New Password</Form.Label>
                        <Form.Control type="password" required name='password' id='password' placeholder="Password"
                            onChange={handleInputs}
                            value={user.password}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" >
                        <Form.Label>Confirm New Password</Form.Label>
                        <Form.Control type="password" required name='cn_password' id='cn_password' placeholder="Confirm Password"
                            onChange={handleInputs}
                            value={user.cn_password}
                        />
                    </Form.Group>

                    <Modal.Footer>
                        <Button variant="dark" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="danger" type="submit" onClick={handleClose}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Form>
                </Modal.Body>

            </Modal>
        </>
    )
}

export default UserUpdate