import { cn } from '../../utils/helpers';

export const Input = ({
  label,
  name,
  type = 'text',
  placeholder,
  value,
  onChange,
  onBlur,
  error,
  disabled = false,
  required = false,
  className = '',
  min,
  max,
  step,
  ...props
}) => {
  return (
    <div className={cn('w-full', className)}>
      {label && (
        <label
          htmlFor={name}
          className="block text-xs font-medium text-gray-600 mb-1"
        >
          {label}
          {required && <span className="text-red-500 ml-0.5">*</span>}
        </label>
      )}
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        disabled={disabled}
        min={min}
        max={max}
        step={step}
        className={cn(
          'w-full px-2.5 py-1.5 text-sm border rounded-md shadow-sm transition-colors duration-200',
          'focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500',
          'disabled:bg-gray-100 disabled:cursor-not-allowed',
          error
            ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
            : 'border-gray-300'
        )}
        {...props}
      />
      {error && <p className="mt-0.5 text-xs text-red-600">{error}</p>}
    </div>
  );
};

export default Input;
