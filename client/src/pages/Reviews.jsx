import { useEffect, useState } from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';
import { POST_REVIEW, UPDATE_REVIEW, DELETE_REVIEW } from '../utils/mutations';
import { QUERY_REVIEWS } from '../utils/queries';
import AuthService from "../utils/auth";
import {Form, Button} from "react-bootstrap"

const Reviews = () => {
    const [reviews, setReviews] = useState([]/*{ description:"", service:""}*/);
    const [newReview, setNewReview] = useState({ description: "", service: "" });
    const [editingComment, setEditingComment] = useState(null);
    const [editingText, setEditingText] = useState('');
    const { loading, error, data, refetch } = useQuery(QUERY_REVIEWS);
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
            
            setReviews([...reviews, data.saveReview]);

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
            const token=AuthService.getProfile();
            const { data } = await updateReviewMutation({
                variables: { reviewId: _id, description: editingText, userId: token.data._id },
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
                variables: { reviewId: _id },
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
            <div className='review-page px-4'>
            <div key={review._id} className="review-item card col-sm-12 col-md-4 m-1">
                <div className='card-body'>
                   <p>{review.description}</p>
                   <p>Service Provided: {review.service}</p>
                   {/*delete button*/}
                <button className="btn btn-primary" onClick={() => deleteComment(review._id)}>Delete</button>
                {/*edit button*/}
                <button className="btn btn-primary" onClick={() => setEditingComment(review._id)}>Edit</button>
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
            </div>
            </div>
        ));
    };

    return (
        <Form>
            <Form.Group className="mb-3" controlId="reviewForm">
        <div className="reviews-container">
            <Form.Label><h2>Customer Reviews</h2></Form.Label>
           
            <div className="reviews-list row">
                {renderReviews()}
            </div>
            <div className="new-review">
                <Form.Control className="w-50" as="textarea" rows={5}
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
                
                <Button variant="primary" type="submit" onClick={postReview}>Post Review</Button>
            </div>
        </div>
        </Form.Group>
        </Form>
    );
};

export default Reviews