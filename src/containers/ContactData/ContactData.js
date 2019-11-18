import React, {Component} from 'react';
import { connect } from 'react-redux';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import Input from '../../components/UI/Input/Input';
import axios from '../../axios-orders';

import styles from './ContactData.module.css';

class ContactData extends Component {

    state = {
        loading: false,
        formValid: false,
        orderForm: {
            elements: [
                this.buildFormElement('name', 'input', 'text', 'Your Name', '', {
                    required: true,
                    minLength: 2,
                    maxLength: 20
                }, []),
                this.buildFormElement('street', 'input', 'text', 'Street', '', {
                    required: true,
                    minLength: 2,
                    maxLength: 20
                }, []),
                this.buildFormElement('zipCode', 'input', 'text', 'ZIP Code', '', {
                    required: true,
                    minLength: 3,
                    maxLength: 6
                }, []),
                this.buildFormElement('country', 'input', 'text', 'Country', '', {
                    required: true,
                    minLength: 2,
                    maxLength: 20
                }, []),
                this.buildFormElement('email', 'input', 'email', 'Your E-Mail', '', {
                    required: true,
                    minLength: 2,
                    maxLength: 20
                }, []),
                this.buildFormElement('delivery', 'select', 'email', 'Delivery Method', '', null, [
                    {value: 'fastest', displayValue: 'Fastest'},
                    {value: 'cheapest', displayValue: 'Cheapest'},
                ])
            ]
        }
    }

    buildFormElement(name, elementType, type, placeholder, value, validation, options) {
        return {
            name: name,
            elementType: elementType,
            value: value,
            elementConfig: {
                type: type,
                placeholder: placeholder,
                options: options
            },
            validation: validation,
            valid: false,
            touched: false
        }
    }

    checkValidity(value, rules) {
        let isValid = true;
        if (rules.required) {
            isValid = value.trim() !== '';
        }
        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }
        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }
        return isValid;
    }

    orderHandler = (event) => {
        event.preventDefault();

        const formData = {};
        let elements = this.state.orderForm.elements;
        for (let i = 0; i < elements.length; i++) {
            let element = elements[i];
            formData[element.name] = element.value;
        }

        this.setState({loading: true});
        const order = {
            ingredients: this.props.ings,
            price: this.props.price,
            orderData: formData
        };

        axios.post('/orders.json', order).then(response => {
            console.log(response);
            this.setState({loading: false});
            this.props.history.push('/');
        }).catch(error => {
            console.log(error);
            this.setState({loading: false});
        });
    }

    changeHandler = (event, name) => {
        const orderForm = {...this.state.orderForm};
        const formElement = {...orderForm.elements.find(i => i.name === name)};
        formElement.value = event.target.value;
        if (formElement.validation != null) {
            formElement.valid = this.checkValidity(formElement.value, formElement.validation);
        } else {
            formElement.valid = true;
        }
        formElement.touched = true;
        const formIndex = orderForm.elements.findIndex(i => i.name === name);
        orderForm.elements[formIndex] = formElement;

        let formValid = true;
        for (let i = 0; i < orderForm.elements.length; i++) {
            let element = orderForm.elements[i];
            formValid = element.valid && formValid;
        }

        this.setState({orderForm: orderForm, formValid: formValid});
    }

    render() {
        let formElements = this.state.orderForm.elements.map(element => {
            return <Input key={element.name}
                          name={element.name}
                          elementType={element.elementType}
                          elementConfig={element.elementConfig}
                          value={element.value}
                          invalid={!element.valid}
                          touched={element.touched}
                          changeHandler={this.changeHandler}/>
        });

        let form = null;
        if (this.state.loading) {
            form = <Spinner/>
        } else {
            form = (
                <form onSubmit={this.orderHandler}>
                    {formElements}
                    <Button btnType="Success" disabled={!this.state.formValid}>ORDER</Button>
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

var mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    };
}

export default connect(mapStateToProps)(ContactData);
