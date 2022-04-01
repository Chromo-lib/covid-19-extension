import React from 'react';

const HeaderInlineList = () => (
  <div className="header-list blur">
    <div>
      <span>Country</span>
      <span>flag</span>
    </div>
    <div>
      <span>New / ALL</span>
      <span>CASES</span>
    </div>

    <div>
      <span>New / ALL</span>
      <span>DEATHS</span>
    </div>

    <div>
      <span>New / ALL</span>
      <span>RECOVERED</span>
    </div>

    <div>
      <span>critical / </span>
      <span> active</span>
    </div>
  </div>
)

export default React.memo(HeaderInlineList);
