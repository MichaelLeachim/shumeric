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

import { Map, List, RecordOf } from "immutable"

export enum CurrentWorkFrame {
  WORK_FRAME_START_WORK = 1,
  WORK_FRAME_WORKING,
  WORK_FRAME_SUMMARY,
}
export type DayRecord = RecordOf<{
  date: string
  children: List<WorkingSession>
}>

export enum ModalType {
  TIMESHEET_MODAL = 1,
}

export type SimpleTime = RecordOf<{
  hour: number
  minute: number
}>

export type WorkingSession = RecordOf<{
  startedAt: SimpleTime
  endedAt: SimpleTime
  amount: number
  beforeText: string
  afterText: string
  dateStart: Date
  dateEnd: Date
  tagList: List<string>
}>


export type ModalState = RecordOf<{
  isModalOpen: boolean
  modalType: ModalType
  modalContentLabel: string
  timeSheetModal: WorkingSession
}>

export type AppState = RecordOf<{
  alertOnComplete: boolean
  projectPlaceholder: string
  modalState: ModalState
  pageState: CurrentWorkFrame
  currentWork: WorkingSession
  workingSessions: List<WorkingSession>
  statsCollector: StatsCollector
}>

export type StatRecord = RecordOf<{
  countSessions: number
  countTime: number
  date: string
}>

// stats collector works on a year base
export type StatsCollector = RecordOf<{
  totalYear: StatRecord                // 1
  monthOfYear: Map<number, StatRecord> // 1..12
  dayOfYear: Map<number, StatRecord>   // 1..365
  tagOfDay: Map<string, StatRecord>
}>

const store = createStore<AppState, Action<any>, null, null>(Reducer, {
  modalState: { isModalOpen: false },
  currentWork: {},
  workingSessions: List([]),
});

export default store;

