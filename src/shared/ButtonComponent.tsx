import { cloneElement, isValidElement, type ReactNode } from 'react';

export type ButtonVariant = 'default' | 'primary' | 'secondary' | 'danger' | 'success' | 'outline';
export type ButtonSize = 'sm' | 'md' | 'lg' | 'xl';

export interface ButtonComponentProps {
  leftIcon?: ReactNode;
  label?: string;
  rightIcon?: ReactNode;
  onClick: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  className?: string;
}

const variantStyles: Record<ButtonVariant, string> = {
  default: 'bg-white hover:bg-gray-300 text-black',
  primary: 'bg-blue-600 hover:bg-blue-700 text-white',
  secondary: 'bg-gray-500 hover:bg-gray-600 text-white',
  danger: 'bg-red-600 hover:bg-red-700 text-white',
  success: 'bg-green-600 hover:bg-green-700 text-white',
  outline: 'bg-transparent border-2 border-gray-600 hover:border-gray-700 text-gray-300 hover:text-white',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-2 py-1 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg',
  xl: 'px-8 py-4 text-xl',
};

const iconSizeStyles: Record<ButtonSize, string> = {
  sm: 'w-4 h-4',
  md: 'w-5 h-5',
  lg: 'w-6 h-6',
  xl: 'w-7 h-7',
};

const iconOnlyPaddingStyles: Record<ButtonSize, string> = {
  sm: 'px-1.5 pt-1.5 pb-2.5',
  md: 'px-4 pt-3 pb-4',
  lg: 'px-2.5 pt-2.5 pb-3.5',
  xl: 'px-3 pt-3 pb-4',
};

function ButtonComponent({
  leftIcon,
  label,
  rightIcon,
  onClick,
  variant = 'default',
  size = 'md',
  disabled = false,
  className = '',
}: ButtonComponentProps) {
  const disabledStyles = disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer';
  const variantStyle = variantStyles[variant];
  const sizeStyle = sizeStyles[size];
  const iconSizeStyle = iconSizeStyles[size];

  // Si solo hay un icono (sin label ni rightIcon), ajustar el padding y remover gap
  const isIconOnly = !label && !rightIcon && leftIcon;
  const gapStyle = isIconOnly ? '' : 'gap-2';
  const baseStyles = `inline-flex items-center justify-center ${gapStyle} font-medium rounded-lg transition-colors duration-200 focus:outline-none active:outline-none`;
  const iconOnlyStyles = isIconOnly ? iconOnlyPaddingStyles[size] : '';
  const finalSizeStyle = isIconOnly ? '' : sizeStyle;

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variantStyle} ${finalSizeStyle} ${disabledStyles} ${iconOnlyStyles} ${className}`}
    >
      {leftIcon && (
        isIconOnly && isValidElement(leftIcon) ? (
          cloneElement(leftIcon, {
            className: `${iconSizeStyle} ${(leftIcon.props as { className?: string })?.className || ''}`.trim(),
          } as any)
        ) : (
          <span className={`${iconSizeStyle} inline-flex items-center justify-center`}>
            {leftIcon}
          </span>
        )
      )}
      {label && <span>{label}</span>}
      {rightIcon && (
        <span className={iconSizeStyle}>
          {rightIcon}
        </span>
      )}
    </button>
  );
}

export default ButtonComponent;

