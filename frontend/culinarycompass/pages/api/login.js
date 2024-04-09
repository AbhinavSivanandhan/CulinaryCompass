// pages/api/login.js
export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { username, password } = req.body;
      try {
        const response = await fetch('http://127.0.0.1:8000/api/login/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, password }),
        });
  
        if (!response.ok || response.status === 400 || response.status === 401 || response.status === 403) {
          const data = await response.json();
          res.status(response.status).json(data);
        }  
        const data = await response.json();
        res.status(200).json(data);

      } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
    } else {
      res.status(405).json({ error: 'Method Not Allowed' });
    }
  }
  