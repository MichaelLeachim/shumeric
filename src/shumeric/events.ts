// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// @ Copyright (c) Michael Leahcim                                                      @
// @ You can find additional information regarding licensing of this work in LICENSE.md @
// @ You must not remove this notice, or any other, from this software.                 @
// @ All rights reserved.                                                               @
// @@@@@@ At 2018-10-24 23:08 <thereisnodotcollective@gmail.com> @@@@@@@@@@@@@@@@@@@@@@@@

import { increment } from 'fp-ts/lib/function';
import { List } from 'immutable';
import { AppState, CurrentWorkFrame, StatRecord, WorkingSession } from "./store";
import { dateString, dayOfYear, extractTags, newSimpleTime } from './utils';

export const updateStatRecord = (state: AppState, record: WorkingSession, now: Date): AppState => {
  const tags = extractTags(record.afterText).toSet()
  // "thisMonth"
  // "thisDay"
  // "thisYear"
  const updatefn = (item: StatRecord) => item
    .set("date", dateString(now))
    .update("countSessions", increment)
    .update("countTime", a => a + record.amount)
  return state.update("statsCollector", sc =>
    sc.update("totalYear", updatefn)
      .update("monthOfYear", a => a.update(record.dateEnd.getMonth(), updatefn))
      .update("dayOfYear", a => a.update(dayOfYear(record.dateEnd), updatefn))
      .update("tagOfDay", tagOfDay => tagOfDay.map((v, tag) => tags.contains(tag) ? updatefn(v) : v)))
}

export const eventUpdateBeforeText = (state: AppState, newText: string): AppState =>
  state.update("currentWork", w => w
    .set("beforeText", newText)
    .set("tagList", List<string>(extractTags(newText))))

export const eventUpdateAfterText = (state: AppState, newText: string): AppState =>
  state.update("currentWork", w => w
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
    .update("workingSessions", w =>
      w.unshift(
        state.currentWork
          .set("endedAt", newSimpleTime(now))
          .set("dateEnd", now)))

export const eventSetAlertOnUpdate = (state: AppState, alertOnComplete: boolean): AppState =>
  state.set("alertOnComplete", alertOnComplete)

export const eventBeginWorkingSession = (state: AppState, now: Date, amount: number): AppState =>
  state
    .set("pageState", CurrentWorkFrame.WORK_FRAME_WORKING)
    .update("currentWork", w => w
      .set("startedAt", newSimpleTime(now))
      .set("amount", amount)
      .set("dateStart", now))

export const eventModalWorkingSession = (state: AppState, ws: WorkingSession): AppState =>
  state.update("modalState", m => m
    .set("isModalOpen", true)
    .set("timeSheetModal", ws))

export const eventModalClose = (state: AppState): AppState =>
  state.update("modalState", w => w
    .set("isModalOpen", false))
