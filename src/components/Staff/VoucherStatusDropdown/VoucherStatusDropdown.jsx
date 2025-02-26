import Select from 'react-select';

const VoucherStatusDropdown = ({ value, onChange }) => {
  const options = [
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' },
  ];

  const handleChange = (selectedOption) => {
    onChange(selectedOption.value);
  };

  return (
    <div>
      <Select
        inputId="voucherStatusSelect"
        options={options}
        value={options.find(option => option.value === value)}
        onChange={handleChange}
        classNamePrefix="select"
        isSearchable={false}
      />
    </div>
  );
};

export default VoucherStatusDropdown;