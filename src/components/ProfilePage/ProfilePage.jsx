import React, { Component } from 'react';
import { Jumbotron, Grid, Row, Pager } from 'react-bootstrap';
import ShortRecipe from '../Recipe/ShortRecipe';
import { getInitialUserDataAction, getUserOwnRecipesSuccessAction } from '../../actions/recipeActions';
import { connect } from 'react-redux';

class ProfilePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currPage: 1,
            approvedRecipes: 0,
            notApprovedRecipes: 0,
            totalRecipes: 0,
            recipes: [],
        };
    }

    changePage = (type) => {
        if (type === 'increment') {
            if (this.state.currPage * 4 >= this.state.totalRecipes) {
                return;
            }

            this.setState((prevState) => ({ currPage: prevState.currPage + 1 }),
                () => {
                    this.props.next(this.state.currPage - 1)
                });
        } else {
            if (this.state.currPage === 1) {
                return;
            }

            this.setState((prevState) => ({ currPage: prevState.currPage - 1 }),
                () => {
                    this.props.next(this.state.currPage - 1)
                });
        }
    }

    componentWillReceiveProps(newProps) {
        console.log(newProps)
        if (newProps.recipes) {
            this.setState({ recipes: newProps.recipes });
        } else if (newProps.initialData) {
            const currData = newProps.initialData;
            this.setState({
                recipes: currData.recipesData,
                totalRecipes: currData.totalRecipesLength,
                approvedRecipes: currData.approvedRecipesLength,
                notApprovedRecipes: currData.notApprovedRecipesLength
            });
        }
    }

    componentDidMount() {
        this.props.get();
    }

    render() {
        return (
            <Grid fluid>
                <Jumbotron>
                    <p style={{ 'textAlign': 'center' }}>{localStorage.getItem('user')}'s Profile</p>
                    <p>Email: {localStorage.getItem('email')}</p>
                    <p>Number of approved recipes: {this.state.approvedRecipes}</p>
                    <p>Number of not approved recipes yet: {this.state.notApprovedRecipes}</p>
                </Jumbotron>
                <h2 style={{ 'textAlign': 'center' }}>My recipes</h2>
                <Row>
                    {this.state.recipes.map(p => {
                        return <ShortRecipe key={p._id} {...p} />
                    })};
                </Row>
                <Pager>
                    <Pager.Item onClick={() => this.changePage('decrement')} className={this.state.currPage === 1 ? 'disabled' : ''} href="#">Previous</Pager.Item>{' '}
                    <Pager.Item onClick={() => this.changePage('increment')} className={(this.state.currPage * 4) >= this.state.totalRecipes ? 'disabled' : ''} href="#">Next</Pager.Item>
                </Pager>;
            </Grid>
        );
    }
};

function mapState(state) {
    return {
        initialData: state.user.initialData,
        recipes: state.user.recipes
    };
};

function mapDispatch(dispatch) {
    return {
        get: () => dispatch(getInitialUserDataAction()),
        next: (page) => dispatch(getUserOwnRecipesSuccessAction(page))
    };
};

export default connect(mapState, mapDispatch)(ProfilePage);;