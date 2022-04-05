import React , { useState,useEffect } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import HomeScreen from './HomeScreen';
import {useDispatch, useSelector} from 'react-redux';
import ErrorMessage from './ErrorMessage';
import Loading from './Loading';
import { updateUser } from '../actions/userAction';
import {useNavigate} from 'react-router-dom';


const UserProfile = () => {

    // imported from react redux hook
    const dispatch = useDispatch();

    // imported from react router dom
    const navigate = useNavigate();

    // All States
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [pic, setPic] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [picmessage, setPicMessage] = useState();

    const userLogin = useSelector((state)=> state.userLogin);
    const { userInfo } = userLogin;

    const userUpdate = useSelector((state)=> state.userUpdate);
    const { loading, error, success } =  userUpdate;

     useEffect(() => {
        if (!userInfo) {

            navigate("/");

        } else {

            setName(userInfo.name);
            setEmail(userInfo.email);
            setPic(userInfo.pic);

        }
    }, [navigate, userInfo]);


    const postDetails = (pics) => {
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
            console.log(pic);
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

    dispatch(updateUser({ name, email, password, pic }));
  };

  return (

    <HomeScreen title="User Profile">

        <Row>

            <Col md={6}>

                <Form className='mt-5' onSubmit={submitHandler}>
                    
                    {error && <ErrorMessage variant='danger'>{error}</ErrorMessage>}
                    {loading && <Loading/>}
                    {/* {success && <ErrorMessage variant='success'>Update Succesfully</ErrorMessage>} */}

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
                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>Upload Profile Picture</Form.Label>
                        <Form.Control 
                            onChange={(e) => postDetails(e.target.files[0])}
                            type = "file"
                            label = "Upload Profile Picture"
                            custom="true"
                        />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Update Profile
                    </Button>

                </Form>

            </Col>

            <Col md={6} style={{
                display: "flex",
                justifyContent: "center"
            }}>
              <img src={pic} className="user-profile-img" alt="User Profile Image"/>
            </Col>

        </Row>

    </HomeScreen>
  )
}

export default UserProfile;