import React, { useEffect, useState } from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';
import { POST_REVIEW, UPDATE_REVIEW, DELETE_REVIEW, GET_REVIEWS } from '../utils/mutations';
import AuthService from "../utils/auth"

const Reviews = () => {
    const [reviews, setReviews] = useState([]/*{ description:"", service:""}*/);
    const [newReview, setNewReview] = useState({ description: "", service: "" });
    const [editingComment, setEditingComment] = useState(null);
    const [editingText, setEditingText] = useState('');
    const { loading, error, data, refetch } = useQuery(GET_REVIEWS);
    const [postReviewMutation, {postError}] = useMutation(POST_REVIEW);
    const [updateReviewMutation, {updateError}] = useMutation(UPDATE_REVIEW);
    const [deleteReviewMutation, {deleteError}] = useMutation(DELETE_REVIEW);
   
    useEffect(() => {
        if (data) {
      setReviews(data.reviews);
    }
  }, [data]);

    // const fetchReviews = async () => {
    //     try {
    //         await refetch();
    //     } catch (error) {
    //         console.error('Error fetching reviews:', error);
    //     }
    // };

    //Posts a comment
    const postReview = async () => {
        const token=AuthService.getProfile();
        console.log(token)
        try {
            const { data } = await postReviewMutation({
                variables: {
                    reviewData: {
                        user: token.data.username, // Accessing username from token data
                        service: newReview.service,
                        description: newReview.description,
                    },
                },
            });
            
            setReviews([...reviews, data.saveReview.savedReviews]);

            // Clear the new review input field
            setNewReview({ description: "", service: "" });
        } catch (error) {
            if (error.networkError) {
                console.error('Network error:', error.networkError);
            }
            if (error.graphQLErrors) {
                error.graphQLErrors.forEach(({ message, locations, path }) =>
                    console.error(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`)
                );
            }
            if (error.message) {
                console.error('Error message:', error.message);
            }
        }
    };

    //updates comments
    const updateComment = async (_id) => {
        console.log(_id)
        try {
            const { data } = await updateReviewMutation({
                variables: { _id, text: editingText },
            });

            // Updates state with new review data based on the id
            setReviews(reviews.map(review => review._id === _id ? data.editReview : review));
            
            // Clears editing state
            setEditingComment(null);
            setEditingText('');
        } catch (error) {
            console.error('Error updating comment:', error);
        }
    };

    //Deletes Comments
    const deleteComment = async (_id) => {
        try{
            await deleteReviewMutation({
                variables: { _id },
            });

            console.log("Comment removed successfully");
            /*filters out deleted comments from the reviews */
            setReviews(reviews.filter(review => review._id !== _id));
            /*clears editing state */
            if (editingComment === _id) {
                setEditingComment(null);
                setEditingText('');
            }
        } catch (error) {
            console.error("Error removing comment:", error);
        }
    };

    const renderReviews = () => {
        return reviews.map(review => (
            <div key={review._id} className="review-item">
                   <p>{review.text}</p>
                   {/*delete button*/}
                <button onClick={() => deleteComment(review._id)}>Delete</button>
                {/*edit button*/}
                <button onClick={() => setEditingComment(review._id)}>Edit</button>
                {/*creates editing form when user edits*/}
                {editingComment === review._id && (
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        updateComment(review._id);
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
                    value={newReview.description}
                    onChange={(e) => setNewReview({ ...newReview, description: e.target.value })}
                    placeholder="Write a new review..."
                />
                 <input
                    type="text"
                    value={newReview.service}
                    onChange={(e) => setNewReview({ ...newReview, service: e.target.value })}
                    placeholder="Service"
                />
                <button onClick={postReview}>Post Review</button>
            </div>
        </div>
    );
};

export default Reviews