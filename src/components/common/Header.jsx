import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

class Header extends Component {
    render() {
        const { loggedIn, onLogout } = this.props;

        return (
            <header>
                <Navbar collapseOnSelect className='navbar-nowrap-fix'>
                    <Navbar.Header>
                        <Navbar.Brand >
                            <NavLink activeClassName='none' to='/'>MF Foods</NavLink>
                        </Navbar.Brand>
                        <Navbar.Toggle/>
                    </Navbar.Header>
                    <Navbar.Collapse>
                        <Nav pullRight>
                            <LinkContainer exact activeClassName='active' to="/" >
                                <NavItem eventKey={1}>Home</NavItem>
                            </LinkContainer>
                            {
                                loggedIn &&
                                <a href='javascript:void(0)' onClick={onLogout}>Logout</a>
                            }
                            {
                                !loggedIn &&
                                <LinkContainer exact activeClassName='active' to="/login" >
                                    <NavItem eventKey={2}>Login</NavItem>
                                </LinkContainer>
                            }

                            {
                                !loggedIn &&
                                <LinkContainer exact activeClassName='active' to="/register" >
                                    <NavItem eventKey={3}>Register</NavItem>
                                </LinkContainer>
                            }
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </header>
        );
    }
};

export default withRouter(Header);