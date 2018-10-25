/* @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
 * @ Copyright (c) Michael Leahcim                                                      @
 * @ You can find additional information regarding licensing of this work in LICENSE.md @
 * @ You must not remove this notice, or any other, from this software.                 @
 * @ All rights reserved.                                                               @
 * @@@@@@ At 2018-10-25 21:06 <thereisnodotcollective@gmail.com> @@@@@@@@@@@@@@@@@@@@@@@@ */

import { ModalState, AppState, ModalType, WorkingSession } from "./store";
import { actionModalClose } from './actions';

import { ReactModal } from 'react-modal';


import * as React from 'react';
import { simpleTimeAsString } from './utils';


interface IProps {
  ms: ModalState
  closeModal?: () => void
}

function mapStateToProps({ modalState }: AppState): IProps {
  return {
    ms: modalState,
  }
}

function mapDispatchToProps(dispatch: any) {
  return {
    closeModal: function(): void {
      dispatch(actionModalClose({}))
    },
  }
}

function timeSheetModal(closeModal: () => void, props: WorkingSession) {
  let { amount, startedAt, endedAt, beforeText, afterText } = props
  let startedAtStr = simpleTimeAsString(startedAt)
  let endedAtStr = simpleTimeAsString(endedAt)
  return (
    <div className="mik-pad-0 mik-margin-1">
      <form className="pure-form">
        <textarea disabled={true}
          style={{ width: '100%', resize: 'vertical' }}
          value={beforeText} />
        <div className="mik-flush-right mik-pad-top-0 mik-fs-0">
          You've worked: <b> {`1 session for ${amount} minutes`}
          </b>
          <b>{startedAtStr} — {{ endedAtStr }}</b>
        </div>
        <div className="mik-tiny-container mik-margin-1">
          <ul className="mik-fs-0">
            <li>What did you achieved? </li>
            <li>How did the task change while working?</li>
            <li>How did the initial definiton of the task changed?</li>
          </ul>
          <textarea placeholder="Write a review on what you have achieved during this time" style={{ width: '100%', resize: 'vertical' }}
            disabled={true} value={afterText} />
          <div className="mik-flush-right mik-fs-0">
            <button className="pure-button mik-green-back-angry" onClick={closeModal}>Exit</button>
          </div>
        </div>
      </form>
    </div>
  );
}

function ModalDispatcher(props: IProps) {
  let modalType = props.ms.modalType
  let closeModal = props.closeModal
  if (modalType === ModalType.TIMESHEET_MODAL) {
    return timeSheetModal(closeModal, props.ms.timeSheetModal)
  }
  return null
}

export function ModalRenderer(props: IProps) {
  let { ms, closeModal } = props
  let { isModalOpen, modalContentLabel } = ms

  return (
    <ReactModal
      isOpen={isModalOpen}
      contentLabel={modalContentLabel}
      onRequestClose={closeModal}>
      <button onClick={closeModal}>Close Modal</button>
      <ModalDispatcher {...props}></ModalDispatcher>
    </ReactModal>
  )
}
