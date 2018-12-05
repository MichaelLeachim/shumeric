/* @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
 * @ Copyright (c) Michael Leahcim                                                      @
 * @ You can find additional information regarding licensing of this work in LICENSE.md @
 * @ You must not remove this notice, or any other, from this software.                 @
 * @ All rights reserved.                                                               @
 * @@@@@@ At 2018-12-04 14:13 <thereisnodotcollective@gmail.com> @@@@@@@@@@@@@@@@@@@@@@@@
 *  */

// This is a statistcs view.
// It will show a condensed view on contributions for the last year.

import * as React from 'react';
import { connect } from 'react-redux'
import { AppState, StatRecord } from "../store";

import { dayOfYear } from '../utils'

import { List } from 'immutable';
import 'react-calendar-heatmap/dist/styles.css';

interface IProps {
  now: Date
  currentMonth?: StatRecord
  currentDay?: StatRecord
  currentYear?: StatRecord
  tags?: List<{ tagName: string, data: StatRecord }>,
}

const mapStateToProps = ({ statsCollector: { totalYear, monthOfYear, dayOfYear: dayOfYearCollection, tagOfDay } }: AppState): IProps => {
  const now = new Date()
  return {
    currentDay: dayOfYearCollection.get(dayOfYear(now)),
    currentMonth: monthOfYear.get(now.getMonth()),
    currentYear: totalYear,
    now,
    tags: tagOfDay.map((stats, tagname) => ({ tagName: tagname, data: stats })).toList()
  }
}

interface IDisplaySesionEntryProps {
  item?: StatRecord,
  itemName: string
}

const DisplaySessionEntry = ({ item, itemName }: IDisplaySesionEntryProps) => {
  const todoImplementDownloadingAsSpreadsheet = () => alert("[TODO] implement downloading as spreadsheet")

  return (<span>{
    item &&
    <li className="mik-flush-right">
      <div className="mik-grey">
        <a className="no-decor mik-cut-top" href="#" onClick={todoImplementDownloadingAsSpreadsheet}> {itemName}</a>
      </div>
      <div className="mik-fs-0">
        <b> {item.countSessions} </b>sessions /<b> {item.countTime} </b>hours</div>
    </li>
  }</span>)
}

const statsPanel = ({ now, currentYear, currentMonth, currentDay, tags }: IProps) =>
  <div className="mik-margin-top-5" >
    <ul className="mik-cut-left" style={{ listStyle: 'none' }}>
      <DisplaySessionEntry item={currentDay} itemName="Today" />
      <DisplaySessionEntry item={currentMonth} itemName="This month" />
      <DisplaySessionEntry item={currentYear} itemName="This year" />
      <ul className="mik-cut-left" style={{ listStyle: 'none' }}>
        {tags && tags.map((item) => <DisplaySessionEntry key={item.tagName} item={item.data} itemName={item.tagName} />)}
      </ul>
    </ul>
  </div >

export default connect(mapStateToProps)(statsPanel)

