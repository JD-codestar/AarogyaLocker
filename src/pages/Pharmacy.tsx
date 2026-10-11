import React, { useState } from 'react';

export default function Pharmacy() {
  const [cartCount, setCartCount] = useState(0);

  const medicines = [
    { id: 1, name: 'Paracetamol 500mg', brand: 'GlaxoSmithKline', price: 30, type: 'Tablet', prescriptionRequired: false },
    { id: 2, name: 'Amoxicillin 250mg', brand: 'Cipla', price: 120, type: 'Capsule', prescriptionRequired: true },
    { id: 3, name: 'Vitamin C 1000mg', brand: 'Abbott', price: 85, type: 'Chewable', prescriptionRequired: false },
    { id: 4, name: 'Cough Syrup (Dry Cough)', brand: 'Pfizer', price: 150, type: 'Syrup', prescriptionRequired: false },
  ];

  return (
    <section style={{ padding: 'var(--space-6) 0', background: 'var(--color-bg-light)', minHeight: '80vh' }}>
      <div className="container">
        
        {/* Header & Cart */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-6)' }}>
          <div>
            <h1 style={{ fontSize: '32px', fontWeight: 800, color: 'var(--color-dark)' }}>Online Pharmacy</h1>
            <p style={{ color: 'var(--color-slate)' }}>Order genuine medicines delivered to your doorstep.</p>
          </div>
          <div style={{ display: 'flex', gap: '16px' }}>
            <button className="btn btn-secondary" style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              📄 Upload Prescription
            </button>
            <button className="btn btn-primary" style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              🛒 Cart
              {cartCount > 0 && <span style={{ background: 'white', color: 'var(--color-deep-blue)', borderRadius: '50%', width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 800 }}>{cartCount}</span>}
            </button>
          </div>
        </div>

        {/* Upload Banner */}
        <div style={{ background: 'var(--color-ice-blue)', padding: 'var(--space-5)', borderRadius: '12px', marginBottom: 'var(--space-8)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h3 style={{ fontSize: '18px', color: 'var(--color-deep-blue)', marginBottom: '4px' }}>Have a prescription?</h3>
            <p style={{ color: 'var(--color-slate)' }}>Upload it here and our pharmacist will build your cart.</p>
          </div>
          <button className="btn btn-primary">Upload Now</button>
        </div>

        {/* Medicines Grid */}
        <h2 style={{ fontSize: '20px', fontWeight: 700, marginBottom: 'var(--space-4)' }}>Popular Medicines</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 'var(--space-6)' }}>
          {medicines.map(med => (
            <div key={med.id} className="card" style={{ padding: 'var(--space-5)', display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                <span style={{ fontSize: '12px', color: 'var(--color-slate)', fontWeight: 600, textTransform: 'uppercase' }}>{med.type}</span>
                {med.prescriptionRequired && <span style={{ fontSize: '10px', padding: '2px 6px', background: '#fee2e2', color: '#b91c1c', borderRadius: '4px', fontWeight: 600 }}>Rx Required</span>}
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--color-dark)', marginBottom: '4px' }}>{med.name}</h3>
              <p style={{ color: 'var(--color-slate)', fontSize: '14px', marginBottom: '24px' }}>By {med.brand}</p>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', borderTop: '1px solid var(--color-gray-200)', paddingTop: '16px' }}>
                <span style={{ fontSize: '20px', fontWeight: 700, color: 'var(--color-deep-blue)' }}>₹{med.price}</span>
                <button className="btn btn-secondary" onClick={() => setCartCount(c => c + 1)}>Add to Cart</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
