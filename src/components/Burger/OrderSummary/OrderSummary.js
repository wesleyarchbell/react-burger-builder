import React from 'react';

const orderSummary = (props) => {

    const summary = Object.keys(props.ingredients).map(i => {
        return <li key={i}><span style={{textTransform: 'capitalize'}}>{i}</span>: {props.ingredients[i]}</li>
    })

    return (
        <React.Fragment>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                {summary}
            </ul>
            <button>Continue to Checkout</button>
        </React.Fragment>
    );
}

export default orderSummary;