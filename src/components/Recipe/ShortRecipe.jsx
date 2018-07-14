import React, { Component } from 'react';
import { Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default class ShortRecipe extends Component {
    render() {
        return (
            <Col md={3} className='home-recipe-container'>
                <Link to={`/recipe/${this.props._id}`}>
                    <img alt='food' className='recipe-home-picture' src={this.props.picture} />
                </Link>
                <div>
                    <h3 className='home-recipe-short-title'>{this.props.title.length > 15 ? this.props.description.slice(0, 12) + '...' : this.props.title}</h3>
                </div>
                <p className='recipe-short-description'>{this.props.description.length > 72 ? this.props.description.slice(0, 72) + '...' : this.props.description}</p>
                <p>{this.props.isInHome ? null : this.props.isApproved ? 'Approved: YES' : 'Approved: NO'}</p>
                {this.props.children}
            </Col>

        )
    }
};