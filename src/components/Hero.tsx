/**
 * Hero.tsx — The main hero section with high-performance search and intelligent recommendations.
 */
import { useState, useRef, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { SearchIcon, LocationIcon, CloseIcon } from '../Icons';
import { getSearchRecommendations, type SearchRecommendation } from '../data/searchRecommendations';
import { useApp } from '../context/AppContext';

interface HeroProps {
  onSearch: (query: string, location: string) => void;
}

export default function Hero({ onSearch }: HeroProps) {
  const navigate = useNavigate();
  const { theme } = useApp();
  const isDark = theme === 'dark';

  const [query, setQuery] = useState('');
  const [location, setLocation] = useState('Chandigarh & Mohali');
  const [isFocused, setIsFocused] = useState(false);
  const [activeCategory, setActiveCategory] = useState<'All' | 'specialist' | 'hospital' | 'symptom' | 'lab_test'>('All');
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Recommendations based on live query
  const recommendations = useMemo(() => {
    const raw = getSearchRecommendations(query);
    if (activeCategory === 'All') return raw;
    return raw.filter(item => item.category === activeCategory);
  }, [query, activeCategory]);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (customQuery?: string) => {
    const q = customQuery !== undefined ? customQuery : query;
    setIsFocused(false);
    onSearch(q, location);
  };

  const handleSelectRecommendation = (rec: SearchRecommendation) => {
    setIsFocused(false);
    setQuery(rec.query);

    if (rec.targetUrl && rec.targetUrl !== '/doctors') {
      navigate(rec.targetUrl);
    } else {
      onSearch(rec.query, location);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev < recommendations.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev > 0 ? prev - 1 : recommendations.length - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (selectedIndex >= 0 && selectedIndex < recommendations.length) {
        handleSelectRecommendation(recommendations[selectedIndex]);
      } else {
        handleSearch();
      }
    } else if (e.key === 'Escape') {
      setIsFocused(false);
      setSelectedIndex(-1);
    }
  };

  const quickSearches = [
    { label: 'Cardiology', icon: '❤️' },
    { label: 'PGIMER Chandigarh', icon: '🏥' },
    { label: 'Fortis Mohali', icon: '🏥' },
    { label: 'Neurology', icon: '🧠' },
    { label: 'Pediatrics', icon: '👶' },
    { label: 'CBC Blood Test', icon: '🧪' },
    { label: 'Orthopedics', icon: '🦴' }
  ];

  return (
    <section className="hero" aria-labelledby="hero-heading" style={{ 
      padding: 'var(--space-8) 0 var(--space-4) 0',
      textAlign: 'center',
      background: 'transparent' 
    }}>
      <div className="container" style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 16px' }}>
        
        {/* Search Bar - Full Width Style with Action Button & Dropdown */}
        <div ref={containerRef} style={{ position: 'relative', maxWidth: '920px', margin: '0 auto var(--space-4) auto' }}>
          
          <div 
            className="hero-search-wide" 
            role="search" 
            style={{
              display: 'flex',
              width: '100%',
              border: isFocused ? '2px solid #2563eb' : isDark ? '2px solid #334155' : '2px solid #cbd5e1',
              borderRadius: '16px',
              backgroundColor: isDark ? '#1e293b' : 'var(--color-white)',
              boxShadow: isFocused ? '0 8px 30px rgba(37,99,235,0.18)' : '0 4px 20px rgba(0,0,0,0.06)',
              overflow: 'hidden',
              alignItems: 'center',
              transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)'
            }}
          >
            {/* Location Selector */}
            <div 
              className="hero-location-wrap"
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '0 16px',
                flex: '0 0 250px',
                borderRight: isDark ? '1px solid #334155' : '1px solid #e2e8f0',
                background: isDark ? '#0f172a' : '#f8fafc'
              }}
            >
              <LocationIcon size={18} color="#2563eb" />
              <select
                className="hero-location-select"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                style={{
                  border: 'none',
                  outline: 'none',
                  padding: '14px 8px',
                  width: '100%',
                  fontSize: '14px',
                  fontWeight: 600,
                  color: isDark ? '#f8fafc' : '#1e293b',
                  background: 'transparent',
                  cursor: 'pointer'
                }}
              >
                <option value="Chandigarh & Mohali">📍 All Tricity (Mohali & Chd)</option>
                <option value="Chandigarh">📍 Chandigarh</option>
                <option value="Mohali">📍 Mohali (SAS Nagar)</option>
              </select>
            </div>

            {/* Doctor / Specialty Search Input */}
            <div 
              className="hero-input-wrap"
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '0 16px',
                flex: '1',
                position: 'relative'
              }}
            >
              <SearchIcon size={18} color={isDark ? '#94a3b8' : '#64748b'} />
              <input
                ref={inputRef}
                className="hero-query-input"
                type="text"
                placeholder="Search doctors, specialties, hospitals, or symptoms (e.g. PGIMER, Fortis, Cardiology)..."
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSelectedIndex(-1);
                  setIsFocused(true);
                }}
                onFocus={() => setIsFocused(true)}
                onKeyDown={handleKeyDown}
                style={{
                  border: 'none',
                  outline: 'none',
                  padding: '16px 12px',
                  width: '100%',
                  fontSize: '15px',
                  color: isDark ? '#f8fafc' : '#0f172a',
                  background: 'transparent'
                }}
                autoComplete="off"
              />
              {query && (
                <button
                  type="button"
                  className="hero-query-clear"
                  onClick={() => {
                    setQuery('');
                    setSelectedIndex(-1);
                    inputRef.current?.focus();
                  }}
                  style={{
                    background: isDark ? '#334155' : '#f1f5f9',
                    border: 'none',
                    borderRadius: '50%',
                    width: '24px',
                    height: '24px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    color: isDark ? '#cbd5e1' : '#64748b',
                    marginRight: '8px'
                  }}
                  title="Clear (Esc)"
                >
                  <CloseIcon size={12} />
                </button>
              )}
            </div>

            {/* Search CTA Button */}
            <button
              type="button"
              className="hero-search-submit-btn"
              onClick={() => handleSearch()}
              style={{
                background: '#1e3a8a',
                color: 'white',
                border: 'none',
                padding: '16px 30px',
                fontSize: '14px',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'background 0.15s'
              }}
              onMouseOver={(e) => e.currentTarget.style.background = '#1e40af'}
              onMouseOut={(e) => e.currentTarget.style.background = '#1e3a8a'}
            >
              <span>Search</span>
              <span>→</span>
            </button>
          </div>

          {/* ========================================================================= */}
          {/* SEARCH RECOMMENDATIONS DROPDOWN PANEL                                     */}
          {/* ========================================================================= */}
          {isFocused && (
            <div
              style={{
                position: 'absolute',
                top: 'calc(100% + 8px)',
                left: 0,
                right: 0,
                background: isDark ? '#1e293b' : 'white',
                borderRadius: '18px',
                border: isDark ? '1px solid #334155' : '1px solid #e2e8f0',
                boxShadow: '0 20px 45px rgba(0,0,0,0.18)',
                zIndex: 1000,
                overflow: 'hidden',
                textAlign: 'left',
                animation: 'fadeIn 0.18s ease-out'
              }}
            >
              {/* Filter Pills Bar inside recommendations */}
              <div style={{
                padding: '12px 16px',
                background: isDark ? '#0f172a' : '#f8fafc',
                borderBottom: isDark ? '1px solid #334155' : '1px solid #e2e8f0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '8px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ fontSize: '13px', fontWeight: 700, color: isDark ? '#94a3b8' : '#475569' }}>
                    {query ? '💡 Suggested Matches:' : '🔥 Recommended Searches in Tricity:'}
                  </span>
                </div>

                {/* Subcategory Filter Buttons */}
                <div style={{ display: 'flex', gap: '6px', overflowX: 'auto' }}>
                  {[
                    { id: 'All', label: 'All' },
                    { id: 'specialist', label: '👨‍⚕️ Doctors' },
                    { id: 'hospital', label: '🏥 Hospitals' },
                    { id: 'symptom', label: '🩺 Symptoms' },
                    { id: 'lab_test', label: '🧪 Tests' }
                  ].map(tab => (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setActiveCategory(tab.id as any)}
                      style={{
                        padding: '4px 10px',
                        borderRadius: '12px',
                        fontSize: '11px',
                        fontWeight: 700,
                        border: 'none',
                        cursor: 'pointer',
                        background: activeCategory === tab.id ? '#2563eb' : isDark ? '#334155' : '#e2e8f0',
                        color: activeCategory === tab.id ? 'white' : isDark ? '#cbd5e1' : '#475569',
                        transition: 'all 0.15s'
                      }}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Recommendations Items List */}
              <div style={{ maxHeight: '360px', overflowY: 'auto', padding: '6px' }}>
                {recommendations.length > 0 ? (
                  recommendations.map((rec, idx) => {
                    const isSelected = selectedIndex === idx;
                    return (
                      <div
                        key={rec.id}
                        onClick={() => handleSelectRecommendation(rec)}
                        onMouseEnter={() => setSelectedIndex(idx)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '10px 14px',
                          borderRadius: '12px',
                          cursor: 'pointer',
                          background: isSelected ? (isDark ? '#334155' : '#eff6ff') : 'transparent',
                          transition: 'background 0.1s'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1, minWidth: 0 }}>
                          <span style={{
                            width: '36px',
                            height: '36px',
                            borderRadius: '10px',
                            background: isDark ? '#0f172a' : '#f1f5f9',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '18px',
                            flexShrink: 0
                          }}>
                            {rec.icon}
                          </span>
                          <div style={{ overflow: 'hidden' }}>
                            <div style={{
                              fontSize: '14px',
                              fontWeight: 700,
                              color: isDark ? '#f8fafc' : '#0f172a',
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis'
                            }}>
                              {rec.title}
                            </div>
                            <div style={{
                              fontSize: '12px',
                              color: isDark ? '#94a3b8' : '#64748b',
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis'
                            }}>
                              {rec.subtitle}
                            </div>
                          </div>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginLeft: '12px' }}>
                          <span style={{
                            fontSize: '10px',
                            fontWeight: 700,
                            padding: '3px 8px',
                            borderRadius: '6px',
                            textTransform: 'uppercase',
                            letterSpacing: '0.4px',
                            background: rec.category === 'hospital' ? '#fee2e2' : rec.category === 'symptom' ? '#fef3c7' : rec.category === 'lab_test' ? '#e0f2fe' : '#dcfce7',
                            color: rec.category === 'hospital' ? '#b91c1c' : rec.category === 'symptom' ? '#b45309' : rec.category === 'lab_test' ? '#0369a1' : '#15803d'
                          }}>
                            {rec.badge}
                          </span>
                          <span style={{ color: isDark ? '#64748b' : '#94a3b8', fontSize: '13px' }}>
                            ↵
                          </span>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div style={{ padding: '24px 16px', textAlign: 'center', color: '#64748b' }}>
                    <p style={{ margin: '0 0 6px', fontSize: '14px', fontWeight: 600 }}>No exact matches found</p>
                    <p style={{ margin: 0, fontSize: '12px' }}>Press <strong>Enter</strong> or click Search to perform a deep search across all specialists and clinics.</p>
                  </div>
                )}
              </div>

              {/* Bottom Footer Hint */}
              <div style={{
                padding: '8px 16px',
                background: isDark ? '#0f172a' : '#f8fafc',
                borderTop: isDark ? '1px solid #334155' : '1px solid #e2e8f0',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                fontSize: '11px',
                color: isDark ? '#94a3b8' : '#64748b'
              }}>
                <div>
                  Use <strong>↑</strong> <strong>↓</strong> keys to navigate, <strong>Enter</strong> to select, <strong>Esc</strong> to dismiss
                </div>
                <div>
                  ⚡ Powered by <strong>AarogyaLocker Smart Healthcare Index</strong>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Quick Suggestion Chips */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: 'var(--space-8)' }}>
          <span className="hero-popular-label" style={{ fontSize: '13px', color: '#64748b', fontWeight: 600 }}>Recommended:</span>
          {quickSearches.map((item) => (
            <button
              key={item.label}
              type="button"
              className="hero-quick-chip"
              onClick={() => {
                setQuery(item.label);
                handleSearch(item.label);
              }}
              style={{
                background: isDark ? '#1e293b' : '#f1f5f9',
                border: isDark ? '1px solid #334155' : '1px solid #e2e8f0',
                borderRadius: '16px',
                padding: '5px 14px',
                fontSize: '12px',
                fontWeight: 600,
                color: isDark ? '#cbd5e1' : '#334155',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'all 0.15s'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = isDark ? '#334155' : '#e2e8f0';
                e.currentTarget.style.borderColor = isDark ? '#475569' : '#cbd5e1';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = isDark ? '#1e293b' : '#f1f5f9';
                e.currentTarget.style.borderColor = isDark ? '#334155' : '#e2e8f0';
              }}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </div>

        {/* Content */}
        <div style={{ marginBottom: 'var(--space-6)' }}>
          <h1 id="hero-heading" style={{ fontSize: '36px', fontWeight: 800, color: 'var(--color-dark)', marginBottom: 'var(--space-2)', letterSpacing: '-0.5px' }}>
            Your Health, <span style={{ color: 'var(--color-deep-blue)' }}>Our Priority.</span>
          </h1>
          <p style={{ fontSize: '17px', color: 'var(--color-slate)', maxWidth: '640px', margin: '0 auto' }}>
            Find trusted healthcare professionals, book verified OPD appointments, and manage records across Mohali & Chandigarh.
          </p>
        </div>

      </div>
    </section>
  );
}
