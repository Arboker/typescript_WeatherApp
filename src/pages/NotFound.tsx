import React from 'react';
import Search from '../Search'

import ErrorImage from '../img/error.png'

const NotFound: React.FC = () => {
    return (
        <div>
            <Search search="" />

            <div className="error_weather" style={{marginTop: 50}}>
                <div className="error_weather">
                    <img src={ErrorImage} alt="Error" className="error_image" />
                    <span className="error_text">The data was not found!</span>
                </div>
            </div>
        </div>
    )
}

export default NotFound;