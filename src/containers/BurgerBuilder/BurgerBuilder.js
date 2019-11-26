import React, { Component } from 'react';
import { connect } from 'react-redux';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Modal from '../../components/UI/Modal/Modal';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import axios from '../../axios-orders';
import * as burgerBuilderActions from '../../store/actions/index';

class BurgerBuilder extends Component {

    state = {   
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

    updateCanOrder = () => {
        const sum = Object.keys(this.props.ings)
            .map(key => this.props.ings[key])
            .reduce((sum, el) => {
                return sum + el;
            }, 0);

        return sum > 0;
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
        this.props.history.push('/checkout');
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
                        price={this.props.price.toFixed(2)}
                        canOrder={this.updateCanOrder()}
                        ordering={this.enableOrdering}
                    />
                </React.Fragment>
            );
            orderSummary = <OrderSummary cancelOrder={this.cancelOrderHandler}
                continueOrder={this.continueOrderHandler}
                price={this.props.price.toFixed(2)}
                prices={this.props.prices}
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
        ings: state.ingredients,
        price: state.totalPrice,
        prices: state.prices
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch(burgerBuilderActions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(burgerBuilderActions.removeIngredient(ingName))
    }
} 

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));