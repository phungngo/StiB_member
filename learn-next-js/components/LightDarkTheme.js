import * as React from 'react';

class LightDarkTheme extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            darkTheme: 0
        }
    }

    componentDidMount() {
        const theme = Number(localStorage.getItem('darkTheme'));
        if (theme) {
            document.body.classList.add('body_dark');
            this.setState({
                darkTheme: 1
            })
        } else {
            document.body.classList.add('body_light');
        }
    }

    changeTheme = () => {
        const { darkTheme } = this.state;
        if (darkTheme) {
            document.body.classList.add('body_light');
            document.body.classList.remove('body_dark');
            if (document.getElementById('mask') && document.getElementById('mask1')) {
                document.getElementById('mask').style.backgroundColor = '#fff';
                document.getElementById('mask1').style.backgroundColor = '#fff';
            }
            localStorage.setItem('darkTheme', 0)
        } else {
            document.body.classList.add('body_dark');
            document.body.classList.remove('body_light');
            if (document.getElementById('mask') && document.getElementById('mask1')) {
                document.getElementById('mask').style.backgroundColor = '#000';
                document.getElementById('mask1').style.backgroundColor = '#000';
            }
            localStorage.setItem('darkTheme', 1)
        }
        this.setState({
            darkTheme: !darkTheme
        });
    }

    render() {
        const { darkTheme } = this.state;
        return (
            <a onClick={this.changeTheme}><img src={darkTheme ? 'https://stib.co/images/dark.svg' : 'https://stib.co/images/light.svg'} height={20} width={20} /></a>
        )
    }
}

export default LightDarkTheme;