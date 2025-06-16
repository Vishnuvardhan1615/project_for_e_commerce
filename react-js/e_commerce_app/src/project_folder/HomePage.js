import React from 'react';

function HomePage() {
  return (
    <main style={{
      maxWidth: 1200,
      margin: '0 auto',
      padding: '40px 16px 60px 16px',
      fontFamily: 'Segoe UI, Arial, sans-serif',
      color: '#232526',
    }}>
      <section style={{ marginBottom: 48 }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 900, color: '#007bff', marginBottom: 12, textShadow: '0 2px 8px #e3f2fd' }}>
          Welcome to ShopEase
        </h1>
        <p style={{ fontSize: '1.2rem', color: '#333', maxWidth: 700 }}>
          Your one-stop shop for all things awesome! Explore our products, enjoy exclusive offers, and experience a modern e-commerce platform built with React.js best practices.
        </p>
      </section>
      <section id="products" style={{ marginBottom: 40 }}>
        <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#007bff', marginBottom: 18 }}>Featured Products</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 32 }}>
          {/* Dynamically load products from DummyJSON */}
          <ProductList />
        </div>
      </section>
      <section id="offers" style={{ marginBottom: 40 }}>
        <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#007bff', marginBottom: 18 }}>Special Offers</h2>
        <ul style={{ fontSize: '1.1rem', color: '#333', lineHeight: 1.7 }}>
          <li>Flat 20% off on your first order!</li>
          <li>Free shipping on orders above ₹999</li>
          <li>Refer a friend and get ₹200 cashback</li>
        </ul>
      </section>
      <section id="about" style={{ marginBottom: 40 }}>
        <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#007bff', marginBottom: 18 }}>About Us</h2>
        <p style={{ fontSize: '1.1rem', color: '#333', maxWidth: 800 }}>
          ShopEase is a demo e-commerce website built with React.js, featuring modern UI, product carousel, OTP authentication, and more. This project demonstrates best practices in React development, including API integration, state management, and beautiful design.
        </p>
      </section>
      <section id="contact">
        <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#007bff', marginBottom: 18 }}>Contact</h2>
        <p style={{ fontSize: '1.1rem', color: '#333' }}>Email: support@shopease.com</p>
        <p style={{ fontSize: '1.1rem', color: '#333' }}>Phone: +91-90000-00000</p>
      </section>
    </main>
  );
}

function ProductCard({ title, desc, price, img, product, onShowDetails, onBuy }) {
  return (
    <div style={{
      width: 260,
      background: '#fff',
      borderRadius: 14,
      boxShadow: '0 2px 16px #007bff11',
      padding: 18,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      transition: 'transform 0.18s',
      cursor: 'pointer',
      border: '1px solid #e3f2fd',
    }}>
      <img src={img} alt={title} style={{ width: 120, height: 120, objectFit: 'cover', borderRadius: 10, marginBottom: 12, boxShadow: '0 2px 8px #007bff22' }} />
      <div style={{ fontWeight: 700, fontSize: '1.1rem', color: '#232526', marginBottom: 6 }}>{title}</div>
      <div style={{ color: '#555', fontSize: '0.98rem', marginBottom: 8 }}>{desc}</div>
      <div style={{ color: '#007bff', fontWeight: 700, fontSize: '1.1rem' }}>₹{price}</div>
      <button onClick={() => onShowDetails(product)} style={{ marginTop: 12, padding: '8px 18px', borderRadius: 6, background: '#007bff', color: '#fff', border: 'none', fontWeight: 600, cursor: 'pointer', fontSize: '1rem' }}>Show Details</button>
      <button onClick={() => onBuy(product)} style={{ marginTop: 8, padding: '8px 18px', borderRadius: 6, background: '#28a745', color: '#fff', border: 'none', fontWeight: 600, cursor: 'pointer', fontSize: '1rem' }}>Buy Now</button>
    </div>
  );
}

