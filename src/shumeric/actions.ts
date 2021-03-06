/* @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
 * @ Copyright (c) Michael Leahcim                                                      @
 * @ You can find additional information regarding licensing of this work in LICENSE.md @
 * @ You must not remove this notice, or any other, from this software.                 @
 * @ All rights reserved.                                                               @
 * @@@@@@ At 2018-10-24 18:14 <thereisnodotcollective@gmail.com> @@@@@@@@@@@@@@@@@@@@@@@@ */

import { WorkingSession } from './store';

export interface IAction<TPayload> {
  type: string;
  payload: TPayload;
}

interface IActionCreator<P> {
  type: string;
  (payload: P): IAction<P>;
}

function actionCreator<P>(type: string): IActionCreator<P> {
  return Object.assign(
    (payload: P) => ({ type, payload }),
    { type }
  );
}

export function isType<P>(action: IAction<any>,
  ac: IActionCreator<P>): action is IAction<P> {
  return action.type === ac.type;
}

export const actionCancelWorkSession = actionCreator<{}>("CANCEL_WORK_SESSION")
export const actionUpdateBeforeText = actionCreator<{ inputText: string }>("UPDATE_BEFORE_TEXT")
export const actionAlertOnComplete = actionCreator<{ shouldAlert: boolean }>("ALERT_ON_COMPLETE")
export const actionBeginWorkSession = actionCreator<{ amount: number, now: Date }>("BEGIN_WORK_SESSION")
export const actionUpdateAfterText = actionCreator<{ inputText: string }>("END_WORK_SESSION_SET_TEXT")
export const actionFinalizeWorkSession = actionCreator<{ now: Date }>("FINALIZE_WORK_SESSION")

export const actionModalWorkingSession = actionCreator<{ ws: WorkingSession }>("WORKING_SESSION_MODAL")
export const actionModalClose = actionCreator<{}>("MODAL_CLOSE")
export const actionTick = actionCreator<{}>("TICK")

