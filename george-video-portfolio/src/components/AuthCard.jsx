import React from 'react'

// Narrow centred card for the sign-in and sign-up pages.
const AuthCard = ({ title, intro, children }) => (
  <div className="mx-auto mt-28 mb-16 w-full max-w-md rounded-3xl md:mt-32 border border-line bg-card p-8 md:p-10">
    <h1 className="text-3xl font-bold leading-tight">{title}</h1>
    {intro && <p className="mt-2 leading-relaxed text-muted">{intro}</p>}
    <div className="mt-8">{children}</div>
  </div>
)

export default AuthCard
