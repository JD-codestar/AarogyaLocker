import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import type { LabTestPackage } from '../types';
import { SearchIcon, CloseIcon } from '../Icons';

export default function LabTests() {
  const navigate = useNavigate();
  const { currentUser, labPackages, createLabBooking, theme } = useApp();
  const isDark = theme === 'dark';

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  
  // Selected tests for home booking
  const [selectedTests, setSelectedTests] = useState<LabTestPackage[]>([]);
  const [viewingPackage, setViewingPackage] = useState<LabTestPackage | null>(null);

  // Booking Modal State
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [collectionDate, setCollectionDate] = useState('Tomorrow');
  const [timeSlot, setTimeSlot] = useState('07:00 AM - 09:00 AM (Recommended for Fasting)');
  const [fastingConfirmed, setFastingConfirmed] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState<'UPI' | 'Card' | 'CashAtCollection' | 'ABHA'>('UPI');
  const [patientDetails, setPatientDetails] = useState({
    name: currentUser?.name || 'Rahul Sharma',
    phone: currentUser?.phone || '+91 98765 43210',
    address: 'House #402, Sector 35-C, Chandigarh - 160022',
    age: currentUser?.age || 32,
    gender: currentUser?.gender || 'Male'
  });

  const [confirmedBookingId, setConfirmedBookingId] = useState<string | null>(null);

  const categories = [
    'All',
    'Health Package',
    'Blood Test',
    'Heart Health',
    'Diabetes',
    'Thyroid',
    'Kidney & Liver'
  ];

  // Filtering
  const filteredPackages = useMemo(() => {
    return labPackages.filter(pkg => {
      const matchesCategory = selectedCategory === 'All' || pkg.category === selectedCategory;
      const matchesSearch = !searchQuery.trim() ||
        pkg.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pkg.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pkg.parameters.some(p => p.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [labPackages, selectedCategory, searchQuery]);

  const toggleTestSelection = (pkg: LabTestPackage) => {
    if (selectedTests.some(t => t.id === pkg.id)) {
      setSelectedTests(selectedTests.filter(t => t.id !== pkg.id));
    } else {
      setSelectedTests([...selectedTests, pkg]);
    }
  };

  const totalAmount = useMemo(() => {
    return selectedTests.reduce((sum, t) => sum + t.price, 0);
  }, [selectedTests]);

  const handleConfirmBooking = () => {
    if (selectedTests.length === 0) return;

    const patientId = currentUser?.id || 'pat-101';
    const patientName = patientDetails.name;

    const booking = createLabBooking({
      patientId,
      patientName,
      tests: selectedTests,
      collectionDate,
      timeSlot,
      address: patientDetails.address,
      phone: patientDetails.phone,
      totalAmount,
      paymentMethod: paymentMethod === 'CashAtCollection' ? 'Pay Cash/UPI at Sample Collection' : paymentMethod === 'ABHA' ? 'ABHA PM-JAY Cashless Voucher' : paymentMethod === 'UPI' ? 'BHIM UPI' : 'Credit/Debit Card'
    });

    setConfirmedBookingId(booking.id);
  };

  return (
    <div style={{ background: isDark ? '#0b1120' : '#f8fafc', minHeight: '90vh', paddingBottom: '60px', color: isDark ? '#f8fafc' : 'inherit' }}>
      
      {/* Top Banner */}
      <div style={{
        background: isDark 
          ? 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)' 
          : 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%)',
        color: 'white',
        padding: '36px 20px',
        borderBottom: isDark ? '1px solid #334155' : '1px solid rgba(255,255,255,0.1)'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.15)', padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 600, marginBottom: '8px', border: isDark ? '1px solid #334155' : 'none' }}>
                <span>🔬 NABL & CAP Accredited Partner Labs</span>
                <span>•</span>
                <span>🏠 Free Home Sample Collection</span>
              </div>
              <h1 style={{ fontSize: '32px', fontWeight: 800, margin: '4px 0', letterSpacing: '-0.5px' }}>
                Diagnostics & Home Lab Tests
              </h1>
              <p style={{ color: isDark ? '#94a3b8' : '#bfdbfe', fontSize: '15px', margin: 0, maxWidth: '640px' }}>
                Book hygienic home sample collection. Digital reports are automatically analyzed, verified by registered pathologists, and preserved in your AarogyaLocker.
              </p>
            </div>

            {/* Selected Tests Header CTA */}
            {selectedTests.length > 0 && (
              <button
                onClick={() => setIsBookingOpen(true)}
                style={{
                  background: '#047857',
                  color: 'white',
                  border: 'none',
                  padding: '12px 24px',
                  borderRadius: '12px',
                  fontWeight: 700,
                  fontSize: '15px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  boxShadow: '0 8px 20px rgba(4,120,87,0.4)',
                  animation: 'pulse 1.5s infinite'
                }}
              >
                <span>Book {selectedTests.length} Test{selectedTests.length > 1 ? 's' : ''} (₹{totalAmount}) →</span>
              </button>
            )}
          </div>

          {/* Search Bar */}
          <div style={{ marginTop: '28px', maxWidth: '720px', position: 'relative' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              background: isDark ? '#1e293b' : 'white',
              border: isDark ? '1px solid #334155' : 'none',
              borderRadius: '12px',
              padding: '6px 16px',
              boxShadow: isDark ? '0 8px 24px rgba(0,0,0,0.4)' : '0 8px 24px rgba(0,0,0,0.12)'
            }}>
              <div style={{ color: isDark ? '#60a5fa' : '#2563eb', marginRight: '12px' }}>
                <SearchIcon size={22} />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                onKeyDown={e => { if (e.key === 'Escape') setSearchQuery(''); }}
                placeholder="Search test name (e.g. CBC, HbA1c, Thyroid, Lipid, Liver)..."
                style={{
                  width: '100%',
                  border: 'none',
                  outline: 'none',
                  fontSize: '15px',
                  color: isDark ? '#f8fafc' : '#1e293b',
                  background: 'transparent'
                }}
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  title="Clear search (Esc)"
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
                    color: isDark ? '#cbd5e1' : '#64748b'
                  }}
                >
                  <CloseIcon size={14} />
                </button>
              )}
            </div>

            {/* Quick Test Chips */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginTop: '10px' }}>
              <span style={{ fontSize: '12px', color: isDark ? '#94a3b8' : '#bfdbfe', fontWeight: 600 }}>Popular:</span>
              {['Full Body', 'CBC', 'HbA1c', 'Thyroid', 'Lipid', 'Liver', 'Vitamin D'].map(chip => (
                <button
                  key={chip}
                  type="button"
                  onClick={() => setSearchQuery(chip)}
                  style={{
                    background: searchQuery === chip ? '#2563eb' : (isDark ? '#0f172a' : 'rgba(255,255,255,0.18)'),
                    border: isDark ? (searchQuery === chip ? '1px solid #3b82f6' : '1px solid #334155') : '1px solid rgba(255,255,255,0.3)',
                    color: searchQuery === chip ? 'white' : (isDark ? '#cbd5e1' : 'white'),
                    borderRadius: '14px',
                    padding: '3px 10px',
                    fontSize: '11px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                >
                  {chip}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div style={{ maxWidth: '1200px', margin: '24px auto', padding: '0 16px' }}>

        {/* Categories */}
        <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '8px', marginBottom: '16px' }}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              style={{
                padding: '8px 16px',
                borderRadius: '24px',
                fontSize: '13px',
                fontWeight: 600,
                border: '1px solid',
                borderColor: selectedCategory === cat ? '#2563eb' : (isDark ? '#334155' : '#cbd5e1'),
                background: selectedCategory === cat ? '#2563eb' : (isDark ? '#1e293b' : 'white'),
                color: selectedCategory === cat ? 'white' : (isDark ? '#cbd5e1' : '#475569'),
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.15s ease'
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Results Counter Bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', padding: '0 4px' }}>
          <span style={{ fontSize: '14px', fontWeight: 700, color: isDark ? '#cbd5e1' : '#334155' }}>
            Showing {filteredPackages.length} of {labPackages.length} test packages
            {searchQuery && <span style={{ color: isDark ? '#60a5fa' : '#1e40af', fontWeight: 500 }}> matching "{searchQuery}"</span>}
          </span>
          {(searchQuery || selectedCategory !== 'All') && (
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
              style={{ background: 'none', border: 'none', color: isDark ? '#f87171' : '#dc2626', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}
            >
              Reset Filters
            </button>
          )}
        </div>

        {/* Empty State */}
        {filteredPackages.length === 0 && (
          <div style={{
            background: isDark ? '#1e293b' : 'white',
            borderRadius: '16px',
            border: isDark ? '1px solid #334155' : '1px solid #e2e8f0',
            padding: '50px 20px',
            textAlign: 'center',
            boxShadow: isDark ? '0 4px 12px rgba(0,0,0,0.3)' : '0 4px 12px rgba(0,0,0,0.03)'
          }}>
            <div style={{ color: isDark ? '#64748b' : '#94a3b8', display: 'flex', justifyContent: 'center', marginBottom: '12px' }}>
              <SearchIcon size={48} />
            </div>
            <h3 style={{ fontSize: '18px', fontWeight: 700, color: isDark ? '#f8fafc' : '#0f172a', margin: '0 0 6px' }}>
              No diagnostic tests found
            </h3>
            <p style={{ color: isDark ? '#94a3b8' : '#64748b', fontSize: '14px', maxWidth: '400px', margin: '0 auto 16px' }}>
              We couldn't find any lab tests matching "{searchQuery}".
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
              className="btn btn-primary"
              style={{ padding: '8px 20px', fontSize: '13px', fontWeight: 700, borderRadius: '10px' }}
            >
              Show All Diagnostic Tests
            </button>
          </div>
        )}

        {/* Packages Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
          gap: '24px'
        }}>
          {filteredPackages.map(pkg => {
            const isSelected = selectedTests.some(t => t.id === pkg.id);
            const discountPct = Math.round(((pkg.mrp - pkg.price) / pkg.mrp) * 100);

            return (
              <div
                key={pkg.id}
                style={{
                  background: isDark ? '#1e293b' : 'white',
                  borderRadius: '16px',
                  border: isSelected ? '2px solid #059669' : (isDark ? '1px solid #334155' : '1px solid #e2e8f0'),
                  padding: '24px',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                  boxShadow: isSelected 
                    ? (isDark ? '0 8px 24px rgba(5,150,105,0.25)' : '0 8px 24px rgba(4,120,87,0.15)') 
                    : (isDark ? '0 4px 16px rgba(0,0,0,0.2)' : '0 2px 8px rgba(0,0,0,0.03)')
                }}
              >
                {/* Popular Badge */}
                {pkg.popular && (
                  <div style={{
                    position: 'absolute',
                    top: '-10px',
                    right: '20px',
                    background: '#f59e0b',
                    color: 'white',
                    padding: '2px 10px',
                    borderRadius: '12px',
                    fontSize: '11px',
                    fontWeight: 700,
                    letterSpacing: '0.5px'
                  }}>
                    MOST POPULAR
                  </div>
                )}

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span style={{
                    fontSize: '11px',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    color: isDark ? '#93c5fd' : '#2563eb',
                    background: isDark ? 'rgba(37, 99, 235, 0.2)' : '#eff6ff',
                    padding: '3px 8px',
                    borderRadius: '6px'
                  }}>
                    {pkg.category}
                  </span>
                  <span style={{ fontSize: '12px', color: isDark ? '#94a3b8' : '#64748b', fontWeight: 600 }}>
                    ⏱️ {pkg.reportTime}
                  </span>
                </div>

                <h3 style={{ fontSize: '18px', fontWeight: 800, color: isDark ? '#f8fafc' : '#0f172a', margin: '4px 0 8px', lineHeight: 1.3 }}>
                  {pkg.name}
                </h3>

                <p style={{ fontSize: '13px', color: isDark ? '#94a3b8' : '#64748b', margin: '0 0 16px', lineHeight: 1.4 }}>
                  {pkg.description}
                </p>

                {/* Key Attributes */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '16px', fontSize: '12px' }}>
                  <span style={{ background: isDark ? '#0f172a' : '#f1f5f9', padding: '4px 8px', borderRadius: '6px', color: isDark ? '#cbd5e1' : '#334155', border: isDark ? '1px solid #334155' : 'none' }}>
                    🧪 {pkg.testCount} Parameters
                  </span>
                  <span style={{ background: isDark ? '#0f172a' : '#f1f5f9', padding: '4px 8px', borderRadius: '6px', color: isDark ? '#cbd5e1' : '#334155', border: isDark ? '1px solid #334155' : 'none' }}>
                    🩸 {pkg.sampleType}
                  </span>
                  {pkg.fastingRequired ? (
                    <span style={{ background: isDark ? 'rgba(239, 68, 68, 0.2)' : '#fee2e2', padding: '4px 8px', borderRadius: '6px', color: isDark ? '#fca5a5' : '#b91c1c', fontWeight: 600, border: isDark ? '1px solid rgba(239, 68, 68, 0.3)' : 'none' }}>
                      ⚠️ Fasting {pkg.fastingHours} hrs
                    </span>
                  ) : (
                    <span style={{ background: isDark ? 'rgba(16, 185, 129, 0.2)' : '#dcfce7', padding: '4px 8px', borderRadius: '6px', color: isDark ? '#86efac' : '#15803d', fontWeight: 600, border: isDark ? '1px solid rgba(16, 185, 129, 0.3)' : 'none' }}>
                      ✓ No Fasting Needed
                    </span>
                  )}
                </div>

                {/* Included Parameters Preview */}
                <div style={{
                  background: isDark ? '#0f172a' : '#f8fafc',
                  padding: '12px',
                  borderRadius: '10px',
                  border: isDark ? '1px solid #334155' : '1px solid #f1f5f9',
                  marginBottom: '20px'
                }}>
                  <div style={{ fontSize: '12px', fontWeight: 700, color: isDark ? '#cbd5e1' : '#475569', marginBottom: '6px' }}>
                    Tests Included ({pkg.parameters.length} key groups):
                  </div>
                  <ul style={{ margin: 0, paddingLeft: '18px', fontSize: '12px', color: isDark ? '#94a3b8' : '#64748b', lineHeight: 1.5 }}>
                    {pkg.parameters.slice(0, 3).map((param, idx) => (
                      <li key={idx}>{param}</li>
                    ))}
                    {pkg.parameters.length > 3 && (
                      <li style={{ color: isDark ? '#60a5fa' : '#2563eb', fontWeight: 600, cursor: 'pointer' }} onClick={() => setViewingPackage(pkg)}>
                        + {pkg.parameters.length - 3} more tests (click to view)
                      </li>
                    )}
                  </ul>
                </div>

                {/* Price & Action footer */}
                <div style={{ marginTop: 'auto', borderTop: isDark ? '1px solid #334155' : '1px solid #f1f5f9', paddingTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                      <span style={{ fontSize: '22px', fontWeight: 800, color: isDark ? '#f8fafc' : '#0f172a' }}>
                        ₹{pkg.price}
                      </span>
                      <span style={{ fontSize: '14px', color: isDark ? '#64748b' : '#94a3b8', textDecoration: 'line-through' }}>
                        ₹{pkg.mrp}
                      </span>
                    </div>
                    <span style={{ fontSize: '11px', color: isDark ? '#4ade80' : '#16a34a', fontWeight: 700 }}>
                      Save ₹{pkg.mrp - pkg.price} ({discountPct}% OFF)
                    </span>
                  </div>

                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      onClick={() => setViewingPackage(pkg)}
                      style={{
                        padding: '8px 12px',
                        background: isDark ? '#334155' : '#f1f5f9',
                        color: isDark ? '#f8fafc' : '#475569',
                        border: 'none',
                        borderRadius: '8px',
                        fontSize: '12px',
                        fontWeight: 600,
                        cursor: 'pointer'
                      }}
                    >
                      Details
                    </button>
                    
                    <button
                      onClick={() => toggleTestSelection(pkg)}
                      style={{
                        padding: '10px 18px',
                        background: isSelected ? (isDark ? '#059669' : '#15803d') : (isDark ? '#2563eb' : '#1e40af'),
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        fontSize: '13px',
                        fontWeight: 700,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}
                    >
                      {isSelected ? '✓ Added' : '+ Add Test'}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Booking Drawer / Modal */}
      {isBookingOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.6)',
          zIndex: 1100,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '16px'
        }}>
          <div style={{
            background: isDark ? '#1e293b' : 'white',
            width: '100%',
            maxWidth: '620px',
            borderRadius: '24px',
            boxShadow: isDark ? '0 25px 50px -12px rgba(0, 0, 0, 0.7)' : '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            maxHeight: '90vh',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            border: isDark ? '1px solid #334155' : 'none'
          }}>
            {/* Header */}
            <div style={{
              padding: '20px 24px',
              borderBottom: isDark ? '1px solid #334155' : '1px solid #e2e8f0',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              background: isDark ? '#0f172a' : '#f8fafc'
            }}>
              <div>
                <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 800, color: isDark ? '#f8fafc' : '#0f172a' }}>
                  Book Home Sample Collection
                </h3>
                <p style={{ margin: '2px 0 0', fontSize: '12px', color: isDark ? '#94a3b8' : '#64748b' }}>
                  Trained ABDM Certified Phlebotomist will visit your doorstep
                </p>
              </div>
              <button
                onClick={() => setIsBookingOpen(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: isDark ? '#94a3b8' : '#64748b' }}
              >
                <CloseIcon size={20} />
              </button>
            </div>

            {/* Modal Content */}
            <div style={{ padding: '24px', overflowY: 'auto', flex: 1, display: 'flex', flexDirection: 'column', gap: '20px' }}>
              
              {/* Selected Tests Summary */}
              <div style={{ background: isDark ? '#0f172a' : '#f8fafc', padding: '14px 16px', borderRadius: '12px', border: isDark ? '1px solid #334155' : '1px solid #e2e8f0' }}>
                <div style={{ fontSize: '13px', fontWeight: 700, color: isDark ? '#cbd5e1' : '#334155', marginBottom: '8px' }}>
                  Selected Tests ({selectedTests.length}):
                </div>
                {selectedTests.map(t => (
                  <div key={t.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '4px' }}>
                    <span style={{ color: isDark ? '#f8fafc' : '#0f172a', fontWeight: 600 }}>• {t.name}</span>
                    <span style={{ color: isDark ? '#34d399' : '#047857', fontWeight: 700 }}>₹{t.price}</span>
                  </div>
                ))}
                <div style={{ borderTop: isDark ? '1px solid #334155' : '1px solid #e2e8f0', paddingTop: '8px', marginTop: '8px', display: 'flex', justifyContent: 'space-between', fontSize: '14px', fontWeight: 800 }}>
                  <span style={{ color: isDark ? '#cbd5e1' : '#0f172a' }}>Total Amount Payable:</span>
                  <span style={{ color: isDark ? '#60a5fa' : '#1e40af' }}>₹{totalAmount}</span>
                </div>
              </div>

              {/* Date & Slot Selection */}
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: isDark ? '#cbd5e1' : '#1e293b', marginBottom: '8px' }}>
                  1. Choose Sample Collection Date
                </label>
                <div style={{ display: 'flex', gap: '10px' }}>
                  {['Today', 'Tomorrow', 'In 2 Days'].map(d => (
                    <button
                      key={d}
                      onClick={() => setCollectionDate(d)}
                      style={{
                        flex: 1,
                        padding: '10px',
                        borderRadius: '10px',
                        border: collectionDate === d 
                          ? (isDark ? '2px solid #3b82f6' : '2px solid #1e40af') 
                          : (isDark ? '1px solid #334155' : '1px solid #cbd5e1'),
                        background: collectionDate === d 
                          ? (isDark ? 'rgba(37, 99, 235, 0.25)' : '#eff6ff') 
                          : (isDark ? '#0f172a' : 'white'),
                        color: collectionDate === d 
                          ? (isDark ? '#93c5fd' : '#1e40af') 
                          : (isDark ? '#cbd5e1' : '#475569'),
                        fontWeight: 700,
                        fontSize: '13px',
                        cursor: 'pointer'
                      }}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: isDark ? '#cbd5e1' : '#1e293b', marginBottom: '8px' }}>
                  2. Choose Preferred Morning Time Slot
                </label>
                <select
                  value={timeSlot}
                  onChange={e => setTimeSlot(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '10px',
                    border: isDark ? '1px solid #334155' : '1px solid #cbd5e1',
                    fontSize: '14px',
                    background: isDark ? '#0f172a' : 'white',
                    color: isDark ? '#f8fafc' : '#0f172a'
                  }}
                >
                  <option value="06:30 AM - 08:30 AM (Early Fasting)">06:30 AM - 08:30 AM (Early Fasting)</option>
                  <option value="08:30 AM - 10:30 AM (Standard Fasting)">08:30 AM - 10:30 AM (Standard Fasting)</option>
                  <option value="10:30 AM - 12:30 PM (Midday Slot)">10:30 AM - 12:30 PM (Midday Slot)</option>
                  <option value="04:00 PM - 06:00 PM (Evening Non-Fasting)">04:00 PM - 06:00 PM (Evening Non-Fasting)</option>
                </select>
              </div>

              {/* Patient and Address Info */}
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: isDark ? '#cbd5e1' : '#1e293b', marginBottom: '8px' }}>
                  3. Patient & Address Details
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '10px', marginBottom: '10px' }}>
                  <input
                    type="text"
                    placeholder="Patient Name"
                    value={patientDetails.name}
                    onChange={e => setPatientDetails({ ...patientDetails, name: e.target.value })}
                    style={{ padding: '10px 12px', borderRadius: '8px', border: isDark ? '1px solid #334155' : '1px solid #cbd5e1', background: isDark ? '#0f172a' : 'white', color: isDark ? '#f8fafc' : '#0f172a', fontSize: '13px' }}
                  />
                  <input
                    type="text"
                    placeholder="Phone"
                    value={patientDetails.phone}
                    onChange={e => setPatientDetails({ ...patientDetails, phone: e.target.value })}
                    style={{ padding: '10px 12px', borderRadius: '8px', border: isDark ? '1px solid #334155' : '1px solid #cbd5e1', background: isDark ? '#0f172a' : 'white', color: isDark ? '#f8fafc' : '#0f172a', fontSize: '13px' }}
                  />
                </div>
                <textarea
                  placeholder="Collection Street Address & Landmark"
                  value={patientDetails.address}
                  onChange={e => setPatientDetails({ ...patientDetails, address: e.target.value })}
                  rows={2}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: isDark ? '1px solid #334155' : '1px solid #cbd5e1', background: isDark ? '#0f172a' : 'white', color: isDark ? '#f8fafc' : '#0f172a', fontSize: '13px', resize: 'vertical' }}
                />
              </div>

              {/* Payment Method */}
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: isDark ? '#cbd5e1' : '#1e293b', marginBottom: '8px' }}>
                  4. Payment Mode
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  {[
                    { id: 'UPI', label: '📱 BHIM UPI / QR' },
                    { id: 'Card', label: '💳 Cards / NetBanking' },
                    { id: 'ABHA', label: '🛡️ ABHA PM-JAY Cashless' },
                    { id: 'CashAtCollection', label: '💵 Pay at Sample Pickup' }
                  ].map(m => (
                    <button
                      key={m.id}
                      onClick={() => setPaymentMethod(m.id as any)}
                      style={{
                        padding: '10px',
                        borderRadius: '8px',
                        border: paymentMethod === m.id 
                          ? (isDark ? '2px solid #3b82f6' : '2px solid #1e40af') 
                          : (isDark ? '1px solid #334155' : '1px solid #cbd5e1'),
                        background: paymentMethod === m.id 
                          ? (isDark ? 'rgba(37, 99, 235, 0.25)' : '#eff6ff') 
                          : (isDark ? '#0f172a' : 'white'),
                        color: paymentMethod === m.id 
                          ? (isDark ? '#93c5fd' : '#1e40af') 
                          : (isDark ? '#cbd5e1' : '#0f172a'),
                        fontWeight: 600,
                        fontSize: '12px',
                        cursor: 'pointer',
                        textAlign: 'left'
                      }}
                    >
                      {m.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Fasting Notice */}
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: isDark ? '#cbd5e1' : '#475569', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={fastingConfirmed}
                  onChange={e => setFastingConfirmed(e.target.checked)}
                  style={{ accentColor: '#2563eb', width: '16px', height: '16px' }}
                />
                I understand that for fasting blood tests (e.g., Lipid, Sugar), no food should be consumed for 10-12 hours prior to collection (water is permitted).
              </label>

              {/* Notice */}
              <div style={{ background: isDark ? 'rgba(16, 185, 129, 0.15)' : '#f0fdf4', padding: '12px', borderRadius: '10px', border: isDark ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid #bbf7d0', fontSize: '12px', color: isDark ? '#86efac' : '#166534' }}>
                🔒 Official NABL Lab Report will be verified and deposited directly in your <strong>AarogyaLocker</strong>.
              </div>

              {/* Submit CTA */}
              <button
                onClick={handleConfirmBooking}
                disabled={!fastingConfirmed}
                style={{
                  padding: '14px',
                  background: fastingConfirmed ? (isDark ? '#2563eb' : '#1e40af') : (isDark ? '#475569' : '#94a3b8'),
                  color: 'white',
                  border: 'none',
                  borderRadius: '12px',
                  fontSize: '15px',
                  fontWeight: 700,
                  cursor: fastingConfirmed ? 'pointer' : 'not-allowed',
                  boxShadow: fastingConfirmed ? '0 4px 14px rgba(30,64,175,0.4)' : 'none'
                }}
              >
                Confirm Home Lab Test Booking (₹{totalAmount}) →
              </button>

            </div>
          </div>
        </div>
      )}

      {/* Confirmed Booking Modal */}
      {confirmedBookingId && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.75)',
          zIndex: 1200,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '16px'
        }}>
          <div style={{
            background: isDark ? '#1e293b' : 'white',
            width: '100%',
            maxWidth: '520px',
            borderRadius: '24px',
            padding: '32px 24px',
            textAlign: 'center',
            boxShadow: isDark ? '0 25px 50px -12px rgba(0, 0, 0, 0.7)' : '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            border: isDark ? '1px solid #334155' : 'none'
          }}>
            <div style={{
              width: '72px',
              height: '72px',
              borderRadius: '50%',
              background: isDark ? 'rgba(37, 99, 235, 0.2)' : '#dbeafe',
              color: isDark ? '#60a5fa' : '#1d4ed8',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '36px',
              margin: '0 auto 16px'
            }}>
              🔬
            </div>

            <h2 style={{ fontSize: '24px', fontWeight: 800, color: isDark ? '#f8fafc' : '#0f172a', margin: '0 0 8px' }}>
              Lab Slot Booked Successfully!
            </h2>
            <p style={{ fontSize: '14px', color: isDark ? '#94a3b8' : '#64748b', margin: '0 0 16px' }}>
              Booking Reference: <strong style={{ color: isDark ? '#60a5fa' : '#1e40af' }}>#{confirmedBookingId}</strong>
            </p>

            <div style={{
              background: isDark ? '#0f172a' : '#f8fafc',
              border: isDark ? '1px solid #334155' : '1px solid #e2e8f0',
              borderRadius: '14px',
              padding: '14px',
              textAlign: 'left',
              fontSize: '13px',
              color: isDark ? '#cbd5e1' : '#334155',
              marginBottom: '20px'
            }}>
              <div style={{ marginBottom: '6px' }}><strong>📅 Date:</strong> {collectionDate} ({timeSlot})</div>
              <div style={{ marginBottom: '6px' }}><strong>📍 Location:</strong> {patientDetails.address}</div>
              <div><strong>👨‍⚕️ Assigned Phlebotomist:</strong> Suresh Verma (Certified ABDM)</div>
            </div>

            {/* AarogyaLocker integration alert */}
            <div style={{
              background: isDark ? 'rgba(16, 185, 129, 0.15)' : '#f0fdf4',
              border: isDark ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid #bbf7d0',
              borderRadius: '16px',
              padding: '16px',
              textAlign: 'left',
              marginBottom: '24px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: isDark ? '#86efac' : '#166534', fontWeight: 700, fontSize: '14px', marginBottom: '4px' }}>
                <span>🔐</span>
                <span>Verified Diagnostic Report Deposited in AarogyaLocker!</span>
              </div>
              <p style={{ margin: 0, fontSize: '13px', color: isDark ? '#86efac' : '#15803d', lineHeight: 1.5 }}>
                Your official NABL pathology lab report has been authenticated and linked to your <strong>ABHA Universal Health ID</strong> with complete diagnostic parameters.
              </p>
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                onClick={() => {
                  setConfirmedBookingId(null);
                  setIsBookingOpen(false);
                  setSelectedTests([]);
                }}
                style={{
                  flex: 1,
                  padding: '12px',
                  background: isDark ? '#334155' : '#f1f5f9',
                  color: isDark ? '#cbd5e1' : '#475569',
                  border: 'none',
                  borderRadius: '10px',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                Close
              </button>
              <button
                onClick={() => {
                  setConfirmedBookingId(null);
                  setIsBookingOpen(false);
                  setSelectedTests([]);
                  navigate('/health-records');
                }}
                style={{
                  flex: 1.5,
                  padding: '12px',
                  background: isDark ? '#2563eb' : '#1e40af',
                  color: 'white',
                  border: 'none',
                  borderRadius: '10px',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                View Report in AarogyaLocker →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Package Parameters Detail Modal */}
      {viewingPackage && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.6)',
          zIndex: 1100,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '16px'
        }}>
          <div style={{
            background: isDark ? '#1e293b' : 'white',
            width: '100%',
            maxWidth: '560px',
            borderRadius: '20px',
            padding: '24px',
            boxShadow: isDark ? '0 20px 40px rgba(0,0,0,0.6)' : '0 20px 40px rgba(0,0,0,0.2)',
            maxHeight: '85vh',
            display: 'flex',
            flexDirection: 'column',
            border: isDark ? '1px solid #334155' : 'none'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
              <div>
                <span style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: isDark ? '#93c5fd' : '#1e40af', background: isDark ? 'rgba(37, 99, 235, 0.2)' : '#eff6ff', padding: '3px 8px', borderRadius: '4px' }}>
                  {viewingPackage.category} • {viewingPackage.testCount} Parameters
                </span>
                <h3 style={{ fontSize: '20px', fontWeight: 800, color: isDark ? '#f8fafc' : '#0f172a', margin: '8px 0 2px' }}>
                  {viewingPackage.name}
                </h3>
                <p style={{ fontSize: '13px', color: isDark ? '#94a3b8' : '#64748b', margin: 0 }}>
                  Turnaround: {viewingPackage.reportTime} • Sample: {viewingPackage.sampleType}
                </p>
              </div>
              <button
                onClick={() => setViewingPackage(null)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: isDark ? '#94a3b8' : '#64748b' }}
              >
                <CloseIcon size={20} />
              </button>
            </div>

            <div style={{ flex: 1, overflowY: 'auto', paddingRight: '8px' }}>
              <p style={{ fontSize: '14px', color: isDark ? '#cbd5e1' : '#334155', lineHeight: 1.5, margin: '0 0 16px' }}>
                {viewingPackage.description}
              </p>

              <h4 style={{ fontSize: '14px', fontWeight: 700, color: isDark ? '#f8fafc' : '#0f172a', margin: '0 0 8px' }}>
                Included Diagnostic Parameters & Profiles:
              </h4>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {viewingPackage.parameters.map((param, i) => (
                  <div
                    key={i}
                    style={{
                      padding: '10px 14px',
                      background: isDark ? '#0f172a' : '#f8fafc',
                      borderRadius: '8px',
                      border: isDark ? '1px solid #334155' : '1px solid #e2e8f0',
                      fontSize: '13px',
                      color: isDark ? '#f8fafc' : '#1e293b',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}
                  >
                    <span style={{ color: isDark ? '#34d399' : '#047857', fontWeight: 800 }}>✓</span>
                    <span>{param}</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ borderTop: isDark ? '1px solid #334155' : '1px solid #f1f5f9', paddingTop: '16px', marginTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <span style={{ fontSize: '22px', fontWeight: 800, color: isDark ? '#f8fafc' : '#0f172a' }}>
                  ₹{viewingPackage.price}
                </span>
                <span style={{ fontSize: '14px', color: isDark ? '#64748b' : '#94a3b8', textDecoration: 'line-through', marginLeft: '8px' }}>
                  ₹{viewingPackage.mrp}
                </span>
              </div>

              <button
                onClick={() => {
                  toggleTestSelection(viewingPackage);
                  setViewingPackage(null);
                }}
                style={{
                  background: selectedTests.some(t => t.id === viewingPackage.id) ? (isDark ? '#059669' : '#15803d') : (isDark ? '#2563eb' : '#1e40af'),
                  color: 'white',
                  border: 'none',
                  padding: '10px 20px',
                  borderRadius: '8px',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                {selectedTests.some(t => t.id === viewingPackage.id) ? 'Remove Test' : 'Add to Booking'}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
