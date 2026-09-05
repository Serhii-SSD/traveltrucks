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
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    mode: 'onTouched',
  });

  const onSubmit = async (data: FormValues) => {
    try {
      await postBook({ dataID: camperId, bookData: data as BookData });
      toast.success('Booking request sent successfully!');
      reset();
    } catch (error) {
      console.error('Booking error:', error);
      toast.error('Failed to send booking request. Please try again.');
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
        {/* Name */}
        <div className={css.fieldGroup}>
          <input
            type="text"
            placeholder="Name*"
            {...register('name')}
            className={`${css.input} ${errors.name ? css.inputError : ''}`}
          />
          {errors.name && (
            <p className={css.errorMessage}>{errors.name.message}</p>
          )}
        </div>

        {/* Email */}
        <div className={css.fieldGroup}>
          <input
            type="email"
            placeholder="Email*"
            {...register('email')}
            className={`${css.input} ${errors.email ? css.inputError : ''}`}
          />
          {errors.email && (
            <p className={css.errorMessage}>{errors.email.message}</p>
          )}
        </div>

        <button type="submit" className={css.sendBtn}>
          Send
        </button>
      </form>
    </div>
  );
}