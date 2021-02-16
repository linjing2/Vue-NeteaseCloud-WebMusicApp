import React, { useCallback, useEffect, useMemo, useState } from 'react';
import './index.scss';

interface Props {
  navConfig: { value: string; label: string }[];
  defaultValue?: string;
  onChange?: (value: string) => any;
}

const NavBar: React.FC<Props> = ({ navConfig = [], defaultValue = '', onChange }: Props) => {
  const [value, setValue] = useState(navConfig[0].value || '');

  useEffect(() => {
    if (defaultValue) {
      setValue(defaultValue);
    }
  }, [defaultValue]);

  const handleClick = (value: string) => {
    setValue(value);
    if (onChange) onChange(value);
  };

  return (
    <div className="nav_bar">
      {navConfig.map(nav => {
        return (
          <div className="item_wrap" key={nav.value} onClick={() => handleClick(nav.value)}>
            <div className={`item ${value === nav.value ? 'active' : ''}`}>{nav.label}</div>
          </div>
        );
      })}
    </div>
  );
};

export default NavBar;
