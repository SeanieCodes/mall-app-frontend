import Select from 'react-select';
import { useNavigate } from 'react-router-dom';

const Dropdown = ({onTypeChange}) => {

  const navigate = useNavigate();

  const options = [
    { value: 'shopper', label: 'Shopper' },
    { value: 'staff', label: 'Staff' }
  ];
  const handleChange = (option) => {
    onTypeChange(option.value);
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