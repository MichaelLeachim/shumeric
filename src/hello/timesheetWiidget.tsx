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
import { actionModalWorkingSession, actionModalClose } from './actions';
import { fromNullable } from 'fp-ts/lib/Option'
import { List, Record } from 'immutable';
import 'react-calendar-heatmap/dist/styles.css';
import ReactCalendarHeatmap from 'react-calendar-heatmap';

type contribCount = {
  data: string,
  count: number
}

type tinySession = {
  date: string
  sessions: List<number>
}
type dayRecord = {
  dateItem: string
  children: List<WorkingSession>
}

type gatheredStats = {
  curMonth: { name: string, data: List<number> }
  curDay: { name: string, data: List<number> }
  curYear: { name: string, data: List<number> }
  tags

}



interface IProps {
  records: List<dayRecord>
  contribCount: List<contribCount>
  startDate: Date,
  endDate: Date,
}


const mapStateToProps = ({ workingSessions }: AppState): IProps => {
  workingSessions.reduce((prev, next) =>
  }
  )
let groupedData = workingSessions
  .groupBy(a => dateString(a.dateStart))

let contribCount = groupedData
  .map(function(listOfItems, dateOfItem): contribCount {
    return { data: dateOfItem, count: listOfItems.count() }
  }).toList()

let startDate = fromNullable(contribCount.first()).map(item => new Date(item.data)).getOrElse(new Date())
let endDate = fromNullable(contribCount.last()).map(item => new Date(item.data)).getOrElse(new Date())

let records = groupedData.take(3)
  .map(function(listOfItems, dateOfItem): dayRecord {
    return { dateItem: dateOfItem, children: listOfItems.toList() }
  })
  .toList()

return { records: records, contribCount: contribCount, startDate: startDate, endDate: endDate }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    closeModal: function(): void {
      dispatch(actionModalClose({}))
    },
  }
}

const timeSheetRowWidget = (props: WorkingSession) => {
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

const timeSheetWidget = (props: IProps) => {
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
}

const contributionsWidget = ({ contribCount, startDate, endDate }: IProps) => {
  <div className="mik-pad-0 mik-margin-1">
    <div className="mik-flush-right mik-pad-bottom-0">
      <b className="mik-grey">contributions</b></div>
    <ReactCalendarHeatmap
      values={contribCount.toArray()}
      startDate={startDate}
      endDate={endDate}
    />
  </div>
}

const statsPanel = (props: IProps) => {
  <div className="mik-margin-top-5" >
    <ul className="mik-cut-left" style={{ listStyle: 'none' }}>
      <li className="mik-flush-right">
        <div className="mik-grey">
          <a className="no-decor mik-cut-top" href="#">Today</a>
        </div>
        <div className="mik-fs-0">
          <b> 5 </b>sessions /<b> 4 </b>hours
        </div>
      </li>

      <ul className="mik-cut-left" style={{ listStyle: 'none' }}>
        <li className="mik-flush-right">
          <div className="mik-grey">
            <a className="no-decor mik-cut-top" href="#">#opensource</a>
          </div>
          <div className="mik-fs-0"><b> 5 </b>sessions /<b> 4 </b>hours</div>
        </li>
      </ul>
    </ul>
  </div>
}
