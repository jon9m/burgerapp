import React, { Component } from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Auxi';

const withErrorHandler = (WrappedComponenet, axios) => {
    return class extends Component {
        state = {
            error: null
        };
        componentWillMount() {  //Use will mount instead of did mount as didmount will call only after all child components rendered
            this.reqInterceptor = axios.interceptors.request.use(req => { //Will create component variable reqInterceptors and respInterceptor
                this.setState({
                    error: null
                });
                return req;
            });
            this.respInterceptor = axios.interceptors.response.use(res => {
                return res;
            }, error => {
                this.setState({
                    error: error
                });
            });
        }

        componentWillUnmount() {
            //Remove all unused interceptors on unmount
            console.log("Interceptors will be removed on unmount")
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.respInterceptor);
        }

        errorConfirmedhandler = () => {
            this.setState({
                error: null
            });
        }

        render() {
            return (
                <Aux>
                    <Modal show={this.state.error} modalClosed={this.errorConfirmedhandler}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponenet {...this.props} />
                </Aux>
            );
        }
    }
}

export default withErrorHandler;