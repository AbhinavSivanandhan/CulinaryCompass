// pages/api/register.js

export default async function handler(req, res) {
    if (req.method === 'POST') {
      const { username, first_name, last_name, email, gender, dob, password } = req.body;
  
      // Perform any necessary validation or processing of the form data here
  
      try {
        // Send the form data to your backend server or perform any other actions
        const response = await fetch('http://127.0.0.1:8000/api/register/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, first_name, last_name, email, gender, dob, password }),
        });
  
        const data = await response.json();
        console.log('Server response:', data);
        console.log(response.ok, "response.ok")
        // Return the response from your backend server or any other response as needed
        if ((response.status === 200 || response.status === 201 ) && response.ok) {
        res.status(200).json({ message: 'Registration successful', data });
        }
        else {
          res.status(400).json({ message: 'Registration failed. Please try again.', data});
        }
      } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: 'Registration failed. Please try again.' });
      }
    } else {
      res.status(405).json({ message: 'Method not allowed' });
    }
  }
  