/* @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
 * @ Copyright (c) Michael Leahcim                                                      @
 * @ You can find additional information regarding licensing of this work in LICENSE.md @
 * @ You must not remove this notice, or any other, from this software.                 @
 * @ All rights reserved.                                                               @
 * @@@@@@ At 2018-10-24 20:33 <thereisnodotcollective@gmail.com> @@@@@@@@@@@@@@@@@@@@@@@@
 *  */

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import Contrib from './shumeric/views/contributions';
import Modals from './shumeric/views/modals';
import Sheet from './shumeric/views/sheet';
import Stats from './shumeric/views/statistics';
import TimeInput from './shumeric/views/timeInput';

import store from "./shumeric/store";

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <Provider store={store}>
      <Contrib />
      <Modals />
      <Sheet />
      <Stats />
      <TimeInput />
    </Provider>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});




