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
            {
                controls.map(control => {
                    return <BuildControl 
                        key={control.type}
                        label={control.label} 
                        ingredientAddedHandler={() => props.ingredientAddedHandler(control.type)}
                    />
                })
            }
        </div>
    )
}

export default buildControls;