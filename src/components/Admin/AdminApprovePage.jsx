import React, { Component } from 'react';
import { Jumbotron, Grid, Row, Button } from 'react-bootstrap';
import ShortRecipe from '../Recipe/ShortRecipe';
import { getMostRecentNotApprovedRecipesAction } from '../../actions/recipeActions';
import { connect } from 'react-redux';

class AdminApprovePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recipes: [],
            masterTokenInput: '',
            masterToken: localStorage.getItem('masterToken') || ''
        };
    }

    componentDidMount() {
        if (this.state.masterToken) {
            this.props.get();
        }
    }

    componentWillReceiveProps(newProps) {
        if (newProps.recipes) {
            this.setState({ recipes: newProps.recipes });
        }
    }

    onChangeHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    onMasterTokenEntered = (ev) => {
        ev.preventDefault();
        localStorage.setItem('masterToken', this.state.masterTokenInput);
        this.setState({ masterToken: localStorage.getItem('masterToken') });
        this.props.get();
    }

    render() {
        let elementToRender;
        if (this.state.masterToken) {
            elementToRender = (
                <Grid fluid>
                    <Jumbotron>
                        <p style={{ 'textAlign': 'center' }}>Welcome to the admin panel</p>
                        <p style={{ 'textAlign': 'center' }}>Here you can approve / delete the newest recipes</p>
                    </Jumbotron>
                    <Row>
                        {this.state.recipes.map(p => {
                            return <ShortRecipe isInHome key={p._id} {...p} >
                                <div className='center'>
                                    <Button bsStyle="success">Approve</Button>
                                    <Button bsStyle="danger">Delete</Button>
                                </div>
                            </ShortRecipe>
                        })};
                </Row>
                </Grid>)
        } else {
            elementToRender = (
                <form className="secret-wrapper" onSubmit={this.onMasterTokenEntered}>
                    <label id="master-secret-label" htmlFor="master-secret">Master secret:</label>
                    <input name='masterTokenInput' onChange={this.onChangeHandler} value={this.state.masterTokenInput} className="form-control input-center" id="master-secret" type="text" placeholder="Input master secret here" />
                    <input type='submit' value='submit' className="btn btn-lg send-secret-btn" />
                </form>
            )
        }
        return (
            elementToRender
        );
    }
};

function mapState(state) {
    return {
        masterToken: state.admin.token,
        recipes: state.admin.recipes
    };
};

function mapDispatch(dispatch) {
    return {
        get: () => dispatch(getMostRecentNotApprovedRecipesAction())
    };
};

export default connect(mapState, mapDispatch)(AdminApprovePage);