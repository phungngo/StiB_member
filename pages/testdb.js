import * as React from 'react';
import axios from 'axios';


class testdb extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listUser: null,
            name: null,
            phone: null,
            company: null,
            currentId: null
        };
    }
    componentDidMount() {
        this.getUser();
    }

    getUser = () => {
        axios.get('/api/users')
            .then(response => {
                this.setState({ listUser: response.data });
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    addUser = () => {
        const { name, phone, company } = this.state;
        let body = {
            name: name,
            phone: phone,
            company: company
        };
        axios.post('/api/users', body)
            .then(response => {
                console.log('ADDED !!!');
                this.getUser();
            })
            .catch(function (error) {
                console.log(error)
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
        let url = '/api/users/' + id;
        axios.delete(url)
            .then(response => {
                console.log('deleted item');
                this.getUser();
            })
            .catch(function (error) {
                console.lof(error)
            })
    }

    changeCurrentId = (e) => {
        this.setState({
            currentId: e.target.value
        })
    }

    editUser = () => {
        const { name, phone, company } = this.state;
        let body = {
            name: name,
            phone: phone,
            company: company
        };
        let url = '/api/users/' + this.state.currentId;
        axios.put(url, body);
        this.getUser();
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
                                            <td>
                                                <button onClick={this.deleteUser} value={user.id}>Delete</button>
                                                <button onClick={this.changeCurrentId} value={user.id}>Edit</button>
                                            </td>
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
                    <div id="form-edit-user">
                        <div>EDIT USER</div>
                        <div>{this.state.currentId}</div>
                        <input name="name" placeholder="Name" onChange={this.onChangeInput}></input><br />
                        <input type="number" placeholder="Number Phone" name="phone" onChange={this.onChangeInput}></input><br />
                        <input name="company" placeholder="Company Name" onChange={this.onChangeInput}></input><br />
                        <button onClick={this.editUser}>EDIT</button>
                    </div>
                </div>
            )
        }
    }
}

export default testdb;