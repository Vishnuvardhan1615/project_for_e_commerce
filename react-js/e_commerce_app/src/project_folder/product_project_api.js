// import React from "react";
// import { useState,useEffect } from "react";

import React, { useState, useEffect, useRef } from "react";
import EntryFormPopup from './EntryFormPopup';

function ProductProjectApi()
{

    const [products, setProducts] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [mainImageIndex, setMainImageIndex] = useState(0);
    const [zoomed, setZoomed] = useState(false);
    const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
    const [showWelcome, setShowWelcome] = useState(true);
    const [showEntryForm, setShowEntryForm] = useState(false);
    const lastMove = useRef(Date.now());

    useEffect(() => 
      {
        fetch("https://dummyjson.com/products")
        .then((response) => response.json())
        .then((data) => {
            setProducts(data.products || []); // Show all products, not just a subset
           });
 
      },[]);

      useEffect(() => {
        setMainImageIndex(0); // Reset main image when product changes
      }, [currentIndex]);

      useEffect(() => {
        if (showWelcome) {
          const timer = setTimeout(() => setShowWelcome(false), 2000);
          return () => clearTimeout(timer);
        }
      }, [showWelcome]);

      useEffect(() => {
        const timer = setTimeout(() => setShowEntryForm(true), 10000); // Show after 10 seconds
        return () => clearTimeout(timer);
      }, []);

      const goToPrev = () => {
        setCurrentIndex((prev) => (prev === 0 ? products.length - 1 : prev - 1));
      };
    
      const goToNext = () => {
        setCurrentIndex((prev) => (prev === products.length - 1 ? 0 : prev + 1));
      };
    
      if (!products.length) {
        return <div>Loading...</div>;
      }
    
      const product = products[currentIndex];
      const mainImage = product.images && product.images[mainImageIndex] ? product.images[mainImageIndex] : product.thumbnail;

      // Mouse move handler for zoom (throttled)
      const handleMouseMove = (e) => {
        const now = Date.now();
        if (now - lastMove.current < 16) return; // ~60fps throttle
        lastMove.current = now;
        const rect = e.target.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        setZoomPosition({ x, y });
      };

    return (
        <div style={{ position: 'relative' }}>
      {/* Entry Form Popup after 10 seconds */}
      {showEntryForm && <EntryFormPopup onClose={() => setShowEntryForm(false)} />}
      {/* Welcome Pop-up Animation */}
      {showWelcome && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: 'rgba(0,0,0,0.35)',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          animation: 'fadeIn 0.4s',
        }}>
          <div style={{
            background: 'linear-gradient(120deg, #fff 60%, #e3f2fd 100%)',
            borderRadius: 18,
            boxShadow: '0 8px 32px #007bff44',
            padding: '38px 48px',
            minWidth: 320,
            textAlign: 'center',
            transform: 'scale(1)',
            animation: 'popIn 0.5s cubic-bezier(.68,-0.55,.27,1.55)',
          }}>
            <div style={{ fontSize: 48, marginBottom: 12, color: '#007bff', animation: 'bounce 1.2s infinite alternate' }}>🎉</div>
            <h2 style={{ margin: 0, fontWeight: 700, color: '#007bff', fontSize: '1.7rem', textShadow: '0 2px 8px #e3f2fd' }}>Welcome!</h2>
            <p style={{ margin: '12px 0 0', color: '#333', fontSize: '1.1rem' }}>Enjoy exploring our products.</p>
            <style>{`
              @keyframes popIn {
                0% { transform: scale(0.7); opacity: 0; }
                80% { transform: scale(1.1); opacity: 1; }
                100% { transform: scale(1); opacity: 1; }
              }
              @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
              }
              @keyframes bounce {
                0% { transform: translateY(0); }
                100% { transform: translateY(-12px); }
              }
            `}</style>
          </div>
        </div>
      )}
      <h2 style={{ marginBottom: '18px' }}>Product Carousel</h2>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', gap: '40px', minHeight: '320px' }}>
        {/* Left: Main image and thumbnails */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <img
            src={mainImage}
            alt={product.title}
            style={{ width: '340px', height: '340px', objectFit: 'cover', borderRadius: '10px', boxShadow: '0 2px 8px #ccc', marginBottom: '12px', cursor: 'zoom-in', border: '1px solid #eee', willChange: 'transform' }}
            onMouseEnter={() => setZoomed(true)}
            onMouseLeave={() => setZoomed(false)}
            onMouseMove={handleMouseMove}
            draggable={false}
          />
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '8px', marginBottom: '10px', marginTop: '10px', maxWidth: 340 }}>
            {/* Show all images for the current product as thumbnails */}
            {product.images && product.images.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={product.title + ' img'}
                style={{ width: '64px', height: '64px', objectFit: 'cover', borderRadius: '6px', border: idx === mainImageIndex ? '2px solid #007bff' : '1px solid #ccc', cursor: 'pointer', marginBottom: 4 }}
                onClick={() => setMainImageIndex(idx)}
                draggable={false}
              />
            ))}
          </div>
        </div>
        {/* Right: Zoomed image in separate box */}
        <div style={{ position: 'relative', width: '340px', height: '340px', borderRadius: '10px', overflow: 'hidden', border: zoomed ? '2px solid #007bff' : '1px solid #eee', background: '#fafafa', boxShadow: zoomed ? '0 2px 12px #bbb' : 'none', display: zoomed ? 'block' : 'none', zIndex: 10 }}>
          {zoomed && (
            <img
              src={mainImage}
              alt={product.title + ' zoom'}
              style={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                width: '500px',
                height: '500px',
                objectFit: 'cover',
                transform: `translate(-50%, -50%) scale(1.5) translate(-${(zoomPosition.x - 50) * 3.4}px, -${(zoomPosition.y - 50) * 3.4}px)`,
                borderRadius: '10px',
                transition: 'transform 0.08s',
                pointerEvents: 'none',
                willChange: 'transform',
              }}
              draggable={false}
            />
          )}
        </div>
      </div>
      <div style={{ fontWeight: 'bold', fontSize: '1.1rem', marginBottom: '8px', marginTop: '10px' }}>{product.title}</div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '18px' }}>
        <button onClick={goToPrev} style={{ padding: '8px 18px', borderRadius: '6px', border: 'none', background: '#007bff', color: '#fff', fontWeight: 'bold', cursor: 'pointer' }}>&lt; Prev</button>
        <span style={{ alignSelf: 'center', fontWeight: 'bold' }}>{currentIndex + 1} / {products.length}</span>
        <button onClick={goToNext} style={{ padding: '8px 18px', borderRadius: '6px', border: 'none', background: '#007bff', color: '#fff', fontWeight: 'bold', cursor: 'pointer' }}>Next &gt;</button>
      </div>
    </div>
    );
   

}
export default ProductProjectApi;






