import React from "react";
import SampleComponent1 from "RootComponents/SampleComponent1";
import Button from "RootComponents/Button";

class HelloWorldComponent extends React.Component {
    constructor(props) {
        super(props);

    }


    render() {
        return (
            <div>
                Hello world: The following component is one sample:
                <SampleComponent1/>
                <Button/>
            </div>
        );
    }
}

export default HelloWorldComponent;