import css from './loading.module.css';

export default function Loading() {
  return (
    <div className={css.loaderContainer}>
      <span className={css.loader}></span>
      <p className={css.loaderText}>Loading campers...</p>
    </div>
  );
}