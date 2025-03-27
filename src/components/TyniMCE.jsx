import React, { useEffect, useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { VITE_DEV_TYNYMCE_API } from '../config/configuration';

const TyniMCE = ({ name, funsForStateUpdate }) => {


    return (
        <Editor
            apiKey={VITE_DEV_TYNYMCE_API}
            // onInit={(_evt, editor) => {
            //     editorRef.current = editor;
            // }}
            onEditorChange={(content, editor) => {
                if (funsForStateUpdate) {
                    funsForStateUpdate(pre => ({...pre, [name]: content}));
                }
            }}
            init={{
                height: 200,
                menubar: false,
                plugins: [
                    'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                    'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                    'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                ],
                toolbar:
                    'undo redo | blocks | ' +
                    'bold italic forecolor | alignleft aligncenter ' +
                    'alignright alignjustify | bullist numlist outdent indent | ' +
                    'removeformat | help',
                content_style: `
            body {
                font-family: Helvetica, Arial, sans-serif;
                font-size: 14px;
                background-color: #212631;
                color: #ffffff;
            }
            a { color: #bb86fc; } /* Adjust link colors if needed */
        `,
                skin: 'oxide-dark', // Dark mode for UI
                content_css: 'dark', // Dark mode for content
            }}
        />

    )
}
//border color rgba(255, 255, 255, 0.1)

export default TyniMCE