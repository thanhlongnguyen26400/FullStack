import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";

import * as actions from "../../store/actions";

import './Login.scss';

import { FormattedMessage } from 'react-intl';

import { handleLoginApi } from '../../services/userService'
import { userLoginSuccess } from '../../store/actions';


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            errMessage: ''
        }
    }

    handleOnChangeUserName = (event) => {
        this.setState({
            username: event.target.value
        })
    }

    handleOnChangePassWord = (event) => {
        this.setState({
            password: event.target.value
        })
    }
    handleLogin = async () => {
        this.setState({
            errMessage: ''
        })

        try {
            let data = await handleLoginApi(this.state.username, this.state.password);
            if (data && data.errCode !== 0) {
                this.setState({
                    errMessage: data.message
                })
            }
            if (data && data.errCode === 0) {
                this.props.userLoginSuccess(data.userData)
                // console.log('login succeeds', data)
            }
        } catch (e) {
            if (e.response) {
                if (e.response.data) {

                    this.setState({
                        errMessage: e.response.data.message
                    })
                }
            }
            console.log('>>>> check error', e.response.data);

        }

    }

    render() {
        // JSX

        return (

            <div className='login-backgrond'>
                <div className='login-container'>
                    <div className='login-content row'>
                        <div className='col-12 text-login'>Login</div>
                        <div className='col-12 form-group login-input'>
                            <label>Username</label>
                            <input type='text' className='form-control' placeholder='Enter your username'
                                value={this.state.username}
                                onChange={(event) => this.handleOnChangeUserName(event)}
                            ></input>
                            <i class="fa-solid fa-eye" ></i>

                        </div>

                        <div className='col-12 form-group login-input'>
                            <label>Password</label>
                            <input type='password' className='form-control' placeholder='Enter your password'
                                value={this.state.password}
                                onChange={(event) => this.handleOnChangePassWord(event)}
                            ></input>
                        </div>
                        <div className='col-12' style={{ color: 'red' }}>
                            {this.state.errMessage}
                        </div>
                        <div className='col-12'>
                            <button className='btn-login'
                                onClick={() => this.handleLogin()}
                            >Login</button>
                        </div>

                        <div className='col-12 forgot-password'>
                            <span className='tex-forgot-password'><i>Forgot your password?</i></span>
                        </div>
                        <div className='col-12 text-center mt-5'>
                            <span className='text-other-login'>Or login with</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        lang: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),

        // userLoginFail: () => dispatch(actions.adminLoginFail()),
        userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
