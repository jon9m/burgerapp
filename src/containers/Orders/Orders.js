import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorhandler from '../../hoc/withErrorHandler/WithErrorHandler';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component {

    componentDidMount() {
        this.props.onFetchOrders(this.props.token);
    }

    render() {
        let loading = <Spinner />;

        if (!this.props.loading) {
            loading = (<div>
                {this.props.orders.map(order => (
                    <Order key={order.id} ingredients={order.ingredients} price={order.price}></Order>
                ))}
            </div>);
        }
        return (loading);
    }
}

const mapStateToProps = (state) => {
    return {
        orders: state.orderReducer.orders,
        loading: state.orderReducer.loading,
        token: state.authReducer.token
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onFetchOrders: (token) => dispatch(actions.fetchOrders(token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorhandler(Orders, axios));