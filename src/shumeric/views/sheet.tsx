/* @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
 * @ Copyright (c) Michael Leahcim                                                      @
 * @ You can find additional information regarding licensing of this work in LICENSE.md @
 * @ You must not remove this notice, or any other, from this software.                 @
 * @ All rights reserved.                                                               @
 * @@@@@@ At 2018-10-25 20:20 <thereisnodotcollective@gmail.com> @@@@@@@@@@@@@@@@@@@@@@@@
 *  */

import * as React from 'react';
import { connect } from 'react-redux'
import * as ReactTooltip from 'react-tooltip'
import { AppState, WorkingSession } from "../store";

import { List } from 'immutable';
import 'react-calendar-heatmap/dist/styles.css';
import { actionModalClose, actionModalWorkingSession } from '../actions';
import { dateString, simpleTimeAsString, truncateString } from '../utils';


interface IProps {
  records: List<{
    dateItem: string
    children: List<WorkingSession>
  }>
}

const mapStateToProps = ({ workingSessions, }: AppState): IProps => {
  return {
    records: workingSessions
      .take(100)
      .groupBy(a => dateString(a.dateStart))
      .take(3)
      .map((listOfItems, dateOfItem) => ({ dateItem: dateOfItem, children: listOfItems.toList() }))
      .toList()
  }
}

const mapDispatchToProps = (dispatch: any) => {
  closeModal: () => dispatch(actionModalClose({}))
}

const timeSheetRowWidget = (props: WorkingSession) => {
  const { amount, startedAt, endedAt, beforeText, afterText } = props

  const startedAtStr = simpleTimeAsString(startedAt)
  const endedAtStr = simpleTimeAsString(endedAt)
  const beforeTextTruncated = truncateString(beforeText, 20)
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

const timeSheetWidget = (props: IProps) =>
  <div className="mik-pad-0 mik-margin-1">
    <ReactTooltip />
    <ul className="mik-cut-left" style={{ listStyle: 'none' }}>{
      props.records.map(item =>
        <li>
          <div className="mik-grey">{item.dateItem}</div>
          <ul className="mik-cut-left" style={{ listStyle: 'none' }}>
            {item.children.map(timeSheetRowWidget)}
          </ul>
        </li>
      )
    }
    </ul>
  </div>

export default connect(mapStateToProps, mapDispatchToProps)(timeSheetWidget)
