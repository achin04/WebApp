'use client';
import { ButtonPrimary } from '@/components/Button';
import { useAuth } from '@/lib/useAuth';
import { setReviewDoc } from '@/lib/writes';
import { useState } from 'react';
import { Timestamp } from 'firebase/firestore';
import { StarRating } from '@/components/StarRating';

export const WriteReview = ({ dorm, school }) => {
  const [comment, setcomment] = useState('');
  const [rating, setrating] = useState('');
  const { user } = useAuth();

  const submitReview = async (event) => {
    event.preventDefault();
    if (comment.length === 0 || !rating) {
      window.alert('Add a comment and rating');
      return;
    }

    if (!user) {
      window.alert('Log in');
      return;
    }

    try {
      const review = {
        rating: Number(rating),
        comment,
        uid: user.uid,
        dormID: dorm.dormID,
        schoolID: school.schoolID,
        schoolName: school.schoolName,
        dormName: dorm.dormName,
        date: Timestamp.now(),
      };

      await setReviewDoc(review);

      setcomment('');
      setrating(0);
      window.alert('Submitted');
    } catch (e) {
      window.alert(e.message);
    }
  };

  return (
    <div>
      <form className='space-y-8' onSubmit={submitReview}>
        <div className='space-y-1'>
          <p className='font-medium'>Rate the dorm</p>
          <StarRating rating={Number(rating)} setrating={setrating}/>
        </div>

        <div className='space-y-1'>
          <p className='font-medium'>Tell us about your experience</p>
          <textarea
            rows='4'
            value={comment}
            placeholder='Write a comment'
            onChange={(e) => setcomment(e.target.value)}
            className='w-full border-gray-400 border p-2 rounded'
          />
        </div>

        <ButtonPrimary buttonType='submit' onClick={submitReview}>
          Submit Review
        </ButtonPrimary>
      </form>
    </div>
  );
};