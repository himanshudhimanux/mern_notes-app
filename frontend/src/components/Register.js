import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../actions/userAction';
import ErrorMessage from './ErrorMessage';
import HomeScreen from './HomeScreen';
import Loading from './Loading';

const Register = () => {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [pic, setPic] = useState("https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] =  useState("");
    const [picmessage, setPicMessage] = useState("");

    const dispatch = useDispatch();
    const userRegister = useSelector((state) => state.userRegister);
    const {loading, error, userInfo} = userRegister;

    const navigate = useNavigate();

    useEffect(() => {
        if (userInfo) {
            navigate("/mynotes");
        }
    }, [navigate, userInfo]);


    const postDetails = (pics) => {
        if (pics ==="https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg" ) 
        {
        return setPicMessage("Please Select an Image");
        }
      setPicMessage(null);
      if (pics.type === "image/jpeg" || pics.type === "image/png") {
          const data = new FormData();
          data.append("file", pics);
          data.append("upload_preset", "noteit");
          data.append("cloud_name", "himanshudhiman");
          fetch("https://api.cloudinary.com/v1_1/himanshudhiman/image/upload", {
                  method: "post",
                  body: data,
              })
              .then((res) => res.json())
              .then((data) => {
                  setPic(data.url.toString());
                //   console.log(pic);
              })
              .catch((err) => {
                  console.log(err);
              });
      } else {
          return setPicMessage("Please Select an Image");
      }
    };

    const submitHandler = (e) => {
        e.preventDefault();

        if(password !== confirmPassword){
            setMessage("Password do not match")
        }else{
            dispatch(register(name, email, password, pic));
        }
        
    }

  return (

    <HomeScreen title="Register">
        
        <Row className="justify-content-center">
            <Col md={8}>

                

                <Form className='mt-5' onSubmit={submitHandler}>
                    {error && <ErrorMessage variant='danger'>{error}</ErrorMessage>}
                    {message && <ErrorMessage variant='danger'>{message}</ErrorMessage>}
                    {loading && <Loading/>}

                    <Form.Group className="mb-3" controlId="formBasicname">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter name" value={name} onChange={(e) => setName(e.target.value)} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="confirmPassword">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
                    </Form.Group>

                    {picmessage && (<ErrorMessage variant='danger'>{picmessage}</ErrorMessage>)}
                    <Form.Group controlId="pic" className="mb-3">
                        <Form.Label>Upload Profile Picture</Form.Label>
                        <Form.File 
                            onChange={(e) => postDetails(e.target.files[0])}
                            type = "file"
                            label = "Upload Profile Picture"
                            custom="true"
                        />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Register
                    </Button>

                </Form>

                <Row className="py-3">
                    <Col md={8}>
                        <p>Already have an Account <Link to="/login" style={{color:"blue"}}>LogIn Here</Link></p>
                    </Col>
                </Row>

            </Col>
        </Row>

    </HomeScreen>

  )
}

export default Register;