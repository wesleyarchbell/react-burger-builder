import React from 'react';
import BuildControl from './BuildControl/BuildControl';
import styles from "./BuildControls.module.css";

const buildControls = (props) => {
    const controls = [
        { label: "Salad", type: "salad" },
        { label: "Meat", type: "meat" },
        { label: "Cheese", type: "cheese" },
        { label: "Bacon", type: "bacon" },
    ];
    return (
        <div className={styles.BuildControls}>
            <p>Total Price: <strong>${props.price}</strong></p>
            {
                controls.map(control => {
                    return <BuildControl 
                        key={control.type}
                        label={control.label}
                        added={() => props.ingredientAdded(control.type)}
                        removed={() => props.ingredientRemoved(control.type)}
                        disabled={props.disabledInfo[control.type]}
                    />
                })
            }
            <button
                className={styles.OrderButton}
                disabled={!props.canOrder}
                onClick={props.ordering}
            >Order Now</button>
        </div>
    )
}

export default buildControls;