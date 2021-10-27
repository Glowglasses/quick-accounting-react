import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.scss';
import {Toast} from 'antd-mobile';

let size = document.documentElement.clientWidth;
if (size > 500) {
  Toast.show({
    content: '建议使用移动端浏览',
    position: 'top',
  });
}
window.onresize = () => {
  if (document.documentElement.clientWidth > 500) {
    Toast.show({
      content: '建议使用移动端浏览',
      position: 'top',
    });
  }
};
ReactDOM.render(
  <App/>,
  document.getElementById('root')
);
