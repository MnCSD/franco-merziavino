import Link from 'next/link';

export default function NotFound() {
  return (
    <main style={{ minHeight: '70vh', display: 'grid', placeItems: 'center', padding: '120px 24px', textAlign: 'center' }}>
      <div>
        <p className="kicker" style={{ justifyContent: 'center' }}>404</p>
        <h1 style={{ fontSize: 'clamp(40px,6vw,80px)', letterSpacing: '-0.04em', margin: '16px 0 24px' }}>Δεν βρέθηκε · Not found</h1>
        <Link href="/" className="btn btn-primary">Franco Merzia Vino</Link>
      </div>
    </main>
  );
}
