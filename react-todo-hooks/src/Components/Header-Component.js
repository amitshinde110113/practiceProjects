import { Component } from "react";
import { Button, Navbar, Nav, Form } from 'react-bootstrap';
import './Header-Component.css';
import authService from "../Serivces/auth-service";

const HeaderComponent = (props) => {
    const user = authService.getCurrentUser()
    const handleLogout = () => {
        authService.logout();
        props.history.push('/')
    }
    const titleCase = (str) => {
        return str.toLowerCase().split(' ').map(function (word) {
            return (word.charAt(0).toUpperCase() + word.slice(1));
        }).join(' ');
    }
    return (
        <Navbar bg="light" variant="light">
            <Navbar.Brand>My Todo App</Navbar.Brand>
            <Nav className="mr-auto">
            </Nav>
            <Form inline>
                <Navbar.Brand className="justify-content-end text-success">Hello  {titleCase(user.name)}</Navbar.Brand>
                <Button variant="outline-danger" onClick={handleLogout} >Logout</Button>
            </Form>
        </Navbar>
    );


}

export default HeaderComponent