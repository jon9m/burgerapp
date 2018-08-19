import React, { Component } from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from '../Auth/Auth.css';
import * as actionTypes from '../../store/actions';
import Spinner from '../../components/UI/Spinner/Spinner';

import { connect } from 'react-redux';

class Auth extends Component {

    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Mail Address'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            },
            isSignup: true
        }
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

    inputChangedHandler = (event, controlName) => {
        const authControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched: true
            }
        }
        this.setState({
            controls: authControls
        });
    }

    switchAuthenticationHandler = () => {
        this.setState(prevState => {
            return {
                isSignup: !prevState.isSignup
            }
        })
    }

    onSubmitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.controls.isSignup.value);
    }

    render() {
        const formElementsArray = [];
        for (let key in this.state.controls) {
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
            });
        }

        let form = formElementsArray.map(formElement => (
            <Input key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                changed={(event) => this.inputChangedHandler(event, formElement.id)}>
            </Input>
        ));

        if (this.props.loading) {
            form = <Spinner />;
        }

        let errMsg = null;
        if (this.props.error) {
            errMsg = <p>
                {this.props.error}
            </p>;
        }

        return (
            <div className={classes.Auth}>
                {errMsg}
                <form onSubmit={this.onSubmitHandler}>
                    {form}
                    <Button btnType='Success'>SUBMIT</Button>
                </form>
                <Button
                    clicked={this.switchAuthenticationHandler}
                    btnType='Danger'>SWITCH TO {this.state.isSignup ? 'SIGNIN' : 'SIGINUP'}</Button>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, pass, isSignup) => {
            dispatch(actionTypes.auth(email, pass, isSignup));
        }
    }
};

const mapStateToProps = (state) => {
    return {
        loading: state.authReducer.authenticating,
        error: state.authReducer.error
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
