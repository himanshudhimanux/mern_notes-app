import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

function Footer() {
  return (
    <footer>
        <Container>
          <Row>
            <Col className="copyright py-3">Copyright &copy; NoteIT-2022</Col>
          </Row>
        </Container>
    </footer>
  )
}

export default Footer