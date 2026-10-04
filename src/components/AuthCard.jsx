import React from 'react'

// Narrow centred card for the sign-in and sign-up pages.
const AuthCard = ({ title, intro, children }) => (
  <main className="mx-auto my-12 w-full max-w-md rounded-3xl border border-dark/15 bg-white p-8
    dark:border-light/15 dark:bg-dark md:my-20 md:p-10">
    <h1 className="text-3xl font-bold leading-tight">{title}</h1>
    {intro && <p className="mt-2 leading-relaxed text-dark/75 dark:text-light/75">{intro}</p>}
    <div className="mt-8">{children}</div>
  </main>
)

export default AuthCard
