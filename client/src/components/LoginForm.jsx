import { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";
import Auth from "../utils/auth";
import { Form, Button } from "react-bootstrap";

const LoginForm = () => {
  const [userData, setUserData] = useState({ email: "", password: ""});

 
  const [login, { error }] = useMutation(LOGIN_USER);

  useEffect(() => {
    if (error) {
      console.log(error)
}}, [error]);

  const inputHandler = (event) => {
    const { name, value } = event.target;
    setUserData({ ...userData, [name]: value });
  };

  const submitHandler = async (event) => {
    event.preventDefault();
  
    try {
      const { data } = await login({
        variables: { ...userData },
      });
      Auth.login(data.login.token);
      setUserData({
        email: "",
        password: "",
      });
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <>
      <Form onSubmit={submitHandler}>
      
        <Form.Group className="mb-3">
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

        <Form.Group className="mb-3">
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
