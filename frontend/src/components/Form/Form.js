import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { TextField, Button, Paper } from '@material-ui/core';
import FileBase from 'react-file-base64';
import { createPost } from '../../actions/posts';
import styles from './Form.module.css';

function Form(props) {
    const [postData, setPostdata] = useState({
        creator: '', 
        title: '',
        message: '',
        tags: '',
        selectedFile: ''
    });
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createPost(postData));
    }

    const clear = () => {

    }

    return (
        <Paper className={styles.paper}>
            <form autoComplete="off"
                noValidate
                className={styles.form}
                onSubmit={handleSubmit}>
                <h4 className={styles.head}>Creating a Memory</h4>
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
                    onChange={(e) => setPostdata({ ...postData, tags: e.target.value })} />
                <div className={styles.fileInput}>
                    <FileBase
                        type="file"
                        multiple={false}
                        onDone={({base64}) => setPostdata({ ...postData, selectedFile: base64 })} />
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