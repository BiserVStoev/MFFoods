import React, { Component } from 'react';
import { Jumbotron, Grid, Row } from 'react-bootstrap';
import ShortRecipe from '../Recipe/ShortRecipe';
import { getMostRecentApprovedRecipesAction } from '../../actions/recipeActions';
import { connect } from 'react-redux';

class HomePage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            mostRecentRecipes: []
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.mostRecentRecipes) {
            this.setState({ mostRecentRecipes: nextProps.mostRecentRecipes });
        }
    }

    componentDidMount() {
        if (localStorage.getItem('authToken') != null) {
            this.props.get();
        }
    }

    render() {
        return (
            <Grid fluid>
                <Jumbotron>
                    <img id='recipes-banner' alt='recipes-banner' src='/recipes-banner.jpg' />
                </Jumbotron>
                {
                    localStorage.getItem('authToken') != null
                    &&
                    <section>
                        <h2 className='home-section-title'>Most Recently Added Foods</h2>
                        <Row>
                            {
                                this.state.mostRecentRecipes.map(r => {
                                    return <ShortRecipe isInHome key={r._id} {...r} />
                                })}
                        </Row>
                    </section>
                }
            </Grid>
        );
    }
};


function mapState(state) {
    return {
        mostRecentRecipes: state.home.mostRecentRecipes
    };
};

function mapDispatch(dispatch) {
    return {
        get: () => dispatch(getMostRecentApprovedRecipesAction())
    };
};

export default connect(mapState, mapDispatch)(HomePage);;