import React, {Component} from 'react'
import {Link} from 'react-router-dom';
import './header.css';

class Header extends Component {
    render(){
        return (
            <div className="head">
                <div className="center clearfix">
                    <h1 className="logo">Coindata</h1>
                    <ul className="gnb clearfix">
                        <li><Link to="/coinone">Coinone</Link></li>
                        <li><Link to="/bithumb">Bithumb</Link></li>
                    </ul>
                </div>
            </div>
        );
    }
}

export default Header;