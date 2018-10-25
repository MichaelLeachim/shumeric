/* @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
 * @ copyright (c) Michael Leahcim                                                      @
 * @ You can find additional information regarding licensing of this work in LICENSE.md @
 * @ You must not remove this notice, or any other, from this software.                 @
 * @ All rights reserved.                                                               @
 * @@@@@@ At 2018-10-24 22:38 <thereisnodotcollective@gmail.com> @@@@@@@@@@@@@@@@@@@@@@@@ */

import * as React from 'react';
import { AppState, CurrentWorkingSession } from './store';
import { actionUpdateBeforeText, actionAlertOnComplete, actionCancelWorkSession, actionUpdateAfterText, actionFinalizeWorkSession, actionBeginWorkSession } from './actions';
import CircularProgressbar from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { millisecondsTillNow, formatDuration } from './utils';

interface IProps {
  cur: CurrentWorkingSession;
  alertOnComplete: boolean;
  describeProject: string;
  finalizeWorkSession?: () => void
  cancelWorkSession?: () => void
  submitNewWorkSession?: (amount: number) => void
  updateBeforeText?: (e: React.ChangeEvent<HTMLInputElement>) => void
  updateAlertOnComplete?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

function mapStateToProps({ currentWork, alertOnComplete, projectPlaceholder }: AppState): IProps {
  return {
    cur: currentWork,
    describeProject: projectPlaceholder,
    alertOnComplete: alertOnComplete,
  }
}

function mapDispatchToProps(dispatch: any) {
  return {
    updateBeforeText: function(e: React.ChangeEvent<HTMLInputElement>): void {
      dispatch(actionUpdateBeforeText({ inputText: e.target.textContent || "" }))
    },
    updateAfterText: function(e: React.ChangeEvent<HTMLInputElement>): void {
      dispatch(actionUpdateAfterText({ inputText: e.target.textContent || "" }))
    },
    cancelWorkSession: function(): void {
      dispatch(actionCancelWorkSession({}))
    },
    submitNewWorkSession: function(amount: number): void {
      dispatch(actionBeginWorkSession({ amount: amount, now: new Date() }))
    },
    finalizeWorkSession: function(): void {
      dispatch(actionFinalizeWorkSession({ now: new Date() }))
    },
    updateAlertOnComplete: function(e: React.ChangeEvent<HTMLInputElement>): void {
      dispatch(actionAlertOnComplete({ shouldAlert: e.target.checked }))
    }
  }
}

function workSessionStart({ updateAlertOnComplete, updateBeforeText, describeProject, submitNewWorkSession }: IProps) {
  return (
    <form className="pure-form">
      <textarea placeholder={describeProject}
        onChange={updateBeforeText}
        style={{ width: '100%', resize: 'vertical' }}
      />
      <div className="mik-flush-right mik-pad-top-0 mik-fs-0">
        <button className="pure-button mik-green-s-1-back-angry mik-margin-right-0" onClick={() => submitNewWorkSession(10)} >10 min</button>
        <button className="pure-button mik-green-s-2-back-angry mik-margin-right-0" onClick={() => submitNewWorkSession(25)}>25 min</button>
        <button className="pure-button mik-green-s-4-back-angry" onClick={() => submitNewWorkSession(60)}>1  hour</button>
      </div>
      <div className="mik-flush-right mik-pad-top-0">
        <label className="mik-fs-0" htmlFor="notify" style={{ cursor: 'pointer' }}>
          <input id="notify" type="checkbox" onChange={updateAlertOnComplete} /> Notify when complete? </label>
      </div>
    </form>
  )
}

function workSessionInProgressWidget({ describeProject, cur, cancelWorkSession }: IProps) {
  let { amount, dateStart } = cur

  let amountInMS = (amount * 1000 * 60)
  let ms = amountInMS - millisecondsTillNow(dateStart)
  let amountInS = (amount * 60)
  let percentage = (100 / amountInS) * (ms / 1000)
  let { minute, second } = formatDuration(ms)
  return (
    <div className="mik-pad-0 mik-margin-1">
      <form className="pure-form">
        <textarea disabled={true} style={{ width: '100%', resize: 'vertical' }}
          defaultValue={describeProject} />

        <div className="mik-flush-right mik-pad-top-0 mik-fs-0">
          Working for: <b>{{ amount }} min</b>
        </div>

        <div className="mik-flush-center mik-pad-2">

          <CircularProgressbar
            percentage={percentage}
            text={`${minute}:${second}`}>
          </CircularProgressbar>

          <div className="mik-grey mik-fs-0 mik-flush-right">
            <b>Why I can't pause my work?</b>
            <p>Pause ruins concentration<br />
              This is all or nothing situation<br />
              So, please, continue with it<br />
              Thank you
            </p>
          </div>

          <div className="mik-flush-right mik-fs-0">
            <button className="pure-button mik-red-back-angry" onClick={cancelWorkSession}>Cancel</button>
          </div>
        </div>
      </form>
    </div>
  );
}

function workSessionCompleteWidget({ describeProject, cur, updateAfterText, cancelWorkSession, finalizeWorkSession }: IProps) {
  let { afterText, amount } = cur
  return (
    <div className="mik-pad-0 mik-margin-1">
      <form className="pure-form">
        <textarea disabled={true}
          style={{ width: '100%', resize: 'vertical' }}
          value={describeProject} />
        <div className="mik-flush-right mik-pad-top-0 mik-fs-0">
          You've worked: <b> {`1 session for ${amount} minutes`}</b>
        </div>
        <div className="mik-tiny-container mik-margin-1">
          <ul className="mik-fs-0">
            <li>What did you achieved? </li>
            <li>How did the task change while working?</li>
            <li>How did the initial definiton of the task changed?</li>
          </ul>
          <textarea placeholder="Write a review on what you have achieved during this time" style={{ width: '100%', resize: 'vertical' }}
            onChange={updateAfterText}
            value={{ afterText }} />

          <div className="mik-grey mik-fs-0 mik-flush-right mik-margin-0 mik-cut-right">
            Earlier tags will be overwritten by postcriptum
          </div>

          <div className="mik-flush-right mik-fs-0">
            <button className="pure-button mik-red-back-angry mik-margin-right-0" onClick={cancelWorkSession}>Cancel session</button>
            <button className="pure-button mik-green-back-angry" onClick={finalizeWorkSession}>Add to timesheet!</button>
          </div>
        </div>
      </form>
    </div>
  );
}




