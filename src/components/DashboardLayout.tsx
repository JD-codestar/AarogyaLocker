import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';

interface DashboardLayoutProps {
  children: React.ReactNode;
  links?: { name: string; path: string }[];
}

export default function DashboardLayout({ children, links }: DashboardLayoutProps) {
  const location = useLocation();
  const { theme } = useApp();
  const isDark = theme === 'dark';

  const defaultLinks = [
    { name: 'Patient Dashboard', path: '/dashboard' },
    { name: 'Health Records', path: '/health-records' },
  ];

  const sidebarLinks = links || defaultLinks;

  return (
    <div style={{ display: 'flex', minHeight: 'calc(100vh - var(--nav-height))', background: isDark ? '#0b1120' : 'var(--color-bg-light)' }}>
      {/* Sidebar */}
      <aside style={{
        width: '250px',
        background: isDark ? '#0f172a' : 'white',
        borderRight: isDark ? '1px solid #334155' : '1px solid var(--color-gray-200)',
        padding: 'var(--space-4) 0'
      }} className="desktop-sidebar">
        <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
          {sidebarLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <li key={link.name}>
                <Link
                  to={link.path}
                  style={{
                    display: 'block',
                    padding: 'var(--space-3) var(--space-6)',
                    textDecoration: 'none',
                    color: isActive ? (isDark ? '#60a5fa' : 'var(--color-deep-blue)') : (isDark ? '#94a3b8' : 'var(--color-slate)'),
                    background: isActive ? (isDark ? '#1e293b' : 'var(--color-ice-blue)') : 'transparent',
                    fontWeight: isActive ? 600 : 500,
                    borderRight: isActive ? (isDark ? '3px solid #60a5fa' : '3px solid var(--color-deep-blue)') : '3px solid transparent'
                  }}
                >
                  {link.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </aside>

      {/* Main Content Area */}
      <div style={{ flex: 1, paddingBottom: 'var(--space-12)' }}>
        {children}
      </div>
    </div>
  );
}
