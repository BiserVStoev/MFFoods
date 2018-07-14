import React, { Component } from 'react';
import { Col, Grid, Row } from 'react-bootstrap';
import { getSingleRecipe } from '../../api/remote';
import Ingredient from './partials/Ingredient';
import Instruction from './partials/Instruction';

export default class DetailedRecipe extends Component {
    constructor(props) {
        super(props);

        this.state = {
            picture: '',
            servings: 0,
            protein: 0,
            fat: 0,
            carbs: 0,
            ingredients: [],
            instructions: []
        };
    }

    componentDidMount() {
        getSingleRecipe(this.props.match.params.id).then(data => {
            this.setState({ ...data });
        });
    }

    render() {
        return (
            <Grid >
                <Row>
                    <h2>Here is the title</h2>
                </Row>
                <Row className='vertical-align'>
                    <Col md={6} className='pull-left'>
                        <img style={{ width: '100%' }} alt='cooked-recipe' src={this.state.picture} />
                    </Col>
                    <Col md={4} className='pull-right'>
                        <h3>Info</h3>
                        <Row className='recipe-info'>
                            <Col md={6}>Servings</Col>
                            <Col md={4}>{this.state.servings}</Col>
                        </Row>
                        <Row className='recipe-info'>
                            <Col md={6}>Protein</Col>
                            <Col md={4}>{this.state.protein}</Col>
                        </Row>
                        <Row className='recipe-info'>
                            <Col md={6}>Fat</Col>
                            <Col md={4}>{this.state.fat}</Col>
                        </Row>
                        <Row className='recipe-info'>
                            <Col md={6}>Carbs</Col>
                            <Col md={4}>{this.state.carbs}</Col>
                        </Row>
                    </Col>
                </Row>
                <Row>
                   <Col md={12}>Description:</Col> 
                   <Col md={12}>{this.state.description}</Col> 
                </Row>
                <Row>
                    <Col md={12}>
                        <div>
                            <h3>Ingredients</h3>
                            <dl className='ingredients-list'>
                                {this.state.ingredients.map(i => {
                                    return <Ingredient key={i.quantity + i.name}{...i} />
                                })}
                            </dl>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <div className='recipe-instructions'>
                            <h3>Instructions</h3>
                            <ol>
                                {this.state.instructions.map(i => {
                                    console.log(i)
                                    return <Instruction key={i} name={i}/>;
                                })}
                            </ol>
                        </div>
                    </Col>
                </Row>
            </Grid>

        )
    }
};