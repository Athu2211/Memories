import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux'
import { Container, AppBar, Grid, Grow } from '@material-ui/core';
import memories from './images/memories.png';
import Posts from './components/Posts/Posts';
import Form from './components/Form/Form';
import { getPosts } from './actions/posts';
import './App.css';

function App() {
	const [currentId, setCurrentId] = useState(null);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getPosts());
	}, [currentId, dispatch])

	return (
		<Container maxidth="lg">
			<AppBar className="AppBar" position="static" color="inherit">
				<h1 className="title">Memories</h1>
				<img className="image" src={memories} alt="memories" style={{ height: '60px' }} />
			</AppBar>
			<Grow in>
				<Container>
					<Grid container justify="space-between" alignItems="stretch" spacing={3} >
						<Grid item xs={12} sm={7}>
							<Posts setCurrentId={setCurrentId} />
						</Grid>
						<Grid item xs={12} sm={4}>
							<Form currentId={currentId} setCurrentId={setCurrentId} />
						</Grid>
					</Grid>
				</Container>
			</Grow>
		</Container>
	);
}

export default App;
