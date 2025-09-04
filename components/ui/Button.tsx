import { ButtonHTMLAttributes, forwardRef } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-lg text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-uber-black text-white hover:bg-gray-800 focus-visible:ring-gray-400',
        primary: 'bg-uber-green text-white hover:bg-green-600 focus-visible:ring-green-400',
        secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200 focus-visible:ring-gray-400',
        ghost: 'hover:bg-gray-100 hover:text-gray-900 focus-visible:ring-gray-400',
        outline: 'border border-gray-300 bg-transparent hover:bg-gray-50 focus-visible:ring-gray-400',
        destructive: 'bg-red-500 text-white hover:bg-red-600 focus-visible:ring-red-400',
      },
      size: {
        sm: 'h-9 px-3 text-xs',
        default: 'h-10 px-4 py-2',
        lg: 'h-12 px-8 text-base',
        xl: 'h-14 px-10 text-lg',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'

export default Button