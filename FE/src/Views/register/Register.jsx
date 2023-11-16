import React, { useState, useEffect } from 'react';
// import axios from 'axios';
import Form from 'react-bootstrap/Form';
import MyNav from '../../components/nav/MyNav';
import Container from 'react-bootstrap/esm/Container';
import Button from 'react-bootstrap/Button';
import { toast } from 'react-toastify';
import { registerNewUser } from '../../service/userService';
import { useNavigate } from 'react-router-dom';
export default function Register() {

    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [userName, setUserName] = useState("");
    const defaultValidInput = {
        isValidUserName: true,
        isValidEmail: true,
        isValidPassword: true,
        isValidPassword2: true
    }

    const [objCheckValid, setObjCheckValid] = useState(defaultValidInput);
    useEffect(() => {

    }, []);

    const validateEmail = (email) => {
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
    }

    const isValidInput = () => {
        setObjCheckValid(defaultValidInput);

        if (!userName) {
            toast.error("Required User name");
            setObjCheckValid({ ...defaultValidInput, isValidUserName: false });
            return false;
        }

        if (!email || !validateEmail(email)) {
            toast.error("Required email");
            setObjCheckValid({ ...defaultValidInput, isValidEmail: false });
            return false;
        }
        if (!password) {
            toast.error("Required password");
            setObjCheckValid({ ...defaultValidInput, isValidPassword: false });
            return false;
        }

        if (!password2) {
            toast.error("Required password 2");
            setObjCheckValid({ ...defaultValidInput, isValidPassword2: false });
            return false;
        }

        if (password !== password2) {
            toast.error("Passwords are not the same!");
            setObjCheckValid({ ...defaultValidInput, isValidPassword2: false, isValidPassword: false });
            return false;
        }
        return true;
    }

    const handelRegister = async () => {
        const check = isValidInput();
        if (check === true) {
            // let userData = { email, password, password2, userName };
            // console.log(userData);
            let res = await registerNewUser(email, password, password2, userName);
            let serverData = res.data;
            if (+serverData.EC === 0) {
                toast.success(serverData.message);
                navigate('/');
            } else {
                toast.error(serverData.message);
            }
        }
    }
    return (
        <>
            <MyNav />
            <Container className='mt-4 login-page'>
                <div className='row'>
                    <div className='col-3'></div>
                    <div className='col-6'>
                        <h1 className='header-login'>Register</h1>
                        <Form>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput4" >
                                <Form.Label>Name User</Form.Label>
                                <Form.Control
                                    type="text" placeholder="ex: admin123"
                                    value={userName} onChange={(event) => setUserName(event.target.value)}
                                    className={objCheckValid.isValidUserName ? 'form-control' : 'form-control is-invalid'}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1" >
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email" placeholder="name@example.com"
                                    value={email} onChange={(event) => setEmail(event.target.value)}
                                    className={objCheckValid.isValidEmail ? 'form-control' : 'form-control is-invalid'}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput2" >
                                <Form.Label>Enter password</Form.Label>
                                <Form.Control
                                    type="password" placeholder="Enter your password"
                                    value={password} onChange={(event) => setPassword(event.target.value)}
                                    className={objCheckValid.isValidPassword ? 'form-control' : 'form-control is-invalid'}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput3" >
                                <Form.Label>Enter the password</Form.Label>
                                <Form.Control
                                    type="password" placeholder="Enter your password"
                                    value={password2} onChange={(event) => setPassword2(event.target.value)}
                                    className={objCheckValid.isValidPassword2 ? 'form-control' : 'form-control is-invalid'}
                                />
                            </Form.Group>
                            <Button variant="success" onClick={() => handelRegister()}>Submit</Button>
                            <Button variant="primary" className='ms-2'>Login</Button>
                        </Form>
                    </div>
                    <div className='col-3'></div>
                </div>
            </Container>
        </>
    )
}
