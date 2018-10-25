/* @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
 * @ Copyright (c) Michael Leahcim                                                      @
 * @ You can find additional information regarding licensing of this work in LICENSE.md @
 * @ You must not remove this notice, or any other, from this software.                 @
 * @ All rights reserved.                                                               @
 * @@@@@@ At 2018-10-24 18:13 <thereisnodotcollective@gmail.com> @@@@@@@@@@@@@@@@@@@@@@@@ 
 */

import { createStore } from 'redux';

import { Action } from "./actions";
import { Reducer } from './reducers';

import { List } from "immutable"

export enum CurrentWorkFrame {
  WORK_FRAME_START_WORK = 1,
  WORK_FRAME_WORKING,
  WORK_FRAME_SUMMARY,
}

export enum ModalType {
  TIMESHEET_MODAL = 1,
}

export type SimpleTime = {
  hour: number
  minute: number
}

export type WorkingSession = {
  startedAt: SimpleTime
  endedAt: SimpleTime
  amount: number
  beforeText: string
  afterText: string
  dateStart: Date
  dateEnd: Date
  tagList: List<string>
}

export interface CurrentWorkingSession extends WorkingSession {
  pageState: CurrentWorkFrame
}

export type ModalState = {
  isModalOpen: boolean
  modalType: ModalType
  modalContentLabel: string
  timeSheetModal: WorkingSession

}

export type AppState = {
  alertOnComplete: boolean
  projectPlaceholder: string
  modalState: ModalState
  currentWork: CurrentWorkingSession
  workingSessions: List<WorkingSession>
}

const store = createStore<AppState, Action<any>, null, null>(Reducer, {
  modalState: { isModalOpen: false },
  currentWork: {},
  workingSessions: List([]),
});

export default store;


