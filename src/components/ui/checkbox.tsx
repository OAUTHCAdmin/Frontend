import React from 'react';interface CheckboxProps {
  id: string;
  label: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

// Reusable Checkbox component with label.
export default function Checkbox({ id, label, checked, onChange }: CheckboxProps) {
  return (
    <div className="flex items-center">
      <input
        id={id}
        name={id}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
      />
      <label htmlFor={id} className="ml-2 block text-sm text-gray-900">
        {label}
      </label>
    </div>
  );
}
