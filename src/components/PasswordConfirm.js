import React from "react"

class PasswordConfirm extends React.Component {
   constructor(props) {
      super(props)
      this.state = {
         valid: false,
         match: false,
         value1: "",
         value2: ""
      }
      this.isValid = this.isValid.bind(this)
      this.isMatch = this.isMatch.bind(this)
   }

   isValid() {
      this.state.value1.length >= this.props.min
         ? this.setState({ valid: true })
         : this.setState({ valid: false })
   }

   isMatch() {
      this.state.value1 === this.state.value2
         ? this.setState({ match: true })
         : this.setState({ match: false })
   }

   render() {
      return (
         <>
            <input
               className={this.props.className}
               style={{ color: this.state.valid ? "green" : "red" }}
               value={this.state.value1}
               onChange={e => (
                  this.setState({ value1: e.target.value }), this.isValid()
               )}
               placeholder={this.props.ph1}
               {...this.props}
            />
            <input
               className={this.props.className}
               style={{ color: this.state.match ? "green" : "red" }}
               value={this.state.value2}
               onChange={e => (
                  this.setState({ value2: e.target.value }), this.isMatch()
               )}
               placeholder={this.props.ph2}
               {...this.props}
            />
         </>
      )
   }
}

export default PasswordConfirm
