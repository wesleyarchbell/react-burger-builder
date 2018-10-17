import React, { Component } from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Modal from '../../components/UI/Modal/Modal';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.3,
    bacon: 1.1,
    meat: 1.3
}

class BurgerBuilder extends Component {

    state = {
        ingredients: {
            salad: 0,
            cheese: 0,
            bacon: 0,
            meat: 0
        },
        totalPrice: 5,
        canOrder: false,
        ordering: false
    }

    addIngredientHandler = (type) => {
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = updatedIngredients[type] + 1;
        const updatedPrice = this.state.totalPrice + INGREDIENT_PRICES[type];
        this.setState({
            ingredients: updatedIngredients,
            totalPrice: updatedPrice
        });
        this.updateCanOrder(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        if (this.state.ingredients[type] > 0) {
            const updatedIngredients = {
                ...this.state.ingredients
            }
            updatedIngredients[type] = updatedIngredients[type] - 1;
            const updatedPrice = this.state.totalPrice - INGREDIENT_PRICES[type];
            this.setState({
                ingredients: updatedIngredients,
                totalPrice: updatedPrice
            })
            this.updateCanOrder(updatedIngredients);
        };
    }

    updateCanOrder = (ingredients) => {
        const sum = Object.keys(ingredients)
            .map(key => ingredients[key])
            .reduce((sum, el) => {
                return sum + el;
            }, 0);

        this.setState({
            canOrder: sum > 0
        });
    }

    enableOrdering = () => {
        this.setState({
            ordering: true
        })
    }

    modalClosedHandler = () => {
        this.setState({
            ordering: false
        });
    }

    cancelOrderHandler = () => {
        this.setState({
            ordering: false
        });
    }

    continueOrderHandler = () => {

    }

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        }
        for (let i in disabledInfo) {
            disabledInfo[i] = disabledInfo[i] === 0;
        }
        return (
            <React.Fragment>
                <Modal show={this.state.ordering} clicked={this.modalClosedHandler}>
                    <OrderSummary cancelOrder={this.cancelOrderHandler}
                                  continueOrder={this.continueOrderHandler}
                                  price={this.state.totalPrice.toFixed(2)}
                                  prices={INGREDIENT_PRICES}
                                  ingredients={this.state.ingredients}
                    />
                </Modal>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls 
                    added={this.addIngredientHandler}
                    removed={this.removeIngredientHandler}
                    disabledInfo={disabledInfo}
                    price={this.state.totalPrice.toFixed(2)}
                    canOrder={this.state.canOrder}
                    ordering={this.enableOrdering}
                    />
            </React.Fragment>    
        );
    }
}

export default BurgerBuilder;