# Railway Deployment Setup

## Required Environment Variables

Set these in Railway Dashboard → Your Project → Variables:

### Essential Variables

```
SQL_INIT_MODE=never
SPRING_PROFILES_ACTIVE=prod
H2_CONSOLE_ENABLED=false
```

### Database Variables (Auto-set by Railway PostgreSQL)

```
DATABASE_URL=(automatically set by Railway PostgreSQL)
DB_DRIVER=org.postgresql.Driver
```

### Security Variables

```
JWT_SECRET=YourSecure32CharacterSecretKeyHere123456789
```

### CORS Variables (Update with your Vercel URL)

```
CORS_ORIGIN=https://your-vercel-app.vercel.app,https://*.vercel.app
```

## Why SQL_INIT_MODE=never is Important

- **Default (always)**: Runs data.sql on every restart → **RESETS ALL YOUR DATA** ❌
- **Production (never)**: Keeps your database data → **PRESERVES YOUR UPDATES** ✅

## Steps to Fix Profile Image Issue

1. **Set SQL_INIT_MODE=never in Railway**
2. **Redeploy** (Railway will restart)
3. **Go to your admin panel** (https://your-vercel-url/admin)
4. **Update profile image** with direct URL:
   ```
   https://drive.google.com/uc?export=view&id=YOUR_FILE_ID
   ```
5. **Click Save** - Changes will now persist!

## Verifying the Fix

After setting SQL_INIT_MODE=never:

1. Update profile in admin panel
2. Wait 5 minutes
3. Refresh page - changes should still be there!

## Database Initialization (First Time Only)

If you need to initialize the database again:

1. Temporarily set `SQL_INIT_MODE=always`
2. Deploy
3. Wait for data to load
4. Set `SQL_INIT_MODE=never`
5. Deploy again

## Your Profile Image Direct URLs

### Google Drive

```
https://drive.google.com/uc?export=view&id=1HxgkuFVpBgx2U_Ckny0C4mXCAu2EG6SM
```

### Alternative Image Hosts (Recommended)

- **Imgur**: Upload → Right-click image → Copy image address
- **Cloudinary**: Free tier, better performance
- **GitHub**: Commit image to repo → Use raw URL
