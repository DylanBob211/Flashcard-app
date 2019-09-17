import React, { useRef } from 'react';
import useOutsideClick from '../../Hooks/useOutsideHandler';

const withWindowWrapper = BaseComponent => ({ closeWindowFunction, ...props }) => {
  const refWrapper = useRef(null);
  useOutsideClick(refWrapper, closeWindowFunction);

  return (
    <div
      ref={refWrapper}
      className="practiceWindow_container"
    >
      <BaseComponent {...props} />
    </div>
  );
};

export default withWindowWrapper;
