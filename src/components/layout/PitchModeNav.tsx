import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Presentation, X } from 'lucide-react';

const PITCH_MODE_KEY = 'nairobi-italian-pitch-mode';

export function pitchDemoLink(path: string) {
  const separator = path.includes('?') ? '&' : '?';
  return `${path}${separator}pitch=1`;
}

export function PitchModeNav() {
  const location = useLocation();
  const [isPitchMode, setIsPitchMode] = useState(false);

  useEffect(() => {
    const isPitchPage = location.pathname === '/pitch';
    const hasPitchFlag = new URLSearchParams(location.search).get('pitch') === '1';

    if (isPitchPage || hasPitchFlag) {
      sessionStorage.setItem(PITCH_MODE_KEY, 'true');
      setIsPitchMode(true);
      return;
    }

    setIsPitchMode(sessionStorage.getItem(PITCH_MODE_KEY) === 'true');
  }, [location.pathname, location.search]);

  if (!isPitchMode || location.pathname === '/pitch') {
    return null;
  }

  return (
    <div className="fixed inset-x-3 bottom-3 z-[80] sm:inset-x-auto sm:bottom-auto sm:right-4 sm:top-4 sm:w-[360px]">
      <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-[#161618]/95 p-2 text-white shadow-2xl backdrop-blur">
        <div className="hidden h-10 w-10 shrink-0 place-items-center rounded-lg bg-[#FF6B35]/15 text-[#FF6B35] sm:grid">
          <Presentation className="h-5 w-5" />
        </div>
        <Link
          to="/pitch"
          className="flex min-w-0 flex-1 flex-col rounded-lg px-2 py-1.5 transition-colors hover:bg-white/5"
        >
          <span className="truncate text-xs font-semibold uppercase tracking-wider text-[#FF6B35]">Pitch demo</span>
          <span className="truncate text-sm font-bold text-white">Back to owner pitch</span>
        </Link>
        <button
          type="button"
          aria-label="Exit pitch demo mode"
          onClick={() => {
            sessionStorage.removeItem(PITCH_MODE_KEY);
            setIsPitchMode(false);
          }}
          className="grid h-10 w-10 shrink-0 place-items-center rounded-lg text-slate-400 transition-colors hover:bg-white/5 hover:text-white"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
