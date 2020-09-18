import React from 'react';

const HeaderInlineList = () => (
  <div className="header-list">
    <div>Country</div>

    <div>
      <span className="mr-2">TODAY / ALL</span>
      <span>CASES</span>
    </div>

    <div>
      <span className="mr-2">TODAY / ALL</span>
      <span>DEATHS</span>
    </div>

    <div>
      <span className="mr-2">TODAY / ALL</span>
      <span>RECOVERED</span>
    </div>

    <div>
      <span className="mr-2">critical / </span>
      <span> active</span>
    </div>
  </div>
)

export default React.memo(HeaderInlineList);
