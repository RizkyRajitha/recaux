import React, { Component } from 'react';
import Logo from './logo.jpg';
import './Login-ref.css';
import Login from './login';

class LoginPage extends Component {
    render(){
        return (
            <div className="container">
                <header className="main_header">
                    <div className="logo_container">
                        <img src={Logo} alt="Logo" className="logo"/>
                        <h1 className="logo_name">Rec@auxenta</h1>
                    </div>
                </header>
                <Login />
                <footer className="footer_container">
                    <a href="/" className="footer_link" >Terms & condition</a>
                    <a href="/" className="footer_link" >Contact us</a>
                </footer>
            </div>
        );
    }
}

export default LoginPage;