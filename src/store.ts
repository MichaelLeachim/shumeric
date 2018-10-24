/* @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
 * @ Copyright (c) Michael Leahcim                                                      @
 * @ You can find additional information regarding licensing of this work in LICENSE.md @
 * @ You must not remove this notice, or any other, from this software.                 @
 * @ All rights reserved.                                                               @
 * @@@@@@ At 2018-10-24 18:13 <thereisnodotcollective@gmail.com> @@@@@@@@@@@@@@@@@@@@@@@@ */
import { createStore } from 'redux';

import { EnthusiasmAction } from "./hello/actions"
import { IStoreState } from "./hello/headers"
import { enthusiasm } from './hello/reducers';

const store = createStore<IStoreState, EnthusiasmAction, null, null>(enthusiasm, {
  enthusiasmLevel: 1,
  languageName: 'TypeScript',
});

export default store;