function ProductDetailsModal({ product, onClose }) {
  const [mainImg, setMainImg] = React.useState(product?.images?.[0] || product?.thumbnail);
  const [zoom, setZoom] = React.useState(false);
  const [zoomPos, setZoomPos] = React.useState({ x: 0, y: 0 });
  if (!product) return null;
  const handleMouseMove = e => {
    const rect = e.target.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPos({ x, y });
  };
  return (
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
        background: '#fff',
        borderRadius: 18,
        boxShadow: '0 8px 32px #007bff44',
        padding: '38px 48px',
        minWidth: 340,
        maxWidth: 500,
        textAlign: 'left',
        position: 'relative',
      }}>
        <button onClick={onClose} style={{ position: 'absolute', top: 12, right: 18, background: 'none', border: 'none', fontSize: 22, color: '#007bff', cursor: 'pointer', fontWeight: 700 }}>×</button>
        <h2 style={{ color: '#007bff', fontWeight: 800, marginBottom: 12 }}>{product.title}</h2>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 16 }}>
          <div
            style={{
              width: 220,
              height: 220,
              borderRadius: 12,
              overflow: 'hidden',
              boxShadow: '0 2px 8px #007bff22',
              marginBottom: 10,
              position: 'relative',
              background: '#f8fafd',
              cursor: 'zoom-in',
            }}
            onMouseEnter={() => setZoom(true)}
            onMouseLeave={() => setZoom(false)}
            onMouseMove={handleMouseMove}
          >
            <img
              src={mainImg}
              alt={product.title}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                transition: 'transform 0.2s',
                transform: zoom ? 'scale(1.7)' : 'scale(1)',
                transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
                borderRadius: 12,
              }}
            />
            {zoom && (
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                borderRadius: 12,
                border: '2px solid #007bff44',
                pointerEvents: 'none',
              }} />
            )}
          </div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 8 }}>
            {(product.images || [product.thumbnail]).map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={product.title + ' img'}
                style={{
                  width: 48,
                  height: 48,
                  objectFit: 'cover',
                  borderRadius: 6,
                  border: mainImg === img ? '2px solid #007bff' : '1px solid #eee',
                  cursor: 'pointer',
                  boxShadow: mainImg === img ? '0 2px 8px #007bff33' : 'none',
                  transition: 'border 0.15s, box-shadow 0.15s',
                }}
                onClick={() => setMainImg(img)}
              />
            ))}
          </div>
        </div>
        <div style={{ marginBottom: 8 }}><b>Description:</b> {product.description}</div>
        <div style={{ marginBottom: 8 }}><b>Brand:</b> {product.brand}</div>
        <div style={{ marginBottom: 8 }}><b>Category:</b> {product.category}</div>
        <div style={{ marginBottom: 8 }}><b>Price:</b> ₹{product.price}</div>
        <div style={{ marginBottom: 8 }}><b>Discount:</b> {product.discountPercentage}%</div>
        <div style={{ marginBottom: 8 }}><b>Rating:</b> {product.rating}</div>
        <div style={{ marginBottom: 8 }}><b>Stock:</b> {product.stock}</div>
        <div style={{ marginBottom: 8 }}><b>Tags:</b> {product.tags && product.tags.length ? product.tags.join(', ') : 'N/A'}</div>
      </div>
    </div>
  );
}

function BuyModal({ product, onClose }) {
  if (!product) return null;
  return (
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
        background: '#fff',
        borderRadius: 18,
        boxShadow: '0 8px 32px #28a74544',
        padding: '38px 48px',
        minWidth: 340,
        maxWidth: 400,
        textAlign: 'center',
        position: 'relative',
      }}>
        <button onClick={onClose} style={{ position: 'absolute', top: 12, right: 18, background: 'none', border: 'none', fontSize: 22, color: '#28a745', cursor: 'pointer', fontWeight: 700 }}>×</button>
        <h2 style={{ color: '#28a745', fontWeight: 800, marginBottom: 12 }}>Buy Product</h2>
        <img src={product.thumbnail} alt={product.title} style={{ width: 100, height: 100, objectFit: 'cover', borderRadius: 10, marginBottom: 16, boxShadow: '0 2px 8px #28a74522' }} />
        <div style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: 8 }}>{product.title}</div>
        <div style={{ color: '#555', fontSize: '0.98rem', marginBottom: 8 }}>{product.description}</div>
        <div style={{ color: '#28a745', fontWeight: 700, fontSize: '1.1rem', marginBottom: 18 }}>₹{product.price}</div>
        <div style={{ color: '#333', marginBottom: 18 }}>This is a demo. No real purchase will be made.</div>
        <button onClick={onClose} style={{ padding: '8px 18px', borderRadius: 6, background: '#28a745', color: '#fff', border: 'none', fontWeight: 600, cursor: 'pointer', fontSize: '1rem' }}>Close</button>
      </div>
    </div>
  );
}

function ProductList() {
  const [products, setProducts] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [selectedProduct, setSelectedProduct] = React.useState(null);
  const [buyProduct, setBuyProduct] = React.useState(null);

  React.useEffect(() => {
    fetch('https://dummyjson.com/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data.products);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to load products');
        setLoading(false);
      });
  }, []);

  if (loading) return <div style={{ color: '#007bff', fontWeight: 600 }}>Loading products...</div>;
  if (error) return <div style={{ color: 'red', fontWeight: 600 }}>{error}</div>;

  return (
    <>
      {selectedProduct && <ProductDetailsModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />}
      {buyProduct && <BuyModal product={buyProduct} onClose={() => setBuyProduct(null)} />}
      {products.map(product => (
        <ProductCard
          key={product.id}
          title={product.title}
          desc={product.description}
          price={product.price}
          img={product.thumbnail}
          product={product}
          onShowDetails={setSelectedProduct}
          onBuy={setBuyProduct}
        />
      ))}
    </>
  );
}

export default HomePage;
