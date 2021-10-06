import React from 'react';
import Layout from '../components/Layout';
import {Category} from '../components/Category';

function Chart() {
  return (
    <Layout>
      <Category backgroundColor="white" onChange={(categoryType => {console.log(categoryType);})}/>
    </Layout>
  );
}

export default Chart;