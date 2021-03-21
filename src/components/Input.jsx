import React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { uploadFile } from '../store/actions';

const Button = styled.button`
    display: inline-block;
    border-radius: 3px;
    padding: 0.5rem 0;
    margin: 0.5rem 1rem;
    width: 10rem;
    background: transparent;
    color: tomato;
    border: 2px solid tomato;
`;

const FileUploader = props => {
    // reference to hidden file input element
    const hiddenFileInput = React.useRef(null);

    // when Button styled component is clicked, programmatically click the hidden input
    const handleClick = event => {
        hiddenFileInput.current.click();
    };

    // save file to redux store
    // https://thoughtbot.com/blog/using-redux-with-react-hooks
    const dispatch = useDispatch();
    const handleChange = event => {
        const fileUploaded = event.target.files[0];
        dispatch(uploadFile(fileUploaded));
    };

    return (
        <>
            <Button 
                onClick={handleClick}
                style={{ marginTop: '5rem' }}
            >
                Select an Image!
            </Button>
            <input 
                type="file"
                ref={hiddenFileInput}
                onChange={handleChange}
                style={{ display: 'none' }}
            />
        </>
    )
}

export default FileUploader;