import React, { Component } from 'react';
import { Grid, FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap';
import { createRecipeAction, redirect } from '../../actions/recipeActions';
import { connect } from 'react-redux';
import { urlRegex, ingredientRegex, instructionsRegex} from '../../constants/dataConstants';

class NewRecipePage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            ingredients: '',
            servings: 0,
            fat: 0,
            carbs: 0,
            protein: 0,
            description: '',
            picture: '',
            instructions: '',
            errors: [],
        };
    }

    onChangeHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmitHandler = (e) => {
        e.preventDefault();
        const validationMessages = [];
        let hasErrors = false;

        if (this.state.title.trim() === '') {
            validationMessages.push('Title cannot be empty.');
            hasErrors = true;
        }

        if (this.state.picture.trim() === '' || !urlRegex.test(this.state.picture.trim().toLowerCase())) {
            validationMessages.push('Picture url cannot be empty and must be a valid one.');
            hasErrors = true;
        }

        if (this.state.description.trim() === '') {
            validationMessages.push('Description cannot be empty.');
            hasErrors = true;
        }

        if (Number(this.state.servings) === NaN || Number(this.state.servings) < 1) {
            validationMessages.push('Servings must be a positive number.');
            hasErrors = true;
        }
        if (Number(this.state.protein) === NaN || Number(this.state.protein) < 1) {
            validationMessages.push('Protein must be a positive number.');
            hasErrors = true;
        }

        if (Number(this.state.fat) === NaN || Number(this.state.fat) < 1) {
            validationMessages.push('Fat must be a positive number.');
            hasErrors = true;
        }

        if (Number(this.state.carbs) === NaN || Number(this.state.carbs) < 1) {
            validationMessages.push('Carbs must be a positive number.');
            hasErrors = true;
        }

        if (this.state.ingredients.trim().match(ingredientRegex) === null) {
            validationMessages.push('Ingredients are required and must be in a specific format.');
            hasErrors = true;
        }

        if (this.state.instructions.trim().match(instructionsRegex) === null) {
            validationMessages.push('Instructions are required and must be in a specific format.');
            hasErrors = true;
        }

        this.setState((prevState) => ({ errors: validationMessages }));
        if (!hasErrors) {
            const instructionsData = this.state.instructions.match(instructionsRegex).join('$$$###');
            const ingredientsData = this.state.ingredients.match(ingredientRegex).join('$$$###');
            const dataToSend = {
                title: this.state.title.trim(),
                picture: this.state.picture.trim(),
                description: this.state.description.trim(),
                servings: Number(this.state.servings),
                protein: Number(this.state.protein),
                fat: Number(this.state.fat),
                carbs: Number(this.state.carbs),
                ingredients: ingredientsData,
                instructions: instructionsData,
                isApproved: false
            };
            
            this.props.create(dataToSend);
        }
    }

    componentWillReceiveProps(newProps) {
        if (newProps.createSuccess) {
            this.props.redirect();
            this.props.history.push('/');
        }
    }

    render() {
        return (
            <Grid fluid>
                <div className='center'>
                    <img src='/new-recipe.jpg' className='img-fluid' alt='new-recipe-banner' />
                </div>
                <h1 id='new-recipe-title'>Create a New Recipe</h1>
                {
                    this.state.errors.length > 0
                        ?
                        this.state.errors.map((e, i) => {
                            return <p key={i} className='validation-error'>{e}</p>;
                        })
                        :
                        null
                }
                <div className='container'>
                    <form onSubmit={this.onSubmitHandler}>
                        <FormGroup controlId='title'>
                            <ControlLabel>Title</ControlLabel>
                            <FormControl
                                name='title'
                                type='text'
                                value={this.state.title}
                                placeholder='Enter recipe title'
                                onChange={this.onChangeHandler}
                            />
                        </FormGroup>
                        <FormGroup controlId='picture'>
                            <ControlLabel>Picture Url</ControlLabel>
                            <FormControl
                                name='picture'
                                type='text'
                                value={this.state.picture}
                                placeholder='Enter the picture url of the cooked recipe'
                                onChange={this.onChangeHandler}
                            />
                        </FormGroup>
                        <FormGroup controlId='description'>
                            <ControlLabel>Description</ControlLabel>
                            <FormControl
                                componentClass='textarea'
                                name='description'
                                type='text'
                                value={this.state.description}
                                placeholder='Enter recipe description'
                                onChange={this.onChangeHandler}
                            />
                        </FormGroup>
                        <FormGroup controlId='servings'>
                            <ControlLabel>Servings</ControlLabel>
                            <FormControl
                                name='servings'
                                type='number'
                                value={this.state.servings}
                                placeholder='Enter the number of servings'
                                onChange={this.onChangeHandler}
                            />
                        </FormGroup>
                        <FormGroup controlId='protein'>
                            <ControlLabel>Total amount of Protein</ControlLabel>
                            <FormControl
                                name='protein'
                                type='number'
                                value={this.state.protein}
                                placeholder='Enter the total amount of protein'
                                onChange={this.onChangeHandler}
                            />
                        </FormGroup>
                        <FormGroup controlId='fat'>
                            <ControlLabel>Total amount of Fat</ControlLabel>
                            <FormControl
                                name='fat'
                                type='number'
                                value={this.state.fat}
                                placeholder='Enter the total amount of fat'
                                onChange={this.onChangeHandler}
                            />
                        </FormGroup>
                        <FormGroup controlId='carbs'>
                            <ControlLabel>Total amount of Carbs</ControlLabel>
                            <FormControl
                                name='carbs'
                                type='number'
                                value={this.state.carbs}
                                placeholder='Enter the total amount of carbs'
                                onChange={this.onChangeHandler}
                            />
                        </FormGroup>
                        <FormGroup controlId='ingredients'>
                            <ControlLabel>Ingredients</ControlLabel>
                            <FormControl
                                componentClass='textarea'
                                name='ingredients'
                                type='text'
                                value={this.state.ingredients}
                                placeholder='Enter the ingredients'
                                onChange={this.onChangeHandler}
                            />
                            <HelpBlock className='center'>
                                Please enter the ingredients in the format 'ingredient - quantity', fallowed by a line-break. For example:
                             </HelpBlock>
                            <HelpBlock className='center'>
                                tablespoon pepper - 1
                             </HelpBlock>
                            <HelpBlock className='center'>
                                country-style pork ribs - 10
                             </HelpBlock>
                            <HelpBlock className='center'>
                                tablespoons garlic powder - 2
                             </HelpBlock>
                            <HelpBlock className='center'>
                                (!Invalid entries will be skipped!)
                             </HelpBlock>
                        </FormGroup>
                        <FormGroup controlId='instructions'>
                            <ControlLabel>Instructions</ControlLabel>
                            <FormControl
                                componentClass='textarea'
                                name='instructions'
                                type='text'
                                value={this.state.instructions}
                                placeholder='Enter the number of servings'
                                onChange={this.onChangeHandler}
                            />
                            <HelpBlock className='center'>
                                Please enter the instructions in this format (each instruction is seperated by a semicolon):
                             </HelpBlock>
                            <HelpBlock className='center'>
                                1. Preheat oven to 325; 2. Place ribs meaty side up in an ungreased baking dish; 3. Sprinkle with garlic powder, salt, and pepper;...
                             </HelpBlock>
                            <HelpBlock className='center'>
                                (!Invalid entries will be skipped!)
                             </HelpBlock>
                        </FormGroup>
                        <FormControl
                            className='btn btn-default'
                            type='submit'
                            value='Submit'
                        />
                    </form>
                </div>
            </Grid>
        );
    }
};

function mapState(state) {
    return {
        createSuccess: state.createRecipe.success
    };
}

function mapDispatch(dispatch) {
    return {
        create: (dataToSend) => dispatch(createRecipeAction(dataToSend)),
        redirect: () => dispatch(redirect())
    };
}

export default connect(mapState, mapDispatch)(NewRecipePage);;