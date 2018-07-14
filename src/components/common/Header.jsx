import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

class Header extends Component {
    render() {
        const { loggedIn } = this.props;
        return (
            <header>
                <Navbar collapseOnSelect className='navbar-nowrap-fix'>
                    <Navbar.Header>
                        <Navbar.Brand >
                            <NavLink activeClassName='none' to='/'>MF Foods</NavLink>
                        </Navbar.Brand>
                        <Navbar.Toggle />
                    </Navbar.Header>
                    <Navbar.Collapse>
                        <Nav pullRight>
                            {
                                loggedIn &&
                                <NavItem>Hello, {localStorage.getItem('user')}</NavItem>
                            }
                             {
                                loggedIn && localStorage.getItem('roles').split(',').indexOf('Admin') !== -1 &&
                                <LinkContainer exact activeClassName='active' to='/admin' >
                                    <NavItem eventKey={10}>Admin Panel</NavItem>
                                </LinkContainer>
                            }
                            <LinkContainer exact activeClassName='active' to='/' >
                                <NavItem eventKey={1}>Home</NavItem>
                            </LinkContainer>
                            {
                                !loggedIn &&
                                <LinkContainer exact activeClassName='active' to='/login' >
                                    <NavItem eventKey={2}>Login</NavItem>
                                </LinkContainer>
                            }

                            {
                                !loggedIn &&
                                <LinkContainer exact activeClassName='active' to='/register' >
                                    <NavItem eventKey={3}>Register</NavItem>
                                </LinkContainer>
                            }
                            {
                                loggedIn &&
                                <LinkContainer exact activeClassName='active' to='/create/recipe' >
                                    <NavItem eventKey={4}>New Recipe</NavItem>
                                </LinkContainer>
                            }
                            {
                                loggedIn &&
                                <LinkContainer exact activeClassName='active' to='/profile' >
                                    <NavItem eventKey={5}>My profile</NavItem>
                                </LinkContainer>
                            }
                            {
                                loggedIn &&
                                <LinkContainer exact activeClassName='active' to='/logout' >
                                    <NavItem eventKey={9999}>Logout</NavItem>
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