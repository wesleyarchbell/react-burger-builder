import React, {Component} from 'react';
import Modal from '../../components/UI/Modal/Modal';


const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {

        state = {
            error: null
        }

        componentWillMount() {
            axios.interceptors.request.use(req => {
                this.setState({error: null});
                return req;
            });
            axios.interceptors.response.use(res => res, error => {
                this.setState({error: error});
            });
        }

        modalClosed = () => {
            this.setState({error: null});
        }

        render() {
            return (
                <React.Fragment>
                    <Modal show={this.state.error} clicked={this.modalClosed}>
                        Error Occurred: {this.state.error ? this.state.error.message: null}
                    </Modal>
                    <WrappedComponent {...this.props}/>
                </React.Fragment>
            );
        }
    };
}

export default withErrorHandler;
