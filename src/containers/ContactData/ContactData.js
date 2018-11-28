import React, {Component} from 'react';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import axios from '../../axios-orders';

import styles from './ContactData.module.css';

class ContactData extends Component {

    state = {
        loading: false,
        name: '',
        email: '',
        address: {
            street: '',
            postCode: ''
        }
    }

    orderHandler = (event) => {
        event.preventDefault();
        console.log(this.props.ingredients);
        console.log(this.props.price);

        this.setState({ loading: true });
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
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
            this.setState({ loading: false });
            this.props.history.push('/');
        }).catch(error => {
            console.log(error);
            this.setState({ loading: false });
        });
    }

    render() {

        let form = null;
        if (this.state.loading) {
            form = <Spinner/>
        } else {
            form = (
                <form>
                    <input className={styles.Contact} type="text" name="name" placeholder="Enter your name" />
                    <input className={styles.Contact} type="email" name="name" placeholder="Enter your email" />
                    <input className={styles.Contact} type="text" name="street" placeholder="Enter your street" />
                    <input className={styles.Contact} type="text" name="postalCode" placeholder="Enter your post code" />
                    <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
                </form>
            )
        }

        return (
            <div className={styles.ContactData}>
                <h4>Enter your contact details:</h4>
                {form}
            </div>
        );
    }
}


export default ContactData;
