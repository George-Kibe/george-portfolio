"use client"

import Link from 'next/link'
import React from 'react'
import { usePathname } from 'next/navigation'
import { Film as TbFilm, Newspaper as TbArticle, Building2 as TbBuildingStore, FileText as TbFileInvoice, LayoutDashboard as TbLayoutDashboard, MessageSquareQuote as TbMessageStar } from 'lucide-react'

const LINKS = [
  { href: '/admin', label: 'Dashboard', icon: TbLayoutDashboard, exact: true },
  { href: '/admin/projects', label: 'Projects', icon: TbFilm },
  { href: '/admin/quotes', label: 'Quotes', icon: TbFileInvoice },
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
                ? 'bg-accent text-white'
                : 'text-muted hover:bg-foreground/5'}`}>
            <Icon className="size-5" aria-hidden="true" />
            {label}
          </Link>
        )
      })}
    </nav>
  )
}

export default AdminNav
