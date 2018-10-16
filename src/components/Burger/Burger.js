import React from 'react';
import styles from './Burger.module.css';
import Ingredient from './Ingredient/Ingredient'

const burger = (props) => {

    let newIngredients = Object.keys(props.ingredients)
        .map(i => {
            return [...Array(props.ingredients[i])]
                .map((_, index) => {
                    return <Ingredient key={i+index} type={i} />;        
                })
               
        }).reduce((arr, element) => {
            return arr.concat(element);        
        }, []);

    if (newIngredients.length === 0) {
        newIngredients = <p>Please start adding ingredients</p>
    }   
    return (
        <div className={styles.Burger}> 
            <Ingredient type="bread-top"/>
            {newIngredients}
            <Ingredient type="bread-bottom"/>
        </div>
    )
}

export default burger;