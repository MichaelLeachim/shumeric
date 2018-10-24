// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// @ Copyright (c) Michael Leahcim                                                      @
// @ You can find additional information regarding licensing of this work in LICENSE.md @
// @ You must not remove this notice, or any other, from this software.                 @
// @ All rights reserved.                                                               @
// @@@@@@ At 2018-10-24 23:08 <thereisnodotcollective@gmail.com> @@@@@@@@@@@@@@@@@@@@@@@@

import { IAppState } from "./store";
import { IActionUpdateBeforeText, IActionAlertOnComplete } from './actions';

export function eventUpdateBeforeText(state: IAppState, action: IActionUpdateBeforeText): IAppState {
  return {
    ...state, currentWork:
      { ...state.currentWork, beforeText: action.newText }
  }
}

export function eventSetAlertOnUpdate(state: IAppState, action: IActionAlertOnComplete): IAppState {
  return {
    ...state, alertOnComplete: action.AlertOnComplete
  }
}


