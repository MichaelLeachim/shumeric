/* @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
 * @ Copyright (c) Michael Leahcim                                                      @
 * @ You can find additional information regarding licensing of this work in LICENSE.md @
 * @ You must not remove this notice, or any other, from this software.                 @
 * @ All rights reserved.                                                               @
 * @@@@@@ At 2018-10-25 21:06 <thereisnodotcollective@gmail.com> @@@@@@@@@@@@@@@@@@@@@@@@ */

interface IProps {
  cur: CurrentWorkingSession;
  alertOnComplete: boolean;
  describeProject: string;
  finalizeWorkSession?: () => void
  cancelWorkSession?: () => void
  submitNewWorkSession?: (amount: number) => void
  updateBeforeText?: (e: React.ChangeEvent<HTMLInputElement>) => void
  updateAlertOnComplete?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

function mapStateToProps({ currentWork, alertOnComplete, projectPlaceholder }: AppState): IProps {
  return {
    cur: currentWork,
    describeProject: projectPlaceholder,
    alertOnComplete: alertOnComplete,
  }
}

function mapDispatchToProps(dispatch: any) {
  return {
    updateBeforeText: function(e: React.ChangeEvent<HTMLInputElement>): void {
      dispatch(actionUpdateBeforeText({ inputText: e.target.textContent || "" }))
    },
    updateAfterText: function(e: React.ChangeEvent<HTMLInputElement>): void {
      dispatch(actionUpdateAfterText({ inputText: e.target.textContent || "" }))
    },
    cancelWorkSession: function(): void {
      dispatch(actionCancelWorkSession({}))
    },
    submitNewWorkSession: function(amount: number): void {
      dispatch(actionBeginWorkSession({ amount: amount, now: new Date() }))
    },
    finalizeWorkSession: function(): void {
      dispatch(actionFinalizeWorkSession({ now: new Date() }))
    },
    updateAlertOnComplete: function(e: React.ChangeEvent<HTMLInputElement>): void {
      dispatch(actionAlertOnComplete({ shouldAlert: e.target.checked }))
    }
  }
}


function makeTimeSheetModal({ }) {
  return (
    <div>
      <button onClick={this.handleOpenModal}>Trigger Modal</button>
      <ReactModal
        isOpen={this.state.showModal}
        contentLabel="Minimal Modal Example"
      >
        <button onClick={closeModal}>Close Modal</button>
      </ReactModal>
    </div>
  );
}

class ExampleApp extends React.Component {
  constructor() {
    super();
    this.state = {
      showModal: false
    };

    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  handleOpenModal() {
    this.setState({ showModal: true });
  }

  handleCloseModal() {
    this.setState({ showModal: false });
  }

  render() {

  }
}

const props = {};
