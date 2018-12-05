/* @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
 * @ Copyright (c) Michael Leahcim                                                      @
 * @ You can find additional information regarding licensing of this work in LICENSE.md @
 * @ You must not remove this notice, or any other, from this software.                 @
 * @ All rights reserved.                                                               @
 * @@@@@@ At 2018-12-04 13:40 <thereisnodotcollective@gmail.com> @@@@@@@@@@@@@@@@@@@@@@@@ */

/* This is a widget that will show the amount of work happened last year 
   This is a WIP */

import { List } from 'immutable';
import * as React from 'react';
import ReactCalendarHeatmap from 'react-calendar-heatmap';

import { AppState } from "../store";

import { fromNullable } from 'fp-ts/lib/Option'
import { connect } from 'react-redux'

interface IProps {
  contribCount: List<{ data: string, count: number }>
  startDate: Date,
  endDate: Date,
}

const mapStateToProps = ({ workingSessions, statsCollector: { dayOfYear } }: AppState): IProps => {
  const contribCount = dayOfYear
    .map((item, day) => ({ data: item.date, count: item.countSessions })).toList();
  const now = new Date()
  return {
    contribCount,
    startDate: fromNullable(contribCount.first()).map(item => new Date(item.data)).getOrElse(now),
    endDate: fromNullable(contribCount.last()).map(item => new Date(item.data)).getOrElse(now),
  }
}

const contributionsWidget = ({ contribCount, startDate, endDate }: IProps) =>
  <div className="mik-pad-0 mik-margin-1">
    <div className="mik-flush-right mik-pad-bottom-0">
      <b className="mik-grey">contributions</b></div>
    <ReactCalendarHeatmap
      values={contribCount.toArray()}
      startDate={startDate}
      endDate={endDate}
    />
  </div>

export default connect(mapStateToProps)(contributionsWidget)
