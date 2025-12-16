# Vigilcap Website - Free Hosting Instructions

This guide will walk you through deploying your Vigilcap website for **completely free** using GitHub Pages.

---

## Prerequisites

1. **A GitHub account** - Create one at [github.com](https://github.com) if you don't have one
2. **Your domain** - You said you already have a domain ready
3. **Git installed** - Download from [git-scm.com](https://git-scm.com/) if needed

---

## Option 1: GitHub Pages (Recommended)

GitHub Pages is the easiest and most reliable free hosting option.

### Step 1: Create a GitHub Repository

1. Go to [github.com/new](https://github.com/new)
2. Name your repository: `vigilcap-website` (or any name)
3. Set it to **Public** (required for free GitHub Pages)
4. Click **Create repository**

### Step 2: Upload Your Website Files

**Option A: Using GitHub Desktop (Easier)**
1. Download [GitHub Desktop](https://desktop.github.com/)
2. Clone your new repository
3. Copy all files from your `Website` folder into the cloned folder:
   - `index.html`
   - `styles.css`
   - `script.js`
   - `terms.html`
   - `privacy.html`
   - `logo-full.png`
   - `flaticon-logo.png`
   - `risk-graph.png`
   - `report-page-1.png`
   - `report-page-2.png`
   - `Vigilcap_Report_juice-shop-master.pdf`
4. Commit and push

**Option B: Using Command Line**
```bash
cd "c:\Users\Magsihim_AI\Desktop\Main\Business\1M$\Vigilcap\Website"
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/vigilcap-website.git
git push -u origin main
```

### Step 3: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** (gear icon)
3. In the left sidebar, click **Pages**
4. Under "Source", select **Deploy from a branch**
5. Select **main** branch and **/ (root)** folder
6. Click **Save**
7. Wait 1-2 minutes for deployment

Your site is now live at: `https://YOUR_USERNAME.github.io/vigilcap-website/`

### Step 4: Connect Your Custom Domain

1. In GitHub Pages settings, under "Custom domain", enter your domain (e.g., `vigilcap.com`)
2. Click **Save**
3. Check **Enforce HTTPS** (once DNS propagates)

**In your domain registrar (e.g., GoDaddy, Namecheap, Cloudflare):**

Add these DNS records:

| Type | Name | Value |
|------|------|-------|
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |
| CNAME | www | YOUR_USERNAME.github.io |

DNS propagation takes 1-48 hours. Check status at [dnschecker.org](https://dnschecker.org)

---

## Option 2: Netlify (Alternative)

Netlify offers form handling and analytics for free.

### Step 1: Deploy

1. Go to [netlify.com](https://netlify.com) and sign up
2. Click **Add new site** → **Deploy manually**
3. Drag and drop your entire `Website` folder
4. Your site is instantly live!

### Step 2: Custom Domain

1. Go to **Site settings** → **Domain management**
2. Click **Add custom domain**
3. Follow the DNS instructions provided

---

## Option 3: Cloudflare Pages (Alternative)

Cloudflare offers unlimited bandwidth and fast global CDN.

1. Go to [pages.cloudflare.com](https://pages.cloudflare.com)
2. Connect your GitHub repository
3. Deploy and add your domain (especially easy if domain is already on Cloudflare)

---

## Setting Up Supabase for Email Collection

### Step 1: Create Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign up (free)
2. Click **New Project**
3. Name it `vigilcap` and set a database password
4. Wait for project to be created (~2 minutes)

### Step 2: Create Leads Table (for Sample Report Downloads)

1. Go to **Table Editor** in the left sidebar
2. Click **Create a new table**
3. Configure:
   - Name: `leads`
   - Enable Row Level Security: **Yes**
   - Columns:
     | Name | Type | Default |
     |------|------|---------|
     | id | uuid | gen_random_uuid() |
     | email | text | - |
     | source | text | - |
     | created_at | timestamptz | now() |

4. Click **Save**

### Step 3: Create Deal Requests Table (for "Get Your Report" Form)

1. Click **Create a new table** again
2. Configure:
   - Name: `deal_requests`
   - Enable Row Level Security: **Yes**
   - Columns:
     | Name | Type | Default |
     |------|------|---------|
     | id | uuid | gen_random_uuid() |
     | email | text | - |
     | enterprise_value | text | - |
     | timeline | text | - |
     | source | text | - |
     | created_at | timestamptz | now() |

3. Click **Save**

### Step 4: Add Insert Policies for Both Tables

For the `leads` table:
1. Click **Add RLS Policy**
2. Select **Create a policy from scratch**
3. Configure:
   - Name: `Allow anonymous inserts`
   - Operation: **INSERT**
   - Target roles: **anon**
   - Policy: `true`
4. Click **Save**

For the `deal_requests` table:
1. Click **Add RLS Policy**
2. Select **Create a policy from scratch**
3. Configure:
   - Name: `Allow anonymous inserts`
   - Operation: **INSERT**
   - Target roles: **anon**
   - Policy: `true`
4. Click **Save**

### Step 4: Get Your API Keys

1. Go to **Settings** → **API**
2. Copy:
   - **Project URL** (e.g., `https://abc123.supabase.co`)
   - **anon/public** key (long string starting with `eyJ...`)

### Step 5: Update Your Website

Edit `script.js` and replace:
```javascript
const SUPABASE_URL = 'YOUR_SUPABASE_PROJECT_URL';
const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY';
```

With your actual values:
```javascript
const SUPABASE_URL = 'https://abc123.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOi...';
```

### Step 6: View Collected Emails

Go to **Table Editor** → **leads** in Supabase to see all collected emails.

---

## Post-Deployment Checklist

- [ ] Website loads correctly at your domain
- [ ] HTTPS is enabled (padlock icon in browser)
- [ ] Favicon shows correctly in browser tab
- [ ] All navigation links work
- [ ] Email modal opens and closes
- [ ] Email form validates input
- [ ] PDF download works after email entry
- [ ] Terms of Service page works
- [ ] Privacy Policy page works
- [ ] Supabase saves emails (check Table Editor)

---

## Updating Your Website

### Replace the PDF Report

When you have a new PDF report:

1. Replace `Vigilcap_Report_juice-shop-master.pdf` with your new file
2. If the filename changed, update the `href` in `index.html`
3. Run the teaser generator:
   ```bash
   python generate_teaser.py your_new_report.pdf
   ```
4. Commit and push to GitHub

### Quick Edits

For text/content changes:
1. Edit the files locally
2. Create a new commit in GitHub Desktop
3. Push to main branch
4. GitHub Pages auto-deploys in ~1 minute

---

## Troubleshooting

### Site not loading?
- Check GitHub Pages is enabled in Settings → Pages
- Ensure index.html is in the root folder
- Wait 5 minutes after enabling

### Custom domain not working?
- Verify DNS records are correct
- Use [dnschecker.org](https://dnschecker.org) to check propagation
- Clear browser cache or try incognito mode

### HTTPS not working?
- Ensure DNS has propagated (may take 24h)
- In GitHub Pages settings, uncheck then re-check "Enforce HTTPS"

### Emails not saving?
- Check browser console for errors (F12 → Console)
- Verify Supabase credentials in script.js
- Ensure RLS policy allows anonymous inserts

---

## Support

For issues with:
- **GitHub Pages**: [docs.github.com/pages](https://docs.github.com/pages)
- **Supabase**: [supabase.com/docs](https://supabase.com/docs)
- **DNS**: Contact your domain registrar

---

*Last updated: December 2025*
