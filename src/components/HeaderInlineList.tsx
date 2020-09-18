import React from 'react';

const HeaderInlineList = () => (
  <div className="header-list">
    <div>
      <span>Country</span>
      <span>flag</span>
    </div>
    <div>
      <span>TODAY / ALL</span>
      <span>CASES</span>
    </div>

    <div>
      <span>TODAY / ALL</span>
      <span>DEATHS</span>
    </div>

    <div>
      <span>TODAY / ALL</span>
      <span>RECOVERED</span>
    </div>

    <div>
      <span>critical / </span>
      <span> active</span>
    </div>
  </div>
)

export default React.memo(HeaderInlineList);
