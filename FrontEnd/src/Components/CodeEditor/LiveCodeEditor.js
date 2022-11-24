import React, { useEffect, useState } from 'react';
import Navbar from '../layout/Navbar';
import Editor from '../layout/Editor';

function LiveCodeEditor() {
  const [srcHTML, sethtml] = useState('')
  const [srcCSS, setCSS] = useState('')
  const [srcJS, setJS] = useState('')
  const [srcDocs, setSrcDoc] = useState('<h1>hello</h1>')
  useEffect(() => {
    setSrcDoc(`<p>badal</p>`)
  }, [srcDocs])
  return (
    <>
      <div>
        <section>
          <Navbar />
        </section>
        <section className='flex justify-between'>
          <Editor language='html' />
          <Editor language='css' />
          <Editor language='javascript' />
        </section>
        <section>
          <iframe
            srcDoc={srcDocs}
            title="output"
            sandbox="allow-scripts"
            frameBorder="0"
            width="100vw"
            height="100vh"
            scrolling='true'
          />
        </section>
      </div>
    </>
  )
}

export default LiveCodeEditor;