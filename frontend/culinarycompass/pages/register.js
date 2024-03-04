// import logo from './Food_Logo.jpg';
import styled, { keyframes } from 'styled-components';


// Animation for the button
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

// Styled components with enhanced aesthetics
const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 40px;
  border-radius: 20px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  margin: 40px auto;
  background: linear-gradient(135deg, #6e8efb, #88d3ce);
  color: #fff;
`;

const Title = styled.h2`
  margin: 0;
  font-size: 2rem;
  color: #ffffff;
  text-shadow: 1px 1px 5px rgba(0,0,0,0.2);
`;

const Input = styled.input`
  width: 100%;
  padding: 15px;
  border-radius: 25px;
  border: none;
  margin: 5px 0;
  box-shadow: inset 0 2px 5px rgba(0,0,0,0.2);
  background: rgba(255, 255, 255, 0.8);
  color: #333;
  &:focus {
    outline: none;
    background: #fff;
    box-shadow: 0 0 0 2px #88d3ce;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 15px;
  border-radius: 25px;
  border: none;
  margin: 5px 0;
  box-shadow: inset 0 2px 5px rgba(0,0,0,0.2);
  background: rgba(255, 255, 255, 0.8);
  color: #333;
  &:focus {
    outline: none;
    background: #fff;
    box-shadow: 0 0 0 2px #88d3ce;
  }
`;

const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 25px;
  background-color: #fff;
  color: #007bff;
  cursor: pointer;
  font-weight: bold;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  transition: all 0.3s;
  animation: ${fadeIn} 0.5s ease-out;
  &:hover {
    background-color: #f8f9fa;
    transform: translateY(-2px);
    box-shadow: 0 4px 20px rgba(0,0,0,0.15);
  }
`;

// Your Component
const RegisterForm = () => {
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Define the URL of your backend endpoint
    const backendUrl = 'http://localhost:8000/register/';

    try {
        // Make a POST request to the backend with form data in JSON format
        const response = await fetch(backendUrl, {
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
  const handleChange = (event) => {
    // Input change logic
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Title>Register</Title>
      <Input type="text" name="first_name" placeholder="First Name" onChange={handleChange} />
      <Input type="text" name="last_name" placeholder="Last Name" onChange={handleChange} />
      <Input type="email" name="email" placeholder="Email" onChange={handleChange} required />
      <Input type="date" name="dob" onChange={handleChange} />
      <Select name="gender" onChange={handleChange}>
        <option value="">Select Gender</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="Other">Other</option>
        <option value="Prefer not to say">Prefer not to say</option>
      </Select>
      <Button type="submit">Register</Button>
    </Form>
  );
};

export default RegisterForm;
