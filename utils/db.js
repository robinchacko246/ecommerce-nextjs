import mongoose from 'mongoose';

const connection = {};

async function connect() {
  if (connection.isConnected) {
    console.log('already connected');
    return;
  }
  if (mongoose.connections.length > 0) {
    connection.isConnected = mongoose.connections[0].readyState;
    if (connection.isConnected === 1) {
      console.log('use previous connection');
      return;
    }
    await mongoose.disconnect();
  }
  const db = await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
  console.log('new connection');
  connection.isConnected = db.connections[0].readyState;
}

async function disconnect() {
  if (connection.isConnected) {
    console.log(process.env.NODE_ENV);
    if (process.env.NODE_ENV === 'development') {
      // await mongoose.disconnect();
      // connection.isConnected = false;
    } else {
      console.log('not disconnected');
    }
  }
}

function convertDocToObj(doc) {
 
  if(!doc.length)
  {
    doc._id =doc._id? doc._id.toString():"22";
    doc.instructor = doc.instructor?doc.instructor.toString():"";
    doc.course = doc.course?doc.course.toString():"";
    doc.createdAt = doc.createdAt?doc.createdAt.toString():"";
    doc.updatedAt = doc.updatedAt?doc.updatedAt.toString():"";
  }
  else
  {
    doc.map(x=>{
      x._id =x._id? x._id.toString():"22";
      x.instructor = x.instructor?x.instructor.toString():"";
      x.course = x.course?x.course.toString():"";
    x.createdAt = x.createdAt?x.createdAt.toString():"";
    x.updatedAt = x.updatedAt?x.updatedAt.toString():"";
    return x;
    })
  }
  return doc;
}

const db = { connect, disconnect, convertDocToObj };
export default db;
