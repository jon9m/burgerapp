import React, { Component } from 'react';
import classes from './Modal.css';
import Aux from '../../../hoc/Auxi';
import BackDrop from '../../../components/UI/Backdrop/Backdrop';

class Modal extends Component {
    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.show !== this.props.show || nextProps.children !== this.props.children) {
            return true;
        }
        return false;
    }

    componentWillUpdate() {
        console.log("Modal will update");
    }

    render() {
        return (
            <Aux>
                <BackDrop show={this.props.show} clickedbackdrop={this.props.modalClosed}></BackDrop>
                <div className={classes.Modal}
                    style={{ transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)', opacity: this.props.show ? '1' : '0' }}>
                    {this.props.children}
                </div>
            </Aux>
        );
    }
}
export default Modal;