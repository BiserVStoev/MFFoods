import React, { Component } from 'react';
import Input from '../common/Input';
import { FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap';
import { connect } from 'react-redux';
import { registerAction, redirect } from '../../actions/authActions';


class RegisterPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            email: '',
            password: '',
            repeat: ''
        };

        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }

    onChangeHandler(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmitHandler(e) {
        e.preventDefault();
        this.props.register(this.state.name, this.state.email, this.state.password);
    }

    componentWillReceiveProps(newProps) {
        if (newProps.registerSuccess) {
            this.props.redirect();
            this.props.history.push('/login');
        }
    }

    render() {
        return (
            <div className="container">
                <h1>Register</h1>
                <form>
                    <FormGroup controlId="registerForm">
                        <ControlLabel>Working example with validation</ControlLabel>
                        <FormControl
                            controlId='username'
                            type="text"
                            value={this.state.username}
                            placeholder="Enter username"
                            onChange={this.handleChange}
                        />
                        <br/>
                        <ControlLabel>Working example with validation</ControlLabel>
                         <FormControl
                            type="text"
                            value={this.state.email}
                            placeholder="Enter email"
                            onChange={this.handleChange}
                        />
                        <br/>
                        <ControlLabel htmlFor='registerPassword'>Working example with validation</ControlLabel>
                         <FormControl
                            id='registerPassword'
                            type="password"
                            value={this.state.repeat}
                            placeholder="Enter text"
                            onChange={this.handleChange}
                        />
                        <FormControl.Feedback />
                    </FormGroup>
                </form>
            </div>
        );
    }
}

function mapState(state) {
    return {
        registerSuccess: state.register.success
    };
}

function mapDispatch(dispatch) {
    return {
        register: (name, email, password) => dispatch(registerAction(name, email, password)),
        redirect: () => dispatch(redirect())
    };
}

export default connect(mapState, mapDispatch)(RegisterPage);