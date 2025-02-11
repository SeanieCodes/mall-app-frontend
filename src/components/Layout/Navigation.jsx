import Select from 'react-select';

const Navigation = ({ onUserTypeChange }) => {
  const options = [
    { value: 'shopper', label: 'Shopper' },
    { value: 'staff', label: 'Staff' }
  ];

  return (
    <Select
      options={options}
      defaultValue={options[0]}
      onChange={(option) => onUserTypeChange(option.value)}
    />
  );
};

export default Navigation;