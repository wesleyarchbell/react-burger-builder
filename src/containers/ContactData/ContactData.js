import React, { Component } from 'react';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import Input from '../../components/UI/Input/Input';
import axios from '../../axios-orders';

import styles from './ContactData.module.css';

class ContactData extends Component {

    state = {
        loading: false,
        orderForm: {
            elements: [
                this.buildFormElement('name', 'input', 'text', 'Your Name', '', []),
                this.buildFormElement('street', 'input', 'text', 'Street', '', []),
                this.buildFormElement('zipCode', 'input', 'text', 'ZIP Code', '', []),
                this.buildFormElement('country', 'input', 'text', 'Country', '', []),
                this.buildFormElement('email', 'input', 'email', 'Your E-Mail', '', []),
                this.buildFormElement('delivery', 'select', 'email', 'Delivery Method', '', [
                    { value: 'fastest', displayValue: 'Fastest' },
                    { value: 'cheapest', displayValue: 'Cheapest' },
                ])
            ]
        }
    }

    buildFormElement(name, elementType, type, placeholder, value, options) {
        return {
            name: name,
            elementType: elementType,
            value: value,
            elementConfig: {
                type: type,
                placeholder: placeholder,
                options: options
            }
        }
    }

    orderHandler = (event) => {
        event.preventDefault();
        
        const formData = {};
        let elements = this.state.orderForm.elements;
        for (let i = 0; i < elements.length; i++) {
            let element = elements[i];
            formData[element.name] = element.value;
        }

        this.setState({ loading: true });
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            orderData: formData
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

    changeHandler = (event, name) => {
        const orderForm = {...this.state.orderForm};
        const formElement = { ...orderForm.elements.find(i => i.name === name)};
        formElement.value = event.target.value;
        const formIndex = orderForm.elements.findIndex(i => i.name === name);
        orderForm.elements[formIndex] = formElement;
        this.setState({orderForm: orderForm}); 
    }

    render() {
        let formElements = this.state.orderForm.elements.map(element => {
            return <Input key={element.name}
                name = {element.name}
                elementType={element.elementType}
                elementConfig={element.elementConfig}
                value={element.value} 
                changeHandler={this.changeHandler}/>
        });

        let form = null;
        if (this.state.loading) {
            form = <Spinner />
        } else {
            form = (
                <form onSubmit={this.orderHandler}>
                    {formElements}
                    <Button btnType="Success">ORDER</Button>
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
