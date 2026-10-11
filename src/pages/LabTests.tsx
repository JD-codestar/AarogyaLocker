import React, { useState } from 'react';
import { SearchIcon } from '../Icons';

export default function LabTests() {
  const [cartCount, setCartCount] = useState(0);

  const tests = [
    { id: 1, name: 'Complete Blood Count (CBC)', category: 'Blood Test', price: 400, time: '12 hrs' },
    { id: 2, name: 'Lipid Profile', category: 'Heart Health', price: 650, time: '24 hrs' },
    { id: 3, name: 'HbA1c (Glycosylated Hemoglobin)', category: 'Diabetes', price: 500, time: '12 hrs' },
    { id: 4, name: 'Comprehensive Full Body Checkup', category: 'Health Package', price: 2999, time: '24 hrs' },
  ];

  return (
    <section style={{ padding: 'var(--space-6) 0', background: 'var(--color-bg-light)', minHeight: '80vh' }}>
      <div className="container">
        
        {/* Header & Cart */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-8)' }}>
          <div>
            <h1 style={{ fontSize: '32px', fontWeight: 800, color: 'var(--color-dark)' }}>Lab Tests & Diagnostics</h1>
            <p style={{ color: 'var(--color-slate)' }}>Book safe and hygienic home sample collection.</p>
          </div>
          <div style={{ position: 'relative' }}>
            <button className="btn btn-primary" style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              🛒 View Cart
              {cartCount > 0 && <span style={{ background: 'white', color: 'var(--color-deep-blue)', borderRadius: '50%', width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 800 }}>{cartCount}</span>}
            </button>
          </div>
        </div>

        {/* Categories */}
        <div style={{ display: 'flex', gap: '16px', overflowX: 'auto', paddingBottom: 'var(--space-4)', marginBottom: 'var(--space-6)' }}>
          {['All Tests', 'Blood Tests', 'Diabetes', 'Heart Health', 'Full Body Checkups', 'COVID-19'].map(cat => (
            <button key={cat} style={{ padding: '8px 16px', borderRadius: '20px', border: '1px solid var(--color-gray-200)', background: cat === 'All Tests' ? 'var(--color-deep-blue)' : 'white', color: cat === 'All Tests' ? 'white' : 'var(--color-dark)', cursor: 'pointer', whiteSpace: 'nowrap' }}>
              {cat}
            </button>
          ))}
        </div>

        {/* Tests Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 'var(--space-6)' }}>
          {tests.map(test => (
            <div key={test.id} className="card" style={{ padding: 'var(--space-5)', display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                <span style={{ fontSize: '12px', padding: '4px 8px', background: '#fef3c7', color: '#b45309', borderRadius: '4px', fontWeight: 600 }}>{test.category}</span>
                <span style={{ color: 'var(--color-slate)', fontSize: '12px' }}>⏱️ {test.time}</span>
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--color-dark)', marginBottom: '8px' }}>{test.name}</h3>
              <p style={{ color: 'var(--color-slate)', fontSize: '14px', marginBottom: '24px' }}>Free home sample collection available.</p>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', borderTop: '1px solid var(--color-gray-200)', paddingTop: '16px' }}>
                <span style={{ fontSize: '20px', fontWeight: 700, color: 'var(--color-deep-blue)' }}>₹{test.price}</span>
                <button className="btn btn-secondary" onClick={() => setCartCount(c => c + 1)}>+ Add</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
