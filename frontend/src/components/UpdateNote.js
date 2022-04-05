import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import ReactMarkdown from 'react-markdown';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { deleteNote, updateNote } from '../actions/noteAction';
import ErrorMessage from './ErrorMessage';
import HomeScreen from './HomeScreen';
import Loading from './Loading';

const CreateNote = () => {

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [category, setCategory] = useState("");
    const [date, setDate] = useState("");
    const navigate= useNavigate();
    const params = useParams();

    const dispatch = useDispatch();

    const noteUpdate = useSelector((state) => state.noteUpdate);
    const{ loading, error, success} = noteUpdate;

    
     useEffect(() => {
    const fetching = async () => {
      const { data } = await axios.get(`/api/notes/${params.id}`);

      setTitle(data.title);
      setContent(data.content);
      setCategory(data.category);
      setDate(data.updatedAt);
    };

    fetching();
  }, [params.id, date]);

    const resetHandler = (e) => {
        setTitle("");
        setCategory("");
        setContent("");
    }

    const updatehandler = (e) => {

        e.preventDefault();
        
        dispatch(updateNote(params.id, title,content,category));
        if (!title || !content || !category) return;
        

        resetHandler();
        navigate("/mynotes");

    }

    const noteDelete = useSelector((state) => state.noteDelete);
    const {
        loading: loadingDelete,
        error: errorDelete,
        success: successDelete
    } = noteDelete;

    const deletehandle = (id) => {
        if (window.confirm("Are sure you?")) {
            dispatch(deleteNote(id));
        }
        navigate("/mynotes");
    }




  return (
    <HomeScreen title="Update Note">

        <Card className="text-start mt-4">
            <Card.Header>Update a Note</Card.Header>

            <Card.Body>
                
                <Form className='mx-3' onSubmit={updatehandler}>
                    {loadingDelete && <Loading/>}
                    {errorDelete && <ErrorMessage variant='danger'>{errorDelete}</ErrorMessage>}
                    {error && <ErrorMessage variant='danger'>{error}</ErrorMessage>}

                    <Form.Group className="mb-3" controlId="name">
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
                    <Button className="mx-2"variant = "danger" 
                        onClick={() => deletehandle(params.id)} 
                    >
                        Delete Note
                    </Button>
                    <Button variant="primary" type="submit">
                        Update Note
                    </Button>

                </Form>

            </Card.Body>

            <Card.Footer className="text-muted">
                Updated On - {date.substring(0,10)}
            </Card.Footer>
        </Card>

    </HomeScreen>
  )
}

export default CreateNote