import { cn } from '../../utils/helpers';

export const Card = ({ children, className = '', ...props }) => {
  return (
    <div
      className={cn(
        'bg-white rounded-lg shadow-sm border border-gray-200',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardHeader = ({ children, className = '', ...props }) => {
  return (
    <div
      className={cn('px-4 py-3 border-b border-gray-100', className)}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardTitle = ({ children, className = '', ...props }) => {
  return (
    <h3
      className={cn('text-base font-semibold text-gray-900', className)}
      {...props}
    >
      {children}
    </h3>
  );
};

export const CardContent = ({ children, className = '', ...props }) => {
  return (
    <div className={cn('px-4 py-3', className)} {...props}>
      {children}
    </div>
  );
};

export const CardFooter = ({ children, className = '', ...props }) => {
  return (
    <div
      className={cn('px-4 py-3 border-t border-gray-100 bg-gray-50 rounded-b-lg', className)}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
