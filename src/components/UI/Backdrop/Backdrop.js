import React from 'react';
import classes from './Backdrop.css';

const backdrop = (props) => (
    props.show ? <div className={classes.backdrop} onClick={props.clickedbackdrop}></div> : null
);

export default backdrop;
