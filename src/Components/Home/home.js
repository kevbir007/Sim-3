import React from 'react';
import { Link } from 'react-router-dom';
import './home.css'

export default class Home extends React.Component {
    constructor() {
        super();

    }

    render() {
        return (
            <div className='Home-body'>
                <div className='Center-container'>
                    <div className='Logo'></div>
                    <div className='Helo-text-1'>Helo</div>
                    <a href='http://localhost:3001/login'>
                        <div className='Login'>
                            <p className='Login-text' style={{'text-decoration': 'none'}}>Login / Register</p>
                        </div>
                    </a>
                </div>
            </div>
        )
    }
}