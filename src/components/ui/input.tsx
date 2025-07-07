import React from 'react';

// Define the props interface for the Input component
interface InputProps {
  label?: string;
  id: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  icon?: React.ReactNode; // For the password visibility toggle
}

// Reusable Input component with label and optional icon.
export default function Input({ label, id, type = 'text', placeholder, value, onChange, required, icon }: InputProps) {
  return (
    <div>
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <div className="mt-1 relative rounded-md shadow-sm">
        <input
          type={type}
          name={id}
          id={id}
          className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500 sm:text-sm pr-10"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
        />
        {icon && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            {icon}
          </div>
        )}
      </div>
    </div>
  );
}