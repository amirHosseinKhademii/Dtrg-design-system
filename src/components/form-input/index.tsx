import { Error } from 'components/error'
import { useValidation } from 'hooks/use-validation'
import { memo } from 'react'
import { Controller } from 'react-hook-form'
import { classNames } from 'utils'
import type { TFormInput } from './types/form-input'

export const FormInput = memo(
  ({
    label,
    className,
    name,
    size,
    required,
    max,
    min,
    precent,
    number,
    later,
    validation,
    hours,
    type,
    ...rest
  }: TFormInput) => {
    const { validate } = useValidation({
      required,
      max,
      min,
      precent,
      number,
      later,
      validation,
      hours,
    })

    return (
      <Controller
        name={name}
        rules={{ validate }}
        render={({
          field: { onChange, value, ref },
          fieldState: { error },
        }) => (
          <div className={classNames('w-full col-start relative', className)}>
            {label && (
              <label
                htmlFor={name}
                className={classNames(
                  ' mb-2 text-light dark:text-dark',
                  size === 'small' ? 'text-xs' : 'text-base'
                )}
              >
                {label}
              </label>
            )}
            <input
              data-testid="input-core"
              id={name}
              ref={ref}
              value={value || ''}
              onChange={onChange}
              type={type || 'text'}
              className={classNames(
                'px-4',
                error
                  ? 'border-2 border-red-400 shadow'
                  : 'border border-gray-300 focus:ring-2 focus:ring-indigo-400 dark:border-gray-700 dark:focus:ring-indigo-600',
                size === 'large'
                  ? 'h-14 '
                  : size === 'small'
                  ? 'h-8 text-[13px]'
                  : 'h-12'
              )}
              {...rest}
            />
            <Error
              error={error}
              className={classNames(
                'absolute left-0',
                label ? ' top-[78px]' : 'top-[45px]'
              )}
            />
          </div>
        )}
      />
    )
  }
)
