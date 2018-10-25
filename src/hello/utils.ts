// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// @ Copyright (c) Michael Leahcim                                                      @
// @ You can find additional information regarding licensing of this work in LICENSE.md @
// @ You must not remove this notice, or any other, from this software.                 @
// @ All rights reserved.                                                               @
// @@@@@@ At 2018-10-25 18:37 <thereisnodotcollective@gmail.com> @@@@@@@@@@@@@@@@@@@@@@@@
import { SimpleTime } from './store';

type TimeDuration = {
  day: number; hour: number; minute: number; second: number; millisecond: number
}

export function millisecondsTillNow(someDate: Date): number {
  return +(new Date()) - +someDate
}

export function extractTags(input: string): Array<string> {
  let matches = input.match(/#[^\s]+/g)
  return matches ? matches : []
}

export function dateString(input: Date): string {
  return input.getFullYear() + "-" + input.getMonth() + "-" + input.getDate()
}

export function simpleTimeAsString(s: SimpleTime): string {
  return s.hour + ":" + s.minute
}

// export function voidfn(...input): void {
//   return
// }

export function truncateString(str: string, num: number): string {
  return str.length > num ? str.slice(0, num > 3 ? num - 3 : num) + '...' : str;
}

export function newSimpleTime(date: Date): SimpleTime {
  return { hour: date.getHours(), minute: date.getMinutes() }
}

export function formatDuration(ms: number): TimeDuration {
  if (ms < 0) {
    ms = -ms;
  }
  return {
    day: Math.floor(ms / 86400000),
    hour: Math.floor(ms / 3600000) % 24,
    minute: Math.floor(ms / 60000) % 60,
    second: Math.floor(ms / 1000) % 60,
    millisecond: Math.floor(ms) % 1000
  };
};

