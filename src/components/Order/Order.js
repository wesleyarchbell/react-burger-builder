import React from 'react';

import styles from './Order.module.css';

const order = (props) => {

    let ingredients = [];
    for (let name in props.ingredients) {
        ingredients.push({
            amount: props.ingredients[name],
            name: name
        });
    }

    const ingredrientString = ingredients.map(i => {
        return <span style={{
            textTransform: 'capitalize',
            display: 'inline-block',
            margin: '0 8px',
            border: '1px solid #ccc',
            padding: '5px'

        }} key={i.name}>{i.name} ({i.amount})</span>
    });

    return (
        <div className={styles.Order}>
            <p>Ingredients: {ingredrientString}</p>
            <p>Price: <strong>${Number.parseFloat(props.price).toFixed(2)}</strong></p>
        </div>
    )
}

export default order;