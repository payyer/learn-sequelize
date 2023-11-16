import React, { useState } from 'react';
import './Login.scss';
import Form from 'react-bootstrap/Form';
import MyNav from '../../components/nav/MyNav';
import Container from 'react-bootstrap/esm/Container';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import { loginUser } from '../../service/userService';

export default function Login() {

    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const defaultValidInput = {
        isValidEmail: true,
        isValidPassword: true
    }
    const [objCheckValid, setObjCheckValid] = useState(defaultValidInput);

    const validateEmail = (email) => {
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
    }

    const handleOnClickRegister = () => {
        navigate('/register');
    }
    const handleOnClickLogin = async () => {
        if (!email) {
            toast.error('Please enter your email');
            setObjCheckValid({ ...defaultValidInput, isValidEmail: false });
            return;
        }
        if (!email || !validateEmail(email)) {
            toast.error(`It's not an email`);
            setObjCheckValid({ ...defaultValidInput, isValidEmail: false });
            return;
        }
        if (!password) {
            toast.error('Please enter your Password');
            setObjCheckValid({ ...defaultValidInput, isValidPassword: false });
            return;
        }
        if (password && password.length < 6) {
            toast.error('Password need more than 6 character!');
            setObjCheckValid({ ...defaultValidInput, isValidPassword: false });
            return;
        }
        const res = await loginUser(email, password);
        const serverData = res.data;
        console.log(serverData);
        if (serverData.EC === 0) {
            let data = {
                isAuthenticated: true,
                token: 'fake token'
            }
            sessionStorage.setItem('accout', JSON.stringify(data));
            toast.success(serverData.message);
            navigate('/users');
        } else {
            toast.error(serverData.message);
        }
    }
    const handleOnKeyDown = (event) => {
        if (event.code === "Enter") {
            handleOnClickLogin();
        }
    }
    return (
        <>
            <MyNav />
            <Container className='mt-4 login-page'>
                <div className='row'>
                    <div className='col-3'></div>
                    <div className='col-6'>
                        <h1 className='header-login'>Login</h1>
                        <Form>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1" >
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="name@example.com"
                                    value={email}
                                    onChange={(event) => setEmail(event.target.value)}
                                    className={objCheckValid.isValidEmail ? 'form-control' : 'is-invalid form-control'}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput2" >
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(event) => setPassword(event.target.value)}
                                    onKeyDown={(event) => handleOnKeyDown(event)}
                                    className={objCheckValid.isValidPassword ? 'form-control' : 'is-invalid form-control'}
                                />
                            </Form.Group>
                            <Button
                                variant="success"
                                onClick={() => handleOnClickLogin()}
                            > Login</Button>
                            <Button
                                variant="primary"
                                className='ms-2'
                                onClick={() => handleOnClickRegister()}
                            >Register</Button>
                        </Form>
                    </div>
                    <div className='col-3'></div>
                </div>
            </Container>
        </>
    )
}
