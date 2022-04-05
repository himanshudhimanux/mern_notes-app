import React from 'react'
import { useState } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import ReactMarkdown from 'react-markdown';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createNote } from '../actions/noteAction';
import ErrorMessage from './ErrorMessage';
import HomeScreen from './HomeScreen'
import Loading from './Loading';

const CreateNote = () => {

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [category, setCategory] = useState("");
    const navigate= useNavigate();

    const dispatch = useDispatch();

    const noteCreate = useSelector((state) => state.noteCreate);
    const{ loading, error, note} = noteCreate;

    const submitHandler = (e) => {

        e.preventDefault();
        if (!title || !content || !category) return;
        dispatch(createNote(title,content,category));
        

        resetHandler();
        navigate("/mynotes");

    }

    const resetHandler = (e) => {
        setTitle("");
        setCategory("");
        setContent("");
    }


  return (
    <HomeScreen title="Create Note">

        <Card className="text-start">
            <Card.Header>Create a new Note</Card.Header>

            <Card.Body>
                {error && <ErrorMessage>{error}</ErrorMessage>}
                <Form className='mx-3' onSubmit={submitHandler}>

                    <Form.Group className="mb-3" controlId="title">
                        <Form.Label>Title</Form.Label>
                        <Form.Control type="text" placeholder="Enter Title" value={title} onChange={(e) => setTitle(e.target.value)} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="category">
                        <Form.Label>Category</Form.Label>
                        <Form.Control type="text" placeholder="Enter Category" value={category} onChange={(e) => setCategory(e.target.value)} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="content">
                        <Form.Label>Content</Form.Label>
                        <Form.Control as="textarea" placeholder="Enter Content" rows={5} value={content} onChange={(e) => setContent(e.target.value)}/>
                    </Form.Group>
                    {content && (
                        <Card>
                            <Card.Header>Note Preview</Card.Header>
                            <Card.Body>
                                <ReactMarkdown>{content}</ReactMarkdown>
                            </Card.Body>
                        </Card>
                    )}
                    
                   
                    {loading && <Loading/>}
                    <Button className="mx-2"variant = "danger"onClick = { resetHandler} >
                        Reset
                    </Button>
                    <Button variant="primary" type="submit">
                        Create Note
                    </Button>

                </Form>

            </Card.Body>

            <Card.Footer className="text-muted">
                Creating On - {new Date().toLocaleDateString()}
            </Card.Footer>
        </Card>

    </HomeScreen>
  )
}

export default CreateNote