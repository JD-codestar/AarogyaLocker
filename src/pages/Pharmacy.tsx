import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import type { PharmacyMedicine, PharmacyCartItem } from '../types';
import { SearchIcon, CloseIcon } from '../Icons';

export default function Pharmacy() {
  const navigate = useNavigate();
  const { 
    currentUser, 
    pharmacyMedicines, 
    createPharmacyOrder, 
    records 
  } = useApp();

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [showRxOnly, setShowRxOnly] = useState(false);

  // Cart State (stored in component with persistence to localStorage)
  const [cart, setCart] = useState<PharmacyCartItem[]>(() => {
    const saved = localStorage.getItem('aarogya_cart');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return [];
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedMedicine, setSelectedMedicine] = useState<PharmacyMedicine | null>(null);
  
  // Checkout & Prescription Modal State
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState<'address' | 'rx' | 'payment'>('address');
  const [promoCode, setPromoCode] = useState('');
  const [promoDiscount, setPromoDiscount] = useState(0);
  const [promoMessage, setPromoMessage] = useState('');
  const [attachedPrescriptionId, setAttachedPrescriptionId] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState<'UPI' | 'Card' | 'COD' | 'ABHA'>('UPI');
  const [completedOrderId, setCompletedOrderId] = useState<string | null>(null);

  // Address State
  const [address, setAddress] = useState({
    fullName: currentUser?.name || 'Rahul Sharma',
    phone: currentUser?.phone || '+91 98765 43210',
    street: 'Flat 402, Green Valley Apartments, MG Road',
    city: 'Bengaluru',
    pincode: '560001'
  });

  // Sync cart to localStorage
  const saveCart = (newCart: PharmacyCartItem[]) => {
    setCart(newCart);
    localStorage.setItem('aarogya_cart', JSON.stringify(newCart));
  };

  const cartTotalItems = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  }, [cart]);

  const cartTotalMrp = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.medicine.mrp * item.quantity, 0);
  }, [cart]);

  const cartTotalSelling = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.medicine.price * item.quantity, 0);
  }, [cart]);

  const cartDiscount = cartTotalMrp - cartTotalSelling + promoDiscount;
  const deliveryFee = cartTotalSelling > 499 || cartTotalSelling === 0 ? 0 : 49;
  const finalPayable = Math.max(0, cartTotalSelling - promoDiscount + deliveryFee);

  const cartRequiresRx = useMemo(() => {
    return cart.some(item => item.medicine.prescriptionRequired);
  }, [cart]);

  // Patient's prescriptions from AarogyaLocker
  const patientPrescriptions = useMemo(() => {
    if (!currentUser) return [];
    return records.filter(
      r => r.type === 'Prescription' && (currentUser.role !== 'patient' || r.patientId === currentUser.id)
    );
  }, [records, currentUser]);

  // Cart operations
  const addToCart = (med: PharmacyMedicine) => {
    const existing = cart.find(i => i.medicine.id === med.id);
    if (existing) {
      saveCart(cart.map(i => i.medicine.id === med.id ? { ...i, quantity: i.quantity + 1 } : i));
    } else {
      saveCart([...cart, { medicine: med, quantity: 1 }]);
    }
  };

  const updateQuantity = (medId: string, delta: number) => {
    const updated = cart
      .map(item => {
        if (item.medicine.id === medId) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : null;
        }
        return item;
      })
      .filter(Boolean) as PharmacyCartItem[];
    saveCart(updated);
  };

  const removeFromCart = (medId: string) => {
    saveCart(cart.filter(i => i.medicine.id !== medId));
  };

  // Promo code apply
  const handleApplyPromo = () => {
    if (promoCode.trim().toUpperCase() === 'AAROGYA15') {
      const discount = Math.round(cartTotalSelling * 0.15);
      setPromoDiscount(discount);
      setPromoMessage('🎉 15% Discount applied successfully!');
    } else if (promoCode.trim().toUpperCase() === 'HEALTH50') {
      setPromoDiscount(50);
      setPromoMessage('🎉 ₹50 Health Discount applied!');
    } else {
      setPromoMessage('❌ Invalid coupon code. Try AAROGYA15');
      setPromoDiscount(0);
    }
  };

  // Filter medicines
  const filteredMedicines = useMemo(() => {
    return pharmacyMedicines.filter(med => {
      const matchesCategory = selectedCategory === 'All' || med.category === selectedCategory;
      const matchesRx = !showRxOnly || med.prescriptionRequired;
      const matchesSearch = !searchQuery.trim() || 
        med.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        med.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        med.composition.toLowerCase().includes(searchQuery.toLowerCase()) ||
        med.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesRx && matchesSearch;
    });
  }, [pharmacyMedicines, selectedCategory, showRxOnly, searchQuery]);

  // Complete Order
  const handlePlaceOrder = () => {
    if (cart.length === 0) return;

    const patientId = currentUser?.id || 'pat-101';
    const patientName = currentUser?.name || address.fullName;

    const createdOrder = createPharmacyOrder({
      patientId,
      patientName,
      items: cart,
      totalMrp: cartTotalMrp,
      discount: cartDiscount,
      deliveryFee,
      finalPayable,
      deliveryAddress: address,
      paymentMethod: paymentMethod === 'COD' ? 'Cash on Delivery' : paymentMethod === 'UPI' ? 'BHIM / UPI' : paymentMethod === 'ABHA' ? 'ABHA Health Voucher (PM-JAY)' : 'Debit / Credit Card',
      prescriptionRecordId: attachedPrescriptionId || undefined
    });

    setCompletedOrderId(createdOrder.id);
    saveCart([]); // Clear cart
  };

  const categories = [
    'All',
    'Pain Relief',
    'Antibiotics',
    'Diabetes',
    'Cardiac',
    'Vitamins & Supplements',
    'Respiratory',
    'Gastrointestinal'
  ];

  return (
    <div style={{ background: '#f8fafc', minHeight: '90vh', paddingBottom: '60px' }}>
      
      {/* Top Hero Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #047857 0%, #065f46 100%)',
        color: 'white',
        padding: '36px 20px',
        borderBottom: '1px solid rgba(255,255,255,0.1)'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.15)', padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 600, marginBottom: '8px' }}>
                <span>💊 100% Genuine Certified Medicines</span>
                <span>•</span>
                <span>⚡ Express 2-Hour Delivery Available</span>
              </div>
              <h1 style={{ fontSize: '32px', fontWeight: 800, margin: '4px 0', letterSpacing: '-0.5px' }}>
                CareConnect Online Pharmacy
              </h1>
              <p style={{ color: '#a7f3d0', fontSize: '15px', margin: 0, maxWidth: '600px' }}>
                Order doctor-prescribed medications with instant verification, automated GST tax invoices, and direct sync with your AarogyaLocker.
              </p>
            </div>

            {/* Cart Header Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              style={{
                background: 'white',
                color: '#065f46',
                border: 'none',
                padding: '12px 24px',
                borderRadius: '12px',
                fontWeight: 700,
                fontSize: '15px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
                transition: 'transform 0.2s'
              }}
            >
              <span style={{ fontSize: '20px' }}>🛒</span>
              <span>Cart & Checkout</span>
              {cartTotalItems > 0 && (
                <span style={{
                  background: '#047857',
                  color: 'white',
                  borderRadius: '12px',
                  padding: '2px 8px',
                  fontSize: '13px',
                  fontWeight: 800
                }}>
                  {cartTotalItems}
                </span>
              )}
            </button>
          </div>

          {/* Search Bar */}
          <div style={{ marginTop: '28px', maxWidth: '720px', position: 'relative' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              background: 'white',
              borderRadius: '12px',
              padding: '6px 16px',
              boxShadow: '0 8px 24px rgba(0,0,0,0.12)'
            }}>
              <div style={{ color: '#047857', marginRight: '12px' }}>
                <SearchIcon size={22} />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search by medicine name, active salt (e.g. Paracetamol), or brand..."
                style={{
                  width: '100%',
                  border: 'none',
                  outline: 'none',
                  fontSize: '15px',
                  color: '#1e293b'
                }}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8' }}
                >
                  <CloseIcon size={18} />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div style={{ maxWidth: '1200px', margin: '24px auto', padding: '0 16px' }}>

        {/* AarogyaLocker Prescription Sync Banner */}
        <div style={{
          background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
          border: '1px solid #bfdbfe',
          borderRadius: '16px',
          padding: '18px 24px',
          marginBottom: '24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: '12px',
              background: '#2563eb',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '22px'
            }}>
              🔐
            </div>
            <div>
              <h4 style={{ margin: 0, color: '#1e3a8a', fontSize: '16px', fontWeight: 700 }}>
                AarogyaLocker Prescription Sync
              </h4>
              <p style={{ margin: '2px 0 0', color: '#3b82f6', fontSize: '13px' }}>
                Have a doctor prescription saved in your locker? We'll automatically verify and dispense your medicines without manual uploads.
              </p>
            </div>
          </div>
          <button
            onClick={() => navigate('/health-records')}
            style={{
              background: '#2563eb',
              color: 'white',
              border: 'none',
              padding: '9px 18px',
              borderRadius: '8px',
              fontSize: '13px',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            Open AarogyaLocker Prescriptions
          </button>
        </div>

        {/* Category Pills & Filters */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px',
          marginBottom: '24px'
        }}>
          <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '6px', maxWidth: '100%' }}>
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
                  borderColor: selectedCategory === cat ? '#047857' : '#cbd5e1',
                  background: selectedCategory === cat ? '#047857' : 'white',
                  color: selectedCategory === cat ? 'white' : '#475569',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.15s'
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '13px', color: '#475569', fontWeight: 600 }}>
            <input
              type="checkbox"
              checked={showRxOnly}
              onChange={e => setShowRxOnly(e.target.checked)}
              style={{ width: '16px', height: '16px', accentColor: '#047857' }}
            />
            Show Prescription (Rx) Only
          </label>
        </div>

        {/* Products Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '20px'
        }}>
          {filteredMedicines.map(med => {
            const inCartItem = cart.find(i => i.medicine.id === med.id);
            const discountPct = Math.round(((med.mrp - med.price) / med.mrp) * 100);

            return (
              <div
                key={med.id}
                style={{
                  background: 'white',
                  borderRadius: '16px',
                  border: '1px solid #e2e8f0',
                  padding: '20px',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
                  transition: 'transform 0.2s, box-shadow 0.2s'
                }}
              >
                {/* Top Badges */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                  <span style={{
                    fontSize: '11px',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    color: '#64748b',
                    background: '#f1f5f9',
                    padding: '3px 8px',
                    borderRadius: '6px'
                  }}>
                    {med.type} • {med.dosage}
                  </span>

                  {med.prescriptionRequired ? (
                    <span style={{
                      fontSize: '11px',
                      fontWeight: 700,
                      color: '#b91c1c',
                      background: '#fee2e2',
                      padding: '3px 8px',
                      borderRadius: '6px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}>
                      📋 Rx Required
                    </span>
                  ) : (
                    <span style={{
                      fontSize: '11px',
                      fontWeight: 700,
                      color: '#047857',
                      background: '#d1fae5',
                      padding: '3px 8px',
                      borderRadius: '6px'
                    }}>
                      ✓ OTC
                    </span>
                  )}
                </div>

                {/* Medicine Title & Brand */}
                <h3 style={{
                  fontSize: '16px',
                  fontWeight: 700,
                  color: '#0f172a',
                  margin: '0 0 4px',
                  lineHeight: 1.3
                }}>
                  {med.name}
                </h3>
                <p style={{ fontSize: '13px', color: '#64748b', margin: '0 0 8px' }}>
                  By {med.brand}
                </p>

                {/* Active Composition */}
                <div style={{
                  fontSize: '12px',
                  color: '#475569',
                  background: '#f8fafc',
                  padding: '6px 10px',
                  borderRadius: '6px',
                  border: '1px solid #f1f5f9',
                  marginBottom: '12px',
                  lineHeight: 1.4
                }}>
                  <strong style={{ color: '#334155' }}>Salt: </strong>
                  {med.composition}
                </div>

                {/* Pack Size & Rating */}
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#64748b', marginBottom: '16px' }}>
                  <span>📦 {med.packSize}</span>
                  <span>⭐ {med.rating} ({med.reviewsCount})</span>
                </div>

                {/* Pricing & Add to Cart footer */}
                <div style={{ marginTop: 'auto', borderTop: '1px solid #f1f5f9', paddingTop: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '12px' }}>
                    <span style={{ fontSize: '20px', fontWeight: 800, color: '#047857' }}>
                      ₹{med.price}
                    </span>
                    {med.mrp > med.price && (
                      <span style={{ fontSize: '13px', color: '#94a3b8', textDecoration: 'line-through' }}>
                        ₹{med.mrp}
                      </span>
                    )}
                    {discountPct > 0 && (
                      <span style={{ fontSize: '11px', fontWeight: 700, color: '#b45309', background: '#fef3c7', padding: '2px 6px', borderRadius: '4px' }}>
                        {discountPct}% OFF
                      </span>
                    )}
                  </div>

                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      onClick={() => setSelectedMedicine(med)}
                      style={{
                        padding: '8px 12px',
                        background: '#f1f5f9',
                        color: '#475569',
                        border: 'none',
                        borderRadius: '8px',
                        fontSize: '12px',
                        fontWeight: 600,
                        cursor: 'pointer'
                      }}
                    >
                      Details
                    </button>

                    {inCartItem ? (
                      <div style={{
                        flex: 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        background: '#047857',
                        color: 'white',
                        borderRadius: '8px',
                        padding: '4px 10px',
                        fontWeight: 700
                      }}>
                        <button
                          onClick={() => updateQuantity(med.id, -1)}
                          style={{ background: 'none', border: 'none', color: 'white', fontSize: '16px', cursor: 'pointer', padding: '2px 8px' }}
                        >
                          -
                        </button>
                        <span>{inCartItem.quantity} in Cart</span>
                        <button
                          onClick={() => updateQuantity(med.id, 1)}
                          style={{ background: 'none', border: 'none', color: 'white', fontSize: '16px', cursor: 'pointer', padding: '2px 8px' }}
                        >
                          +
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => addToCart(med)}
                        style={{
                          flex: 1,
                          padding: '10px 14px',
                          background: '#047857',
                          color: 'white',
                          border: 'none',
                          borderRadius: '8px',
                          fontSize: '13px',
                          fontWeight: 700,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '6px'
                        }}
                      >
                        <span>+ Add to Cart</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredMedicines.length === 0 && (
          <div style={{ textAlign: 'center', padding: '60px 20px', color: '#64748b' }}>
            <div style={{ fontSize: '48px', marginBottom: '12px' }}>🔍</div>
            <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#1e293b' }}>No medications found</h3>
            <p>We could not find any medicine matching "{searchQuery}". Try searching by salt name like "Paracetamol" or change category.</p>
          </div>
        )}
      </div>

      {/* Slide-Over Cart Drawer */}
      {isCartOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          zIndex: 1000,
          display: 'flex',
          justifyContent: 'flex-end'
        }}>
          <div style={{
            background: 'white',
            width: '100%',
            maxWidth: '460px',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '-8px 0 24px rgba(0,0,0,0.2)',
            animation: 'slideInRight 0.3s'
          }}>
            {/* Cart Header */}
            <div style={{
              padding: '20px',
              borderBottom: '1px solid #e2e8f0',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div>
                <h2 style={{ fontSize: '18px', fontWeight: 800, margin: 0, color: '#0f172a' }}>
                  Your Pharmacy Cart ({cartTotalItems})
                </h2>
                <p style={{ margin: '2px 0 0', fontSize: '12px', color: '#64748b' }}>
                  Fulfilled by CareConnect Licensed Digital Dispensary
                </p>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}
              >
                <CloseIcon size={20} />
              </button>
            </div>

            {/* Cart Items List */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '20px' }}>
              {cart.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '60px 20px', color: '#94a3b8' }}>
                  <div style={{ fontSize: '48px', marginBottom: '16px' }}>🛒</div>
                  <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#334155' }}>Your cart is empty</h3>
                  <p style={{ fontSize: '14px', margin: '8px 0 20px' }}>Add generic and prescribed medicines to checkout.</p>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    style={{
                      background: '#047857',
                      color: 'white',
                      border: 'none',
                      padding: '10px 20px',
                      borderRadius: '8px',
                      fontWeight: 600,
                      cursor: 'pointer'
                    }}
                  >
                    Browse Medicines
                  </button>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {/* Prescription required alert in cart */}
                  {cartRequiresRx && (
                    <div style={{
                      background: '#fef2f2',
                      border: '1px solid #fecaca',
                      borderRadius: '12px',
                      padding: '12px 16px',
                      fontSize: '13px',
                      color: '#991b1b',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px'
                    }}>
                      <span style={{ fontSize: '18px' }}>⚠️</span>
                      <div>
                        <strong>Prescription Required:</strong> One or more items in your cart require a doctor prescription. You can attach it directly from your AarogyaLocker during checkout.
                      </div>
                    </div>
                  )}

                  {cart.map(item => (
                    <div
                      key={item.medicine.id}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        background: '#f8fafc',
                        padding: '12px 14px',
                        borderRadius: '12px',
                        border: '1px solid #e2e8f0'
                      }}
                    >
                      <div style={{ flex: 1, marginRight: '12px' }}>
                        <h4 style={{ margin: '0 0 2px', fontSize: '14px', fontWeight: 700, color: '#1e293b' }}>
                          {item.medicine.name}
                        </h4>
                        <p style={{ margin: '0 0 6px', fontSize: '12px', color: '#64748b' }}>
                          {item.medicine.packSize} • {item.medicine.brand}
                        </p>
                        <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
                          <span style={{ fontSize: '15px', fontWeight: 700, color: '#047857' }}>
                            ₹{item.medicine.price * item.quantity}
                          </span>
                          <span style={{ fontSize: '12px', color: '#94a3b8', textDecoration: 'line-through' }}>
                            ₹{item.medicine.mrp * item.quantity}
                          </span>
                        </div>
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '8px' }}>
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          border: '1px solid #cbd5e1',
                          borderRadius: '8px',
                          background: 'white',
                          overflow: 'hidden'
                        }}>
                          <button
                            onClick={() => updateQuantity(item.medicine.id, -1)}
                            style={{ padding: '4px 8px', border: 'none', background: 'none', cursor: 'pointer', fontWeight: 700 }}
                          >
                            -
                          </button>
                          <span style={{ padding: '0 6px', fontSize: '13px', fontWeight: 700 }}>
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.medicine.id, 1)}
                            style={{ padding: '4px 8px', border: 'none', background: 'none', cursor: 'pointer', fontWeight: 700 }}
                          >
                            +
                          </button>
                        </div>

                        <button
                          onClick={() => removeFromCart(item.medicine.id)}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: '#ef4444',
                            fontSize: '11px',
                            cursor: 'pointer',
                            padding: '2px 4px'
                          }}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}

                  {/* Promo Code Box */}
                  <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '16px' }}>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <input
                        type="text"
                        placeholder="Enter Promo Code (e.g. AAROGYA15)"
                        value={promoCode}
                        onChange={e => setPromoCode(e.target.value)}
                        style={{
                          flex: 1,
                          padding: '8px 12px',
                          borderRadius: '8px',
                          border: '1px solid #cbd5e1',
                          fontSize: '13px',
                          textTransform: 'uppercase'
                        }}
                      />
                      <button
                        onClick={handleApplyPromo}
                        style={{
                          padding: '8px 16px',
                          background: '#047857',
                          color: 'white',
                          border: 'none',
                          borderRadius: '8px',
                          fontSize: '13px',
                          fontWeight: 600,
                          cursor: 'pointer'
                        }}
                      >
                        Apply
                      </button>
                    </div>
                    {promoMessage && (
                      <p style={{ margin: '6px 0 0', fontSize: '12px', color: promoDiscount > 0 ? '#047857' : '#ef4444' }}>
                        {promoMessage}
                      </p>
                    )}
                  </div>

                  {/* Bill Breakdown */}
                  <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                    <h4 style={{ margin: '0 0 12px', fontSize: '14px', fontWeight: 700, color: '#334155' }}>
                      Bill Breakdown
                    </h4>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#64748b', marginBottom: '8px' }}>
                      <span>Total MRP</span>
                      <span>₹{cartTotalMrp}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#047857', marginBottom: '8px' }}>
                      <span>Discount Savings</span>
                      <span>-₹{cartDiscount}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#64748b', marginBottom: '8px' }}>
                      <span>Delivery Fee</span>
                      <span>{deliveryFee === 0 ? <strong style={{ color: '#047857' }}>FREE</strong> : `₹${deliveryFee}`}</span>
                    </div>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      fontSize: '16px',
                      fontWeight: 800,
                      color: '#0f172a',
                      borderTop: '1px solid #e2e8f0',
                      paddingTop: '10px',
                      marginTop: '8px'
                    }}>
                      <span>To Pay</span>
                      <span>₹{finalPayable}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Cart Footer */}
            {cart.length > 0 && (
              <div style={{ padding: '20px', borderTop: '1px solid #e2e8f0', background: 'white' }}>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    setIsCheckoutOpen(true);
                  }}
                  style={{
                    width: '100%',
                    padding: '14px',
                    background: '#047857',
                    color: 'white',
                    border: 'none',
                    borderRadius: '12px',
                    fontSize: '15px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    boxShadow: '0 4px 12px rgba(4,120,87,0.3)'
                  }}
                >
                  <span>Proceed to Checkout</span>
                  <span>₹{finalPayable} →</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Checkout Modal */}
      {isCheckoutOpen && (
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
            background: 'white',
            width: '100%',
            maxWidth: '600px',
            borderRadius: '20px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.25)',
            maxHeight: '90vh',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden'
          }}>
            {/* Modal Header */}
            <div style={{
              padding: '20px 24px',
              borderBottom: '1px solid #e2e8f0',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              background: '#f8fafc'
            }}>
              <div>
                <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 800, color: '#0f172a' }}>
                  Secure Medicine Checkout
                </h3>
                <p style={{ margin: '2px 0 0', fontSize: '12px', color: '#64748b' }}>
                  CareConnect Express Delivery • GST Verified Billing
                </p>
              </div>
              <button
                onClick={() => setIsCheckoutOpen(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}
              >
                <CloseIcon size={20} />
              </button>
            </div>

            {/* Stepper Tabs */}
            <div style={{ display: 'flex', borderBottom: '1px solid #e2e8f0', background: 'white' }}>
              <div style={{
                flex: 1,
                padding: '12px',
                textAlign: 'center',
                fontSize: '13px',
                fontWeight: 700,
                color: checkoutStep === 'address' ? '#047857' : '#94a3b8',
                borderBottom: checkoutStep === 'address' ? '2px solid #047857' : 'none',
                cursor: 'pointer'
              }} onClick={() => setCheckoutStep('address')}>
                1. Delivery Address
              </div>
              <div style={{
                flex: 1,
                padding: '12px',
                textAlign: 'center',
                fontSize: '13px',
                fontWeight: 700,
                color: checkoutStep === 'rx' ? '#047857' : '#94a3b8',
                borderBottom: checkoutStep === 'rx' ? '2px solid #047857' : 'none',
                cursor: 'pointer'
              }} onClick={() => setCheckoutStep('rx')}>
                2. Prescription {cartRequiresRx && '⚠️'}
              </div>
              <div style={{
                flex: 1,
                padding: '12px',
                textAlign: 'center',
                fontSize: '13px',
                fontWeight: 700,
                color: checkoutStep === 'payment' ? '#047857' : '#94a3b8',
                borderBottom: checkoutStep === 'payment' ? '2px solid #047857' : 'none',
                cursor: 'pointer'
              }} onClick={() => setCheckoutStep('payment')}>
                3. Payment
              </div>
            </div>

            {/* Modal Body */}
            <div style={{ padding: '24px', overflowY: 'auto', flex: 1 }}>
              {checkoutStep === 'address' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <h4 style={{ margin: 0, fontSize: '15px', color: '#1e293b' }}>Confirm Delivery Address</h4>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#475569', marginBottom: '4px' }}>
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={address.fullName}
                        onChange={e => setAddress({ ...address, fullName: e.target.value })}
                        style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#475569', marginBottom: '4px' }}>
                        Mobile Phone Number
                      </label>
                      <input
                        type="text"
                        value={address.phone}
                        onChange={e => setAddress({ ...address, phone: e.target.value })}
                        style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px' }}
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#475569', marginBottom: '4px' }}>
                      Street Address & Flat / House No.
                    </label>
                    <input
                      type="text"
                      value={address.street}
                      onChange={e => setAddress({ ...address, street: e.target.value })}
                      style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px' }}
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#475569', marginBottom: '4px' }}>
                        City
                      </label>
                      <input
                        type="text"
                        value={address.city}
                        onChange={e => setAddress({ ...address, city: e.target.value })}
                        style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#475569', marginBottom: '4px' }}>
                        Postal PIN Code
                      </label>
                      <input
                        type="text"
                        value={address.pincode}
                        onChange={e => setAddress({ ...address, pincode: e.target.value })}
                        style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px' }}
                      />
                    </div>
                  </div>

                  <div style={{ background: '#f0fdf4', padding: '12px', borderRadius: '10px', border: '1px solid #bbf7d0', fontSize: '13px', color: '#166534' }}>
                    🚚 <strong>Estimated Delivery:</strong> Today within 2 hours to {address.pincode}.
                  </div>

                  <button
                    onClick={() => setCheckoutStep('rx')}
                    style={{
                      marginTop: '8px',
                      padding: '12px',
                      background: '#047857',
                      color: 'white',
                      border: 'none',
                      borderRadius: '10px',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    Continue to Prescription Verification →
                  </button>
                </div>
              )}

              {checkoutStep === 'rx' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontSize: '24px' }}>📄</span>
                    <div>
                      <h4 style={{ margin: 0, fontSize: '15px', color: '#1e293b' }}>
                        Prescription Verification (AarogyaLocker Linked)
                      </h4>
                      <p style={{ margin: '2px 0 0', fontSize: '12px', color: '#64748b' }}>
                        Select any doctor's e-prescription saved in your health vault to auto-verify this order.
                      </p>
                    </div>
                  </div>

                  {patientPrescriptions.length > 0 ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      <p style={{ fontSize: '13px', fontWeight: 600, color: '#475569', margin: '4px 0' }}>
                        Choose from your verified AarogyaLocker records:
                      </p>
                      {patientPrescriptions.map(rx => (
                        <div
                          key={rx.id}
                          onClick={() => setAttachedPrescriptionId(rx.id)}
                          style={{
                            padding: '12px 16px',
                            borderRadius: '12px',
                            border: attachedPrescriptionId === rx.id ? '2px solid #047857' : '1px solid #cbd5e1',
                            background: attachedPrescriptionId === rx.id ? '#f0fdf4' : 'white',
                            cursor: 'pointer',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                          }}
                        >
                          <div>
                            <div style={{ fontWeight: 700, fontSize: '14px', color: '#0f172a' }}>
                              {rx.name}
                            </div>
                            <div style={{ fontSize: '12px', color: '#64748b', marginTop: '2px' }}>
                              Prescribed by {rx.doctor} • {rx.date}
                            </div>
                          </div>
                          <div style={{
                            width: '20px',
                            height: '20px',
                            borderRadius: '50%',
                            border: attachedPrescriptionId === rx.id ? '6px solid #047857' : '2px solid #cbd5e1'
                          }} />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div style={{
                      padding: '16px',
                      background: '#f8fafc',
                      borderRadius: '12px',
                      border: '1px dashed #cbd5e1',
                      textAlign: 'center'
                    }}>
                      <p style={{ margin: '0 0 8px', fontSize: '13px', color: '#64748b' }}>
                        No saved prescriptions found in your AarogyaLocker.
                      </p>
                      <button
                        onClick={() => {
                          setAttachedPrescriptionId('PROVISIONAL-CONSULT');
                        }}
                        style={{
                          background: '#e0f2fe',
                          color: '#0369a1',
                          border: 'none',
                          padding: '8px 16px',
                          borderRadius: '8px',
                          fontSize: '12px',
                          fontWeight: 700,
                          cursor: 'pointer'
                        }}
                      >
                        Request Instant Tele-Consultation Review by On-call Doctor (Free)
                      </button>
                    </div>
                  )}

                  <div style={{ display: 'flex', gap: '12px', marginTop: '12px' }}>
                    <button
                      onClick={() => setCheckoutStep('address')}
                      style={{ flex: 1, padding: '12px', background: '#f1f5f9', border: 'none', borderRadius: '10px', fontWeight: 600, cursor: 'pointer' }}
                    >
                      ← Back
                    </button>
                    <button
                      onClick={() => setCheckoutStep('payment')}
                      style={{ flex: 2, padding: '12px', background: '#047857', color: 'white', border: 'none', borderRadius: '10px', fontWeight: 700, cursor: 'pointer' }}
                    >
                      Proceed to Payment →
                    </button>
                  </div>
                </div>
              )}

              {checkoutStep === 'payment' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <h4 style={{ margin: 0, fontSize: '15px', color: '#1e293b' }}>Select Payment Method</h4>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {[
                      { id: 'UPI', title: 'BHIM UPI / Google Pay / PhonePe', desc: 'Instant zero-fee transfer', icon: '📱' },
                      { id: 'Card', title: 'Credit or Debit Card', desc: 'Visa, MasterCard, RuPay', icon: '💳' },
                      { id: 'ABHA', title: 'ABHA Health Insurance Voucher (PM-JAY)', desc: '100% Cashless govt health benefit', icon: '🛡️' },
                      { id: 'COD', title: 'Cash on Delivery', desc: 'Pay when your package arrives', icon: '💵' }
                    ].map(opt => (
                      <div
                        key={opt.id}
                        onClick={() => setPaymentMethod(opt.id as any)}
                        style={{
                          padding: '14px 16px',
                          borderRadius: '12px',
                          border: paymentMethod === opt.id ? '2px solid #047857' : '1px solid #cbd5e1',
                          background: paymentMethod === opt.id ? '#f0fdf4' : 'white',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '12px'
                        }}
                      >
                        <span style={{ fontSize: '22px' }}>{opt.icon}</span>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontWeight: 700, fontSize: '14px', color: '#0f172a' }}>{opt.title}</div>
                          <div style={{ fontSize: '12px', color: '#64748b' }}>{opt.desc}</div>
                        </div>
                        <div style={{
                          width: '18px',
                          height: '18px',
                          borderRadius: '50%',
                          border: paymentMethod === opt.id ? '5px solid #047857' : '2px solid #cbd5e1'
                        }} />
                      </div>
                    ))}
                  </div>

                  {/* Summary Box */}
                  <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '12px', border: '1px solid #e2e8f0', marginTop: '8px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', fontWeight: 700, color: '#0f172a' }}>
                      <span>Total Amount Payable:</span>
                      <span style={{ color: '#047857', fontSize: '18px' }}>₹{finalPayable}</span>
                    </div>
                    <p style={{ margin: '8px 0 0', fontSize: '12px', color: '#64748b' }}>
                      🔒 GST Tax Invoice will be automatically generated and deposited in your <strong>AarogyaLocker</strong>.
                    </p>
                  </div>

                  <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
                    <button
                      onClick={() => setCheckoutStep('rx')}
                      style={{ flex: 1, padding: '12px', background: '#f1f5f9', border: 'none', borderRadius: '10px', fontWeight: 600, cursor: 'pointer' }}
                    >
                      ← Back
                    </button>
                    <button
                      onClick={handlePlaceOrder}
                      style={{
                        flex: 2,
                        padding: '12px',
                        background: '#047857',
                        color: 'white',
                        border: 'none',
                        borderRadius: '10px',
                        fontWeight: 700,
                        cursor: 'pointer',
                        boxShadow: '0 4px 12px rgba(4,120,87,0.3)'
                      }}
                    >
                      Confirm & Pay ₹{finalPayable}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Order Success Modal */}
      {completedOrderId && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.7)',
          zIndex: 1200,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '16px'
        }}>
          <div style={{
            background: 'white',
            width: '100%',
            maxWidth: '520px',
            borderRadius: '24px',
            padding: '32px 24px',
            textAlign: 'center',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
          }}>
            <div style={{
              width: '72px',
              height: '72px',
              borderRadius: '50%',
              background: '#dcfce7',
              color: '#15803d',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '36px',
              margin: '0 auto 16px'
            }}>
              ✓
            </div>

            <h2 style={{ fontSize: '24px', fontWeight: 800, color: '#0f172a', margin: '0 0 8px' }}>
              Order Placed Successfully!
            </h2>
            <p style={{ fontSize: '14px', color: '#64748b', margin: '0 0 20px' }}>
              Order ID: <strong>#{completedOrderId}</strong> • Estimated Delivery: Today by 6:00 PM
            </p>

            {/* AarogyaLocker Auto-generation alert */}
            <div style={{
              background: '#eff6ff',
              border: '1px solid #bfdbfe',
              borderRadius: '16px',
              padding: '16px',
              textAlign: 'left',
              marginBottom: '24px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#1e40af', fontWeight: 700, fontSize: '14px', marginBottom: '4px' }}>
                <span>🔐</span>
                <span>Saved to your AarogyaLocker!</span>
              </div>
              <p style={{ margin: 0, fontSize: '13px', color: '#3b82f6', lineHeight: 1.5 }}>
                Your itemized medical invoice has been issued with digital GST compliance and linked directly to your <strong>ABHA Universal Health ID</strong>.
              </p>
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                onClick={() => {
                  setCompletedOrderId(null);
                  setIsCheckoutOpen(false);
                }}
                style={{
                  flex: 1,
                  padding: '12px',
                  background: '#f1f5f9',
                  color: '#475569',
                  border: 'none',
                  borderRadius: '10px',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                Continue Shopping
              </button>
              <button
                onClick={() => {
                  setCompletedOrderId(null);
                  setIsCheckoutOpen(false);
                  navigate('/health-records');
                }}
                style={{
                  flex: 1.4,
                  padding: '12px',
                  background: '#047857',
                  color: 'white',
                  border: 'none',
                  borderRadius: '10px',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                View Invoice in Locker →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Medicine Details Modal */}
      {selectedMedicine && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          zIndex: 1100,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '16px'
        }}>
          <div style={{
            background: 'white',
            width: '100%',
            maxWidth: '540px',
            borderRadius: '20px',
            padding: '24px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
              <div>
                <span style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: '#047857', background: '#d1fae5', padding: '3px 8px', borderRadius: '4px' }}>
                  {selectedMedicine.category}
                </span>
                <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#0f172a', margin: '8px 0 2px' }}>
                  {selectedMedicine.name}
                </h3>
                <p style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>
                  By {selectedMedicine.brand} • {selectedMedicine.packSize}
                </p>
              </div>
              <button
                onClick={() => setSelectedMedicine(null)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}
              >
                <CloseIcon size={20} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '14px', color: '#334155', lineHeight: 1.5 }}>
              <div>
                <strong style={{ color: '#0f172a', display: 'block', marginBottom: '4px' }}>Clinical Indications:</strong>
                {selectedMedicine.description}
              </div>

              <div style={{ background: '#f8fafc', padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                <strong style={{ color: '#0f172a', display: 'block', marginBottom: '4px' }}>Active Molecular Composition:</strong>
                {selectedMedicine.composition}
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #f1f5f9', paddingTop: '16px', marginTop: '8px' }}>
                <div>
                  <span style={{ fontSize: '22px', fontWeight: 800, color: '#047857' }}>
                    ₹{selectedMedicine.price}
                  </span>
                  <span style={{ fontSize: '14px', color: '#94a3b8', textDecoration: 'line-through', marginLeft: '8px' }}>
                    ₹{selectedMedicine.mrp}
                  </span>
                </div>

                <button
                  onClick={() => {
                    addToCart(selectedMedicine);
                    setSelectedMedicine(null);
                    setIsCartOpen(true);
                  }}
                  style={{
                    background: '#047857',
                    color: 'white',
                    border: 'none',
                    padding: '10px 20px',
                    borderRadius: '8px',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  Add to Cart & Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
