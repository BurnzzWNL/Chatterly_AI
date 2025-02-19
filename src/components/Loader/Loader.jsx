import styles from "./Loader.module.css";

export function Loader() {
  return (
    <div className={styles.LoaderWrapper} role="status" aria-live="polite" aria-busy="true">
      <div className={styles.Loader}></div>
      <p className={styles.LoaderText}>Loading...</p>
    </div>
  );
}
