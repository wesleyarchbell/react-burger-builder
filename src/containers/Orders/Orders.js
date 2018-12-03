import React, { Component } from 'react';
import axios from '../../axios-orders';
import Order from '../../components/Order/Order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';


class Orders extends Component {

    state = {
        orders: [],
        loading: true
    }

    componentDidMount() {
        axios.get("orders.json").then(response => {
            
            const orders = [];
            for (let key in response.data) {
                orders.push({
                    ...response.data[key],
                    id: key
                })
            }
            this.setState({ loading: false, orders: orders });

        }).catch(err => {
            this.setState({ loading: false });
        });
    }

    render () {
        return (
            <div>
                {this.state.orders.map(order => {
                    return <Order key={order.id} ingredients={order.ingredients} price={order.price}/>
                })}
            </div>
        )
    }
}

export default withErrorHandler(Orders, axios);