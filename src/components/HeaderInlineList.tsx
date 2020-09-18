import React from 'react';

const HeaderInlineList = () => (
  <ul className="inline-list overflow-hidden">
    <li className="txt-bleu">
      <div className="fs-10">Country</div>

      <div className="fs-10">
        <span>TODAY / ALL</span>
        <span>CASES</span>
      </div>

      <div className="fs-10">
        <span>TODAY / ALL</span>
        <span>DEATHS</span>
      </div>

      <div className="fs-10">
        <span>TODAY / ALL</span>
        <span>RECOVERED</span>
      </div>

      <div className="fs-10">
        <span>critical / </span>
        <span> active</span>
      </div>
    </li>
  </ul>
)

export default React.memo(HeaderInlineList);
