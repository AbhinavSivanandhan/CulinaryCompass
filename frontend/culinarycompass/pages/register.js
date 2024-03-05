import styles from './login.module.css'; // Import CSS module
import { useState } from 'react';

const RegisterForm = ({ className }) => {
  // Handle form submission
  const [formData, setFormData] = useState({
    username:'',
    first_name: '',
    last_name: '',
    email: '',
    gender: '',
    dob: '',
    password: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {




        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseData = await response.json();
      console.log('Server response:', responseData);
      alert('Registration successful!');
    } catch (error) {
      console.error('Registration error:', error);
      alert('Registration failed. Please try again.');
    }
  };

  // Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form onSubmit={handleSubmit} className={`${styles.formContainer} ${className}`}>
      <h2 className={styles.title}>Register</h2>
      <input type="text" name="username" placeholder="User Name" onChange={handleChange} className={styles.inputField} />
      <input type="text" name="first_name" placeholder="First Name" onChange={handleChange} className={styles.inputField} />
      <input type="text" name="last_name" placeholder="Last Name" onChange={handleChange} className={styles.inputField} />
      <input type="Password" name="Password" placeholder="Password" onChange={handleChange} className={styles.inputField} />
      <input type="Password" name="Retype Password" placeholder="Retype Password" onChange={handleChange} className={styles.inputField} />
      <input type="email" name="email" placeholder="Email" onChange={handleChange} required className={styles.inputField} />
      <input type="date" name="dob" onChange={handleChange} className={styles.inputField} />
      <select name="gender" onChange={handleChange} className={styles.inputField}>
        <option value="">Select Gender</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="Other">Other</option>
        <option value="Prefer not to say">Prefer not to say</option>
      </select>
      <button type="submit" className={styles.button}>Register</button>
    </form>
  );
};

export default RegisterForm;
