import React from 'react';
import { FaCheck } from 'react-icons/fa';

const InputField = ({ label, name, placeholder, type = 'text', register, errors, disabled = false }) => (
    <>
        <div className="form-control relative">
            <label className="label items-center justify-normal bg-[#F0F0F0] w-fit h-fit py-0 gap-1 absolute left-[12px] -top-[10px]">
                <span className="label-text text-[#666] text-sm font-semibold py-0">{label}</span>
                {errors[name] ? <span className="text-red-500">*</span> : <FaCheck size={'0.85rem'} color='#2A7029' />}
            </label>
            <input
                type={type}
                name={name}
                placeholder={placeholder}
                disabled={disabled}
                {...register(name, { required: `${label} is required` })}
                className={`input input-bordered border-2 ${errors[name] ? 'border-red-500' : 'border-[#666]'} bg-[#F0F0F0] text-black Alliance`}
            />
        </div>
        {errors[name] && <span className="text-red-500 text-sm mt-1">{errors[name].message}</span>}
    </>
);

export default InputField;