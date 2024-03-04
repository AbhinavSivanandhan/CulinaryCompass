// pages/register.js
import styled from 'styled-components';
import { useState } from 'react';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f2f5;
`;

const Form = styled.form`
  padding: 20px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

const Select = styled.select`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;

const Title = styled.h1`
  text-align: center;
  color: #333;
`;

export default function Register() {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        dob: '',
        gender: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);
        // Add your submission logic here
    };

    return (
      <Container>
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
      </Container>
    );
}
