import nc from 'next-connect';
import Enrollments from '../../../models/enrollment';
import db from '../../../utils/db';

const handler = nc();

handler.get(async (req, res) => {
  await db.connect();
  const enrollments = await Enrollments.find();
  await db.disconnect();
  res.send(enrollments);
});
handler.post(async (req, res) => {
  await db.connect();
  const newProduct = new Enrollments({
    student: req.body.user,
    course:req.body.course
   
  });

  const product = await newProduct.save();
  await db.disconnect();
  res.send({ message: 'Enrollments Created', product });
});
export default handler;
