import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const LandingPage = () => {

    const navigate = useNavigate();

     useEffect(() => {
         const userInfo = localStorage.getItem("userInfo");

         if (userInfo) {
             navigate("/mynotes");
         }

     }, [navigate]);

  return (
      <>
    <div className='landing-page'>
        <div className='container'>
            <div className='content-card'>
                <div className='row justify-content-center'>
                    <div className='col-md-8 col-xs-12 col-sm-12'>
                        <div className='Landing-page-title'>
                            <h1>Welcome to Note-it</h1>
                        </div>
                        <div className='Landing-page-subtitle'>
                            <p>One Safe Place for all Your Notes</p>
                        </div>
                    </div>
                </div>
                <div className='row justify-content-center'>
                    <div className='col-md-6 col-xs-12 col-sm-12'>
                        <div className='lading-page-buttons'>
                            <Link to="/login" className='btn btn-lg btn-primary'>LOG IN</Link>
                            <Link to="/register" className='btn btn-lg btn-outline-primary'>REGISTER</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default LandingPage