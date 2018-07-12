import React, { Component } from 'react';
import { Jumbotron, Grid, Row, Col } from 'react-bootstrap';

export default class HomePage extends Component {
    render() {
        return (
            <Grid fluid>
                <Jumbotron>
                    <img id='recipes-banner' alt='recipes-banner' src='/recipes-banner.jpg' />
                </Jumbotron>
                <section>
                    <h2 className='home-section-title'>Most Liked Foods</h2>
                    <Row>
                        <Col md={3} className='home-recipe-container'>
                            <img alt='food' className='recipe-home-picture' src='https://hips.hearstapps.com/del.h-cdn.co/assets/17/04/1024x512/landscape-1485748477-caprese-chicken.jpg' />
                            <div>
                                <img alt='like-counter' className='like-counter' src='/recipe-like.jpg' />1
                                <h3 className='home-recipe-short-title'>Best food recipe ever.</h3>
                            </div>
                            <p className='recipe-short-description'>Loremipsum Loremips umLoremipsum Loremip sumLoremipsu m Loremipsum Loremips umLoremipsum Loremip sumLoremipsu m Loremipsum Loremip</p>
                        </Col>
                        <Col md={3} className='home-recipe-container'>
                            <img alt='food' className='recipe-home-picture' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFxaRE14NiFdXzFWNRu1FYbdNztC8bJvPGIUQkdbEG4NKcA5-Znw' />
                            <div>
                                <img alt='like-counter' className='like-counter' src='/recipe-like.jpg' />1
                                <h3 className='home-recipe-short-title'>Best food recipe ever.</h3>
                            </div>
                            <p className='recipe-short-description'>Loremipsum Loremips umLoremipsum Loremip sumLoremipsu m </p>
                        </Col>
                        <Col md={3} className='home-recipe-container'>
                            <img alt='food' className='recipe-home-picture' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdd5SRFZV6yJRO-ybp4REhG1z2R2qX1vNcYdJ3zsa7T-KupW48' />
                            <div>
                                <img alt='like-counter' className='like-counter' src='/recipe-like.jpg' />1
                                <h3 className='home-recipe-short-title'>Best food recipe ever.</h3>
                            </div>
                            <p className='recipe-short-description'>Loremipsum Loremips umLoremipsum Loremip sumLoremipsu m </p>
                        </Col>
                        <Col md={3} className='home-recipe-container'>
                            <img alt='food' className='recipe-home-picture' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQR7DFit_dQNIkM4wyCW0kbxpg-ZOhBWSpGU2P2ObgTK2eswLtXVA' />
                            <div>
                                <img alt='like-counter' className='like-counter' src='/recipe-like.jpg' />1
                                <h3 className='home-recipe-short-title'>Best food recipe ever.</h3>
                            </div>
                            <p className='recipe-short-description'>Loremipsum Loremips umLoremipsum Loremip sumLoremipsu m </p>
                        </Col>
                    </Row>
                </section>
                <section>
                    <h2 className='home-section-title'>Most Recent Foods</h2>
                    <Row>
                        <Col md={3} className='home-recipe-container'>
                            <img alt='food' className='recipe-home-picture' src='https://hips.hearstapps.com/del.h-cdn.co/assets/17/04/1024x512/landscape-1485748477-caprese-chicken.jpg' />
                            <div>
                                <img alt='like-counter' className='like-counter' src='/recipe-like.jpg' />1
                                <h3 className='home-recipe-short-title'>Best food recipe ever.</h3>
                            </div>
                            <p className='recipe-short-description'>Loremipsum Loremips umLoremipsum Loremip sumLoremipsu m </p>
                        </Col>
                        <Col md={3} className='home-recipe-container'>
                            <img alt='food' className='recipe-home-picture' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFxaRE14NiFdXzFWNRu1FYbdNztC8bJvPGIUQkdbEG4NKcA5-Znw' />
                            <div>
                                <img alt='like-counter' className='like-counter' src='/recipe-like.jpg' />1
                                <h3 className='home-recipe-short-title'>Best food recipe ever.</h3>
                            </div>
                            <p className='recipe-short-description'>Loremipsum Loremips umLoremipsum Loremip sumLoremipsu m </p>
                        </Col>
                        <Col md={3} className='home-recipe-container'>
                            <img alt='food' className='recipe-home-picture' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdd5SRFZV6yJRO-ybp4REhG1z2R2qX1vNcYdJ3zsa7T-KupW48' />
                            <div>
                                <img alt='like-counter' className='like-counter' src='/recipe-like.jpg' />1
                                <h3 className='home-recipe-short-title'>Best food recipe ever.</h3>
                            </div>
                            <p className='recipe-short-description'>Loremipsum Loremips umLoremipsum Loremip sumLoremipsu m </p>
                        </Col>
                        <Col md={3} className='home-recipe-container'>
                            <img alt='food' className='recipe-home-picture' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQR7DFit_dQNIkM4wyCW0kbxpg-ZOhBWSpGU2P2ObgTK2eswLtXVA' />
                            <div>
                                <img alt='like-counter' className='like-counter' src='/recipe-like.jpg' />1
                                <h3 className='home-recipe-short-title'>Best food recipe ever.</h3>
                            </div>
                            <p className='recipe-short-description'>Loremipsum Loremips umLoremipsum Loremip sumLoremipsu m </p>
                        </Col>
                    </Row>
                </section>
            </Grid>
        );
    }
};