import { withDB } from 'src/connectionsDb/withDB';

import { authMiddleware } from 'src/backend/middlewares';
import { JwtPayload } from 'src/backend/interfaces';

async function profileHandler(req, res) {
  const jwtPayload: JwtPayload = req?.jwtPayload;

  const { user } = await withDB(async (db) => {
    const usersCollection = db.connection.collection('usuarios');
    const user = await usersCollection.findOne({ email: jwtPayload.email });

    return { user };
  });

  res.status(200).json({ user });
}

export default authMiddleware(profileHandler);
