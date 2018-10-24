/* @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
 * @ Copyright (c) Michael Leahcim                                                      @
 * @ You can find additional information regarding licensing of this work in LICENSE.md @
 * @ You must not remove this notice, or any other, from this software.                 @
 * @ All rights reserved.                                                               @
 * @@@@@@ At 2018-10-24 18:13 <thereisnodotcollective@gmail.com> @@@@@@@@@@@@@@@@@@@@@@@@ */
import { createStore } from 'redux';

import { Action } from "./actions";
import { Reducer } from './reducers';
import { List } from "immutable"

enum CurrentWorkFrame (
  WORK_FRAME_START_WORK = 1,
  WORK_FRAME_WORKING,
  WORK_FRAME_SUMMARY,
)

export interface ITime {
  hour: number
  minute: number
}

export interface IWorkingSession {
  startedAt: ITime
  endedAt: ITime
  amount: number
  beforeText: string
  afterText: string
  dateStart: Date
  dateEnd: Date
  taglist: List<string>
}

export interface ICurrentWorkingSession extends IWorkingSession {
  pageState: CurrentWorkFrame
}

export interface IAppState {
  alertOnComplete: boolean
  currentWork: ICurrentWorkingSession
  workingSessions: List<IWorkingSession>
}

const store = createStore<IAppState, Action, null, null>(Reducer, {
  currentWork: {},
  workingSessions: List([]),
});

export default store;


