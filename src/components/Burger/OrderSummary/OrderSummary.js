import React from 'react';
import Button from '../../UI/Button/Button';
import { Link } from 'react-router-dom';

const orderSummary = (props) => {

    const prices = props.prices;
    const summary = Object.keys(props.ingredients).map(i => {
        const amount = props.ingredients[i];
        if (amount === 0) {
            return null;
        }
        const price = prices[i] * amount;
        return <li key={i}><span style={{ textTransform: 'capitalize' }}>{i}</span> (${price.toFixed(2)})</li>
    })

    return (
        <React.Fragment>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                <li>Base Price ($5.00)</li>
                {summary}
            </ul>
            <p>Total Price: <strong>${props.price}</strong></p>
            <p>Continue to Checkout?</p>
            <Button btnType='Success' clicked={props.cancelOrder}>Cancel</Button>
            <Link to='/checkout'>
                <Button btnType='Danger' clicked={props.continueOrder}>Continue</Button>
            </Link>
        </React.Fragment>
    );
}

export default orderSummary;