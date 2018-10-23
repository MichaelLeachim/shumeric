// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// @ Copyright (c) Michael Leahcim                                                      @
// @ You can find additional information regarding licensing of this work in LICENSE.md @
// @ You must not remove this notice, or any other, from this software.                 @
// @ All rights reserved.                                                               @
// @@@@@@ At 2018-10-23 21:47 <thereisnodotcollective@gmail.com> @@@@@@@@@@@@@@@@@@@@@@@@

import React, { Component } from 'react';
import { connect } from 'react-redux';

// local deps
import logo from './logo.svg';
import './App.css';
import { simpleAction } from './actions/simpleAction'

const mapDispatchToProps = dispatch => ({
 simpleAction: () => dispatch(simpleAction())
})

const mapStateToProps = state => ({
 ...state
})

class App extends Component {
    simpleAction = (event) => {
        this.props.simpleAction();
    }
    render() {
        return (
                <div className="App">
                <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                Edit <code>src/App.js</code> and save to reload.
                </p>
                <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
                >
                Learn React
            </a>
                </header>
                <button onClick={this.simpleAction}>Test redux action</button>
                <pre>
                {JSON.stringify(this.props)}
                </pre>
                </div>
                
        );
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
