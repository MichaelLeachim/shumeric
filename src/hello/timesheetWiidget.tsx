/* @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
 * @ Copyright (c) Michael Leahcim                                                      @
 * @ You can find additional information regarding licensing of this work in LICENSE.md @
 * @ You must not remove this notice, or any other, from this software.                 @
 * @ All rights reserved.                                                               @
 * @@@@@@ At 2018-10-25 20:20 <thereisnodotcollective@gmail.com> @@@@@@@@@@@@@@@@@@@@@@@@
 *  */
import * as React from 'react';
import { WorkingSession, AppState } from "./store";
import * as ReactTooltip from 'react-tooltip'
import { simpleTimeAsString, truncateString, dateString } from './utils';
import { actionModalWorkingSession } from './actions';
import { fromNullable, getOrd } from 'fp-ts/lib/Option'
import { List } from 'immutable';


interface IProps {
  records: List<dayRecord>
}

type dayRecord = {
  dateItem: string
  children: List<WorkingSession>
}

function mapStateToProps({ workingSessions }: AppState): IProps {
  let result = workingSessions
    .take(30)
    .groupBy(a => dateString(a.dateStart))
    .filter((listOfItems, dateOfItem) => (listOfItems != null) && (dateOfItem != null))
    .map((listOfItems, dateOfItem) => dayRecord({ dateItem: dateOfItem, children: listOfItems }))

  return { records: result }
}


function mapDispatchToProps(dispatch: any) {
  return {
    closeModal: function(): void {
      dispatch(actionModalClose({}))
    },
  }
}


function timeSheetRow(props: WorkingSession) {
  let { amount, startedAt, endedAt, beforeText, afterText } = props
  let startedAtStr = simpleTimeAsString(startedAt)
  let endedAtStr = simpleTimeAsString(endedAt)

  let beforeTextTruncated = truncateString(beforeText, 20)

  return (
    <li>
      <a data-tip={`${beforeText}</br>${afterText}`} data-multiline={true}>
        <span className="mik-green-s-3"> ( {{ amount }} ) </span>
      </a>
      {startedAtStr} — {{ endedAtStr }} ·
      <span className="mik-grey" data-tip={`${beforeText}</br>${afterText}`} data-multiline={true}>
        {beforeTextTruncated}
        <button className="pure-button" onClick={() => actionModalWorkingSession({ ws: props })}>
        </button>
      </span>
    </li>)
}

function timeSheetWidget() {
  return (
    <div className="mik-pad-0 mik-margin-1" id="begin-work">
      <ReactTooltip />
      <ul className="mik-cut-left" style={{ listStyle: 'none' }}>
        <li>
          <div className="mik-grey">2018-03-13</div>
          <ul className="mik-cut-left" style={{ listStyle: 'none' }}>

          </ul>
        </li>
      </ul>
    </div>
  );


}
