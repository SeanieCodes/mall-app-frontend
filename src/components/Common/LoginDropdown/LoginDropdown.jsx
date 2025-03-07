import Select from 'react-select';
import './LoginDropdown.css';

const LoginDropdown = ({onTypeChange}) => {
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
      defaultValue={null}
      onChange={handleChange}
      classNamePrefix="select"
      placeholder="Select user type..."
      isClearable={false}
    />
  );
};

export default LoginDropdown;