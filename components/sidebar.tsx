"use client";

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Users, Package, BarChart3, CreditCard, Building2, ChevronDown, FileText, BookOpen, Scroll } from 'lucide-react';

const items = [
  { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Users', href: '/users', icon: Users },
  { label: 'Products', href: '/products', icon: Package },
  { label: 'Analytics', href: '/analytics', icon: BarChart3 },
  { label: 'Billing', href: '/billing', icon: CreditCard },
] as const;

export default function Sidebar() {
  const pathname = usePathname();
  const isCompanyRoute = pathname?.startsWith('/company') ?? false;
  const [companyOpen, setCompanyOpen] = useState(() => {
    if (typeof window === 'undefined') {
      return isCompanyRoute;
    }
    try {
      const saved = localStorage.getItem('sidebar.companyOpen');
      if (saved === 'true' || saved === 'false') {
        return saved === 'true';
      }
    } catch {}
    return isCompanyRoute;
  });
  const companyListRef = useRef<HTMLUListElement | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem('sidebar.companyOpen', String(companyOpen));
    } catch {}
  }, [companyOpen]);

  return (
    <div className="h-[98vh] m-2 rounded-2xl min-w-[300px] card border-r border-border transition-all duration-300 flex flex-col flex-shrink-0 max-[700px]:fixed max-[700px]:top-0 max-[500px]:left-0 max-[700px]:bottom-0 max-[700px]:z-50 max-[700px]:w-[85%]">
      <div className="p-4">
        <h2 className="text-base font-semibold">Patrona AI</h2>
      </div>

      {/* Navigation */}
      <nav className="p-4" aria-label="Sidebar navigation">
        <ul className="space-y-2">
          {items.map((item) => {
            const isActive =
              pathname === item.href || pathname?.startsWith(`${item.href}/`);

            const Icon = item.icon;

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={
                    isActive
                      ? 'group flex items-center rounded-md px-3 py-2 text-white dark:!text-black bg-black dark:bg-[#FFD700] hover:bg-neutral-100 dark:hover:bg-neutral-800'
                      : 'group flex items-center rounded-md px-3 py-2 text-slate-900 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                  }
                  aria-current={isActive ? 'page' : undefined}
                >
                  <Icon size={16} className="text-inherit" aria-hidden="true" />
                  <span className="ml-3 flex-1 truncate text-inherit">{item.label}</span>
                </Link>
              </li>
            );
          })}

          {/* Company collapsible group */}
          <li>
            <button
              type="button"
              onClick={() => setCompanyOpen((prev) => !prev)}
              className={`w-full group flex items-center justify-between rounded-md px-3 py-2 ${
                pathname?.startsWith('/company')
                  ? 'text-white dark:!text-black bg-black dark:bg-[#FFD700]'
                  : 'text-slate-900 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800'
              }`}
              aria-expanded={companyOpen}
              aria-controls="company-section"
              aria-haspopup="true"
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setCompanyOpen((prev) => !prev);
                } else if (e.key === 'ArrowDown') {
                  if (companyOpen) {
                    const firstLink = companyListRef.current?.querySelector('a');
                    firstLink?.focus();
                  }
                } else if (e.key === 'Escape') {
                  if (companyOpen) {
                    setCompanyOpen(false);
                  }
                }
              }}
            >
              <span className="flex items-center">
                <Building2 size={16} className="text-inherit " aria-hidden="true" />
                <span className="ml-3 text-inherit">Company</span>
              </span>
              <ChevronDown
                size={16}
                className={` icons ${companyOpen ? 'rotated' : ''}`}
                aria-hidden="true"
              />
            </button>
            <div
              className={`mt-1 overflow-hidden transition-all duration-300 ${
                companyOpen ? 'max-h-96' : 'max-h-0'
              }`}
              id="company-section"
            >
              <ul className="ml-6 space-y-1" ref={companyListRef}>
                {/* Case Study */}
                <li>
                  <Link
                    href="/company/case-study"
                    onClick={() => setCompanyOpen(true)}
                    className={
                      pathname === '/company/case-study'
                        ? 'group flex items-center rounded-md px-3 py-2 text-white dark:!text-black bg-black dark:bg-[#FFD700] hover:bg-neutral-100 dark:hover:bg-neutral-800'
                        : 'group flex items-center rounded-md px-3 py-2 text-slate-900 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                    }
                    aria-current={pathname === '/company/case-study' ? 'page' : undefined}
                  >
                    <BriefcaseIcon />
                    <span className="ml-3 text-inherit">Case Study</span>
                  </Link>
                </li>
                {/* Blogs */}
                <li>
                  <Link
                    href="/company/blogs"
                    onClick={() => setCompanyOpen(true)}
                    className={
                      pathname === '/company/blogs'
                        ? 'group flex items-center rounded-md px-3 py-2 text-white dark:!text-black bg-black dark:bg-[#FFD700] hover:bg-neutral-100 dark:hover:bg-neutral-800'
                        : 'group flex items-center rounded-md px-3 py-2 text-slate-900 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                    }
                    aria-current={pathname === '/company/blogs' ? 'page' : undefined}
                  >
                    <FileText size={16} className="text-inherit" aria-hidden="true" />
                    <span className="ml-3 text-inherit">Blogs</span>
                  </Link>
                </li>
                {/* Stories */}
                <li>
                  <Link
                    href="/company/stories"
                    onClick={() => setCompanyOpen(true)}
                    className={
                      pathname === '/company/stories'
                        ? 'group flex items-center rounded-md px-3 py-2 text-white dark:!text-black bg-black dark:bg-[#FFD700] hover:bg-neutral-100 dark:hover:bg-neutral-800'
                        : 'group flex items-center rounded-md px-3 py-2 text-slate-900 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                    }
                    aria-current={pathname === '/company/stories' ? 'page' : undefined}
                  >
                    <BookOpen size={16} className="text-inherit" aria-hidden="true" />
                    <span className="ml-3 text-inherit">Stories</span>
                  </Link>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </nav>
    </div>
  );
}

function BriefcaseIcon() {
  // Using Scroll icon if Briefcase is not desired; prefer lucide-react Briefcase-like icon from 'Scroll' or 'FileText'
  return <Scroll size={16} className="text-inherit" aria-hidden="true" />
}