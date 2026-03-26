# Vercel demo deployment

This project is now ready for one-command deploys to Vercel.

## 1) Install and login

```bash
npm i -g vercel
vercel login
```

## 2) Link this folder to your Vercel project

```bash
vercel link
```

- Choose your scope/team.
- Select **Create new project** (or connect to an existing one).

## 3) Deploy a preview (demo link)

```bash
vercel --yes
```

Vercel prints a preview URL like:

- `https://web-dmiec-git-main-your-team.vercel.app`

## 4) Deploy to production (optional)

```bash
vercel --prod --yes
```

## Notes

- `vercel.json` is configured for Vite and uses a catch-all rewrite to `index.html` so client-side React Router paths work on refresh.
- Build output is `dist` and build command is `npm run build`.
