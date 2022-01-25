import nc from 'next-connect';
import { isAdmin, isAuth } from '../../../../../utils/auth';
import Lecture from '../../../../../models/Lecture';
import db from '../../../../../utils/db';

const handler = nc();
handler.use(isAuth, isAdmin);

handler.get(async (req, res) => {
  await db.connect();
  const product = await Lecture.findById(req.query.id);
  await db.disconnect();
  res.send(product);
});

handler.put(async (req, res) => {
  await db.connect();
  const product = await Lecture.findById(req.query.id);
 
  if (product) {
   
    product.title = req.body.title;
    product.slug = req.body.slug;
    product.videoLink = req.body.videoLink;
    product.course = req.body.course;
    await product.save();
    await db.disconnect();
    res.send({ message: 'Lecture Updated Successfully' });
  } else {
    await db.disconnect();
    res.status(404).send({ message: 'Lecture Not Found' });
  }
});

handler.delete(async (req, res) => {
  await db.connect();
  const product = await Lecture.findById(req.query.id);
  if (product) {
    await product.remove();
    await db.disconnect();
    res.send({ message: 'Lecture Deleted' });
  } else {
    await db.disconnect();
    res.status(404).send({ message: 'Lecture Not Found' });
  }
});

export default handler;
