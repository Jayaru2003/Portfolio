# Deployment Guide: Portfolio Application

This guide walks you through deploying your portfolio application with:

- **Backend**: Railway (Spring Boot + PostgreSQL)
- **Frontend**: Vercel (Static HTML/CSS/JS)

---

## Prerequisites

1. **GitHub Account**: Your code should be in a GitHub repository
2. **Railway Account**: Sign up at [railway.app](https://railway.app)
3. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
4. **Git**: Ensure all changes are committed and pushed to GitHub

---

## Part 1: Deploy Backend to Railway

### Step 1: Create Railway Project

1. Go to [railway.app](https://railway.app) and log in
2. Click **"New Project"**
3. Select **"Deploy from GitHub repo"**
4. Choose your portfolio repository
5. Railway will auto-detect the Java/Maven project

### Step 2: Add PostgreSQL Database

1. In your Railway project dashboard, click **"New"**
2. Select **"Database"** → **"PostgreSQL"**
3. Railway will provision a PostgreSQL database
4. The `DATABASE_URL` will be automatically set as an environment variable

### Step 3: Configure Environment Variables

In Railway project settings, add these variables:

```
DATABASE_URL=<automatically set by Railway>
PORT=8080
JWT_SECRET=your-super-secure-jwt-secret-key-here-minimum-32-characters
CORS_ORIGIN=http://localhost:3000
H2_CONSOLE_ENABLED=false
SPRING_PROFILES_ACTIVE=prod
```

**Important Notes:**

- `DATABASE_URL` is automatically provided by Railway's PostgreSQL
- Generate a secure `JWT_SECRET` (32+ characters)
- `CORS_ORIGIN` will be updated after Vercel deployment
- Keep `H2_CONSOLE_ENABLED=false` for production

### Step 4: Deploy Backend

1. Railway will automatically deploy when you push to GitHub
2. Wait for build to complete (check logs in Railway dashboard)
3. Once deployed, Railway provides a public URL like: `https://your-app.railway.app`
4. Test the health endpoint: `https://your-app.railway.app/actuator/health`

### Step 5: Note Your Backend URL

Copy your Railway backend URL (e.g., `https://your-portfolio-backend.railway.app`)
You'll need this for the frontend configuration.

---

## Part 2: Deploy Frontend to Vercel

### Step 1: Update API Configuration

Before deploying, update `frontend/js/config.js`:

```javascript
const API_BASE_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:8080/api"
    : "https://your-portfolio-backend.railway.app/api"; // Use your Railway URL

export default API_BASE_URL;
```

**Replace** `your-portfolio-backend.railway.app` with your actual Railway URL from Part 1, Step 5.

Commit and push this change to GitHub.

### Step 2: Deploy to Vercel

1. Go to [vercel.com](https://vercel.com) and log in
2. Click **"Add New Project"**
3. Import your GitHub repository
4. Configure the project:
   - **Framework Preset**: Other
   - **Root Directory**: `frontend`
   - **Build Command**: Leave empty (static site)
   - **Output Directory**: Leave empty
5. Click **"Deploy"**

### Step 3: Note Your Frontend URL

After deployment, Vercel provides a URL like: `https://your-portfolio.vercel.app`

---

## Part 3: Update CORS Configuration

### Step 1: Update Railway Environment Variable

1. Go back to your Railway project
2. Open **"Variables"** settings
3. Update `CORS_ORIGIN` to your Vercel URL:
   ```
   CORS_ORIGIN=https://your-portfolio.vercel.app
   ```
4. Save changes
5. Railway will automatically redeploy with the new CORS setting

### Step 2: Test the Application

1. Visit your Vercel frontend URL
2. Test all features:
   - Portfolio page loads with profile data
   - Projects are displayed
   - Contact form works
   - Admin login at `/admin.html` works
   - Profile editing in admin panel works

---

## Environment Variables Reference

### Railway (Backend)

| Variable                 | Description                      | Example                             |
| ------------------------ | -------------------------------- | ----------------------------------- |
| `DATABASE_URL`           | PostgreSQL connection string     | Auto-set by Railway                 |
| `PORT`                   | Server port                      | `8080`                              |
| `JWT_SECRET`             | Secret key for JWT tokens        | `your-32-char-secret-key`           |
| `CORS_ORIGIN`            | Allowed frontend origins         | `https://your-portfolio.vercel.app` |
| `H2_CONSOLE_ENABLED`     | Disable H2 console in production | `false`                             |
| `SPRING_PROFILES_ACTIVE` | Spring profile                   | `prod`                              |

### Vercel (Frontend)

No environment variables needed. API URL is configured in `config.js`.

---

## Troubleshooting

### Backend Issues

**Build fails on Railway:**

- Check Railway build logs
- Ensure `pom.xml` has correct dependencies
- Verify `nixpacks.toml` configuration

**Database connection errors:**

- Verify `DATABASE_URL` is set correctly
- Check PostgreSQL service is running in Railway

**JWT errors:**

- Ensure `JWT_SECRET` is at least 32 characters
- Check application.properties has correct configuration

### Frontend Issues

**API calls fail (CORS errors):**

- Verify `CORS_ORIGIN` in Railway matches your Vercel URL exactly
- Check browser console for specific CORS errors
- Ensure Railway backend is redeployed after CORS update

**Profile/Projects not loading:**

- Check `config.js` has correct Railway backend URL
- Open browser DevTools → Network tab to see API call status
- Verify backend health endpoint is accessible

**Admin login fails:**

- Check JWT_SECRET is set in Railway
- Verify backend logs for authentication errors
- Test login endpoint directly: `POST https://your-backend.railway.app/api/auth/login`

### General Tips

1. **Check Logs**: Both Railway and Vercel provide deployment logs
2. **Use Browser DevTools**: Check Console and Network tabs for errors
3. **Test Endpoints**: Use curl or Postman to test backend APIs directly
4. **Environment Variables**: Double-check all variables are set correctly
5. **HTTPS**: Always use HTTPS URLs for production (both Railway and Vercel provide HTTPS)

---

## Local Development After Deployment

To continue local development:

1. Backend runs on `http://localhost:8080`
2. Frontend uses `config.js` which auto-detects localhost
3. Default H2 database is used locally (not PostgreSQL)
4. Admin credentials: `admin` / `admin123`

---

## Updating Your Deployment

### Update Backend:

1. Make code changes
2. Commit and push to GitHub
3. Railway auto-deploys from GitHub

### Update Frontend:

1. Make code changes
2. Commit and push to GitHub
3. Vercel auto-deploys from GitHub

---

## Security Checklist

- ✅ JWT_SECRET is at least 32 characters (256 bits)
- ✅ H2 console is disabled in production
- ✅ CORS is restricted to specific origin (not \*)
- ✅ PostgreSQL is used in production (not H2)
- ✅ All sensitive data in environment variables (not hardcoded)
- ✅ HTTPS is used for all communication
- ✅ Admin password is strong and hashed with BCrypt

---

## Next Steps

1. **Custom Domain**: Add a custom domain in Vercel settings
2. **Monitoring**: Set up monitoring for backend health
3. **Analytics**: Add analytics to track portfolio visitors
4. **SSL Certificate**: Both Railway and Vercel provide automatic SSL
5. **Backups**: Configure database backups in Railway

---

## Support

If you encounter issues:

- Railway Docs: [docs.railway.app](https://docs.railway.app)
- Vercel Docs: [vercel.com/docs](https://vercel.com/docs)
- Spring Boot Docs: [spring.io/guides](https://spring.io/guides)

---

**Deployment Complete!** 🎉

Your portfolio is now live:

- Frontend: `https://your-portfolio.vercel.app`
- Backend API: `https://your-portfolio-backend.railway.app/api`
- Admin Panel: `https://your-portfolio.vercel.app/admin.html`
