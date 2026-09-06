'use client';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { BookData } from '@/types/camper';
import toast from 'react-hot-toast';
import { postBook } from '@/services/api';
import css from './BookingForm.module.css';

interface BookingFormProps {
  camperId: string;
}

interface FormValues {
  name: string;
  email: string;
}

const schema = yup.object().shape({
  name: yup
    .string()
    .trim()
    .required('Please enter your name.')
    .matches(/^[a-zA-Zа-яА-ЯіІїЇєЄ\s]+$/, 'Please enter a valid name.'),
  email: yup
    .string()
    .trim()
    .required('Please enter your email.')
    .email('Please enter a valid email.'),
});

export default function BookingForm({ camperId }: BookingFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    mode: 'onTouched',
  });

  const onSubmit = async (data: FormValues) => {
    try {
      const response = await postBook({ dataID: camperId, bookData: data as BookData });
      toast.success(response.message || 'Booking request sent successfully!');
      reset();
  } catch (error: unknown) {
  console.error('Booking error:', error);
  
  const err = error as { response?: { data?: { message?: string } } };
  const errorMsg =
    err.response?.data?.message || 'Failed to send booking request. Please try again.';
    
  toast.error(errorMsg);
}
  };

  return (
    <div className={css.formWrapper}>
      <div className={css.formHeader}>
        <h3 className={css.title}>Book your campervan now</h3>
        <p className={css.subtitle}>
          Stay connected! We are always ready to help you.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className={css.form} noValidate>
        {}
        <div className={css.fieldGroup}>
          <div className={`${css.inputContainer} ${errors.name ? css.hasError : ''}`}>
            <input
              type="text"
              id="name"
              placeholder=" "
              {...register('name')}
              className={css.input}
            />
            <label htmlFor="name" className={css.label}>
              Name*
            </label>
            {errors.name && (
              <span className={css.errorIcon} aria-hidden="true">
                !
              </span>
            )}
          </div>
          {errors.name && (
            <p className={css.errorMessage}>{errors.name.message}</p>
          )}
        </div>

        {}
        <div className={css.fieldGroup}>
          <div className={`${css.inputContainer} ${errors.email ? css.hasError : ''}`}>
            <input
              type="email"
              id="email"
              placeholder=" "
              {...register('email')}
              className={css.input}
            />
            <label htmlFor="email" className={css.label}>
              Email*
            </label>
            {errors.email && (
              <span className={css.errorIcon} aria-hidden="true">
                !
              </span>
            )}
          </div>
          {errors.email && (
            <p className={css.errorMessage}>{errors.email.message}</p>
          )}
        </div>

        <button type="submit" disabled={isSubmitting} className={css.sendBtn}>
          {isSubmitting ? 'Sending...' : 'Send'}
        </button>
      </form>
    </div>
  );
}