import React from "react"

class RangeInput extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            valid: false,
            value: ""
        }
        this.isValid = this.isValid.bind(this)
      }

    isValid() {
        this.state.value.length <= this.props.max && this.state.value.length >= this.props.min
            ? this.setState({valid: true})
            : this.setState({valid: false})
    }

    render() {
        return <input className={this.props.className} style={{color: this.state.valid ? "green" : "red"}} value={this.state.value} onChange={e => (this.setState({value: e.target.value}), this.isValid())} {...this.props} />
    }
}

// const RangeInput = ({min, max, ...other}) => {
//     const [isValid, setValid] = useState(false)

// }

export default () => <RangeInput />