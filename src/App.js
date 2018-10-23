// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// @ Copyright (c) Michael Leahcim                                                      @
// @ You can find additional information regarding licensing of this work in LICENSE.md @
// @ You must not remove this notice, or any other, from this software.                 @
// @ All rights reserved.                                                               @
// @@@@@@ At 2018-10-23 21:47 <thereisnodotcollective@gmail.com> @@@@@@@@@@@@@@@@@@@@@@@@

import React, { Component } from 'react';
import { connect } from 'react-redux';

// local deps
import './App.css';
import { simpleAction } from './actions/simpleAction';

const mapDispatchToProps = dispatch => ({
    simpleAction: () => dispatch(simpleAction())
});

const mapStateToProps = state => ({
    ...state
});




class App extends Component {
    simpleAction = (event) => {
        this.props.simpleAction();
    }
    render() {
        return (
            <div className="App">
              <header>
                <div>Hello world</div>
                <p>Click on this button, for the sake of clicking</p>
                <button onClick={this.simpleAction}>Test redux action</button>
                <pre>
                  {JSON.stringify(this.props)}
                </pre>
              </header>
            </div>
            
        );
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
