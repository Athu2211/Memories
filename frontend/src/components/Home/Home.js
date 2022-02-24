import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux'
import { Container, Grid, Grow } from '@material-ui/core';
import styles from './Home.module.css';
import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import { getPosts } from '../../actions/posts';

function Home(props) {
    const [currentId, setCurrentId] = useState(null);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getPosts());
    }, [currentId, dispatch])
    
    return (
        <Grow in>
            <Container>
                <Grid className={styles.mainContainer} container justify="space-between" alignItems="stretch" spacing={3} >
                    <Grid item xs={12} sm={8}>
                        <Posts setCurrentId={setCurrentId} />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Form currentId={currentId} setCurrentId={setCurrentId} />
                    </Grid>
                </Grid>
            </Container>
        </Grow>
    );
}

export default Home;