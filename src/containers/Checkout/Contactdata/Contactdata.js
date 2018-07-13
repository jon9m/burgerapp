import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './Contactdata.css';

import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';

import Input from '../../../components/UI/Input/Input';

class Contactdata extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeHolder: 'Your Name'
                },
                value: 'Malaka'
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeHolder: 'Street'
                },
                value: 'Latrobe Terrace'
            },
            zip: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeHolder: 'ZIP'
                },
                value: ''
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeHolder: 'Country'
                },
                value: ''
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeHolder: 'E-Mail'
                },
                value: ''
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: 'fastest', displayValue: 'Fastest' },
                        { value: 'cheapest', displayValue: 'Cheapest' }
                    ]
                },
                value: ''
            }
        },
        loading: false
    }

    orderhandler = (event) => {
        event.preventDefault();
        console.log(this.props.ingredients);

        this.setState({
            loading: true
        });

        //Get form to update to DB
        const formData = {};
        for (let formElementId in this.state.orderForm) {
            formData[formElementId] = this.state.orderForm[formElementId].value;
        }

        const orders = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            orderData: formData
        }

        axios.post('/orders.json', orders) //.json - firebase specific
            .then((response) => {
                this.setState({
                    loading: false
                });
                this.props.history.push('/');
            }).catch(err => {
                console.log(err);
                this.setState({
                    loading: false
                });
            });
    }

    inputChangedHandler = (event, inputIdentifier) => {
        // console.log(event.target.value);

        //immutably update the form state

        //Need deep clonning due to mutipe levels of object tree (... spread operator wont do that!!!)
        const updatedOrderForm = {
            ...this.state.orderForm   //copy outer level objcets only (nested objects are only revferences to the original)
        }

        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier] //copy nested objects again
        };

        //At this point elecmtConfig is still a references (needs one more spread operator), but we only need 'value' property

        updatedFormElement.value = event.target.value;

        updatedOrderForm[inputIdentifier] = updatedFormElement;

        this.setState(
            {
                orderForm: updatedOrderForm
            }
        );

    }

    render() {
        const formElementArray = [];
        for (let key in this.state.orderForm) {
            formElementArray.push(
                {
                    config: this.state.orderForm[key],
                    id: key
                }
            );
        }

        let inputs = formElementArray.map(elem => {
            return (
                <Input key={elem.id}
                    elementType={elem.config.elementType}
                    elementConfig={elem.config.elementConfig}
                    value={elem.config.value}
                    changed={(event) => this.inputChangedHandler(event, elem.id)} />
            );
        });

        let form = (
            <form onSubmit={this.orderhandler}>
                {inputs}
                <Button btnType="Success" clicked={this.orderhandler}>ORDER HERE</Button>
            </form>
        );
        if (this.state.loading) {
            form = <Spinner></Spinner>
        }

        return (
            <div className={classes.Contactdata}>
                <h4>Enter your contact data</h4>
                {form}
            </div>
        );
    }
}
export default Contactdata;