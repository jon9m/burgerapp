import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './Contactdata.css';

import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';

import Input from '../../../components/UI/Input/Input';

import { connect } from 'react-redux';

class Contactdata extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeHolder: 'Your Name'
                },
                value: 'Malaka',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeHolder: 'Street'
                },
                value: 'Latrobe Terrace',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            zip: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeHolder: 'ZIP'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeHolder: 'Country'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeHolder: 'E-Mail'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: 'fastest', displayValue: 'Fastest' },
                        { value: 'cheapest', displayValue: 'Cheapest' }
                    ]
                },
                value: '',  //Bug here - always need to select the dropdown
                validation: {

                },
                valid: true
            }
        },
        loading: false,
        isFormValid: false
    }

    orderhandler = (event) => {
        event.preventDefault();
        console.log(this.props.ings);

        this.setState({
            loading: true
        });

        //Get form to update to DB
        const formData = {};
        for (let formElementId in this.state.orderForm) {
            formData[formElementId] = this.state.orderForm[formElementId].value;
        }

        const orders = {
            ingredients: this.props.ings,
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

    checkValidity(value, rules) {
        let isValid = false;
        if (rules.required) {
            isValid = value.trim() !== '';
        }
        if ((isValid) && (rules.minLength)) {
            isValid = value.trim().length >= rules.minLength;
        }
        if ((isValid) && (rules.maxLength)) {
            isValid = value.trim().length <= rules.maxLength;
        }
        return isValid;
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
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);

        updatedFormElement.touched = true;

        updatedOrderForm[inputIdentifier] = updatedFormElement;

        let formIsValid = true;
        for (let elem in updatedOrderForm) {
            formIsValid = formIsValid && updatedOrderForm[elem].valid;
        }

        console.log("formIsValid " + formIsValid);

        this.setState(
            {
                orderForm: updatedOrderForm,
                isFormValid: formIsValid
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
                    invalid={!elem.config.valid}
                    shouldValidate={elem.config.validation}
                    touched={elem.config.touched}
                    changed={(event) => this.inputChangedHandler(event, elem.id)} />
            );
        });

        let form = (
            <form onSubmit={this.orderhandler}>
                {inputs}
                <Button btnType="Success" clicked={this.orderhandler} disabled={!this.state.isFormValid}>ORDER HERE</Button>
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


const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    }
}

export default connect(mapStateToProps)(Contactdata);