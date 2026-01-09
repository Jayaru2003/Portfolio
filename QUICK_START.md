# 🚀 Quick Start Guide

## Your Serverless Portfolio is Ready!

### Step 1: Customize Your Content

Open `js/data.js` and update with your information:

```javascript
profile: {
    fullName: "Your Name Here",           // ← Change this
    title: "Your Job Title",              // ← Change this
    emailAddress: "your@email.com",       // ← Change this
    githubUrl: "https://github.com/you",  // ← Change this
    // ... and more
}
```

### Step 2: Add Your Projects

In the same `js/data.js` file, update the projects array:

```javascript
projects: [
  {
    title: "My Awesome Project",
    description: "What it does...",
    imageUrl: "project-image-url",
    techStack: "React, Node.js, MongoDB",
    githubUrl: "github-link",
    demoUrl: "live-demo-link",
  },
];
```

### Step 3: Test Locally

**Option A: Double-click `start-portfolio.bat`**

- Easiest method
- Opens browser automatically

**Option B: Use Python**

```bash
python -m http.server 8000
```

Then open: http://localhost:8000

**Option C: Use VS Code**

- Install "Live Server" extension
- Right-click index.html → "Open with Live Server"

### Step 4: Deploy (Choose One)

#### Vercel (Easiest)

```bash
npx vercel
```

#### Netlify

1. Go to https://app.netlify.com/drop
2. Drag your portfolio folder
3. Done!

#### GitHub Pages

1. Push to GitHub
2. Settings → Pages → Enable
3. Your site: `username.github.io/repo-name`

---

## 📝 Customization Checklist

- [ ] Update personal info in `js/data.js`
- [ ] Add your projects
- [ ] Change social media links
- [ ] Update profile image URL
- [ ] Modify colors in `css/style.css` (optional)
- [ ] Add your CV/resume link
- [ ] Test contact form
- [ ] Deploy to hosting platform

## 🎨 Change Colors

Edit `css/style.css` (lines 1-17):

```css
:root {
  --primary-color: #6366f1; /* Change these */
  --secondary-color: #8b5cf6; /* to your */
  --accent-color: #ec4899; /* brand colors */
}
```

## 📧 Enable Contact Form

The form currently shows a demo message. To make it work:

1. **Use Formspree (Easiest)**

   - Sign up at https://formspree.io
   - Get your form endpoint
   - Update fetch URL in `js/script.js` line ~340

2. **Use EmailJS**

   - Sign up at https://www.emailjs.com
   - Follow their integration guide

3. **Use Netlify Forms** (if deploying to Netlify)
   - Already configured!

## 🖼️ Add Your Images

1. Create an `images` folder
2. Add your images
3. Update URLs in `js/data.js`:
   ```javascript
   profileImageUrl: "images/profile.jpg",
   // or use external URLs
   profileImageUrl: "https://your-image-url.com/photo.jpg"
   ```

## 🔧 Troubleshooting

**Problem: Styles not loading**

- Solution: Make sure you're using a local server, not opening file:// directly

**Problem: Changes not showing**

- Solution: Hard refresh (Ctrl+Shift+R or Cmd+Shift+R)

**Problem: Can't start server**

- Solution: Use VS Code Live Server extension

## 🌟 Next Steps

1. Customize everything in `js/data.js`
2. Test locally
3. Deploy to Vercel/Netlify
4. Share your portfolio!

## 📚 Need Help?

- Check `README.md` for detailed documentation
- Review code comments in `js/script.js`
- All your data is in `js/data.js`

---

**You're all set! Start customizing and deploy your portfolio! 🎉**
