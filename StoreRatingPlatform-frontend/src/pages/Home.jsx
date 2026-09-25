import { Link } from "react-router-dom";
import "./Home.css";

const roles = [
  { key: "normal_user", tag: "NORMAL USER", title: "Rate stores you visit", desc: "Search registered stores, submit a rating in one click, and update it any time you change your mind.", bullets: ["Search by name or address", "Submit & update your rating", "See live overall ratings"], needsApproval: false },
  { key: "store_owner", tag: "STORE OWNER", title: "Track your reputation", desc: "See every customer who rated your store and watch your average rating update in real time.", bullets: ["List of everyone who rated you", "Average rating dashboard", "Change your password anytime"], needsApproval: true },
  { key: "admin", tag: "ADMIN", title: "Oversee the platform", desc: "Approve new accounts, add users and stores directly, and keep an eye on platform-wide stats.", bullets: ["Approve admins & store owners", "Add users and stores", "Full stats dashboard"], needsApproval: true },
];

const steps = [
  { num: "01", title: "Search & discover", desc: "Find registered stores by name or address in seconds." },
  { num: "02", title: "Rate in one click", desc: "Pick 1 to 5 stars — submit now, change it whenever you like." },
  { num: "03", title: "Track live averages", desc: "Watch a store's overall rating update as more people rate it." },
];

const features = [
  { icon: "bi-shield-check", title: "Role-based access", desc: "Every route is guarded by JWT + role middleware, not just hidden in the UI." },
  { icon: "bi-key", title: "Admin-gated onboarding", desc: "Store owner and admin sign-ups are requests, not accounts, until an existing admin approves them." },
  { icon: "bi-star", title: "One rating, always current", desc: "Rating a store twice updates it instead of duplicating — enforced at the database level." },
  { icon: "bi-funnel", title: "Search & sort everywhere", desc: "Every table — users, stores, ratings — supports filtering and sortable columns." },
];

