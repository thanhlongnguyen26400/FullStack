import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss';
import { getAllUsers, createNewUserService, deleteUser, editUserService } from '../../services/userService';
import ModalUser from './ModalUser';
import { emitter } from "../../utils/emitter"
import ModalEditUser from './ModalEditUser';


class UserManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrUsers: [],
            isOpen: false,
            userEdit: {},
            status: ''
        }
    }

    async componentDidMount() {
        await this.getAllUser()
    }

    getAllUser = async () => {
        let response = await getAllUsers('ALL');
        if (response && response.errCode === 0) {
            this.setState({
                arrUsers: response.users
            })
        }
    }

    handleAddNewUser = () => {
        this.setState({
            isOpen: true,
            status: 'CREATE'
        })
    }

    toggleUserModal = () => {
        this.setState({
            isOpen: !this.state.isOpen,
        })
    }

    // toggleEditUserModal = () => {
    //     this.setState({
    //         isOpenEdit: !this.state.isOpenEdit,
    //     })
    // }


    createNewUser = async (data) => {
        try {
            let response = await createNewUserService(data);
            if (response && response.errCode !== 0) {
                alert(response.errMessage)
            }
            else {
                await this.getAllUser()
                this.setState({
                    isOpen: false
                })
                // emitter.emit('EVENT_CLEAR_MODAL_DATA', { 'id': 'your id' // cbhuyen data }) 

                emitter.emit('EVENT_CLEAR_MODAL_DATA')
            }
        }
        catch (e) {
            console.log(e);
        }
    }

    handleDeleteUser = async (data) => {
        try {
            let response = await deleteUser(data.id);
            if (response && response.errCode !== 0) {
                alert(response.errMessage)
            }
            else {
                await this.getAllUser()
                this.setState({
                    ...this.state
                })
            }
        }
        catch (e) {
            console.log(e)
        }

    }

    handleEditUser = async (user) => {
        this.setState({
            isOpen: true,
            userEdit: user,
            status: 'EDIT'
        })
    }

    handleUpdateUser = async (user) => {
        try {
            let response = await editUserService(user);
            console.log(">>>> check res ", response)

            if (response && response.errCode !== 0) {
                alert(response.errMessage)
            }
            else {
                this.state.isOpen = false
                await this.getAllUser();
                this.setState({
                    ...this.state
                })
            }
        }
        catch (e) {
            console.log(e)
        }
    }

    render() {
        // console.log(">>check render : ", this.state.arrUsers);
        console.log(">>check status: ", this.state.status);
        let { arrUsers } = this.state
        return (
            <div className="users-container">
                {
                    this.state.isOpen && this.state.status === 'CREATE' &&
                    <ModalUser
                        isOpen={this.state.isOpen}
                        toggleUserModal={this.toggleUserModal}
                        createNewUser={this.createNewUser}
                    />
                }

                {
                    this.state.isOpen && this.state.status === 'EDIT' &&
                    <ModalEditUser
                        isOpen={this.state.isOpen}
                        toggleUserModal={this.toggleUserModal}
                        currentUser={this.state.userEdit}
                        updateUser={this.handleUpdateUser}
                    />
                }
                <div className='title text-center'>Manage users with thanh long</div>
                <div className='mx-1'>
                    <button className='btn btn-primary px-3'
                        onClick={() => this.handleAddNewUser()}
                    >Add new user</button>
                </div>
                <div className='users-table mt-3 mx-1'>
                    <table id="customers">
                        <tbody>

                            <tr>
                                <th>Email</th>
                                <th>FirstName</th>
                                <th>LastName</th>
                                <th>Address</th>
                                <th>Actions</th>
                            </tr>

                            {
                                arrUsers && arrUsers.map((item, index) => {
                                    return (

                                        <tr key={item.id}>
                                            <td>{item.email}</td>
                                            <td>{item.firstName}</td>
                                            <td>{item.lastName}</td>
                                            <td>{item.address}</td>
                                            <td>
                                                <button onClick={() => this.handleEditUser(item)}>Edit</button>
                                                <button onClick={() => this.handleDeleteUser(item)}>Delete</button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        );
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

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
