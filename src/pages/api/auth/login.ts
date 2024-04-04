import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import { withDB } from 'src/connectionsDb/withDB';

export default async function loginHandler(req, res) {
  const { email, password } = req.body;

  try {
    const { user } = await withDB(async (db) => {
      const collection = await db.connection.collection('usuarios');
      const user = await collection.findOne({ email });
      return { user };
    });

    if (user) {
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (passwordMatch) {
        const accessToken = jwt.sign(
          {
            email: user.email,
            username: user.username,
          },
          process.env?.JWT_SECRET || '123456789',
          {
            expiresIn: '30d',
          }
        );

        const responseData = {
          accessToken,
          user: {
            username: user.username,
            email: user.email,
          },
        };

        return res.json(responseData);
      } else {
        return res.status(401).json({ error: 'Invalid email or password' });
      }
    } else {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
  } catch (error) {
    console.error('Error during login:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
