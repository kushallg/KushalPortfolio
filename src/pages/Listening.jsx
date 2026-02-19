import { useState, useEffect } from 'react';
import './Listening.css';

const API_KEY  = import.meta.env.VITE_LASTFM_API_KEY;
const USERNAME = import.meta.env.VITE_LASTFM_USERNAME;

// ── Helpers ──────────────────────────────────────────────────────────────────

function timeAgo(date) {
  const diff  = Date.now() - date.getTime();
  const mins  = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days  = Math.floor(hours / 24);
  if (mins  < 60) return `${mins}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days  === 1) return '1d ago';
  return `${days}d ago`;
}

function dateGroupKey(date) {
  const today     = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  if (date.toDateString() === today.toDateString())     return 'Today';
  if (date.toDateString() === yesterday.toDateString()) return 'Yesterday';
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

// ── Sub-components ────────────────────────────────────────────────────────────

function AlbumArt({ src, alt, className }) {
  const [failed, setFailed] = useState(false);
  if (!src || failed) return <div className={`${className} art-placeholder`} />;
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => setFailed(true)}
    />
  );
}

const FeedIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="5"  width="3" height="3" rx="0.5" />
    <line x1="9" y1="6.5" x2="21" y2="6.5" />
    <rect x="3" y="11" width="3" height="3" rx="0.5" />
    <line x1="9" y1="12.5" x2="21" y2="12.5" />
    <rect x="3" y="17" width="3" height="3" rx="0.5" />
    <line x1="9" y1="18.5" x2="21" y2="18.5" />
  </svg>
);

const GridIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3"  y="3"  width="7" height="7" rx="1" />
    <rect x="14" y="3"  width="7" height="7" rx="1" />
    <rect x="3"  y="14" width="7" height="7" rx="1" />
    <rect x="14" y="14" width="7" height="7" rx="1" />
  </svg>
);

// ── Main component ────────────────────────────────────────────────────────────

export default function Listening() {
  const [view,   setView]   = useState('feed');
  const [fading, setFading] = useState(false);
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);

  useEffect(() => {
    if (!API_KEY || !USERNAME) {
      setError('Add VITE_LASTFM_API_KEY and VITE_LASTFM_USERNAME to your .env file.');
      setLoading(false);
      return;
    }

    fetch(
      `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks` +
      `&user=${USERNAME}&api_key=${API_KEY}&format=json&limit=50`
    )
      .then(res => res.json())
      .then(data => {
        if (data.error) throw new Error(`Last.fm error ${data.error}: ${data.message}`);
        const raw = Array.isArray(data.recenttracks.track)
          ? data.recenttracks.track
          : [data.recenttracks.track];

        setTracks(raw.map(t => ({
          name:      t.name,
          artist:    t.artist?.['#text'] ?? '',
          album:     t.album?.['#text']  ?? '',
          image:     t.image?.[2]?.['#text'] ?? '',
          imageLg:   t.image?.[3]?.['#text'] ?? t.image?.[2]?.['#text'] ?? '',
          url:       t.url,
          nowPlaying: t['@attr']?.nowplaying === 'true',
          date:      t.date ? new Date(parseInt(t.date.uts) * 1000) : null,
        })));
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  function switchView(to) {
    if (to === view || fading) return;
    setFading(true);
    setTimeout(() => {
      setView(to);
      setFading(false);
    }, 180);
  }

  // Group tracks by date for feed view
  const groups = (() => {
    const map   = {};
    const ORDER = ['Now Playing', 'Today', 'Yesterday'];
    tracks.forEach(t => {
      const key = t.nowPlaying ? 'Now Playing' : (t.date ? dateGroupKey(t.date) : 'Unknown');
      if (!map[key]) map[key] = [];
      map[key].push(t);
    });
    const ordered = [
      ...ORDER.filter(k => map[k]),
      ...Object.keys(map).filter(k => !ORDER.includes(k)),
    ];
    return ordered.map(key => ({ key, tracks: map[key] }));
  })();

  return (
    <div className="listening-container">

      {/* Header */}
      <div className="listening-header">
        <h1 className="listening-title">Listening</h1>
        <div className="view-toggle">
          <button
            className={`toggle-btn ${view === 'feed' ? 'active' : ''}`}
            onClick={() => switchView('feed')}
            title="Feed view"
          >
            <FeedIcon />
          </button>
          <button
            className={`toggle-btn ${view === 'grid' ? 'active' : ''}`}
            onClick={() => switchView('grid')}
            title="Grid view"
          >
            <GridIcon />
          </button>
        </div>
      </div>

      {/* States */}
      {loading && <p className="listening-status">Loading...</p>}
      {error   && <p className="listening-status listening-error">{error}</p>}

      {/* Content */}
      {!loading && !error && (
        <div className={`listening-content ${fading ? 'fading' : ''}`}>

          {/* ── Feed view ── */}
          {view === 'feed' && (
            <div className="listening-feed">
              {groups.map(({ key, tracks: group }) => (
                <div key={key} className="date-group">
                  <div className="date-header">
                    {key === 'Now Playing' && <span className="now-dot" />}
                    <span className="date-text">{key}</span>
                    <div className="date-line" />
                  </div>
                  <ul className="track-list">
                    {group.map((track, i) => (
                      <li key={`${track.name}-${i}`}>
                        <a
                          href={track.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="track"
                        >
                          <AlbumArt
                            src={track.image}
                            alt={track.album}
                            className="track-art"
                          />
                          <div className="track-info">
                            <span className="track-title">{track.name}</span>
                            <span className="sep">—</span>
                            <span className="track-artist">{track.artist}</span>
                          </div>
                          <span className="track-time">
                            {track.nowPlaying ? 'now' : timeAgo(track.date)}
                          </span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}

          {/* ── Grid view ── */}
          {view === 'grid' && (
            <div className="listening-grid">
              {tracks.map((track, i) => (
                <a
                  key={`${track.name}-${i}`}
                  href={track.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tile"
                >
                  <div className="tile-art-wrap">
                    <AlbumArt
                      src={track.imageLg}
                      alt={track.album}
                      className="tile-art"
                    />
                    <div className="tile-overlay">
                      <span>{track.artist}</span>
                    </div>
                  </div>
                  <div className="tile-info">
                    <div className="tile-title">{track.name}</div>
                    <div className="tile-artist">{track.artist}</div>
                  </div>
                </a>
              ))}
            </div>
          )}

        </div>
      )}
    </div>
  );
}
