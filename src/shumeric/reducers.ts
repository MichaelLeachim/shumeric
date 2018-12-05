/* @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
 * @ Copyright (c) Michael Leahcim                                                      @
 * @ You can find additional information regarding licensing of this work in LICENSE.md @
 * @ You must not remove this notice, or any other, from this software.                 @
 * @ All rights reserved.                                                               @
 * @@@@@@ At 2018-10-24 18:17 <thereisnodotcollective@gmail.com> @@@@@@@@@@@@@@@@@@@@@@@@ */

import {
  actionAlertOnComplete, actionBeginWorkSession, actionCancelWorkSession, actionFinalizeWorkSession, actionModalClose,
  actionModalWorkingSession, actionUpdateBeforeText, IAction, isType,
} from './actions';
import { AppState } from './store';

import {
  eventBeginWorkingSession, eventCancelWorkSession, eventFinalizeWorkSession, eventModalClose,
  eventModalWorkingSession, eventSetAlertOnUpdate, eventUpdateAfterText, eventUpdateBeforeText
} from './events';


export function Reducer(state: AppState, action: IAction<any>): AppState {
  if (isType(action, actionUpdateBeforeText)) {
    return eventUpdateBeforeText(state, action.payload.inputText)
  }
  if (isType(action, actionAlertOnComplete)) {
    return eventSetAlertOnUpdate(state, action.payload.shouldAlert)
  }
  if (isType(action, actionBeginWorkSession)) {
    return eventBeginWorkingSession(state, action.payload.now, action.payload.amount)
  }
  if (isType(action, actionCancelWorkSession)) {
    return eventCancelWorkSession(state)
  }
  if (isType(action, actionUpdateBeforeText)) {
    return eventUpdateAfterText(state, action.payload.inputText)
  }
  if (isType(action, actionFinalizeWorkSession)) {
    return eventFinalizeWorkSession(state, action.payload.now)
  }

  if (isType(action, actionModalClose)) {
    return eventModalClose(state)
  }

  if (isType(action, actionModalWorkingSession)) {
    return eventModalWorkingSession(state, action.payload.ws)
  }

  return state;
}
