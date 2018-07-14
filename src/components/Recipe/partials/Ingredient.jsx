import React, { Fragment } from 'react';

export default (props) => {
    return (
        <Fragment>
            <dt>{props.quantity}</dt> <dd>{props.name}</dd>
        </Fragment>
    )
}