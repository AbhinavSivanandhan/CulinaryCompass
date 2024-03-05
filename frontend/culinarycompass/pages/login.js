// LoginForm.js

import styles from './login.module.css';

const LoginForm = ({ className }) => {
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle login logic
  };

  // Handle input change
  const handleChange = (event) => {
    // Input change logic
  };

  return (
    <form onSubmit={handleSubmit} className={`${styles.formContainer} ${className}`}>
      <h2 className={styles.title}>Login</h2>
      <input
        type="email"
        name="email"
        placeholder="Email"
        onChange={handleChange}
        required
        className={styles.inputField}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        onChange={handleChange}
        required
        className={styles.inputField}
      />
      <button type="submit" className={`${styles.button} ${styles.submitButton}`}>Login</button>
    </form>
  );
};

export default LoginForm;
