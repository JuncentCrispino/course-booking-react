import { InputHTMLAttributes, forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/libs';

const inputVariant = cva(
  'border-primary/50 ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex w-full rounded-md border bg-transparent text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 focus:ring-secondary',
  {
    variants: {
      size: {
        sm: 'py-1 px-2 text-sm',
        default: 'py-2 px-3 text-base placeholder:text-sm',
        md: 'py-3 px-4 text-md',
        lg: 'py-4 px-5 text-lg',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  },
);
export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof inputVariant> {
  label?: string;
  error?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, size, error, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          inputVariant({ size, className }),
          error && 'border border-red-600',
        )}
        ref={ref}
        {...props}
      />
    );
  },
);

Input.displayName = 'Input';

export { Input };
