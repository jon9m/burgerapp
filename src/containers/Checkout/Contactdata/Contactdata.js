import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './Contactdata.css';

class Contactdata extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        }
    }

    render() {
        return (
            <div className={classes.Contactdata}>
                <h4>Enter your contact data</h4>
                <form action="">
                    <input type="text" name="name" placeholder="Your Name" />
                    <input type="text" name="address" placeholder="Street" />
                    <input type="text" name="street" placeholder="Street" />
                    <input type="text" name="postal" placeholder="Postal Code" />
                    <Button btnType="Success">ORDER HERE</Button>
                </form>
            </div>
        );
    }
}
export default Contactdata;