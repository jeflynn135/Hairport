import React, { useEffect, useState } from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';
import { POST_REVIEW, UPDATE_REVIEW, DELETE_REVIEW, GET_REVIEWS } from '../utils/mutations';

const Reviews = () => {
    const [reviews, setReviews] = useState([]);
    const [newReview, setNewReview] = useState('');
    const [editingComment, setEditingComment] = useState(null);
    const [editingText, setEditingText] = useState('');
    const { loading, error, data, refetch } = useQuery(GET_REVIEWS);
    const [postReviewMutation] = useMutation(POST_REVIEW);
    const [updateReviewMutation] = useMutation(UPDATE_REVIEW);
    const [deleteReviewMutation] = useMutation(DELETE_REVIEW);

    useEffect(() => {
        if (data) {
      setReviews(data.reviews);
    }
  }, [data]);

    const fetchReviews = async () => {
        try {
            await refetch();
        } catch (error) {
            console.error('Error fetching reviews:', error);
        }
    };

    //Posts a comment
    const postReview = async () => {
        try {
            const { data } = await postReviewMutation({
                variables: { text: newReview },
            });
            
            setReviews([...reviews, data.postReview]);

            // Clear the new review input field
            setNewReview('');
        } catch (error) {
            console.error('Error posting review:', error);
        }
    };

    //updates comments
    const updateComment = async (id) => {
        try {
            const { data } = await updateReviewMutation({
                variables: { id, text: editingText },
            });

            // Updates state with new review data based on the id
            setReviews(reviews.map(review => review.id === id ? updatedComment : review));
            
            // Clears editing state
            setEditingComment(null);
            setEditingText('');
        } catch (error) {
            console.error('Error updating comment:', error);
        }
    };

    //Deletes Comments
    const deleteComment = async (id) => {
        try{
            await deleteReviewMutation({
                variables: { id },
            });

            console.log("Comment removed successfully");
            /*filters out deleted comments from the reviews */
            setReviews(reviews.filter(review => review.id !== id));
            /*clears editing state */
            if (editingComment === id) {
                setEditingComment(null);
                setEditingText('');
            }
        } catch (error) {
            console.error("Error removing comment:", error);
        }
    };

    const renderReviews = () => {
        return reviews.map(review => (
            <div key={review.id} className="review-item">
                   <p>{review.text}</p>
                   {/*delete button*/}
                <button onClick={() => deleteComment(review.id)}>Delete</button>
                {/*edit button*/}
                <button onClick={() => setEditingComment(review.id)}>Edit</button>
                {/*creates editing form when user edits*/}
                {editingComment === review.id && (
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        updateComment(review.id);
                    }}>
                        {/*changes comment target into an editing state*/}
                        <textarea
                            value={editingText}
                            onChange={(e) => setEditingText(e.target.value)}
                            placeholder="Edit your comment..."
                        />
                        <button type="submit">Save Changes</button>
                    </form>
                )}
            </div>
        ));
    };

    return (
        <div className="reviews-container">
            <h2>Customer Reviews</h2>
            <div className="reviews-list">
                {renderReviews()}
            </div>
            <div className="new-review">
                <textarea
                    value={newReview}
                    onChange={(e) => setNewReview(e.target.value)}
                    placeholder="Write a new review..."
                />
                <button onClick={postReview}>Post Review</button>
            </div>
        </div>
    );
};

export default Reviews