import React from 'react';
import { useSelector } from 'react-redux';
import { Grid, CircularProgress } from '@material-ui/core';
import styles from './Posts.module.css';
import Post from './Post/Post';

function Posts(props) {
    const posts = useSelector((state) => state.posts);

    console.log(posts);

    return (
        !posts.length ? <CircularProgress /> : (
            <Grid 
                className={styles.maincontainer} 
                container 
                alignItems="stretch"
                spacing={3}>
                {posts.map((post) => (
                    <Grid key={post._id} item xs={12} sm={6}>
                        <Post post={post}/>
                    </Grid>
                ))}
            </Grid>
        )
    );
}

export default Posts;