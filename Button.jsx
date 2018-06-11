import React from 'react';

class Button extends React.Component {
    state = {loader: null};

    constructor(props) {
        super(props);
        this.showLoader = this.showLoader.bind(this);
    }


    async showLoader() {
        this.setState({loader: <div>About to show loader...</div>});
        const {default: Loader} = await import('react-loader-spinner');
        this.setState({loader: <Loader color="#00B8D5" width={80} height={80} type="Oval"/>});
    }


    render() {
        return <div>
            <button onClick={this.showLoader}>Show loader!</button>
            <div>{this.state.loader}</div>
        </div>;
    }
}

export default Button;