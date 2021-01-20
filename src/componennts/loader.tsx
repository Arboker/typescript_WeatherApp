import React from 'react';
import '../css/loader.css'

const Loader: React.FC = () => {
    return (
        <div className="loader_block">
            <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="svg_loader">
                <circle cx="50" cy="50" r="35" className="circle_loader" />
            </svg>
        </div>
    )
}

export default Loader;