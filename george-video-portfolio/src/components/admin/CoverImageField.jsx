"use client"

import React, { useRef, useState } from 'react'
import { LoaderCircle as TbLoader2, Trash2 as TbTrash, Upload as TbUpload } from 'lucide-react'
import CloudImage from '../CloudImage'
import { uploadImage } from './uploadImage'
import { ghostButtonClass } from './ui'

// Image picker (blog covers, brand logos): uploads to Cloudinary and stores the
// URL in a hidden field. Transformations are applied when the image is
// displayed, so the original upload is kept at full quality.
const CoverImageField = ({ name, defaultValue = '', target = 'blog', contain = false,
  emptyText = 'No cover. A title card is generated instead.' }) => {
  const [url, setUrl] = useState(defaultValue)
  const [status, setStatus] = useState({ busy: false, error: '' })
  const fileRef = useRef(null)

  const choose = async (file) => {
    if (!file) return
    setStatus({ busy: true, error: '' })
    try {
      const uploaded = await uploadImage(file, target)
      setUrl(uploaded.url)
      setStatus({ busy: false, error: '' })
    } catch (error) {
      setStatus({ busy: false, error: error.message })
    }
  }

  return (
    <div className="flex flex-col gap-3">
      <input type="hidden" name={name} value={url} />
      <div className="relative aspect-video w-full max-w-md overflow-hidden rounded-xl border border-dashed border-line bg-foreground/5 ">
        {url ? (
          contain
            // eslint-disable-next-line @next/next/no-img-element -- small admin preview of a logo, shown uncropped
            ? <img src={url} alt="Logo preview" className="size-full object-contain p-6" />
            : <CloudImage src={url} alt="Cover preview" sizes="448px" />
        ) : (
          <p className="flex size-full items-center justify-center p-4 text-center text-sm text-muted">
            {emptyText}
          </p>
        )}
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <button type="button" onClick={() => fileRef.current?.click()} disabled={status.busy} className={ghostButtonClass}>
          {status.busy ? <TbLoader2 className="size-5 motion-safe:animate-spin" aria-hidden="true" /> : <TbUpload className="size-5" aria-hidden="true" />}
          {status.busy ? 'Uploading…' : url ? 'Replace image' : 'Upload image'}
        </button>
        {url && !status.busy && (
          <button type="button" onClick={() => setUrl('')}
            className="inline-flex h-11 items-center gap-1.5 px-2 font-semibold text-red-700 underline-offset-4 hover:underline dark:text-red-300 cursor-pointer">
            <TbTrash className="size-5" aria-hidden="true" /> Remove
          </button>
        )}
        <input ref={fileRef} type="file" accept="image/*" hidden
          onChange={(e) => { choose(e.target.files?.[0]); e.target.value = '' }} />
      </div>
      {status.error && <p role="alert" className="text-sm font-medium text-red-600 dark:text-red-400">{status.error}</p>}
    </div>
  )
}

export default CoverImageField
