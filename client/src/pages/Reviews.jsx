import React, { Component, useEffect, useState } from 'react';

const Reviews = () => {
    const [reviews, setReviews] = useState([]);
    const [newReview, setNewReview] = useState('');

    useEffect(() => {
        fetchReviews();
    }, []);

    const fetchReviews = async () => {
        try{
            const response = await fetch(/*PLACEHOLDER ROUTE*/);
            if (!response.ok) {
                throw new Error('Network resposne was not ok');
            }
            const data = await response.json();
            setReviews(data);
        } catch (error) {
            console.error('Error fetching reviews:', error);
        } 
    };

    //Posts a comment
    const commentReview = async () => {
        try {
            const response = await fetch(/*PLACEHOLDER ROUTE(add a comma before this bracket*/{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ review: newReview }),
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
        try{
            const response = await fetch(/*PLACEHOLDER ROUTE(add a comma before this bracket*/ {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: 
                JSON.stringify({ text: editingText })
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const updatedComment = await response.json();
            console.log('Updated comment:', updatedComment);

            //updates state with new comment data based on the id
            setComments(comments.map(comment => comment.id === id ? updatedComment : comment));
            
            //clears editing state
            setEditingComment(null);
            setEditingText('');

        } catch (error) {
            console.error("Error updating comment:", error);
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
            
            //updates to remove the deleted comment
            setComments(comments.filter(comment => comment.id !== id));

            //clears editing state if comment was being edited while deleted
          if (editingComment === id) {
                setEditingComment(null);
                setEditingText('');
          } 
        } catch (error) {
            console.error("Error removing comment:", error);
        }
    }
};