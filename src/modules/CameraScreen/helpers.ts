//@ts-nocheck
import React, {useState, useRef} from 'react';
export function debounce(f, ms) {
  let isCooldown = false;
  return function () {
    if (isCooldown) return;
    f.apply(this, arguments);
    isCooldown = true;
    setTimeout(() => (isCooldown = false), ms);
  };
}

export const useShouldComponentUpdate = (value, shouldUpdate) => {
  const [, setState] = useState(value);
  const ref = useRef(value);

  const renderUpdate = updateFunction => {
    if (!updateFunction instanceof Function) {
      throw new Error(
        'useShouldComponentUpdate only accepts functional updates!',
      );
    }

    const newValue = updateFunction(ref.current);

    if (shouldUpdate(newValue, ref.current)) {
      setState(newValue);
    }

    ref.current = newValue;
    console.info('real state value', newValue);
  };

  return [ref.current, renderUpdate];
};
