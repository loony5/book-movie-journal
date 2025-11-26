// src/app/components/Card.js
'use client';

import React, { useState, useEffect } from 'react';
import { red } from '@mui/material/colors';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import dynamic from 'next/dynamic';

const CardComponent = ({ review }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  // 로그인 여부 체크
  useEffect(() => {
    const checkLogin = () => {
      fetch('http://localhost:3001/api/users/check', {
        credentials: 'include',
      })
        .then((res) => res.json())
        .then(({ loggedIn }) => setLoggedIn(loggedIn));
    };

    checkLogin();
    const timer = setInterval(checkLogin, 3000);

    return () => clearInterval(timer);
  }, []);

  // 좋아요 개수 불러오기
  useEffect(() => {
    let mounted = true;
    fetch(`http://localhost:3001/api/likes/count/${review.id}`)
      .then((res) => res.json())
      .then((data) => {
        if (!mounted) return;
        // 서버가 { count: 0 } 또는 { count: N } 반환한다고 가정
        setLikeCount(Number(data.count ?? 0));
      })
      .catch(() => {
        if (mounted) setLikeCount(0);
      });
    return () => {
      mounted = false;
    };
  }, [review.id]);

  // 내가 좋아요했는지 여부 확인 (로그인 되어 있을 때만)
  useEffect(() => {
    if (!loggedIn) {
      setLiked(false);
      return;
    }

    let mounted = true;
    fetch(`http://localhost:3001/api/likes/my`, {
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((list) => {
        if (!mounted) return;
        if (!Array.isArray(list)) return setLiked(false);
        const likedReviews = list.map((item) => item.review_id);
        setLiked(likedReviews.includes(review.id));
      })
      .catch(() => {
        if (mounted) setLiked(false);
      });

    return () => {
      mounted = false;
    };
  }, [loggedIn, review.id]);

  // 내가 북마크했는지 여부 확인 (로그인 되어 있을 때만)
  useEffect(() => {
    if (!loggedIn) {
      setBookmarked(false);
      return;
    }

    let mounted = true;
    fetch(`http://localhost:3001/api/bookmarks/my`, {
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((list) => {
        if (!mounted) return;
        if (!Array.isArray(list)) return setBookmarked(false);
        const bookmarkedReviews = list.map((item) => item.review_id);
        setBookmarked(bookmarkedReviews.includes(review.id));
      })
      .catch(() => {
        if (mounted) setBookmarked(false);
      });

    return () => {
      mounted = false;
    };
  }, [loggedIn, review.id]);

  // 좋아요 토글
  const toggleLike = () => {
    if (!loggedIn) return; // 비로그인 방지

    fetch(`http://localhost:3001/api/likes/toggle/${review.id}`, {
      method: 'POST',
      credentials: 'include',
    })
      .then((res) => res.json())
      .then(({ liked }) => {
        setLiked(liked);
        setLikeCount((prev) => (liked ? prev + 1 : prev - 1));
      });
  };
  // 북마크 토글
  const toggleBookmark = () => {
    if (!loggedIn) return;

    fetch(`http://localhost:3001/api/bookmarks/toggle/${review.id}`, {
      method: 'POST',
      credentials: 'include',
    })
      .then((res) => res.json())
      .then(({ bookmarked }) => setBookmarked(bookmarked));
  };

  return (
    <Card sx={{ maxWidth: 400 }}>
      <CardHeader
        avatar={
          <div
            className='avatar'
            style={{ display: 'flex', alignItems: 'center', gap: 8 }}
          >
            <Avatar
              sx={{ bgcolor: red[500] }}
              src={review.profile_image}
              alt={review.user_name}
            >
              {review.user_name?.[0]}
            </Avatar>
            <div>
              <Typography variant='body2' sx={{ color: 'text.secondary' }}>
                {review.user_id?.length > 10
                  ? review.user_id.substring(0, 10) + '...'
                  : review.user_id}
              </Typography>
            </div>
          </div>
        }
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
        <IconButton disabled={!loggedIn} onClick={toggleLike}>
          <Typography
            variant='body2'
            sx={{ color: 'text.secondary', marginRight: 1 }}
          >
            {likeCount}
          </Typography>
          <FavoriteIcon sx={{ color: liked ? 'red' : undefined }} />
        </IconButton>

        {loggedIn && (
          <IconButton onClick={toggleBookmark} aria-label='bookmark'>
            <BookmarkIcon sx={{ color: bookmarked ? '#1976d2' : undefined }} />
          </IconButton>
        )}
      </CardActions>
    </Card>
  );
};

export default dynamic(() => Promise.resolve(CardComponent), { ssr: false });
