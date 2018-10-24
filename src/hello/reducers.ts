/* @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
 * @ Copyright (c) Michael Leahcim                                                      @
 * @ You can find additional information regarding licensing of this work in LICENSE.md @
 * @ You must not remove this notice, or any other, from this software.                 @
 * @ All rights reserved.                                                               @
 * @@@@@@ At 2018-10-24 18:17 <thereisnodotcollective@gmail.com> @@@@@@@@@@@@@@@@@@@@@@@@ */

import { IAppState } from './store';
import { ActionType, TypeOfAction } from './actions';
import { eventUpdateBeforeText, eventSetAlertOnUpdate } from './events';
export function reducer(state: IAppState, action: ActionType): IAppState {
  switch (action.type) {
    case TypeOfAction.UPDATE_BEFORE_TEXT:
      return eventUpdateBeforeText(state, action)
    case TypeOfAction.ALERT_ON_COMPLETE:
      return eventSetAlertOnUpdate(state, action)
  }
  return state;
}
