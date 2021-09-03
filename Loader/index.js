import React from 'react'
import Loader from "react-loader-spinner";
import './Style.css';

const PageLoader = ({ isLoading }) => {

    return (

        isLoading
            ?<div className="loader-wrapper">
               
                <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
            </div >
            : null 

    )
}

export default PageLoader
