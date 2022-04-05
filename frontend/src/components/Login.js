import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import ErrorMessage from './ErrorMessage';
import HomeScreen from './HomeScreen';
import Loading from './Loading';
import { login } from '../actions/userAction';

const Login = () => {

    

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const userLogin =  useSelector(( state ) => state.userLogin);
    const {loading, error, userInfo} = userLogin;

     useEffect(() => {
         if (userInfo) {
             navigate("/mynotes");
         }
     }, [navigate, userInfo]);


    const submitHandler = (e) => {
        e.preventDefault();
        
        dispatch(login(email,password));

    }

   

  return (
      
    <HomeScreen title="LogIn">

        <Row className="justify-content-center">
            <Col md={8}>
                {loading && <Loading/>}
                {error && <ErrorMessage variant='danger'>{error}</ErrorMessage>}
                <Form className='mt-5' onSubmit={submitHandler}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Log In
                    </Button>
                </Form>

                <Row className="py-3">
                    <Col md={8}>
                        <p>Not Registered? <Link to="/register" style={{color:"blue"}}>Register Here</Link></p>
                    </Col>
                </Row>

            </Col>
        </Row>

    </HomeScreen>
  )
}

export default Login;