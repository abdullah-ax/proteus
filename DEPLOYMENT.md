# Deployment Guide

## Required Environment Variables

### 1. Convex Configuration

Set up Convex backend:

```bash
npx convex dev
```

This will generate:
- `CONVEX_DEPLOYMENT`
- `NEXT_PUBLIC_CONVEX_URL`

Add these to your Vercel environment variables.

### 2. WorkOS Authentication

Get your WorkOS credentials from [WorkOS Dashboard](https://dashboard.workos.com):

```bash
WORKOS_CLIENT_ID=client_xxx
WORKOS_API_KEY=sk_xxx
WORKOS_REDIRECT_URI=https://your-domain.vercel.app/callback
WORKOS_COOKIE_PASSWORD=<generate-32-char-password>
```

Generate WORKOS_COOKIE_PASSWORD (must be 32+ characters):
```bash
openssl rand -base64 32
```

**Important**: Update the redirect URI in your WorkOS dashboard to match your Vercel domain.

### 3. OpenRouter API

Get your API key from [OpenRouter Keys](https://openrouter.ai/keys):

```bash
OPENROUTER_API_KEY=sk-or-v1-...
```

Add this to the **Convex Dashboard** under Environment Variables (not Vercel), as the pipeline runs in Convex actions.

**Note**: The pipeline uses Gemini 2.0 Flash through OpenRouter, which routes through your OpenRouter credits instead of directly hitting Google's API.

## Vercel Deployment Steps

1. **Push your code** to GitHub

2. **Import project** in Vercel dashboard

3. **Add environment variables** in Vercel project settings:
   - `CONVEX_DEPLOYMENT`
   - `NEXT_PUBLIC_CONVEX_URL`
   - `WORKOS_CLIENT_ID`
   - `WORKOS_API_KEY`
   - `WORKOS_REDIRECT_URI` (use your Vercel URL + `/callback`)
   - `WORKOS_COOKIE_PASSWORD`

4. **Deploy Convex backend**:
   ```bash
   npx convex deploy --prod
   ```

5. **Add OPENROUTER_API_KEY** in Convex Dashboard:
   - Go to https://dashboard.convex.dev
   - Select your project
   - Navigate to Settings → Environment Variables
   - Add `OPENROUTER_API_KEY`

6. **Update WorkOS Redirect URI**:
   - Go to WorkOS Dashboard → Your App → Redirect URIs
   - Add: `https://your-vercel-domain.vercel.app/callback`

7. **Redeploy** Vercel (trigger a new deployment to pick up all env vars)

## Testing Deployment

1. Visit your Vercel URL
2. Upload a test image
3. Check Convex logs for pipeline execution
4. Verify all 6 stages complete successfully

## Troubleshooting

### 500 Error on Vercel
- Check that all environment variables are set
- Verify WorkOS redirect URI matches your Vercel domain
- Check Vercel function logs for specific errors

### Pipeline Fails
- Verify `OPENROUTER_API_KEY` is set in Convex Dashboard (not Vercel)
- Check Convex logs for error messages
- Ensure you have sufficient OpenRouter credits (check https://openrouter.ai/credits)

### Authentication Issues
- Verify `WORKOS_COOKIE_PASSWORD` is at least 32 characters
- Check WorkOS dashboard for redirect URI configuration
- Ensure `WORKOS_API_KEY` has proper permissions

## Development vs Production

**Local development** (`.env.local`):
- Uses `npx convex dev` for local Convex instance
- WorkOS auth optional (middleware gracefully skips if not configured)

**Production** (Vercel + Convex):
- Uses `npx convex deploy --prod`
- All environment variables required
- WorkOS auth fully enabled

## Security Notes

- Never commit `.env.local` or real API keys to git
- Rotate `WORKOS_COOKIE_PASSWORD` periodically
- Use separate WorkOS environments for dev/prod
- Monitor Gemini API usage and set quotas
