import Select from 'react-select';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Dropdown = () => {

  const [selectedType, setSelectedType] = useState('shopper');
  const navigate = useNavigate();
  
  const options = [
    { value: 'shopper', label: 'Shopper' },
    { value: 'staff', label: 'Staff' }
  ];
  const handleChange = (option) => {
    setSelectedType(option.value);
  };

  return (
    <Select
      options={options}
      defaultValue={options[0]}
      onChange={handleChange}
    />
  );
};

export default Dropdown;