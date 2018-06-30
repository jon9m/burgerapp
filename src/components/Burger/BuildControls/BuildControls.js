import React from 'react';
import classes from './BuildControls.css'
import BuildControl from './BuildControl/BuildControl'

const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Meat', type: 'meat' }
];

const buildControls = (props) => (
    <div className={classes.buildControls}>
        <p>Current price: <strong>{props.price.toFixed(2)}</strong></p>
        {
            controls.map((ctrl) => {
                return <BuildControl
                    disabled={props.disabled[ctrl.type]}
                    key={ctrl.label} label={ctrl.label}
                    added={() => { props.ingredientAdded(ctrl.type) }}
                    removed={() => { props.ingredientRemoved(ctrl.type) }}></BuildControl>
            })
        }
        <button className={classes.OrderButton} disabled={!props.purchasable} onClick={props.purchasing}>ORDER NOW</button>
    </div>
);

export default buildControls;