import React, { Component } from 'react';
import Aux from '../../hoc/Auxi'

import Burger from '../../components/Burger/Burger'

class BurgerBuilder extends Component {

    state = {
        ingredients: {
            salad: 1,
            bacon: 2,
            cheese: 2,
            meat: 2
        }
    }

    render() {
        return (
            <Aux>
                <div>
                    <Burger ingredients={this.state.ingredients}></Burger>
                </div>
                <div>
                    Build Controls
                </div>
            </Aux>
        );
    }
}

export default BurgerBuilder;