import React, { Component } from 'react';
import { FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import { connect } from 'react-redux';
import { registerAction, redirect } from '../../actions/authActions';

const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const minPasswordLength = 5;
const strongPasswordLength = 10;

class RegisterPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            email: '',
            password: '',
            repeat: '',
            errors: [],
            errorMessage: ''
        };

        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }

    onChangeHandler(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmitHandler(e) {
        e.preventDefault();
        const validationMessages = [];
        let hasErrors = false;
        if (this.state.username.trim() === '') {
            validationMessages.push('Username cannot be empty.');
            hasErrors = true;
        }
        if (this.getEmailValidationState() === null || this.getEmailValidationState() === 'error') {
            validationMessages.push('Email cannot be empty and must be valid.');
            hasErrors = true;
        }
        if (this.getPasswordValidationState('password') === 'error' || this.getPasswordValidationState('password') === null) {
            validationMessages.push('Password must be at least 5 symbols long.');
            hasErrors = true;
        }
        if (this.state.password !== this.state.repeat) {
            validationMessages.push('Passwords must match');
            hasErrors = true;
        }
        this.setState((prevState) => ({ errors: validationMessages }));
        if (!hasErrors) {
            this.props.register(this.state.username, this.state.email, this.state.password);
        }
    }

    getEmailValidationState() {
        if (this.state.email === '') {
            return null;
        }
        const isValid = emailRegex.test(this.state.email.toLowerCase());
        if (isValid) {
            return 'success';
        } else {
            return 'error'
        }
    }

    getPasswordValidationState(name) {
        const length = this.state[name].length;
        if (length > strongPasswordLength) {
            return 'success';
        } else if (length >= minPasswordLength) {
            return 'warning';
        } else if (length > 0) {
            return 'error';
        }
        return null;
    }

    componentWillReceiveProps(newProps) {
        if(newProps.errorMessage){
            this.setState({errorMessage: newProps.errorMessage})
        }

        if (newProps.registerSuccess) {
            this.props.redirect();
            this.props.history.push('/login');
        }
    }

    render() {
        return (
            <div className="container auth-container">
                <h1 id='registerTitle'>Register</h1>
                {this.state.errorMessage ? <h2 className='validation-error'>{this.state.errorMessage}</h2> : null}
                {
                    this.state.errors.length > 0 
                    ? 
                    this.state.errors.map((e, i) => {
                        return <p key={i} className='validation-error'>{e}</p>;
                    }) 
                    :
                    null
                }
                <form onSubmit={this.onSubmitHandler}>
                    <FormGroup controlId='username'>
                        <ControlLabel>Username</ControlLabel>
                        <FormControl
                            name='username'
                            type="text"
                            value={this.state.username}
                            placeholder="Enter username"
                            onChange={this.onChangeHandler}
                        />
                    </FormGroup>
                    <FormGroup controlId='email' validationState={this.getEmailValidationState()}>
                        <ControlLabel>Email</ControlLabel>
                        <FormControl
                            name='email'
                            type="email"
                            value={this.state.email}
                            placeholder="Enter email"
                            onChange={this.onChangeHandler}
                        />
                    </FormGroup>
                    <FormGroup controlId='password' validationState={this.getPasswordValidationState('password')}>
                        <ControlLabel>Password</ControlLabel>
                        <FormControl
                            name='password'
                            type="password"
                            value={this.state.password}
                            placeholder="Enter text"
                            onChange={this.onChangeHandler}
                        />
                        <FormControl.Feedback />
                    </FormGroup>
                    <FormGroup controlId='repeat' validationState={this.getPasswordValidationState('repeat')}>
                        <ControlLabel>Repeat Password</ControlLabel>
                        <FormControl
                            name='repeat'
                            type="password"
                            value={this.state.repeat}
                            placeholder="Enter text"
                            onChange={this.onChangeHandler}
                        />
                        <FormControl.Feedback />
                    </FormGroup>
                    <FormControl
                        className='btn btn-default'
                        type="submit"
                        value='Submit'
                    />
                </form>
            </div>
        );
    }
}

function mapState(state) {
    return {
        registerSuccess: state.register.success,
        errorMessage: state.register.message
    };
}

function mapDispatch(dispatch) {
    return {
        register: (username, email, password) => dispatch(registerAction(username, email, password)),
        redirect: () => dispatch(redirect())
    };
}

export default connect(mapState, mapDispatch)(RegisterPage);