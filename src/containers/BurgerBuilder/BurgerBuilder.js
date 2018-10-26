import React, { Component } from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Modal from '../../components/UI/Modal/Modal';
import Spinner from '../../components/UI/Spinner/Spinner';

import axios from '../../axios-orders';

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
        ordering: false,
        loading: false
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

        this.setState({ loading: true });
        const order = {
            ingredients: this.state.ingredients,
            totalPrice: this.state.totalPrice,
            customer: {
                name: "Wesley",
                address: "21 Test St",
                country: "Australia",
                email: "test@test.com",
                deliveryMethod: "express"
            }
        };

        axios.post('/orders.json', order).then(response => {
            console.log(response);
            this.setState({ loading: false, ordering: false });
        }).catch(error => {
            console.log(error);
            this.setState({ loading: false, ordering: false });
        });
    }

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        }
        for (let i in disabledInfo) {
            disabledInfo[i] = disabledInfo[i] === 0;
        }

        let orderSummary = <OrderSummary cancelOrder={this.cancelOrderHandler}
            continueOrder={this.continueOrderHandler}
            price={this.state.totalPrice.toFixed(2)}
            prices={INGREDIENT_PRICES}
            ingredients={this.state.ingredients}
        />;
        if (this.state.loading) {
            orderSummary = <Spinner />
        }

        return (
            <React.Fragment>
                <Modal show={this.state.ordering} clicked={this.modalClosedHandler}>
                    {orderSummary}
                </Modal>
                <Burger ingredients={this.state.ingredients} />
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