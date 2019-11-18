import React, { Component } from 'react';
import { connect } from 'react-redux';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Modal from '../../components/UI/Modal/Modal';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import axios from '../../axios-orders';
import * as actionTypes from '../../store/actions';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.3,
    bacon: 1.1,
    meat: 1.3
}

class BurgerBuilder extends Component {

    state = {        
        totalPrice: 5,
        canOrder: false,
        ordering: false,
        loading: false,
        error: false
    }

    componentDidMount() {
        // axios.get('/ingredients.json').then(response => {
        //     this.setState({
        //         ingredients: response.data
        //     });
        // }).catch(error => {
        //     this.setState({ error: true });
        // });
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
        const queryParams = [];
        for (let i in this.state.ingredients) {
            queryParams.push(encodeURIComponent(i) + '=' + this.state.ingredients[i]);
        }
        queryParams.push('price=' + this.state.totalPrice.toFixed(2));

        const queryString = queryParams.join('&');
        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString
        });
    }

    render() {
        const disabledInfo = {
            ...this.props.ings
        }
        for (let i in disabledInfo) {
            disabledInfo[i] = disabledInfo[i] === 0;
        }

        let orderSummary = null;
        let burger = <Spinner />;
        if (this.state.error) {
            burger = <p style={{ textAlign: 'center' }}>There was a problem loading the ingredients.</p>
        }

        if (this.props.ings) {
            burger = (
                <React.Fragment>
                    <Burger ingredients={this.props.ings} />
                    <BuildControls
                        ingredientAdded={this.props.onIngredientAdded}
                        ingredientRemoved={this.props.onIngredientRemoved}
                        disabledInfo={disabledInfo}
                        price={this.state.totalPrice.toFixed(2)}
                        canOrder={this.state.canOrder}
                        ordering={this.enableOrdering}
                    />
                </React.Fragment>
            );
            orderSummary = <OrderSummary cancelOrder={this.cancelOrderHandler}
                continueOrder={this.continueOrderHandler}
                price={this.state.totalPrice.toFixed(2)}
                prices={INGREDIENT_PRICES}
                ingredients={this.props.ings}
            />;
        }

        if (this.state.loading) {
            orderSummary = <Spinner />
        }

        return (
            <React.Fragment>
                <Modal show={this.state.ordering} clicked={this.modalClosedHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: ingName}),
        onIngredientRemoved: (ingName) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName})
    }
} 

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));