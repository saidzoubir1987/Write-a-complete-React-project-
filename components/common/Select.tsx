import React from 'react';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  children: React.ReactNode;
}

const Select: React.FC<SelectProps> = ({ label, id, children, ...props }) => {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium leading-6 text-slate-300">
        {label}
      </label>
      <div className="mt-2">
        <select
          id={id}
          className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-slate-100 shadow-sm ring-1 ring-inset ring-slate-600 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6 [&_*]:bg-slate-800"
          {...props}
        >
          {children}
        </select>
      </div>
    </div>
  );
};

export default Select;
