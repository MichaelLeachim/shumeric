/* @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
 * @ copyright (c) Michael Leahcim                                                      @
 * @ You can find additional information regarding licensing of this work in LICENSE.md @
 * @ You must not remove this notice, or any other, from this software.                 @
 * @ All rights reserved.                                                               @
 * @@@@@@ At 2018-10-24 22:38 <thereisnodotcollective@gmail.com> @@@@@@@@@@@@@@@@@@@@@@@@ */

import * as React from 'react';

function startInput() {
  return (
    <form className="pure-form" onSubmit={{ changeProjectName }}>
      <textarea placeholder="description use: #opensource #freelance #other for categories" style={{ width: '100%', resize: 'vertical' }} defaultValue={""} />
      <div className="mik-flush-right mik-pad-top-0 mik-fs-0">
        <button className="pure-button mik-green-s-1-back-angry mik-margin-right-0">10 min</button>
        <button className="pure-button mik-green-s-2-back-angry mik-margin-right-0">25 min</button>
        <button className="pure-button mik-green-s-4-back-angry">1  hour</button>
      </div>
      <div className="mik-flush-right mik-pad-top-0"><label className="mik-fs-0" htmlFor="notify" style={{ cursor: 'pointer' }}>
        <input id="notify" type="checkbox" /> Notify when complete? </label>
      </div>
    </form>

  )

}



