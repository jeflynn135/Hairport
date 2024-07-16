import React, { useEffect, useState } from 'react';

const Reviews = () => {
    const [reviews, setReviews] = useState([]);
    const [newReview, setNewReview] = useState('');

    useEffect(() => {
        fetchReviews();
    }, []);

    const fetchReviews = async () => {
        try {
            const response = await fetch(/* PLACEHOLDER ROUTE for fetching reviews */);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setReviews(data);
        } catch (error) {
            console.error('Error fetching reviews:', error);
        }
    };

    //Posts a comment
    const postReview = async () => {
        try {
            const response = await fetch(/* PLACEHOLDER ROUTE for posting a review */ {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text: newReview }),
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const updatedReviews = await response.json();
            setReviews(updatedReviews);

            // Clear the new review input field
            setNewReview('');
        } catch (error) {
            console.error('Error posting review:', error);
        }
    };

    //updates comments
    const updateComment = async (id) => {
        try {
            const response = await fetch(/*PLACEHOLDER ROUTE(add a comma before this bracket*/ {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text: editingText }),
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const updatedComment = await response.json();
            console.log('Updated comment:', updatedComment);
    
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
            const response = await fetch(/*PLACEHOLDER ROUTE(add a comma before this bracket*/ {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

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