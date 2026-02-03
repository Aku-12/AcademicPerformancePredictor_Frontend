import { cn } from '../../utils/helpers';

export const Card = ({ children, className = '', ...props }) => {
  return (
    <div
      className={cn(
        'bg-white rounded-xl border border-gray-100',
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
      className={cn('px-6 py-4 border-b border-gray-100', className)}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardTitle = ({ children, className = '', ...props }) => {
  return (
    <h3
      className={cn('text-lg font-semibold text-gray-900', className)}
      {...props}
    >
      {children}
    </h3>
  );
};

export const CardDescription = ({ children, className = '', ...props }) => {
  return (
    <p
      className={cn('text-sm text-gray-500 mt-1', className)}
      {...props}
    >
      {children}
    </p>
  );
};

export const CardContent = ({ children, className = '', ...props }) => {
  return (
    <div className={cn('px-6 py-5', className)} {...props}>
      {children}
    </div>
  );
};

export const CardFooter = ({ children, className = '', ...props }) => {
  return (
    <div
      className={cn('px-6 py-4 border-t border-gray-100 bg-gray-50/50 rounded-b-xl', className)}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
