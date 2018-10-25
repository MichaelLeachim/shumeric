// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// @ Copyright (c) Michael Leahcim                                                      @
// @ You can find additional information regarding licensing of this work in LICENSE.md @
// @ You must not remove this notice, or any other, from this software.                 @
// @ All rights reserved.                                                               @
// @@@@@@ At 2018-10-24 23:08 <thereisnodotcollective@gmail.com> @@@@@@@@@@@@@@@@@@@@@@@@

import { CurrentWorkFrame, AppState, WorkingSession } from "./store";
import { List } from 'immutable';
import { extractTags, newSimpleTime } from './utils';

export function eventUpdateBeforeText(state: AppState, newText: string): AppState {
  return {
    ...state, currentWork:
      { ...state.currentWork, beforeText: newText, tagList: List<string>(extractTags(newText)) }
  }
}

export function eventUpdateAfterText(state: AppState, newText: string): AppState {
  return {
    ...state, currentWork:
      { ...state.currentWork, afterText: newText, tagList: List<string>(extractTags(newText)) }
  }

}


export function eventCancelWorkSession(state: AppState): AppState {
  return {
    ...state, currentWork:
    {
      ...state.currentWork,
      pageState: CurrentWorkFrame.WORK_FRAME_START_WORK,
    }
  }
}


// 1. close the session.
// 2. swap its working state
// 3. push result to work session list
// 4. [optional] recalculate statistics
export function eventFinalizeWorkSession(state: AppState, now: Date): AppState {
  return {
    ...state, currentWork:
      { ...state.currentWork, pageState: CurrentWorkFrame.WORK_FRAME_START_WORK },
    workingSessions: state.workingSessions.unshift(
      {
        ...state.currentWork,
        endedAt: newSimpleTime(now),
        dateEnd: now,
      })
  }

}

export function eventSetAlertOnUpdate(state: AppState, alertOnComplete: boolean): AppState {
  return {
    ...state, alertOnComplete: alertOnComplete
  }
}

export function eventBeginWorkingSession(state: AppState, now: Date, amount: number): AppState {
  return {
    ...state, currentWork:
    {
      ...state.currentWork,
      pageState: CurrentWorkFrame.WORK_FRAME_WORKING,
      startedAt: { hour: now.getHours(), minute: now.getMinutes() },
      amount: amount,
      dateStart: now,
    }
  }
}

export function eventModalWorkingSession(state: AppState, ws: WorkingSession): AppState {
  return {
    ...state, modalState: {
      ...state.modalState, isModalOpen: true, timeSheetModal: ws
    }
  }
}
export function eventModalClose(state: AppState): AppState {
  return {
    ...state, modalState: {
      ...state.modalState, isModalOpen: false
    }
  }
}






