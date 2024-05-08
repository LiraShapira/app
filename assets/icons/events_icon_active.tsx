import * as React from 'react';
const SvgComponent = (props) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={20}
    height={20}
    fill='none'
    {...props}
  >
    <path
      fill='#BBE698'
      fillRule='evenodd'
      d='M4.75.25A.75.75 0 0 1 5.5 1v1.5h9V1A.75.75 0 1 1 16 1v1.5h.75a3 3 0 0 1 3 3v11.25a3 3 0 0 1-3 3H3.25a3 3 0 0 1-3-3V5.5a3 3 0 0 1 3-3H4V1a.75.75 0 0 1 .75-.75Zm13.5 9a1.5 1.5 0 0 0-1.5-1.5H3.25a1.5 1.5 0 0 0-1.5 1.5v7.5a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5v-7.5Z'
      clipRule='evenodd'
    />
  </svg>
);
export default SvgComponent;