const Home = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-md home-navbar">
        <div className="container">
          <span className="navbar-brand fw-bold">Store<span className="text-primary">Rating</span></span>
          <div className="d-flex align-items-center gap-3">
            <a href="#roles" className="text-decoration-none text-dark d-none d-md-inline">Roles</a>
            <a href="#how-it-works" className="text-decoration-none text-dark d-none d-md-inline">How it works</a>
            <a href="#features" className="text-decoration-none text-dark d-none d-md-inline">Features</a>
            <Link to="/login" className="btn btn-outline-primary btn-sm">Sign in</Link>
            <Link to="/register" className="btn btn-primary btn-sm">Get started</Link>
          </div>
        </div>
      </nav>

      <header className="hero-grid-bg">
        <div className="container py-5">
          <div className="row align-items-center">
            <div className="col-lg-7">
              <span className="badge bg-primary-subtle text-primary mb-3">STORE RATING PLATFORM</span>
              <h1 className="display-5 fw-bold mb-3">One place, every store rated.</h1>
              <p className="lead text-muted mb-4">
                Customers rate stores in one click, store owners track their reputation, and admins keep the
                whole system in check — every account is checked before it can act.
              </p>
              <div className="d-flex gap-2 mb-3">
                <Link to="/register?role=normal_user" className="btn btn-primary btn-lg">Get started</Link>
                <Link to="/login" className="btn btn-outline-secondary btn-lg">Sign in</Link>
              </div>
              <small className="text-muted">
                Registering as a store owner or admin? See the <a href="#roles">Roles</a> section below —
                those accounts need admin approval before login.
              </small>
            </div>

            <div className="col-lg-5 mt-4 mt-lg-0">
              <div className="demo-card">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <small className="text-uppercase text-secondary">Try a rating</small>
                  <span className="live-dot"></span>
                </div>
                <div className="fw-bold text-white">Rai's General Store</div>
                <small className="text-secondary d-block mb-3">MG Road, Pune</small>
                <div>
                  {[1, 2, 3, 4, 5].map((s) => (
                    <i key={s} className={`bi ${s <= 4 ? "bi-star-fill" : "bi-star"} text-warning me-1`}></i>
                  ))}
                </div>
                <small className="text-secondary d-block mt-3">Tap a star — this is exactly how customers rate.</small>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section id="roles" className="container py-5">
        <span className="badge bg-primary-subtle text-primary mb-2">ROLES &amp; ACCESS</span>
        <h2 className="fw-bold mb-2">Built for every kind of user</h2>
        <p className="text-muted mb-4">One register form, three distinct experiences — enforced by the backend, not just hidden in the UI.</p>
        <div className="row g-3">
          {roles.map((r) => (
            <div className="col-md-4" key={r.key}>
              <div className="card role-card h-100 shadow-sm">
                <div className="card-body d-flex flex-column">
                  <small className="text-primary fw-semibold">{r.tag}</small>
                  <h5 className="fw-bold mt-1">{r.title}</h5>
                  <p className="text-muted small">{r.desc}</p>
                  <ul className="small text-muted mb-3 ps-3">
                    {r.bullets.map((b) => <li key={b}>{b}</li>)}
                  </ul>
                  {r.needsApproval && (
                    <span className="badge bg-warning-subtle text-warning mb-3 align-self-start">Needs admin approval</span>
                  )}
                  <Link to={`/register?role=${r.key}`} className="btn btn-outline-primary btn-sm mt-auto">
                    Register as {r.tag.charAt(0) + r.tag.slice(1).toLowerCase()}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="how-it-works" className="bg-light py-5">
        <div className="container">
          <span className="badge bg-primary-subtle text-primary mb-2">FOR CUSTOMERS</span>
          <h2 className="fw-bold mb-4">From search to rating in three steps</h2>
          <div className="row g-4">
            {steps.map((s) => (
              <div className="col-md-4" key={s.num}>
                <div className="step-num mb-2">{s.num}</div>
                <h6 className="fw-bold">{s.title}</h6>
                <p className="text-muted small">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="features" className="container py-5">
        <span className="badge bg-primary-subtle text-primary mb-2">UNDER THE HOOD</span>
        <h2 className="fw-bold mb-4">The details that keep it trustworthy</h2>
        <div className="row g-3">
          {features.map((f) => (
            <div className="col-md-3 col-sm-6" key={f.title}>
              <div className="card feature-card h-100 shadow-sm">
                <div className="card-body">
                  <div className="feature-icon mb-2"><i className={`bi ${f.icon}`}></i></div>
                  <h6 className="fw-bold">{f.title}</h6>
                  <p className="text-muted small mb-0">{f.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="cta-banner text-center py-5">
        <h2 className="text-white fw-bold mb-2">Ready to start rating stores?</h2>
        <p className="text-secondary mb-4">Create an account as a customer, or register your store / admin account for review.</p>
        <div className="d-flex justify-content-center gap-2">
          <Link to="/register" className="btn btn-primary btn-lg">Create account</Link>
          <Link to="/login" className="btn btn-outline-light btn-lg">I already have an account</Link>
        </div>
      </section>

      <footer className="home-footer py-4">
        <div className="container d-flex flex-wrap justify-content-between gap-4">
          <div>
            <div className="fw-bold">Store<span className="text-primary">Rating</span></div>
            <small className="text-muted">Ratings, roles, and reviews — one system.</small>
          </div>
          <div>
            <small className="text-uppercase text-muted d-block mb-2">Product</small>
            <a href="#roles" className="d-block small text-dark text-decoration-none mb-1">Roles</a>
            <a href="#how-it-works" className="d-block small text-dark text-decoration-none mb-1">How it works</a>
            <a href="#features" className="d-block small text-dark text-decoration-none">Features</a>
          </div>
          <div>
            <small className="text-uppercase text-muted d-block mb-2">Account</small>
            <Link to="/login" className="d-block small text-dark text-decoration-none mb-1">Sign in</Link>
            <Link to="/register" className="d-block small text-dark text-decoration-none">Create account</Link>
          </div>
        </div>
        <div className="text-center text-muted small mt-4">
          © 2026 Store Rating Platform. Built with Express, MySQL &amp; React.
        </div>
      </footer>
    </div>
  );
};

export default Home;