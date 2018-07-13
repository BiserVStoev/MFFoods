import React, { Component } from 'react';
import { FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import { connect } from 'react-redux';
import { loginAction, redirect } from '../../actions/authActions';

const minPasswordLength = 5;

class LoginPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
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
        let hasErrors = false;
        const validationMessages = [];
        if (this.state.username.trim() === '') {
            validationMessages.push('Username cannot be empty.');
            hasErrors = true;
        }
        if (this.state.password.length < minPasswordLength) {
            validationMessages.push('Password must be at least 5 symbols long.');
            hasErrors = true;
        }
        this.setState((prevState) => ({ errors: validationMessages }));
        if (!hasErrors) {
            this.props.login(this.state.username, this.state.password);
        }
    }

    componentWillReceiveProps(newProps) {
        console.log(newProps)
        if(newProps.errorMessage){
            this.setState({errorMessage: newProps.errorMessage})
        }
        
        if (newProps.loginSuccess) {
            this.props.redirect();
            this.props.history.push('/');
        }
    }

    render() {
        return (
            <div className="container">
                <h1 id='registerTitle'>Login</h1>
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
                    <FormGroup controlId='password'>
                        <ControlLabel>Password</ControlLabel>
                        <FormControl
                            name='password'
                            type="password"
                            value={this.state.password}
                            placeholder="Enter text"
                            onChange={this.onChangeHandler}
                        />
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
        loginSuccess: state.login.success,
        errorMessage: state.login.message
    };
}

function mapDispatch(dispatch) {
    return {
        login: (email, password) => dispatch(loginAction(email, password)),
        redirect: () => dispatch(redirect())
    };
}

export default connect(mapState, mapDispatch)(LoginPage);