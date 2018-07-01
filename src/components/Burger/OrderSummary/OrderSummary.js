import React, { Component } from 'react';
import Aux from '../../../hoc/Auxi';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {
    //This could be a functional component, doesn,t have to be a class

    componentWillUpdate() {
        console.log("Componenet will updated");
    }

    render() {
        const ingredientSummary = Object.keys(this.props.ingredients).map((igKey) => {
            return <li key={igKey}>
                <span style={{ textTransform: 'capitalize' }}>{igKey}</span>:{this.props.ingredients[igKey]}
            </li>
        });
        return (
            <Aux>
                <h3>Your order</h3>
                <p>A delicious burger with following ingredients:</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p><strong>Total: {this.props.totalPrice.toFixed(2)}</strong></p>
                <p>Continue to Checkout?</p>
                <Button btnType="Danger" clicked={this.props.purchaseCancel}>CANCEL</Button>
                <Button btnType="Success" clicked={this.props.purchaseContinue}>CONTINUE</Button>
            </Aux>
        );
    }
}
export default OrderSummary;