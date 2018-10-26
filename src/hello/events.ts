// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// @ Copyright (c) Michael Leahcim                                                      @
// @ You can find additional information regarding licensing of this work in LICENSE.md @
// @ You must not remove this notice, or any other, from this software.                 @
// @ All rights reserved.                                                               @
// @@@@@@ At 2018-10-24 23:08 <thereisnodotcollective@gmail.com> @@@@@@@@@@@@@@@@@@@@@@@@

import { CurrentWorkFrame, AppState, WorkingSession } from "./store";
import { List } from 'immutable';
import { extractTags, newSimpleTime } from './utils';

export const eventUpdateBeforeText = (state: AppState, newText: string): AppState =>
  state.set("currentWork",
    state.currentWork
      .set("beforeText", newText)
      .set("tagList", List<string>(extractTags(newText))))


export const eventUpdateAfterText = (state: AppState, newText: string): AppState =>
  state.set("currentWork",
    state.currentWork
      .set("afterText", newText)
      .set("tagList", List<string>(extractTags(newText))))

export const eventCancelWorkSession = (state: AppState): AppState =>
  state.set("pageState", CurrentWorkFrame.WORK_FRAME_START_WORK)

// 1. close the session.
// 2. swap its working state
// 3. push result to work session list
// 4. [optional] recalculate statistics
export const eventFinalizeWorkSession = (state: AppState, now: Date): AppState =>
  state
    .set("pageState", CurrentWorkFrame.WORK_FRAME_START_WORK)
    .set("workingSessions", state.workingSessions.unshift(
      state.currentWork
        .set("endedAt", newSimpleTime(now))
        .set("dateEnd", now)))

export const eventSetAlertOnUpdate = (state: AppState, alertOnComplete: boolean): AppState =>
  state.set("alertOnComplete", alertOnComplete)

export const eventBeginWorkingSession = (state: AppState, now: Date, amount: number): AppState =>
  state
    .set("pageState", CurrentWorkFrame.WORK_FRAME_WORKING)
    .set("currentWork",
      state.currentWork
        .set("startedAt", newSimpleTime(now))
        .set("amount", amount)
        .set("dateStart", now))

export const eventModalWorkingSession = (state: AppState, ws: WorkingSession): AppState =>
  state.set("modalState",
    state.modalState
      .set("isModalOpen", true)
      .set("timeSheetModal", ws))

export const eventModalClose = (state: AppState): AppState =>
  state.set("modalState",
    state.modalState.set("isModalOpen", false))








