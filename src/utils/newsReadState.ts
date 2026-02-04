const STORAGE_KEY = 'eventNews.readSlugs';
const CHANGE_EVENT = 'eventNewsReadStateChanged';

function safeParse(value: string | null): string[] {
  if (!value) return [];
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed.filter((v) => typeof v === 'string') : [];
  } catch {
    return [];
  }
}

export function getReadNewsSlugs(): string[] {
  if (typeof window === 'undefined') return [];
  return safeParse(window.localStorage.getItem(STORAGE_KEY));
}

export function isNewsRead(slug: string): boolean {
  return getReadNewsSlugs().includes(slug);
}

export function markNewsRead(slug: string): void {
  if (typeof window === 'undefined') return;
  const current = new Set(getReadNewsSlugs());
  if (current.has(slug)) return;
  current.add(slug);
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(current)));
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

export function subscribeNewsReadStateChanged(callback: () => void): () => void {
  if (typeof window === 'undefined') return () => undefined;

  const onStorage = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY) callback();
  };
  const onCustom = () => callback();

  window.addEventListener('storage', onStorage);
  window.addEventListener(CHANGE_EVENT, onCustom);

  return () => {
    window.removeEventListener('storage', onStorage);
    window.removeEventListener(CHANGE_EVENT, onCustom);
  };
}
