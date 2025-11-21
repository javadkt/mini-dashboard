import React, { useEffect, useMemo, useState } from 'react';
import { competitionsApi } from '../api/competitions';
import { Competition } from '../types/Competition';
import CompetitionCard from '../components/CompetitionCard';
import Button from '../components/Button';
import { emitToast } from '../utils/events';
import '../components/styles.css';

const PAGE_SIZE = 6;

const Dashboard: React.FC = () => {
  const [items, setItems] = useState<Competition[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    const resp = await competitionsApi.list();
    if (resp.success && resp.data) {
      setItems(resp.data);
    } else {
      setError(resp.message || 'Failed to load competitions');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q ? items.filter((c) => c.name.toLowerCase().includes(q)) : items;
  }, [items, query]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageItems = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  useEffect(() => {
    // reset page when filter changes
    setPage(1);
  }, [query]);

  const onJoin = async (id: number) => {
    const resp = await competitionsApi.join(id);
    if (resp.success) {
      emitToast({ type: 'success', message: 'Joined successfully!' });
      setItems((prev) => prev.map((c) => (c.id === id ? { ...c, joined: true, participants: c.participants + 1 } : c)));
    } else {
      emitToast({ type: 'error', message: resp.message || 'Failed to join' });
    }
  };

  return (
    <div className="container">
      <div className="toolbar">
        <h2 className="page-title" style={{ margin: 0 }}>Competitions</h2>
        <span className="badge">{filtered.length} total</span>
        <div style={{ flex: 1 }} />
        <input
          className="input"
          style={{ maxWidth: 260 }}
          placeholder="Search competitions..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {error && (
        <div className="card" style={{ borderColor: 'rgba(239,68,68,0.35)' }}>
          <div className="card-title">Error</div>
          <div style={{ color: '#ef9a9a' }}>{error}</div>
          <div className="hr" />
          <Button variant="secondary" onClick={fetchData}>Retry</Button>
        </div>
      )}

      {!error && (
        <div className="row">
          {pageItems.map((c) => (
            <div className="col" key={c.id}>
              <CompetitionCard competition={c} onJoin={onJoin} />
            </div>
          ))}
          {!loading && pageItems.length === 0 && (
            <div className="card" style={{ width: '100%' }}>
              <div>No competitions match your filter.</div>
            </div>
          )}
        </div>
      )}

      <div className="toolbar" style={{ justifyContent: 'center', marginTop: 12 }}>
        <Button variant="secondary" disabled={page <= 1} onClick={() => setPage((p) => Math.max(1, p - 1))}>Prev</Button>
        <span style={{ color: '#9aa4ad' }}>Page {page} / {totalPages}</span>
        <Button variant="secondary" disabled={page >= totalPages} onClick={() => setPage((p) => Math.min(totalPages, p + 1))}>Next</Button>
      </div>
    </div>
  );
};

export default Dashboard;
