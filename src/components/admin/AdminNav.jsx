"use client"

import Link from 'next/link'
import React from 'react'
import { usePathname } from 'next/navigation'
import { TbArticle, TbBuildingStore, TbBriefcase, TbFileInvoice, TbLayoutDashboard, TbMessageStar } from 'react-icons/tb'

const LINKS = [
  { href: '/admin', label: 'Dashboard', icon: TbLayoutDashboard, exact: true },
  { href: '/admin/quotes', label: 'Quotes', icon: TbFileInvoice },
  { href: '/admin/projects', label: 'Projects', icon: TbBriefcase },
  { href: '/admin/testimonials', label: 'Testimonials', icon: TbMessageStar },
  { href: '/admin/blog', label: 'Blog', icon: TbArticle },
  { href: '/admin/brands', label: 'Brands', icon: TbBuildingStore },
]

const AdminNav = () => {
  const pathname = usePathname()
  return (
    <nav aria-label="Admin" className="flex gap-1 overflow-x-auto lg:flex-col">
      {LINKS.map(({ href, label, icon: Icon, exact }) => {
        const active = exact ? pathname === href : pathname.startsWith(href)
        return (
          <Link key={href} href={href} aria-current={active ? 'page' : undefined}
            className={`flex h-11 shrink-0 items-center gap-3 rounded-lg px-3 font-medium transition-colors
              ${active
                ? 'bg-dark text-light dark:bg-light dark:text-dark'
                : 'text-dark/80 hover:bg-dark/5 dark:text-light/80 dark:hover:bg-light/10'}`}>
            <Icon className="size-5" aria-hidden="true" />
            {label}
          </Link>
        )
      })}
    </nav>
  )
}

export default AdminNav
