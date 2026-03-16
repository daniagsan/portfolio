import { memo } from 'react';

interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  labelRight?: string;
}

const Switch = memo(({ checked, onChange, labelRight = 'Magical Switch' }: SwitchProps) => {
  return (
    <div className="flex items-center gap-3">
      <span
        className={`font-mono text-[11px] uppercase tracking-[0.15em] font-bold cursor-pointer select-none transition-colors duration-300 ${!checked ? 'text-black' : 'text-black/25'}`}
        onClick={() => onChange(false)}
      />
      <div className="relative inline-block w-12 h-6">
        <input
          type="checkbox"
          id="toggle-checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="hidden peer"
        />
        <label
          htmlFor="toggle-checkbox"
          className="absolute inset-0 bg-black cursor-pointer transition-colors duration-300 before:content-[''] before:absolute before:h-5 before:w-5 before:left-0.5 before:bottom-0.5 before:bg-white before:transition-transform before:duration-300 peer-checked:before:translate-x-6"
        />
      </div>
      <span
        className={`font-mono text-[11px] uppercase tracking-[0.15em] font-bold cursor-pointer select-none transition-colors duration-300 ${checked ? 'text-black' : 'text-black/25'}`}
        onClick={() => onChange(true)}
      >
        {labelRight}
      </span>
    </div>
  );
});

export default Switch;
