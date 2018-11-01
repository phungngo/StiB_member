import * as React from 'react';
import axios from 'axios';
import Layout from '../components/Layout';
import ETH from '../components/ETH';

class profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            currentUserId: null,
            classBody: true,
        }
    }
    componentDidMount() {
        var classBody = localStorage.getItem('classBody');
        document.body.classList.add(classBody);
        const userId = localStorage.getItem('userId');
        axios.get('/api/users/' + userId)
            .then(response => {
                this.setState({
                    userName: response.data[0].name,
                    currentUserId: userId
                })
            })
            .catch(function (error) {
                console.log(error)
            });
    }

    signout = () => {
        localStorage.removeItem('userId');
        window.location.replace('/');
    }

    render() {
        return (
            <Layout currentUserId={this.state.currentUserId} signout={this.signout}>
                <div className="ui header h1_title">Wellcome, {this.state.userName}</div><br/>
                <ETH/>
            </Layout>
        )
    }
}

export default profile;