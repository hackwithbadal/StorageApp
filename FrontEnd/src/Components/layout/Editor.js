import React, { useState } from 'react';
import CodeMirror from '@uiw/react-codemirror'
import { html } from '@codemirror/lang-html';
import { okaidia } from '@uiw/codemirror-theme-okaidia';
import { css } from '@codemirror/lang-css'
import { javascript } from '@codemirror/lang-javascript';

export default function Editor(props) {
    var { language, onChange, value } = props;
    const [srchtml, setHTML] = useState('<h1>hello badal</h1>');
    function onHTMLCHange(editor, data, value) {
        onChange(value)
    }
    return (
        <div className='resize flex-grow w-fit overflow-hidden m-1 rounded-lg'>
            <div className='bg-slate-700 text-white border-gray-800 border p-3'>
                <h1>{language}</h1>
            </div>
            <div>
                <CodeMirror
                    value={srchtml}
                    height='200px'
                    extensions={html()}
                    theme={okaidia}
                    onBeforeInput={onHTMLCHange}
                />
            </div>
        </div>
    )
}
