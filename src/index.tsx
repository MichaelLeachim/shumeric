/* @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
 * @ Copyright (c) Michael Leahcim                                                      @
 * @ You can find additional information regarding licensing of this work in LICENSE.md @
 * @ You must not remove this notice, or any other, from this software.                 @
 * @ All rights reserved.                                                               @
 * @@@@@@ At 2018-10-24 20:11 <thereisnodotcollective@gmail.com> @@@@@@@@@@@@@@@@@@@@@@@@
 *  */

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from "react-redux"

import registerServiceWorker from './vendor/registerServiceWorker';

import Contrib from './shumeric/views/contributions';
import Modals from './shumeric/views/modals';
import Sheet from './shumeric/views/sheet';
import Stats from './shumeric/views/statistics';
import TimeInput from './shumeric/views/timeInput';

import store from "./shumeric/store";

ReactDOM.render(
  <div className="mik-container">
    <div className="pure-u-1-4">
      <Provider store={store}><Stats /></Provider>
    </div>
    <div className="pure-u-3-4">
      <Provider store={store}><TimeInput /></Provider>
      <Provider store={store}><Sheet /></Provider>
      <Provider store={store}><Contrib /></Provider>
    </div>
    <Provider store={store}><Modals /></Provider>
  </div>,
  document.getElementById('root') as HTMLElement
);

registerServiceWorker();
