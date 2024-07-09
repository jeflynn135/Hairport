import { useState } from "react";
import { useEffect } from "react";
import {useMutation} from "@apollo/client";
import Auth from "../utils/auth";

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
        Auth.login(data.addUser.token);
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
)
}