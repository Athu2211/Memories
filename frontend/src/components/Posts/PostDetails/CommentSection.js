import React, { useState, useRef } from 'react';
import { Typography, TextField, Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { commentPost } from '../../../actions/posts';

import useStyles from './styles';

function CommentSection({ post }) {
    const [comments, setComments] = useState(post?.comments);
    const [comment, setComment] = useState('');
    const user = JSON.parse(localStorage.getItem('profile'));
    const dispatch = useDispatch();
    const commentsRef = useRef();
    const classes = useStyles();

    const handleClick = async() => {
        const finalComment = `${user.result.name} : ${comment}`;
        const newComments = await dispatch(commentPost(finalComment, post._id));
        setComments(newComments);
        setComment('');

        commentsRef.current.scrollIntoView({ behavior: 'smooth'})
    }

    return (
        <div>
            <div className={classes.commentsOuterContainer}>
                <div className={classes.commentsInnerContainer}>
                    <Typography gutterBottom variant='h6'><strong>Comments</strong></Typography>
                    {comments.map((c, index) => (
                        <Typography key={index} gutterBottom variant="subtitle1"><strong>{c.split(':')[0]}</strong>{c.split(':')[1]}</Typography>
                    ))}
                    <div ref={commentsRef} />
                </div>
                {user?.result?.name && (
                    <div style={{ width: '60%' }}>
                        <Typography gutterBottom variant='body1'><strong>Write a comment</strong></Typography>
                        <TextField
                            fullWidth
                            rows={4}
                            variant="outlined"
                            label="Comment"
                            multiline
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        />
                        <Button
                            style={{ marginTop: '10px' }}
                            fullWidth
                            disabled={!comment}
                            onClick={handleClick}
                            variant="contained"
                            color="primary">
                            Comment
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default CommentSection;