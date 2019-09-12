import React, { Component,Suspense } from 'react';
import Header from './header';
import CenterLoading from "./centerLoading";

export default class App extends Component {
  render() {
    return (
        <Suspense fallback={<CenterLoading/>}>
      <div>
        <Header />
        <div className='container'>
            {this.props.children}
        </div>
      </div>
        </Suspense>
    );
  }
}
