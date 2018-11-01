import * as React from 'react';
import Layout from '../components/Layout';
import axios from 'axios';

class signup extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            username: '',
            errorLogin: '',
            inputIndex: 1,
            left: 0,
            darkTheme: false
        }

        this.changeInput = this.changeInput.bind(this);
    }

    componentDidMount() {
        this.setState({
            darkTheme: localStorage.getItem('darkTheme')
        });
        if(Number(localStorage.getItem('darkTheme')) === 1){
            document.getElementById('mask').style.background = '#000';
            document.getElementById('mask1').style.background = '#000';
        } else {
            document.getElementById('mask').style.background = '#fff';
            document.getElementById('mask1').style.background = '#fff';
        }
    }

    changeInput = (e) => {
        var target = e.target;
        var name = target.name;
        var value = target.value;
        this.setState({
            [name]: value
        });
    }

    nextClick = () => {
        const { inputIndex, email, password, username, left } = this.state;
        if (inputIndex === 1) {
            if (email !== '') {
                let lastAtPos = email.lastIndexOf('@');
                let lastDotPos = email.lastIndexOf('.');

                if (!(lastAtPos < lastDotPos && lastAtPos > 0 && email.indexOf('@@') == -1 && lastDotPos > 2 && (email.length - lastDotPos) > 2)) {
                    this.setState({ errorLogin: 'Email is not valid' });
                } else {
                    axios.get('/api/login/' + this.state.email)
                        .then(response => {
                            if (response.data.length === 0) {
                                this.setState({
                                    inputIndex: inputIndex + 1,
                                    errorLogin: '',
                                    left: left - 600
                                })
                            } else {
                                this.setState({ errorLogin: 'Email was registered' })
                            }
                        })
                        .catch(function (error) {
                            console.log(error);
                        })
                }
            }
            else {
                this.setState({ errorLogin: 'This field is required' })
            }
        } else if (inputIndex === 2) {
            if (password !== '') {
                this.setState({
                    inputIndex: inputIndex + 1,
                    errorLogin: '',
                    left: left - 600
                })
            } else {
                this.setState({
                    errorLogin: 'This field is required'
                })
            }
        } else if (inputIndex === 3) {
            if (username !== '') {
                this.setState({
                    errorLogin: ''
                });
                let body = {
                    email: email,
                    pass: password,
                    name: username
                };
                axios.post('/api/signup', body)
                    .then(response => {
                        localStorage.setItem('userId', response.data.userId);
                        window.location.replace('/profile');
                    })
                    .catch(function (error) {
                        console.log(error)
                    })
            } else {
                this.setState({
                    errorLogin: 'This field is required'
                })
            }
        }
    }

    previousClick = () => {
        const { inputIndex, left } = this.state;
        if (inputIndex > 1) {
            this.setState({
                inputIndex: inputIndex - 1,
                left: left + 600
            })
        }
    }

    render() {
        const {darktheme} = this.state;
        return (
            <Layout changeTheme={this.changeTheme}>
                <div className="ui header h1_title">SIGN UP</div>
                <div id="mask"></div>
                <div id="mask1"></div>
                <div className="testInputRightToLeft" style={{ left: this.state.left }}>
                    <div className="col1"><input placeholder="Email Address" name="email" onChange={this.changeInput} value={this.state.email} /></div>
                    <div className="col2"><input type="password" placeholder="Password" name="password" onChange={this.changeInput} value={this.state.password} /></div>
                    <div className="col3"><input placeholder="Tran Minh Tam" name="username" onChange={this.changeInput} value={this.state.username} /></div>
                </div>
                <div>{this.state.errorLogin}</div>
                <button onClick={this.previousClick} className="btn_signup">Previous</button>
                <button onClick={this.nextClick} className="btn_signup">Next</button>
            </Layout>
        )
    }
}

export default signup;