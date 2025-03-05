import { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import './DateRangePicker.css';

const DateRangePicker = ({ startDate, endDate, onDateChange }) => {
    const [dateRange, setDateRange] = useState([null, null]);
    
    useEffect(() => {
        const start = startDate ? new Date(startDate) : null;
        const end = endDate ? new Date(endDate) : null;
        
        if (start || end) {
            setDateRange([start, end]);
        }
    }, [startDate, endDate]);

    const handleDateChange = (update) => {
        setDateRange(update);
        
    const formattedStartDate = update[0] ? update[0].toLocaleDateString('en-CA') : ''; 
    const formattedEndDate = update[1] ? update[1].toLocaleDateString('en-CA') : '';

        onDateChange({
            startDate: formattedStartDate,
            endDate: formattedEndDate
        });
    };

    return (
        <div className="date-range-picker">
            <h3>Select Voucher Validity Period</h3>
            
            <DatePicker
                selectsRange={true}
                startDate={dateRange[0]}
                endDate={dateRange[1]}
                onChange={handleDateChange}
                monthsShown={2}
                inline
                className="date-calendar"
            />
        </div>
    );
};

export default DateRangePicker;