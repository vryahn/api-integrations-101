// Practice API: answers fetch() calls to api/... inside the browser. Data lives in the Cache API.
const SCOPE = self.registration.scope, DB = 'api-integrations-101-db', KEY = SCOPE + '__db';
const JSON_H = { 'Content-Type': 'application/json; charset=utf-8' };
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));

const send = (status, obj) => new Response(obj === undefined ? '' : JSON.stringify(obj), { status, headers: obj === undefined ? {} : JSON_H });
const err = (status, msg) => send(status, { error: msg });

async function load() {
  const r = await (await caches.open(DB)).match(KEY);
  return r ? r.json() : {};
}
async function save(db) {
  await (await caches.open(DB)).put(KEY, new Response(JSON.stringify(db), { headers: JSON_H }));
}
const newId = () => Array.from(crypto.getRandomValues(new Uint8Array(12)), b => b.toString(16).padStart(2, '0')).join('');

async function handle(req) {
  const parts = new URL(req.url).pathname.slice(new URL(SCOPE).pathname.length + 4).split('/').filter(Boolean);
  const [col, id] = parts, m = req.method;
  const ok = parts.length === 1 ? (m === 'GET' || m === 'POST') : parts.length === 2 && ['GET', 'PUT', 'PATCH', 'DELETE'].includes(m);
  if (!ok) return err(405, 'Method Not Allowed');
  let body;
  if (m === 'POST' || m === 'PUT' || m === 'PATCH') {
    if (!(req.headers.get('Content-Type') || '').includes('application/json')) return err(415, 'Unsupported Media Type: send Content-Type application/json');
    try { body = JSON.parse(await req.text()); } catch (e) { body = null; }
    if (body === null || typeof body !== 'object' || Array.isArray(body)) return err(400, 'Bad Request: the body is not valid JSON');
  }
  const db = await load();
  const docs = db[col] || (db[col] = {});
  if (!id) {
    if (m === 'GET') return send(200, Object.values(docs));
    const _id = newId(), doc = Object.assign({ _id }, body, { _id });
    docs[doc._id] = doc; await save(db);
    return send(201, doc);
  }
  if (!docs[id]) return err(404, 'Not Found');
  if (m === 'GET') return send(200, docs[id]);
  if (m === 'DELETE') delete docs[id];
  else docs[id] = Object.assign({ _id: id }, m === 'PUT' ? body : { ...docs[id], ...body }, { _id: id });
  await save(db);
  return m === 'PATCH' ? send(200, docs[id]) : send(200);
}

self.addEventListener('fetch', e => {
  if (e.request.url.startsWith(SCOPE + 'api/')) e.respondWith(handle(e.request));
});
