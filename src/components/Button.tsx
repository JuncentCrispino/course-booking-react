import { ButtonHTMLAttributes, forwardRef } from 'react';
import { VariantProps, cva } from 'class-variance-authority';
import { cn } from '@/libs';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md shadow disabled:opacity-50 disabled:pointer-events-none data-[state=open]:bg-slate-100 dark:data-[state=open]:bg-slate-800 active:scale-75 transform transition-all duration-300 shadow-lg',
  {
    variants: {
      variant: {
        default: 'bg-secondary text-white hover:bg-secondary',
        destructive:
          'bg-red-500 text-white hover:bg-red-600 dark:hover:bg-red-600',
        outline: 'bg-transparent border border-secondary hover:bg-slate-100',
        subtle:
          'bg-slate-100 text-slate-900 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-100',
      },
      size: {
        sm: 'h-9 py-2 px-4 text-sm rounded-md',
        default: 'h-10 py-3 px-5 placeholder:text-sm text-base',
        md: 'h-11 py-4 px-6 text-md',
        lg: 'h-12 py-5 px-7 text-lg',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, variant, size, type, ...props }, ref) => (
    <button
      // eslint-disable-next-line react/button-has-type
      type={type}
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props}
    >
      {children}
    </button>
  ),
);
Button.displayName = 'Button';

export { Button, buttonVariants };
