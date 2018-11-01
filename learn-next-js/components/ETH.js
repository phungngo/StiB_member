import * as React from 'react';
// import MaxMinInput from '../components/maxMinInput';

class ETH extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            inputValue: 1,
            // error: null,
            // items: [],
            // isLoaded: false,
            currencyValue: 0,
            outputValue: 0,
            unit: null,
            countryCode: null
        }
    }

    componentDidMount() {
        fetch("http://ip-api.com/json")
            .then(res => res.json())
            .then((result) => {
                const code = result.countryCode;
                fetch("https://min-api.cryptocompare.com/data/pricemulti?fsyms=ETH&tsyms=USD,EUR,VND")
                    .then(res1 => res1.json())
                    .then((result1) => {
                        if (code === 'VN') {
                            this.setState({
                                isLoaded: true,
                                items: result1.ETH,
                                unit: 'VND',
                                currencyValue: result1.ETH.VND,
                                outputValue: result1.ETH.VND
                            })
                        } else {
                            this.setState({
                                isLoaded: true,
                                items: result1.ETH,
                                unit: 'USD',
                                currencyValue: result1.ETH.USD,
                                outputValue: result1.ETH.USD

                            })
                        }
                    },
                        (error) => {
                            this.setState({
                                isLoaded: true,
                                error
                            })
                        })
            })
    }


    callIpApi = () => {
        fetch("http://ip-api.com/json")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({ countryCode: result.countryCode });
                    console.log('callIpApi thành công');
                },
                (error) => {
                    console.log('kết nối không thành công');
                }
            )
        return 'đã gọi callIpApi xong ';
    }

    callApiETH = () => {
        fetch("https://min-api.cryptocompare.com/data/pricemulti?fsyms=ETH&tsyms=USD,EUR,VND")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        items: result.ETH,
                        currencyValue: result.ETH.VND,
                        unit: 'VND',
                        outputValue: result.ETH.VND
                    });
                    console.log('callApiETH thành công');
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    })
                }
            )
    }


    updateOutput = () => {
        const { inputValue, currencyValue } = this.state;
        this.setState({ outputValue: inputValue * currencyValue })
    }

    onChangeInput = (e) => {
        var value = e.target.value;
        if (value > 20) {
            this.setState({
                inputValue: 20,
            });
        } else if (value < -5) {
            this.setState({
                inputValue: -5,
            })
        } else {
            this.setState({
                inputValue: value,
            })
        }
        setTimeout(this.updateOutput, 50);
    }
    plus = () => {
        var value = Number(this.state.inputValue);
        if (value < 20) {
            this.setState({
                inputValue: (value + 0.1).toFixed(1),
            })
        }
        setTimeout(this.updateOutput, 20);
    }
    minus = () => {
        var value = Number(this.state.inputValue);
        if (value > -5) {
            this.setState({
                inputValue: (value - 0.1).toFixed(1),
            })
        }
        setTimeout(this.updateOutput, 50);
    }
    onSelected = (e) => {
        this.setState({
            currencyValue: Number(e.target.value),
            unit: e.target.options[e.target.selectedIndex].text,
        });
        setTimeout(this.updateOutput, 50);
    }

    render() {
        const { error, isLoaded, items } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <div id="eth">
                    <div>
                        <div><span>Currency Unit:  </span>
                        <select onChange={this.onSelected} value={this.state.currencyValue}>
                            <option value={items.VND}>VND</option>
                            <option value={items.USD}>USD</option>
                            <option value={items.EUR}>EUR</option>
                        </select></div>
                        <div>1 ETH = {this.state.currencyValue} {this.state.unit}</div>
                    </div>
                    <div>
                        <button
                            onClick={this.minus}
                            style={{ marginRight: 10, width: 25}}
                        >-</button>
                        <input
                            type="number"
                            onChange={this.onChangeInput}
                            value={this.state.inputValue}
                            style={{ textAlign: 'center' }}
                        />
                        <button
                            onClick={this.plus}
                            style={{ marginLeft: 10, width: 25 }}
                        >+</button>
                    </div>
                    <div>{this.state.outputValue} {this.state.unit}</div>
                </div>
            )
        }
    }
}

export default ETH;
