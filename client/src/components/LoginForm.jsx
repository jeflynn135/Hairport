import {useState} from "react";
import { useEffect } from "react";
import {useMutation} from "@apollo/client";
import {LOGIN_USER} from "../utils/mutations";
import Auth from "../utils/auth";
import {Form, Button, Alert} from "react-bootstrap";

const LoginForm = () => {
    const [userData, setUserData] = useState({
        email: "",
        password: ""
    });
    const [validated] = useState(false);
    const [showAlert, setAlert] = useState(false);
    const [login, {error}] = useMutation(LOGIN_USER);
    
    useEffect(() => {
        if (error) {
            setAlert(true);
        } else {
            showAlert(false);
        }
    }, [error]);

    const inputHandler = (event) => {
        const {name, value} = event.target;
        setUserData({...addUser, [name]: value});
    };

    const submitHandler = async (event) => {
        event.preventDefault();

    const form = event.currentTarget;
    if (form.checkValidity()===false) {
        event.preventDefault();
        event.stopPropagation();
    }
    try {
        const {data} = await login({
            variables: {...addUser},
        });
        Auth.login(data.addUser.token);
    } catch (error) {
        console.log(error);
    };
    };
    return (
        <>
      <Form noValidate validated={validated} onSubmit={submitHandler}>
        <Alert
          dismissible
          onClose={() => showAlert(false)}
          show={showAlert}
          variant="danger"
        >
          Something went wrong with your login credentials!
        </Alert>
        <Form.Group className='mb-3'>
          <Form.Label htmlFor="email">Email</Form.Label>
          <Form.Control
            type="text"
            placeholder="Your email"
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
          disabled={!(userData.email && userData.password)}
          type="submit"
          variant="success"
        >
          Submit
        </Button>
      </Form>
    </>
    );
};

export default LoginForm;