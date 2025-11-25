'use client';

import { red } from '@mui/material/colors';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import dynamic from 'next/dynamic';
import { userAgent } from 'next/server';

const CardComponent = ({ review }) => {
  return (
    <Card sx={{ maxWidth: 400 }}>
      <CardHeader
        avatar={
          <div className='avatar'>
            <Avatar
              sx={{ bgcolor: red[500] }}
              aria-label='recipe'
              src={review.profile_image}
            >
              {review.user_name?.[0]}
            </Avatar>
            <Typography variant='body2' sx={{ color: 'text.secondary' }}>
              {review.user_id.length > 10
                ? review.user_id.substring(0, 10) + '...'
                : review.user_id}
            </Typography>
          </div>
        }
        // action={
        //   <IconButton aria-label='settings'>
        //     <MoreVertIcon />
        //   </IconButton>
        // }
        title={review.title}
        subheader={new Date(review.created_at).toLocaleDateString()}
      />
      {review.image && (
        <CardMedia
          component='img'
          height='600'
          width='auto'
          image={review.image}
          alt={review.title}
        />
      )}
      <CardContent>
        <Typography variant='body2' sx={{ color: 'text.secondary' }}>
          {review.review}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label='add to favorites'>
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label='share'>
          <ShareIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default dynamic(() => Promise.resolve(CardComponent), {
  ssr: false,
  loading: () => <p>Loading component...</p>,
});
