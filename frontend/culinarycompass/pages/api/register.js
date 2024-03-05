// pages/api/register.js

export default async function handler(req, res) {
    if (req.method === 'POST') {
      const { username, first_name, last_name, email, gender, dob, password } = req.body;
  
      // Perform any necessary validation or processing of the form data here
  
      try {
        // Send the form data to your backend server or perform any other actions
        const response = await fetch('http://localhost:8000/api/register/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, first_name, last_name, email, gender, dob, password }),
        });
  
        const data = await response.json();
  
        // Return the response from your backend server or any other response as needed
        res.status(200).json({ message: 'Registration successful', data });
      } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: 'Registration failed. Please try again.' });
      }
    } else {
      res.status(405).json({ message: 'Method not allowed' });
    }
  }
  