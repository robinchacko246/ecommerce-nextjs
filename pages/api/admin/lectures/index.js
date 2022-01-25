import nc from 'next-connect';
import { isAdmin, isAuth } from '../../../../utils/auth';
import Lecture from '../../../../models/Lecture';
import db from '../../../../utils/db';

const handler = nc();
handler.use(isAuth, isAdmin);

handler.get(async (req, res) => {
  await db.connect();
  const lecture = await Lecture.find().lean();
  console.log(lecture);
  await db.disconnect();
  res.send(lecture);
});
handler.post(async (req, res) => {
  await db.connect();
  const newLecture = new Lecture({
    title: 'lecture title',
    slug: 'lecture slug-' + Math.random(),
    no:Math.floor(new Date()),
    videoLink:'videolink here'
  });

  const lecture = await newLecture.save();
  await db.disconnect();
  res.send({ message: 'lecture Created', lecture });
});
export default handler;
