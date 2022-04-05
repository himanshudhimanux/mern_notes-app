import React from 'react'
import { Container, Form, FormControl, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../actions/userAction';
import { useEffect } from 'react';

function Header({setSearch}) {

  const dispatch =  useDispatch();
  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const {userInfo} = userLogin;

  const logoutHandler = () =>{
    dispatch(logout());
    navigate("/");
  }

  useEffect(() => {}, [userInfo]);

  return (
   
    <Navbar bg="primary" className='text-white' expand="lg" variant='dark'>
  <Container>
    <Navbar.Brand>
      <Link to="/">
        <h2 className='mb-0'>Note it</h2>
      </Link>
    </Navbar.Brand>
    <Navbar.Toggle aria-controls="navbarScroll" />
    <Navbar.Collapse id="navbarScroll">
      <Nav
        className="m-auto my-2 my-lg-0"
        style={{ maxHeight: '100px' }}
        navbarScroll
      >
        

        <Form className="d-flex search-input">
          <FormControl
            type="search"
            placeholder="Search"
            className="me-0"
            aria-label="Search"
            onChange={(e) => setSearch(e.target.value)}
          />
        </Form>

      </Nav>

        {userInfo?<Nav>
          <Link className='nav-link' to="/mynotes"> My Notes </Link>
          <NavDropdown title={userInfo?.name} id="navbarScrollingDropdown" >
              <Link className='dropdown-item' to="/profile">My Profile</Link>
              <NavDropdown.Item onClick={logoutHandler}>Log Out</NavDropdown.Item>
          </NavDropdown>
        </Nav>
        :
        <Nav>
          <Link className='nav-link' to="/login"> Login</Link>
        </Nav>
        }

    </Navbar.Collapse>
  </Container>
</Navbar>

  )
}

export default Header;