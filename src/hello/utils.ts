// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// @ Copyright (c) Michael Leahcim                                                      @
// @ You can find additional information regarding licensing of this work in LICENSE.md @
// @ You must not remove this notice, or any other, from this software.                 @
// @ All rights reserved.                                                               @
// @@@@@@ At 2018-10-25 18:37 <thereisnodotcollective@gmail.com> @@@@@@@@@@@@@@@@@@@@@@@@

import { SimpleTime } from './store';
import { Record, List } from 'immutable';

type TimeDuration = {
  day: number; hour: number; minute: number; second: number; millisecond: number
}

export const millisecondsTillNow = (someDate: Date): number => {
  return +(new Date()) - +someDate
}

export const extractTags = (input: string): List<string> => {
  let matches = input.match(/#[^\s]+/g)
  return matches ? List<string>(matches) : List<string>([])
}

export const dateString = (input: Date): string =>
  input.getFullYear() + "-" + input.getMonth() + "-" + input.getDate()


export const simpleTimeAsString = (s: SimpleTime): string =>
  s.hour + ":" + s.minute

export const truncateString = (str: string, num: number): string =>
  str.length > num ? str.slice(0, num > 3 ? num - 3 : num) + '...' : str;


export const newSimpleTime = (date: Date): SimpleTime =>
  Record({ hour: 0, minute: 0 })({ hour: date.getHours(), minute: date.getMinutes() })


export const dayOfYear = (date: Date) =>
  Math.floor((+date - +(new Date(date.getFullYear(), 0, 0))) / 1000 / 60 / 60 / 24)



export const formatDuration = (millis: number): TimeDuration => {
  let ms = Math.abs(millis)
  return {
    day: Math.floor(ms / 86400000),
    hour: Math.floor(ms / 3600000) % 24,
    minute: Math.floor(ms / 60000) % 60,
    second: Math.floor(ms / 1000) % 60,
    millisecond: Math.floor(ms) % 1000
  }
}

