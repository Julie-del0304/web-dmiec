# Vercel demo deployment

Use this one-click Vercel deploy link to create your demo instantly:

- **Deploy now:** https://vercel.com/new/clone?repository-url=https://github.com/Julie-del0304/webdmiec

After clicking the link and finishing setup, Vercel will give you a demo URL like:

- `https://<project-name>.vercel.app`

## CLI option (if you prefer terminal)

```bash
npm i -g vercel
vercel login
vercel link
vercel --yes
```

The last command prints your preview URL.

## Production deploy

```bash
vercel --prod --yes
```

## Notes

- `vercel.json` is configured for Vite and uses a catch-all rewrite to `index.html` so React Router pages work on refresh.
- Vercel install step is forced to run a clean dependency install (`rm -rf node_modules && npm install`) to avoid issues from stale `node_modules` content.
- Build output is `out` and build command is `npm run build`.
