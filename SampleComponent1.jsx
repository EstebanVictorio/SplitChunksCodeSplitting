import React from 'react';
import QueryString from 'query-string';

let getParamSampleComponent1 = QueryString.parse(location.search).sample1;
const SampleComponent1 = props => <div>Component 1: {getParamSampleComponent1}</div>;

export default SampleComponent1;