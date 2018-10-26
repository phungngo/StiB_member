import * as React from 'react';
// import MaxMinInput from '../components/maxMinInput';

class index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inputValue: 0,
            error: null,
            items: [],
            isLoaded: false,
            currencyValue: 0,
            outputValue: 0,
            unit: null,
            temp: 0
        }
    }
    componentDidMount() {
        fetch("https://min-api.cryptocompare.com/data/pricemulti?fsyms=ETH&tsyms=USD,EUR,VND")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        items: result.ETH,
                        currencyValue: result.ETH.USD,
                        unit: 'USD'
                    });
                    console.log(result);
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
        const {inputValue, currencyValue} = this.state;
        this.setState({outputValue: inputValue * currencyValue})
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
                inputValue: value + 1,
            })
        }
        setTimeout(this.updateOutput, 50);
    }
    minus = () => {
        var value = Number(this.state.inputValue);
        if (value > -5) {
            this.setState({ 
                inputValue: value - 1,
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

    // onChangeInputChild = (e) => {
    //     console.log(e);
    //     this.setState({
    //         temp: e * 10
    //     })
    // }

    render() {
        const { error, isLoaded, items } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <div>
                    <link href="/static/css/styles.css" rel="stylesheet" />
                    {/* <MaxMinInput 
                        max={50} 
                        min={-5} 
                        onChangeInputChild = {this.onChangeInputChild}
                    /> */}
                    <div>
                        <span>Currency Unit:  </span>
                        <select onChange={this.onSelected}>
                            <option value={items.USD}>USD</option>
                            <option value={items.EUR}>EUR</option>
                            <option value={items.VND}>VND</option>
                        </select>
                    </div>
                    <div>
                        <button
                            onClick={this.minus}
                            style={{ marginRight: 10 }}
                        >-</button>
                        <input
                            type="number"
                            onChange={this.onChangeInput}
                            value={this.state.inputValue}
                            style={{ textAlign: 'center' }}
                        />
                        <button
                            onClick={this.plus}
                            style={{ marginLeft: 10 }}
                        >+</button>
                    </div>
                    <div>{this.state.outputValue} {this.state.unit}</div>
                </div>
            )
        }
    }
}

export default index;
