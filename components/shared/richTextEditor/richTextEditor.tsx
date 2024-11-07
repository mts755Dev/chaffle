'use client';

import dynamic from 'next/dynamic';
import React, { useMemo } from 'react';
import { ReactQuillProps } from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const quillModules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['link', 'image'],
    [{ align: [] }],
    [{ color: [] }],
    ['code-block'],
    ['clean'],
  ],
};

const quillFormats = [
  'header',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'link',
  'image',
  'align',
  'color',
  'code-block',
];

export const RichTextEditor = (props: ReactQuillProps) => {
  const DynamicTextEditor = useMemo(() => {
    return dynamic(() => import('react-quill'), {
      loading: () => <p>loading...</p>,

      ssr: false,
    });
  }, []);
  return (
    <DynamicTextEditor
      modules={quillModules}
      formats={quillFormats}
      theme="snow"
      {...props}
    />
  );
};
