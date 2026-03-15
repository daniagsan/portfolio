import React from 'react';
import styled from 'styled-components';

const Switch = () => {
  return (
    <StyledWrapper>
      <div className="switch">
        <input type="checkbox" id="toggle-checkbox" />
        <label htmlFor="toggle-checkbox" />
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  /* The switch - the box around the slider */
  .switch {
    position: relative;
    display: inline-block;
    width: 60px;
    height: 34px;
  }

  /* Hide default HTML checkbox */
  .switch input {
    display: none;
  }

  /* The slider */
  .switch label {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #000000ff;
    transition: .3s;
  }

  .switch label::before {
    position: absolute;
    content: "";
    height: 30px;
    width: 30px;
    left: 2px;
    bottom: 2px;
    background-color: white;
    transition: .3s;
  }

  .switch input:checked + label {
    background-color: #000000ff;
  }

  .switch input:checked + label::before {
    transform: translateX(26px);
  }`;

export default Switch;
