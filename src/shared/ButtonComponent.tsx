import { cloneElement, isValidElement, useRef, type ReactNode, type ChangeEvent } from 'react';

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
  accept?: string;
  multiple?: boolean;
  onFilesSelected?: (files: FileList | null) => void;
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

const iconOnlyVerticalPaddingStyles: Record<ButtonSize, string> = {
  sm: 'py-1.5',
  md: 'py-2.5',
  lg: 'py-3.5',
  xl: 'py-4.5',
};

const iconSizeStyles: Record<ButtonSize, string> = {
  sm: 'w-4 h-4',
  md: 'w-5 h-5',
  lg: 'w-6 h-6',
  xl: 'w-7 h-7',
};

const iconOnlyPaddingStyles: Record<ButtonSize, string> = {
  sm: 'px-2',
  md: 'px-4',
  lg: 'px-6',
  xl: 'px-8',
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
  accept,
  multiple = false,
  onFilesSelected,
}: ButtonComponentProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const disabledStyles = disabled ? 'opacity-50 cursor-default' : 'cursor-pointer';
  const variantStyle = variantStyles[variant];
  const sizeStyle = sizeStyles[size];
  const iconSizeStyle = iconSizeStyles[size];

  // Si solo hay un icono (sin label ni rightIcon), ajustar el padding y remover gap
  const isIconOnly = !label && !rightIcon && leftIcon;
  const gapStyle = isIconOnly ? '' : 'gap-2';
  const baseStyles = `inline-flex items-center justify-center ${gapStyle} font-medium rounded-lg transition-colors duration-200 focus:outline-none active:outline-none`;
  const iconOnlyStyles = isIconOnly ? `${iconOnlyPaddingStyles[size]} ${iconOnlyVerticalPaddingStyles[size]}` : '';
  const finalSizeStyle = isIconOnly ? '' : sizeStyle;

  const handleClick = () => {
    if (accept && fileInputRef.current) {
      fileInputRef.current.click();
    } else {
      onClick();
    }
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (onFilesSelected) {
      onFilesSelected(files);
    }
    // Resetear el input para permitir seleccionar el mismo archivo nuevamente
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <>
      {accept && (
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />
      )}
      <button
        onClick={handleClick}
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
    </>
  );
}

export default ButtonComponent;

