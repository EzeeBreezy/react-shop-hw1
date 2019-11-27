import React, {useState, useMemo, Component} from 'react';


class PromiseComponent extends Component {
    constructor(props){
        super(props)

        this.state = {status: 'PENDING', payload: null, error: null}
    }

    componentDidMount(){
        this.props.promise.then(payload => this.setState({status: 'RESOLVED', payload, error: null}))
                          .catch(error  =>this.setState({status: 'REJECTED', payload: null, error}))
    }

    render(){
        console.log(this.props, this.state)
        if (this.state.status === 'PENDING'){
            const Loading = this.props.pending
            return <Loading />
        }

        if (this.state.status === 'RESOLVED'){
            const Resolved = this.props.resolve
            return <Resolved payload={this.state.payload} />
        }
        const Error = this.props.reject
        return <Error error={this.state.error} />
    }
    static get defaultProps() {
        return {
            pending: TitsLoader,
            reject: Error
        }
    }
}

const delay = ms => new Promise((ok, fail) => setTimeout(() => ok(ms), ms))

const Preloader = () => <h1>Loading</h1>
const TitsLoader = () => <img src="http://shop.asmer.php.a-level.com.ua/loading.gif" />

const JSONShow = ({payload}) =>
<pre>
    {JSON.stringify(payload, null, 4)}
</pre>

const Error = ({error}) =>
<div style={{backgroundColor: '#FAA'}}>
    {JSON.stringify(error, null, 4)}
</div>

export default PromiseComponent
