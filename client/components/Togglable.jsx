import React, { useState, useImperativeHandle } from "react";
import PropTypes from "prop-types";

import { StyledButton } from "../styles";

const Togglable = React.forwardRef(({ buttonLabel, children }, ref) => {
  const [visible, setVisibile] = useState(false);
  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  const toggleVisibility = () => setVisibile(!visible);

  useImperativeHandle(ref, () => ({ toggleVisibility }));

  return (
    <div>
      <div style={hideWhenVisible}>
        <StyledButton onClick={toggleVisibility}>{buttonLabel}</StyledButton>
      </div>
      <div style={showWhenVisible}>
        {children}
        <StyledButton secondary onClick={toggleVisibility}>
          cancel
        </StyledButton>
      </div>
    </div>
  );
});

Togglable.displayName = "Togglable";

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
};

export default Togglable;
