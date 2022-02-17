import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TextField, Button, Paper } from '@material-ui/core';
import FileBase from 'react-file-base64';
import { createPost, updatePost } from '../../actions/posts';
import styles from './Form.module.css';

function Form({ currentId, setCurrentId }) {
    const [postData, setPostdata] = useState({
        creator: '',
        title: '',
        message: '',
        tags: '',
        selectedFile: ''
    });
    //since we dont want all the posts from store fetching the post with current id
    const post = useSelector((state) => currentId ? state.posts.find((p) => p._id === currentId) : null);
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (currentId) {
            dispatch(updatePost(currentId, postData))
        } else {
            dispatch(createPost(postData));
        }
        clear();
    }

    const clear = () => {
        setCurrentId(null);
        setPostdata({
            creator: '',
            title: '',
            message: '',
            tags: '',
            selectedFile: ''
        });
    }

    useEffect(() => {
        if (post) {
            setPostdata(post);
        }
    }, [post])

    return (
        <Paper className={styles.paper}>
            <form autoComplete="off"
                noValidate
                className={styles.form}
                onSubmit={handleSubmit}>
                <h4 className={styles.head}>{!currentId ? "Creating " : "Editing "} a Memory</h4>
                <TextField
                    className={styles.textfield}
                    name="creator"
                    variant="outlined"
                    label="Creator"
                    fullWidth
                    value={postData.creator}
                    onChange={(e) => setPostdata({ ...postData, creator: e.target.value })} />
                <TextField
                    className={styles.textfield}
                    name="title"
                    variant="outlined"
                    label="Title"
                    fullWidth
                    value={postData.title}
                    onChange={(e) => setPostdata({ ...postData, title: e.target.value })} />
                <TextField
                    className={styles.textfield}
                    name="message"
                    variant="outlined"
                    label="Message"
                    fullWidth
                    value={postData.message}
                    onChange={(e) => setPostdata({ ...postData, message: e.target.value })} />
                <TextField
                    className={styles.textfield}
                    name="tags"
                    variant="outlined"
                    label="Tags"
                    fullWidth
                    value={postData.tags}
                    onChange={(e) => setPostdata({ ...postData, tags: e.target.value.split(',') })} />
                <div className={styles.fileInput}>
                    <FileBase
                        type="file"
                        multiple={false}
                        onDone={({ base64 }) => setPostdata({ ...postData, selectedFile: base64 })} />
                </div>
                <Button
                    className={styles.buttonSubmit}
                    type="submit"
                >Submit</Button>
                <Button
                    className={styles.buttonClear}
                    onClick={clear}
                >Clear</Button>
            </form>
        </Paper>
    );
}

export default Form;