# Vercel demo deployment

Use this one-click Vercel deploy link to create your demo instantly:

- **Deploy now:** https://vercel.com/new/clone?repository-url=https://github.com/Julie-del0304/web-dmiec

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
- Build output is `dist` and build command is `npm run build`.
