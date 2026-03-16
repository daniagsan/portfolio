import styled from 'styled-components';

interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  labelRight?: string;
}

const Switch = ({ checked, onChange, labelRight = 'Magical Switch' }: SwitchProps) => {
  return (
    <StyledWrapper>
      <div className="switch-container">
        <span
          className={`switch-label font-mono ${!checked ? 'active' : ''}`}
          onClick={() => onChange(false)}
        >
        </span>
        <div className="switch">
          <input
            type="checkbox"
            id="toggle-checkbox"
            checked={checked}
            onChange={(e) => onChange(e.target.checked)}
          />
          <label htmlFor="toggle-checkbox" />
        </div>
        <span
          className={`switch-label font-mono ${checked ? 'active' : ''}`}
          onClick={() => onChange(true)}
        >
          {labelRight}
        </span>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .switch-container {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .switch-label {
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 0.15em;
    font-weight: 700;
    color: rgba(0, 0, 0, 0.25);
    cursor: pointer;
    transition: color 0.3s ease;
    user-select: none;
  }

  .switch-label.active {
    color: rgba(0, 0, 0, 1);
  }

  .switch {
    position: relative;
    display: inline-block;
    width: 48px;
    height: 24px;
  }

  .switch input {
    display: none;
  }

  .switch label {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #000;
    transition: .3s;
  }

  .switch label::before {
    position: absolute;
    content: "";
    height: 20px;
    width: 20px;
    left: 2px;
    bottom: 2px;
    background-color: white;
    transition: .3s;
  }

  .switch input:checked + label {
    background-color: #000;
  }

  .switch input:checked + label::before {
    transform: translateX(24px);
  }
`;

export default Switch;
