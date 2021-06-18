import React from 'react';
import ReactDOM from 'react-dom';
import {App} from './App';
import reportWebVitals from './reportWebVitals';


ReactDOM.render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>,
  document.getElementById('root')
)
;

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();


// child/parent example
// interface Props {
//     value: React.ReactNode | string;
// }
// const Button1: React.FC<Props> = (props) => {
//     return <button>{props.value}</button>;
// }
//
// <Button1 value="hello" />
// <Button1 value={<strong><i>HELLO</i></strong>} />
//
//
//
//
// const Button: React.FC = (props) => {
//     return <button>{props.children}</button>;
// }
// <Button>hello</Button>
// <Button>
//     <strong><i>HELLO</i></strong>
// </Button>
// <Button>
//     <img src="asdfasdfasdf.jpg" />
// </Button>