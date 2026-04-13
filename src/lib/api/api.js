export async function api(endpoint, options = {}) {
  const res = await fetch(endpoint, {
    method: options.method || "GET",
    headers: {
      "Content-Type": "application/json",
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
    cache: options.cache || "no-store",
  });

  if (!res.ok) {
    throw new Error("API Error");
  }

  return res.json();
}
