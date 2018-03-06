import React from 'react';
import { Link } from 'react-router-dom';
import './nav.css';

export default class Nav extends React.Component {
    render() {
        return (
            <div className='Header'>
                <div className='Header-child-container'>
                    <div className='Left-side'>
                        <span className='Helo-text'>Helo</span>
                        <Link to='/dashboard'>
                            <div className='Home-button'></div>
                        </Link>
                        <Link to='/search'>
                            <div className='Search-button'></div>
                        </Link>
                    </div>
                    <span className='Mid-text'>Dashboard</span>
                    <div className='Logout'>
                    <a href='http://localhost:3001/logout' style={{'text-decoration': 'none'}}>
                        <span className='Logout'>Logout</span>
                    </a>
                    </div>
                </div>
            </div>
        )
    }
}