

import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { connect } from 'react-redux';
class ModalUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: ''
        }

    }

    componentDidMount() {
    }

    toggle = () => {
        this.props.toggleUserModal()
    }

    handleOnChangeInput = (event, name) => {
        let copyState = { ...this.state };
        copyState[name] = event.target.value;
        this.setState({
            ...copyState
        })
    }

    checkValidateInput = () => {
        let isValid = true;
        let arrInput = ['email', 'password', 'firstName', 'lastName', 'address',]
        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state[arrInput[i]]) {
                isValid = false;
                alert('Missing paramenter ' + arrInput[i]);
                break;
            }
        }
        return isValid
    }

    handleAddNewUser = () => {


        let isValid = this.checkValidateInput();
        if (isValid === true) {
            this.props.createNewUser(this.state);
        }

    }

    render() {

        return (
            <Modal
                isOpen={this.props.isOpen}
                toggle={() => { this.toggle() }}
                className={'modal-user-container'}
                size='lg'

            >
                <ModalHeader toggle={() => { this.toggle() }}>Create new user</ModalHeader>
                <ModalBody>

                    <div className="container">
                        <form action="/post-crud" method="POST">
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label htmlFor="inputEmail4">Email</label>
                                    <input type="email" className="form-control" name="email" placeholder="Email"
                                        onChange={(event) => this.handleOnChangeInput(event, "email")}
                                        value={this.state.email}
                                    />
                                </div>
                                <div className="form-group col-md-6">
                                    <label htmlFor="inputPassword4">Password</label>
                                    <input type="password" className="form-control" name="password" placeholder="Password"
                                        onChange={(event) => this.handleOnChangeInput(event, "password")}
                                        value={this.state.password}
                                    />

                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="inputAddress">First name</label>
                                <input type="text" className="form-control" name="firstName" placeholder="First name"
                                    onChange={(event) => this.handleOnChangeInput(event, "firstName")}

                                    value={this.state.firstName} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="inputAddress2">Last name</label>
                                <input type="text" className="form-control" name="lastName" placeholder="Last name"
                                    onChange={(event) => this.handleOnChangeInput(event, "lastName")}
                                    value={this.state.lastName}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="inputAddress2">Address</label>
                                <input type="text" className="form-control" name="address" placeholder="Vd: Hải Phòng.."
                                    onChange={(event) => this.handleOnChangeInput(event, "address")}
                                    value={this.state.address}
                                />
                            </div>

                        </form>
                    </div>


                </ModalBody>
                <ModalFooter>
                    <Button color="primary" className='px-3'
                        onClick={() => { this.handleAddNewUser() }}

                    >Save</Button>{' '}
                    <Button color="secondary" className='px-3' onClick={() => { this.toggle() }}>Close</Button>
                </ModalFooter>
            </Modal>
        )
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);



