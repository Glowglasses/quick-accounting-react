import React, {useEffect} from 'react';
import Layout from '../components/Layout';
import {Category} from '../components/Category';
import {Tags} from './Money/Tags';

function Money() {

  useEffect(() => {
    console.log(document.documentElement.clientHeight);
  }, []);
  return (
    <Layout>
      <Category/>
      <Tags/>
    </Layout>
  );
}

export default Money;