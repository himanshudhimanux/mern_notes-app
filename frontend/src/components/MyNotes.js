import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {Accordion, Badge, Button, Card} from 'react-bootstrap';
import PageHeading from './HomeScreen';
import { useDispatch, useSelector } from 'react-redux'
import { deleteNote, listNotes } from '../actions/noteAction';
import ErrorMessage from './ErrorMessage';
import Loading from './Loading';


const MyNotes = ({search}) => {

    const dispatch = useDispatch();
    const notelist = useSelector(state => state.notelist);
    const {loading, notes, error} = notelist;
    const navigate = useNavigate();

    const userLogin = useSelector((state) => state.userLogin);
    const {userInfo} = userLogin;

    const noteCreate = useSelector((state) => state.noteCreate);
    const{ success: successCreate } = noteCreate;

    const noteUpdate= useSelector((state) => state.noteUpdate);
    const{ success: successUpdate } = noteUpdate;

    const noteDelete = useSelector((state) => state.noteDelete);
    const{loading:loadingDelete, error:errorDelete, success:successDelete} = noteDelete;

  const deletehandle = (id) => {
      if(window.confirm("Are sure you?")){
        dispatch(deleteNote(id));
      }
  }

  useEffect(() => {
    dispatch( listNotes() );

    if(!userInfo){
      navigate('/');
    }

  }, [dispatch, successCreate, navigate, userInfo, successDelete, successUpdate]);


  return (
    <PageHeading className="mb-5" title={`Welcome ${userInfo?.name}`}><h4 className='m-0'>My Notes</h4>
    
        <div className="row justify-content-end">
          <div className="col-md-2 col-xs-12 col-sm-12 text-end">
            <Link to="/createNote">
              <button className="btn btn-primary mt-3">Create Note</button>
            </Link>
          </div>
        </div>

        {loading && <Loading/>}
        {loadingDelete && <Loading/>}
        {errorDelete && <ErrorMessage variant='danger'>{errorDelete}</ErrorMessage>}
        {error && <ErrorMessage variant='danger'>{error}</ErrorMessage>}
        

        {
          notes?.reverse().filter((filterNote) =>
            filterNote.title.toLowerCase().includes(search.toLowerCase())
          ).map(note => (

            <Accordion key={note._id}>
                <Card className="mt-4">
                    <Card.Header  className = "d-flex justify-content-between align-items-center" >
                        <Accordion.Header eventkey={0}>
                          <h5 className="note-title mb-0">{note.title}</h5>
                        </Accordion.Header>
                      <div className="action-btns">
                        <Button href={`/note/${note._id}`} className="btn btn-sm btn-primary">Edit</Button>
                        <button className="btn btn-sm btn-outline-danger" onClick={() => deletehandle(note._id)}>
                          Delete
                        </button>
                      </div>
                    </Card.Header>
                    
                    <Accordion.Body>
                        <Card.Body>

                        <Badge className="mb-2 bg-success" variant="success">
                          {note.category}
                        </Badge>

                        <p>
                          {note.content}
                        </p>
                        <footer>
                            Created on{" "}
                            <cite className='created-date' title='Source Title'>
                              {note.createdAt.substring(0,10)}
                            </cite>
                        </footer>
                          
                    </Card.Body>
                    </Accordion.Body>
                </Card>
            </Accordion>

          ))
        }

        
      
    </PageHeading>
  )
}

export default MyNotes;
