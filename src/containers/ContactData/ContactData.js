import React, {Component} from 'react';
import Button from '../../components/UI/Button/Button';

import styles from './ContactData.module.css';

class ContactData extends Component {

    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postCode: ''
        }

    }

    render() {
        return (
            <div className={styles.ContactData}>
                <h4>Enter your contact details:</h4>
                <form>
                    <input className={styles.Contact} type="text" name="name" placeholder="Enter your name"/>
                    <input className={styles.Contact} type="email" name="name" placeholder="Enter your email"/>
                    <input className={styles.Contact} type="text" name="street" placeholder="Enter your street"/>
                    <input className={styles.Contact} type="text" name="postalCode" placeholder="Enter your post code"/>
                    <Button btnType="Success">ORDER</Button>
                </form>
            </div>
        );
    }
}


export default ContactData;
