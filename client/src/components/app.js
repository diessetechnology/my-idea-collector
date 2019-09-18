import React, { Component,Suspense } from 'react';
import Header from './header';
import CenterLoading from "./centerLoading";
import Footer from "./Footer";

export default class App extends Component {
  render() {
    return (
        <Suspense fallback={<CenterLoading/>}>
      <div>
        <Header />
        <div className='container'>
            {this.props.children}
        </div>
        <Footer></Footer>
      </div>
        </Suspense>
    );
  }
}
