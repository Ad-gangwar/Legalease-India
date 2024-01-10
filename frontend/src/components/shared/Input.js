import React from 'react';

const TextInput = ({ placeholder, type, value, setValue }) => {
    return (
        <div className='mb-4'>
            <input
                type={type}
                placeholder={placeholder}
                name={type}
                value={value}
                className='form-control input-border border-0 rounded-md px-2 py-3 w-100'
                required 
                onChange={(e) => {
                    setValue(e.target.value);
                }}
            />
        </div>
    );
};

export default TextInput;
