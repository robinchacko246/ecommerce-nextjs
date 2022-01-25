import nc from 'next-connect';
import Enrollments from '../../../../models/Enrollments';
import db from '../../../../utils/db';

const handler = nc();

handler.get(async (req, res) => {
  await db.connect();
  const enrollments = await Enrollments.findById(req.query.id);
  await db.disconnect();
  res.send(enrollments);
});

export default handler;
