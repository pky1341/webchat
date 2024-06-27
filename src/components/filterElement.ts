import React from "react";

const FilterElement = ({ children, ...props }) => {
  const filteredProps = Object.keys(props).reduce((acc, key) => {
    if (!key.startsWith("data-")) {
      acc[key] = props[key];
    }
    return acc;
  }, {});

  return React.cloneElement(children, filteredProps);
};

export default FilterElement;