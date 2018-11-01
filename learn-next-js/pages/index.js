import * as React from 'react';
import Layout from '../components/Layout';


class home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            classBody: false,
            linkImg: "https://stib.co/images/light.svg"
        }
    }


    render() {
        return (
            <Layout />
        )
    }
}

export default home;