import * as React from 'react';

class MaxMinInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0
        }
    }

    onChange = (e) => {
        var inputValue = e.target.value;
        if (inputValue > this.props.max) {
            inputValue = this.props.max;
            this.setState({
                value: this.props.max
            })
        } else if (inputValue < this.props.min) {
            inputValue = this.props.min
            this.setState({
                value: this.props.min
            })
        } else {
            this.setState({
                value: inputValue
            })
        }
        this.props.onChangeInputChild(inputValue);
    }
    render() {
        return (
            <input type="number" value={this.state.value} onChange={this.onChange} />
        )
    }
}
export default MaxMinInput;