import * as React from 'react';
import Layout from '../components/Layout';
import axios from 'axios';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import CheckButton from 'react-validation/build/button';
import { isEmail, isEmpty } from 'validator';

const required = (value) => {
    if (isEmpty(value)) {
        return <div className="form-text text-danger">This field is required</div>;
    }
}

const email = (value) => {
    if (!isEmail(value)) {
        return <div className="form-text text-danger">Invalid email format</div>;
    }
}

const minLength = (value) => {
    if (value.trim().length < 3) {
        return <div className="form-text text-danger">Password must be at least 6 characters long</div>;
    }
}

class login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            classBody: false,
            linkImg: "https://stib.co/images/light.svg",
            email: null,
            password: null,
            errorLogin: null
        }
    }

    componentDidMount() {
        localStorage.removeItem('userId');
        var classBody = localStorage.getItem('classBody');
        document.body.classList.add(classBody);
        if (classBody === 'body_dark') {
            this.setState({
                linkImg: "https://stib.co/images/dark.svg"
            })
        }
    }

    onSubmit(e) {
        e.preventDefault();
        this.form.validateAll();
        const password = e.target.password.value;
        if (this.checkBtn.context._errors.length === 0) {
            axios.get('/api/login/' + e.target.email.value)
                .then(response => {
                    if (response.data.length === 0) {
                        this.setState({ errorLogin: 'Email chưa được đăng ký' });
                    }
                    else {
                        if (password === response.data[0].pass) {
                            localStorage.setItem('userId', response.data[0].id)
                            window.location.replace('/profile');
                        } else {
                            this.setState({ errorLogin: 'Sai mật khẩu' })
                        }
                    }
                })
                .catch(function (error) {
                    console.log(error);
                })
        }
    }


    render() {
        return (
            <Layout>
                <div style={{ marginTop: 30 }} className="form-login">
                    <Form onSubmit={e => this.onSubmit(e)} ref={c => { this.form = c }}>
                        <div className="ui header h1_title">LOGIN</div>
                        <Input
                            name="email"
                            onChange={this.onChangeHandler}
                            type="text"
                            placeholder="Email"
                            className="form-control"
                            validations={[required, email]}
                        />
                        <Input
                            name="password"
                            onChange={this.onChangeHandler}
                            type="password"
                            placeholder="Password"
                            className="form-control"
                            validations={[required]}
                        />
                        <div style={{margin: 10}}>Don't have an account? <a href='/register'>Sign Up</a></div>
                        <button className="btn btn-info btn-block login btn_signup" type="submit">Login</button>
                        <div>{this.state.errorLogin}</div>
                        <CheckButton style={{ display: 'none' }} ref={c => { this.checkBtn = c }} />
                    </Form>
                </div>
            </Layout>
        )
    }
}

export default login;