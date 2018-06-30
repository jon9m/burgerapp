import React from 'react';
import classes from './Modal.css';
import Aux from '../../../hoc/Auxi';
import BackDrop from '../../../components/UI/Backdrop/Backdrop';

const modal = (props) => (
    <Aux>
        <BackDrop show={props.show} clickedbackdrop={props.modalClosed}></BackDrop>
        <div className={classes.Modal} style={{ transform: props.show ? 'translateY(0)' : 'translateY(-100vh)', opacity: props.show ? '1' : '0' }}>
            {props.children}
        </div>
    </Aux>
)
export default modal;