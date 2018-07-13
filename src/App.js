import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import RegisterPage from './components/Auth/RegisterPage';
import LoginPage from './components/Auth/LoginPage';
import HomePage from './components/HomePage/HomePage';
import { connect } from 'react-redux';
import { logoutAction } from './actions/authActions';
import LogoutPage from './components/Auth/LogoutPage';

class App extends Component {
    constructor(props) {
        super(props);

        this.onLogout = this.onLogout.bind(this);
    }

    onLogout() {
        this.props.logout();
        this.props.history.push('/');
    }

    render() {
        return (
           <div className="App">
               <Header loggedIn={localStorage.getItem('authToken') != null} onLogout={this.onLogout} />
               <Switch>
                   <Route exact path="/" component={HomePage} />
                   <Route exact path="/login" component={LoginPage} />
                   <Route exact path="/register" component={RegisterPage} />
                   <Route exact path="/logout" render={() => {
                       return <LogoutPage onLogout={this.onLogout}/>
                   }} />
               </Switch>
               <Footer/>
           </div>
        );
    }
}

function mapState(state) {
    return {};
}

function mapDispatch(dispatch) {
    return {
        logout: () => dispatch(logoutAction())
    };
}


export default withRouter(connect(mapState, mapDispatch)(App));