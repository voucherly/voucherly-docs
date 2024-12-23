import React, { useState, FC } from 'react';

interface CheckboxProps {
  label: string;
  children?: React.ReactNode;
}

const Checkbox: FC<CheckboxProps> = ({ label, children }) => {
  const [checked, setChecked] = useState(false);

  const toggleCheckbox = () => setChecked(!checked);

  return (
    <div className='checklist-item'>
      <label className='checklist-item-label'>
        <input
          type="checkbox"
          checked={checked}
          onChange={toggleCheckbox}
        />
        <strong>{label}</strong>      
      </label>
      {children !== null && (
        <div className='checklist-item-body' style={{ marginLeft: '22px' }}>
          {children}
        </div>
      )}
    </div>
  );
};

export default Checkbox;
