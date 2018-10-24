/* @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
 * @ Copyright (c) Michael Leahcim                                                      @
 * @ You can find additional information regarding licensing of this work in LICENSE.md @
 * @ You must not remove this notice, or any other, from this software.                 @
 * @ All rights reserved.                                                               @
 * @@@@@@ At 2018-10-24 18:14 <thereisnodotcollective@gmail.com> @@@@@@@@@@@@@@@@@@@@@@@@ */

export enum TypeOfAction {
  UPDATE_BEFORE_TEXT = 'UPDATE_BEFORE_TEXT',
  ALERT_ON_COMPLETE = 'UPDATE_BEFORE_TEXT',
}


export interface IActionUpdateBeforeText {
  type: TypeOfAction.UPDATE_BEFORE_TEXT,
  newText: string
}

export interface IActionAlertOnComplete {
  type: TypeOfAction.ALERT_ON_COMPLETE,
  AlertOnComplete: boolean
}

export type ActionType = IActionAlertOnComplete | IActionUpdateBeforeText


