import React, { Component } from 'react';
import Aux from '../../hoc/Auxi'

import Burger from '../../components/Burger/Burger'

class BurgerBuilder extends Component {
    render() {
        return (
            <Aux>
                <div>
                    <Burger></Burger>
                </div>
                <div>
                    Build Controls
                </div>
            </Aux>
        );
    }
}

export default BurgerBuilder;