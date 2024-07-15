import { useState } from "react";
import { useEffect } from "react";
import {useMutation} from "@apollo/client";
import {ADD_USER} from "../utils/mutations";
import Auth from "../utils/auth";
import {Form, Button, Alert} from "react-bootstrap";

const SignUpForm = () => {
    const [userData, setUserData] = useState({
        username: "",
        email: "",
        password: "",
    });

    const [validated] = useState(false);
    const [showAlert, setAlert] = useState(false);
    const [addUser, {error}] = useMutation(ADD_USER);

    useEffect(()=> {
        if (error) {
            setAlert(true);
        } else {
            setAlert(false);
        }
    }, [error]);

    const inputHandler = async (event) => {
        const {name, value} = event.target;
        setUserData({...addUser, [name]: value});
    };
    
    const submitHandler =async (event) => {
        event.preventDefault();

    const form = event.currentTarget;
    if (form.checkValidity()=== false) {
        event.preventDefault();
        event.stopPropagation();
    } try {
        const {data} = await addUser({
            variables: {...addUser},
        });
        Auth.login(data.login.token);
    } catch (error) {
        console.log(error);
    }
    addUser({
        username: "",
        email: "",
        password: "",
    });
    };

return (
    //idk what is all this shit
    <>
  
      <Form noValidate validated={validated} onSubmit={submitHandler}>
     
        <Alert
          dismissible
          onClose={() => showAlert(false)}
          show={showAlert}
          variant="danger"
        >
          Something went wrong with your signup!
        </Alert>

        <Form.Group className='mb-3'>
          <Form.Label htmlFor="username">Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Your username"
            name="username"
            onChange={inputHandler}
            value={userData.username}
            required
          />
          <Form.Control.Feedback type="invalid">
            Username is required!
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className='mb-3'>
          <Form.Label htmlFor="email">Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Your email address"
            name="email"
            onChange={inputHandler}
            value={userData.email}
            required
          />
          <Form.Control.Feedback type="invalid">
            Email is required!
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className='mb-3'>
          <Form.Label htmlFor="password">Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Your password"
            name="password"
            onChange={inputHandler}
            value={userData.password}
            required
          />
          <Form.Control.Feedback type="invalid">
            Password is required!
          </Form.Control.Feedback>
        </Form.Group>
        <Button
          disabled={
            !(
              userData.username &&
              userData.email &&
              userData.password
            )
          }
          type="submit"
          variant="success"
        >
          Submit
        </Button>
      </Form>
    </>
);
};
export default SignUpForm;