"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { Search, X, Loader2 } from "lucide-react";
import BlogImage from "@/components/BlogImage";

export default function BlogSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);
  const debounceRef = useRef(null);

  const fetchResults = useCallback(async (q) => {
    if (q.length < 2) {
      setResults([]);
      setOpen(false);
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`/api/arama?q=${encodeURIComponent(q)}`);
      const data = await res.json();
      setResults(data.results || []);
      setOpen(true);
    } catch {
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    clearTimeout(debounceRef.current);
    if (query.length < 2) {
      setResults([]);
      setOpen(false);
      setLoading(false);
      return;
    }
    setLoading(true);
    debounceRef.current = setTimeout(() => fetchResults(query), 350);
    return () => clearTimeout(debounceRef.current);
  }, [query, fetchResults]);

  useEffect(() => {
    function handleClick(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  function handleClear() {
    setQuery("");
    setResults([]);
    setOpen(false);
  }

  return (
    <div ref={containerRef} className="relative">
      <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus-within:border-violet-400 focus-within:bg-white focus-within:shadow-sm transition-all duration-200">
        {loading ? (
          <Loader2 className="w-4 h-4 text-violet-400 animate-spin flex-shrink-0" />
        ) : (
          <Search className="w-4 h-4 text-slate-400 flex-shrink-0" />
        )}
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => results.length > 0 && setOpen(true)}
          placeholder="Yazılarda ara..."
          className="flex-1 bg-transparent text-sm text-slate-800 placeholder:text-slate-400 outline-none min-w-0"
        />
        {query && (
          <button
            onClick={handleClear}
            className="flex-shrink-0 text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {open && (
        <div className="absolute top-full left-0 right-0 mt-1.5 bg-white rounded-xl border border-slate-200 shadow-lg overflow-hidden z-50">
          {results.length === 0 ? (
            <p className="text-sm text-slate-400 text-center py-4 px-3">
              Sonuç bulunamadı.
            </p>
          ) : (
            <ul>
              {results.map((post) => (
                <li key={post.id}>
                  <Link
                    href={`/yazilarim/${post.sef}`}
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-3 px-3 py-2.5 hover:bg-violet-50 transition-colors group"
                  >
                    <div className="relative flex-shrink-0 w-10 h-10 rounded-lg overflow-hidden bg-slate-100">
                      <BlogImage
                        resim={post.resim}
                        alt={post.baslik}
                        fill
                        className="object-cover"
                        sizes="40px"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-slate-800 group-hover:text-violet-700 line-clamp-1 leading-snug transition-colors">
                        {post.baslik}
                      </p>
                      <span className="text-[11px] text-violet-500 font-medium">
                        {post.kategori_adi}
                      </span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
