import * as React from 'react';
import axios from 'axios';


class testdb extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listUser: null,
            name: null,
            phone: null,
            company: null
        };
    }
    componentDidMount() {
        axios.get('http://localhost:8080/api/users')
            .then(response => {
                this.setState({ listUser: response.data });
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    addUser = () => {
        const {name, phone, company} = this.state;
        let body = {
            name: name,
            phone: phone,
            company: company
        };
        console.log(body);
        axios.post('http://localhost8080/api/users', body)
        .then(response => {
            console.log(response)
        })
    }

    onChangeInput = (e) => {
        const target = e.target;
        const name = target.name;
        const value = target.value;

        this.setState({
            [name]: value
        });
    }

    deleteUser = (e) => {
        const id = e.target.value;
        axios.delete('http://localhost:8080/api/users/', 1);
        console.log('jhdqwd');
    }

    render() {
        const { listUser } = this.state;
        if (listUser === null) {
            return null;
        } else {
            return (
                <div>
                    <link href="/static/css/styles.css" rel="stylesheet" />
                    <table>
                        <thead>
                            <tr>
                                <th>id</th>
                                <th>name</th>
                                <th>phone</th>
                                <th>company</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                listUser.map((user, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{user.id}</td>
                                            <td>{user.name}</td>
                                            <td>{user.phone}</td>
                                            <td>{user.company}</td>
                                            <td><button onClick={this.deleteUser} value={user.id}>Delete</button></td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                    <div id="form-add-user">
                        <div>ADD USER</div>
                        <input name="name" placeholder="Name" onChange={this.onChangeInput}></input><br />
                        <input type="number" placeholder="Number Phone" name="phone" onChange={this.onChangeInput}></input><br />
                        <input name="company" placeholder="Company Name" onChange={this.onChangeInput}></input><br />
                        <button onClick={this.addUser}>ADD</button>
                    </div>
                </div>
            )
        }
    }
}

export default testdb;