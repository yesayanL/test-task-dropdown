import React, {
  ChangeEvent,
  useState,
  MouseEvent,
  useEffect,
  useMemo
} from 'react';
import './combo-box.css';

interface IComboBoxProps {
  defaultValue?: string;
  options: Array<string>;
  value: string;
  onChange: (value: string) => void;
}

interface IDropdownMenuProps {
  onRowClick: (selectedValue: string) => void;
  options: Array<string>;
}

const DropdownMenu: React.FC<IDropdownMenuProps> = ({
  onRowClick,
  options
}) => {
  const onClick = (event: MouseEvent<HTMLDivElement>, element: string) => {
    event.stopPropagation();
    onRowClick(element);
  };
  return (
    <div className="list-container">
      {options.map((el, index) => (
        <div
          className="list-item"
          key={index}
          onClick={(event) => {
            onClick(event, el);
          }}
        >
          {el}
        </div>
      ))}
    </div>
  );
};

export const ComboBox: React.FC<IComboBoxProps> = ({
  value,
  onChange,
  defaultValue,
  options
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  useEffect(() => {
    const tabListener = (e: KeyboardEvent) => {
      if (e.code === 'Tab' || e.code === 'Enter') {
        setIsDropdownOpen(false);
      }
    };
    const clickListener = () => {
      setIsDropdownOpen(false);
    };

    document.addEventListener('keydown', tabListener);
    document.addEventListener('click', clickListener);
    return () => {
      document.addEventListener('keydown', tabListener);
      document.removeEventListener('click', clickListener);
    };
  }, []);

  const onFocus = () => {
    setIsDropdownOpen(true);
  };
  const onRowClick = (val: string) => {
    onChange(val);
    setIsDropdownOpen(false);
  };

  const dropdownOptions = useMemo(
    () => options.filter((el) => el.includes(value)),
    [value]
  );

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="combo-box-container">
      <input
        className="input"
        onClick={(e) => {
          e.stopPropagation();
        }}
        onFocus={onFocus}
        // onBlur={onBlur}
        value={value || defaultValue || ''}
        onChange={onInputChange}
      />
      {isDropdownOpen && (
        <DropdownMenu options={dropdownOptions} onRowClick={onRowClick} />
      )}
    </div>
  );
};
