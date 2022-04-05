import React from 'react';
import { Container, Row } from 'react-bootstrap';

const HomeScreen = ({title,children}) => {
  return (
    <div>
      <Container>
        <Row>
          <div className="pageheading">
            {
              title && (
                <>
                  <h1 className='heading'>{title}</h1>
                  <hr/>
                </>
              )}
              {children}
          </div>
        </Row>
      </Container>
    </div>
  )
}

export default HomeScreen;