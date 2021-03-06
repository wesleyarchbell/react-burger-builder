import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from '../../containers/ContactData/ContactData';

class Checkout extends Component {

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.push('/checkout/contact-data');
    }

    render() {
        return (
            <div>
                <CheckoutSummary    
                    checkoutCancelled={this.checkoutCancelledHandler}
                    checkoutContinued={this.checkoutContinuedHandler}
                    ingredients={this.props.ings}/>
                <Route path={this.props.match.path + '/contact-data'} 
                       component={ContactData} />
            </div>
        )
    }
}

var mapStateToProps = state => {
    return {
        ings: state.ingredients
    };
}

export default connect(mapStateToProps)(Checkout);