import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { useResetPasswordMutation } from '../services/UserAuthApi';

const ResetPassword = () => {

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

  const navigate = useNavigate()
  const [resetPassword, { isLoading }] = useResetPasswordMutation()
  const { id, token } = useParams()

  const getData = async (e) => {
    e.preventDefault();
    console.log(user, id, token);
    try {

      if (user.password !== user.cn_password) {
        console.log("Password does not match confirm password!");
      }
      else{
        const res = await resetPassword({ user, id, token })
        console.log(res);
        if(res.data.status === "Successfull" ){
          console.log("Password Successfully Reseted");
        }
      }
      setUser({
        password: "",
        cn_password: ""
      })
      navigate('/loginReg')
    } catch (error) {
      console.error("Reset Password error:", error);
    }
  }

  return (
    <>
      <Form onSubmit={getData}>
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
        <Button variant="danger" type="submit">
          Save
        </Button>
      </Form>
    </>
  )
}

export default ResetPassword