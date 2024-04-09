// LoginForm.js
// Import styled-components
import { useAuth } from '@/context/Authcontext';
import { useState } from 'react';
import styles from './login.module.css';


  // Your Component
  const LoginForm = () => {

    const { login } = useAuth();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    // Handle form submission
    const handleSubmit = async (e) => {
      e.preventDefault();
      login(username, password);
      // Handle login logic
    };

    return (
      <form onSubmit={handleSubmit} className={`${styles.formContainer} `}>
        <h2 className={styles.title}>Login</h2>
        <input type="name" name="username" placeholder="Username" onChange={(e) => setUsername(e.target.value)} className={styles.inputField} required />
        <input type="password" name="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} className={styles.inputField} required />
        <button disabled={username == "" || password == ""} type="submit" className={`${styles.button} ${styles.submitButton}`}>Login</button>
      </form>
    );
  };

  export default LoginForm;
