"use client"

import React, { useRef, useState } from 'react'
import { EditorContent, useEditor, useEditorState } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import { Placeholder } from '@tiptap/extensions'
import {
  TbArrowBackUp, TbArrowForwardUp, TbBlockquote, TbBold, TbH2, TbH3, TbItalic, TbLink, TbList,
  TbListNumbers, TbLoader2, TbPhoto, TbSeparatorHorizontal, TbSourceCode, TbStrikethrough, TbUnderline,
} from 'react-icons/tb'
import { uploadImage } from './uploadImage'
import { inputClass } from './ui'

const ToolButton = ({ label, active = false, disabled = false, onClick, children }) => (
  <button type="button" onClick={onClick} disabled={disabled} aria-label={label} title={label}
    aria-pressed={active}
    className={`flex size-9 items-center justify-center rounded-md transition-colors disabled:opacity-40 cursor-pointer
      ${active ? 'bg-dark text-light dark:bg-light dark:text-dark' : 'hover:bg-dark/10 dark:hover:bg-light/15'}`}>
    {children}
  </button>
)

const Divider = () => <span aria-hidden="true" className="mx-1 h-6 w-px bg-dark/15 dark:bg-light/15" />

// Tiptap editor for post bodies. The HTML lives in a hidden input so the
// surrounding <form> submits it like any other field; the server sanitises it
// (lib/html.js) before saving. Images upload straight to Cloudinary.
const RichTextEditor = ({ name, defaultValue = '', labelledBy }) => {
  const [html, setHtml] = useState(defaultValue)
  const [linkOpen, setLinkOpen] = useState(false)
  const [linkUrl, setLinkUrl] = useState('')
  const [upload, setUpload] = useState({ busy: false, error: '' })
  const fileRef = useRef(null)
  const editorRef = useRef(null)

  const insertFiles = async (files) => {
    const images = [...files].filter((f) => f.type.startsWith('image/'))
    if (!images.length) return false
    setUpload({ busy: true, error: '' })
    try {
      for (const file of images) {
        const { url } = await uploadImage(file)
        editorRef.current?.chain().focus().setImage({ src: url, alt: '' }).run()
      }
      setUpload({ busy: false, error: '' })
    } catch (error) {
      setUpload({ busy: false, error: error.message })
    }
    return true
  }

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3, 4] },
        link: { openOnClick: false, autolink: true, protocols: ['https', 'http', 'mailto'] },
      }),
      Image.configure({ HTMLAttributes: { loading: 'lazy' } }),
      Placeholder.configure({ placeholder: 'Start writing… Paste or drop images straight in.' }),
    ],
    content: defaultValue,
    // Render on the client only; SSR would mismatch the editor's DOM.
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: 'article-body min-h-[24rem] px-4 py-4 focus:outline-none md:px-6',
        ...(labelledBy && { 'aria-labelledby': labelledBy }),
        'aria-multiline': 'true',
        role: 'textbox',
      },
      handlePaste: (_view, event) => {
        const files = event.clipboardData?.files
        if (files?.length && [...files].some((f) => f.type.startsWith('image/'))) {
          insertFiles(files)
          return true
        }
        return false
      },
      handleDrop: (_view, event) => {
        const files = event.dataTransfer?.files
        if (files?.length && [...files].some((f) => f.type.startsWith('image/'))) {
          event.preventDefault()
          insertFiles(files)
          return true
        }
        return false
      },
    },
    onCreate: ({ editor }) => { editorRef.current = editor },
    onUpdate: ({ editor }) => setHtml(editor.isEmpty ? '' : editor.getHTML()),
  })

  // Re-render the toolbar only when these states actually change.
  const state = useEditorState({
    editor,
    selector: ({ editor: e }) => e && ({
      bold: e.isActive('bold'), italic: e.isActive('italic'), underline: e.isActive('underline'),
      strike: e.isActive('strike'), h2: e.isActive('heading', { level: 2 }), h3: e.isActive('heading', { level: 3 }),
      bullet: e.isActive('bulletList'), ordered: e.isActive('orderedList'), quote: e.isActive('blockquote'),
      code: e.isActive('codeBlock'), link: e.isActive('link'),
      canUndo: e.can().undo(), canRedo: e.can().redo(),
    }),
  })

  const run = (fn) => () => editor && fn(editor.chain().focus()).run()

  const openLink = () => {
    setLinkUrl(editor?.getAttributes('link').href ?? '')
    setLinkOpen(true)
  }
  const applyLink = () => {
    const url = linkUrl.trim()
    const chain = editor.chain().focus().extendMarkRange('link')
    if (!url) chain.unsetLink().run()
    else chain.setLink({ href: /^(https?:|mailto:|\/)/.test(url) ? url : `https://${url}` }).run()
    setLinkOpen(false)
  }

  return (
    <div className="overflow-hidden rounded-lg border border-dark/40 bg-white dark:border-light/35 dark:bg-black
      has-[.ProseMirror-focused]:outline-2 has-[.ProseMirror-focused]:outline-primary dark:has-[.ProseMirror-focused]:outline-primary-dark">
      <input type="hidden" name={name} value={html} />

      <div role="toolbar" aria-label="Formatting"
        className="sticky top-0 z-10 flex flex-wrap items-center gap-0.5 border-b border-dark/15 bg-light/95 p-1.5 backdrop-blur
          dark:border-light/15 dark:bg-dark/95">
        <ToolButton label="Heading 2" active={state?.h2} onClick={run((c) => c.toggleHeading({ level: 2 }))}><TbH2 className="size-5" /></ToolButton>
        <ToolButton label="Heading 3" active={state?.h3} onClick={run((c) => c.toggleHeading({ level: 3 }))}><TbH3 className="size-5" /></ToolButton>
        <Divider />
        <ToolButton label="Bold" active={state?.bold} onClick={run((c) => c.toggleBold())}><TbBold className="size-5" /></ToolButton>
        <ToolButton label="Italic" active={state?.italic} onClick={run((c) => c.toggleItalic())}><TbItalic className="size-5" /></ToolButton>
        <ToolButton label="Underline" active={state?.underline} onClick={run((c) => c.toggleUnderline())}><TbUnderline className="size-5" /></ToolButton>
        <ToolButton label="Strikethrough" active={state?.strike} onClick={run((c) => c.toggleStrike())}><TbStrikethrough className="size-5" /></ToolButton>
        <Divider />
        <ToolButton label="Bulleted list" active={state?.bullet} onClick={run((c) => c.toggleBulletList())}><TbList className="size-5" /></ToolButton>
        <ToolButton label="Numbered list" active={state?.ordered} onClick={run((c) => c.toggleOrderedList())}><TbListNumbers className="size-5" /></ToolButton>
        <ToolButton label="Quote" active={state?.quote} onClick={run((c) => c.toggleBlockquote())}><TbBlockquote className="size-5" /></ToolButton>
        <ToolButton label="Code block" active={state?.code} onClick={run((c) => c.toggleCodeBlock())}><TbSourceCode className="size-5" /></ToolButton>
        <ToolButton label="Divider line" onClick={run((c) => c.setHorizontalRule())}><TbSeparatorHorizontal className="size-5" /></ToolButton>
        <Divider />
        <ToolButton label="Link" active={state?.link || linkOpen} onClick={openLink}><TbLink className="size-5" /></ToolButton>
        <ToolButton label={upload.busy ? 'Uploading image' : 'Insert image'} disabled={upload.busy} onClick={() => fileRef.current?.click()}>
          {upload.busy ? <TbLoader2 className="size-5 motion-safe:animate-spin" /> : <TbPhoto className="size-5" />}
        </ToolButton>
        <input ref={fileRef} type="file" accept="image/*" multiple hidden
          onChange={(e) => { insertFiles(e.target.files); e.target.value = '' }} />
        <Divider />
        <ToolButton label="Undo" disabled={!state?.canUndo} onClick={run((c) => c.undo())}><TbArrowBackUp className="size-5" /></ToolButton>
        <ToolButton label="Redo" disabled={!state?.canRedo} onClick={run((c) => c.redo())}><TbArrowForwardUp className="size-5" /></ToolButton>
      </div>

      {linkOpen && (
        <div className="flex flex-wrap items-center gap-2 border-b border-dark/15 p-2 dark:border-light/15">
          <label htmlFor="editor-link" className="sr-only">Link URL</label>
          <input id="editor-link" autoFocus value={linkUrl} onChange={(e) => setLinkUrl(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') { e.preventDefault(); applyLink() }
              if (e.key === 'Escape') setLinkOpen(false)
            }}
            placeholder="https://… (leave empty to remove the link)" className={`${inputClass} h-9 flex-1 py-1`} />
          <button type="button" onClick={applyLink} className="h-9 rounded-md bg-dark px-3 text-sm font-semibold text-light dark:bg-light dark:text-dark cursor-pointer">Apply</button>
          <button type="button" onClick={() => setLinkOpen(false)} className="h-9 px-2 text-sm font-semibold underline cursor-pointer">Cancel</button>
        </div>
      )}

      {upload.error && (
        <p role="alert" className="border-b border-dark/15 px-3 py-2 text-sm font-medium text-red-700 dark:border-light/15 dark:text-red-300">
          {upload.error}
        </p>
      )}

      {/* Until the editor mounts (client only), show the same content in the
          same box so the page doesn't jump when it appears. */}
      {editor ? <EditorContent editor={editor} /> : (
        <div aria-hidden="true" className="article-body min-h-[24rem] px-4 py-4 opacity-70 md:px-6"
          dangerouslySetInnerHTML={{ __html: defaultValue }} />
      )}
    </div>
  )
}

export default RichTextEditor
