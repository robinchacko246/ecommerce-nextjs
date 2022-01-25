import React, {  useEffect, useState } from 'react';
import NextLink from 'next/link';
import {
  Grid,
  Link,
  List,
  ListItem,
  Typography
} from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import Layout from '../../components/Layout';
import useStyles from '../../utils/styles';
import Product from '../../models/Product';
import Lecture from '../../models/Lecture';
import db from '../../utils/db';
import axios from 'axios';
import { getError } from '../../utils/error';
import { useSnackbar } from 'notistack';
import ReactPlayer from 'react-player'
import "react-image-gallery/styles/css/image-gallery.css";

export default function ProductScreen(props) {
  //const router = useRouter();
  //const { userInfo } = state;
  const { product } = props;
  const { lectures } = props;
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  const [reviews, setReviews] = useState([]);
 
  const [open] = React.useState(false);
  const anchorRef = React.useRef(null);




  const fetchReviews = async () => {
    try {
      const { data } = await axios.get(`/api/products/${product._id}/reviews`);
      setReviews(data);
    } catch (err) {
      enqueueSnackbar(getError(err), { variant: 'error' });
    }
  };


  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);


  //test



  useEffect(() => {
    fetchReviews();
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  if (!lectures) {
    return <div>Course Not Found</div>;
  }


  return (
    <Layout title={product.name} description={product.description}>
      <div className={classes.section}>
        <NextLink href={`/product/${product.slug}`} passHref>
          <Link>
            <Typography>back to Course</Typography>
          </Link>
        </NextLink>
      </div>
      <Grid container spacing={1}>
        <Grid item >
          <ReactPlayer url={lectures.videoLink}/>
        </Grid>
        <Grid item md={6} xs={12}>
          <List>
            <ListItem>
              <Typography component="h1" variant="h1">
                {lectures.title}
              </Typography>
            </ListItem>
            <ListItem>
              <Typography>Category: {product.category}</Typography>
            </ListItem>
            <ListItem>
              <Typography>Course name: {product.name}</Typography>
            </ListItem>
            <ListItem>
              <Rating value={product.rating} readOnly></Rating>
              <Link href="#reviews">
                <Typography>({product.numReviews} reviews)</Typography>
              </Link>
            </ListItem>
            <ListItem>
              <Typography> Description: {product.description}</Typography>



              {/* <ImageGallery items={images} /> */}




            </ListItem>



            {/* <ReactPlayer url='https://www.youtube.com/watch?v=wWgIAphfn2U' /> */}
          </List>
          {/* <ImageGallery items={images} /> */}

       
        </Grid>






      </Grid>
      <List>
        <ListItem>

          <Typography name="reviews" id="reviews" variant="h2">
            Students Reviews
          </Typography>
        </ListItem>
        {reviews.length === 0 && <ListItem>No review</ListItem>}
        {reviews.map((review) => (
          <ListItem key={review._id}>
            <Grid container>
              <Grid item className={classes.reviewItem}>
                <Typography>
                  <strong>{review.name}</strong>
                </Typography>
                <Typography>{review.createdAt.substring(0, 10)}</Typography>
              </Grid>
              <Grid item>
                <Rating value={review.rating} readOnly></Rating>
                <Typography>{review.comment}</Typography>
              </Grid>
            </Grid>
          </ListItem>
        ))}

      </List>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { params } = context;
  const { slug } = params;

  await db.connect();

  const lectures = await Lecture.findOne({ _id: slug }).lean();
  //console.log(lectures);
  const product = await Product.findOne({ _id: lectures.course }, '-reviews').lean();
  //console.log(product);
  await db.disconnect();
  return {
    props: {
      product: db.convertDocToObj(product),
      lectures: db.convertDocToObj(lectures)
    },
  };
}
