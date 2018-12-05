/* @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
 * @ copyright (c) Michael Leahcim                                                      @
 * @ You can find additional information regarding licensing of this work in LICENSE.md @
 * @ You must not remove this notice, or any other, from this software.                 @
 * @ All rights reserved.                                                               @
 * @@@@@@ At 2018-10-24 22:38 <thereisnodotcollective@gmail.com> @@@@@@@@@@@@@@@@@@@@@@@@ */

// Widget that implements helps adding and removing time.

import * as React from 'react';
import {
  actionAlertOnComplete, actionBeginWorkSession, actionCancelWorkSession,
  actionFinalizeWorkSession, actionUpdateAfterText, actionUpdateBeforeText
} from '../actions';
import { AppState, CurrentWorkFrame, WorkingSession } from '../store';


import { fromNullable } from 'fp-ts/lib/Option';
import CircularProgressbar from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { connect } from 'react-redux'
import { formatDuration, millisecondsTillNow } from '../utils';

interface IProps {
  // props
  pageState: CurrentWorkFrame
  cur: WorkingSession;
  alertOnComplete: boolean;
  describeProject: string;
  // dispatchers
  finalizeWorkSession?: () => void
  cancelWorkSession?: () => void
  submitNewWorkSession?: (amount: number) => void
  updateAfterText?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  updateBeforeText?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  updateAlertOnComplete?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const mapStateToProps = ({ currentWork, alertOnComplete, projectPlaceholder, pageState }: AppState): IProps => {
  return {
    alertOnComplete,
    cur: currentWork,
    describeProject: projectPlaceholder,
    pageState,
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    updateBeforeText(e: React.ChangeEvent<HTMLInputElement>): void {
      dispatch(actionUpdateBeforeText({ inputText: e.target.textContent || "" }))
    },
    updateAfterText(e: React.ChangeEvent<HTMLInputElement>): void {
      dispatch(actionUpdateAfterText({ inputText: e.target.textContent || "" }))
    },
    cancelWorkSession(): void {
      dispatch(actionCancelWorkSession({}))
    },
    submitNewWorkSession(amount: number): void {
      dispatch(actionBeginWorkSession({ amount, now: new Date() }))
    },
    finalizeWorkSession(): void {
      dispatch(actionFinalizeWorkSession({ now: new Date() }))
    },
    updateAlertOnComplete(e: React.ChangeEvent<HTMLInputElement>): void {
      dispatch(actionAlertOnComplete({ shouldAlert: e.target.checked }))
    }
  }
}

const WorkSessionStart = ({ updateAlertOnComplete, updateBeforeText, describeProject, submitNewWorkSession }: IProps) =>
  <form className="pure-form" >
    <textarea placeholder={describeProject}
      onChange={(e) => fromNullable(updateBeforeText).map(a => a(e))}
      style={{ width: '100%', resize: 'vertical' }}
    />
    <div className="mik-flush-right mik-pad-top-0 mik-fs-0">
      <button className="pure-button mik-green-s-1-back-angry mik-margin-right-0" onClick={() => fromNullable(submitNewWorkSession).map(a => a(10))} >10 min</button>
      <button className="pure-button mik-green-s-2-back-angry mik-margin-right-0" onClick={() => fromNullable(submitNewWorkSession).map(a => a(25))}>25 min</button>
      <button className="pure-button mik-green-s-4-back-angry" onClick={() => fromNullable(submitNewWorkSession).map(a => a(60))}>1  hour</button>
    </div>
    <div className="mik-flush-right mik-pad-top-0">
      <label className="mik-fs-0" htmlFor="notify" style={{ cursor: 'pointer' }}>
        <input id="notify" type="checkbox" onChange={updateAlertOnComplete} /> Notify when complete? </label>
    </div>
  </form>

const WorkSessionInProgressWidget = ({ describeProject, cur, cancelWorkSession }: IProps) => {
  const { amount, dateStart } = cur
  const amountInMS = (amount * 1000 * 60)
  const ms = amountInMS - millisecondsTillNow(dateStart)
  const amountInS = (amount * 60)
  const percentage = (100 / amountInS) * (ms / 1000)
  const { minute, second } = formatDuration(ms)
  return (
    <div className="mik-pad-0 mik-margin-1">
      <form className="pure-form">
        <textarea disabled={true} style={{ width: '100%', resize: 'vertical' }}
          defaultValue={describeProject} />

        <div className="mik-flush-right mik-pad-top-0 mik-fs-0">
          Working for: <b>{amount} min</b>
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

const WorkSessionCompleteWidget = ({ describeProject, cur: { afterText, amount }, updateAfterText, cancelWorkSession, finalizeWorkSession }: IProps) =>
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
          value={afterText} />

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


const rootComponent = (props: IProps) => {
  switch (props.pageState) {
    case CurrentWorkFrame.WORK_FRAME_START_WORK: {
      return WorkSessionStart(props)
    }
    case CurrentWorkFrame.WORK_FRAME_WORKING: {
      return WorkSessionInProgressWidget(props)
    }
    case CurrentWorkFrame.WORK_FRAME_SUMMARY: {
      return WorkSessionCompleteWidget(props)
    }
  }
  return WorkSessionStart(props)
}

export default connect(mapStateToProps, mapDispatchToProps)(rootComponent)
