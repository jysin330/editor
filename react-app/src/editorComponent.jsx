import React, { useState, useEffect } from 'react';
import { Editor, EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import { Editor as WysiwygEditor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
const EditorComponent = () => {
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
  
    useEffect(() => {
      const savedData = localStorage.getItem('my-editor-data');
      if (savedData) {
        const contentState = convertFromRaw(JSON.parse(savedData));
        setEditorState(EditorState.createWithContent(contentState));
      }
    }, []);
  
    const onEditorStateChange = (editorState) => {
      setEditorState(editorState);
    };
  
    const onSaveClick = () => {
      const contentState = editorState.getCurrentContent();
      const rawData = convertToRaw(contentState);
      const jsonData = JSON.stringify(rawData);
      localStorage.setItem('my-editor-data', jsonData);
    };
  
    return (
      <div className="editor-container">
        <div className="editor-header">
          <input type="text" placeholder="Title" />
          <button onClick={onSaveClick}>Save</button>
        </div>
        <WysiwygEditor
          editorState={editorState}
          onEditorStateChange={onEditorStateChange}
          toolbar={{
            options: ['inline', 'blockType'],
            inline: {
              options: ['bold', 'italic', 'underline'],
              className: 'editor-toolbar'
            },
            blockType: {
              options: ['Normal', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6'],
              className: 'editor-toolbar'
            }
          }}
          placeholder="Start typing here..."
        />
      </div>
    );
  };
  
  export default EditorComponent;