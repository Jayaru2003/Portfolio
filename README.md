# Serverless Portfolio

A modern, responsive portfolio website built with HTML, CSS, and vanilla JavaScript. No backend required!

## 🌟 Features

- **Fully Serverless** - Pure frontend, no backend needed
- **Responsive Design** - Works on all devices
- **Modern UI** - Clean and professional design
- **Easy to Customize** - Just edit the data.js file
- **Fast Loading** - Optimized performance
- **SEO Friendly** - Semantic HTML structure

## 🚀 Quick Start

### Local Development

1. **Clone or download this repository**

2. **Open the project folder**

   ```bash
   cd Portfilio
   ```

3. **Start a local server** (choose one method):

   **Option 1: Using Python**

   ```bash
   # Python 3
   python -m http.server 8000

   # Python 2
   python -m SimpleHTTPServer 8000
   ```

   **Option 2: Using Node.js (http-server)**

   ```bash
   npx http-server -p 8000
   ```

   **Option 3: Using VS Code**

   - Install "Live Server" extension
   - Right-click on index.html
   - Select "Open with Live Server"

4. **Open your browser**
   - Navigate to `http://localhost:8000`

## ✏️ Customization

### Edit Your Portfolio Content

All portfolio content is in `js/data.js`. Simply edit this file to customize:

```javascript
const portfolioData = {
  profile: {
    fullName: "Your Name",
    title: "Your Job Title",
    // ... more fields
  },
  projects: [
    {
      title: "Project Name",
      description: "Project description",
      // ... more fields
    },
  ],
};
```

### Change Colors and Styles

Edit `css/style.css` to customize the look and feel. CSS variables are at the top of the file:

```css
:root {
  --primary-color: #6366f1;
  --secondary-color: #8b5cf6;
  --accent-color: #ec4899;
  /* ... more variables */
}
```

## 📤 Deployment

Deploy your portfolio for free using any of these platforms:

### Vercel (Recommended)

1. Install Vercel CLI:

   ```bash
   npm i -g vercel
   ```

2. Deploy:
   ```bash
   vercel
   ```

Or use the [Vercel Dashboard](https://vercel.com) to deploy via GitHub.

### Netlify

1. Drag and drop your project folder to [Netlify Drop](https://app.netlify.com/drop)

Or use Netlify CLI:

```bash
npm install -g netlify-cli
netlify deploy
```

### GitHub Pages

1. Push your code to GitHub
2. Go to Settings > Pages
3. Select your branch and click Save
4. Your site will be live at `https://yourusername.github.io/repository-name`

### Other Options

- **Cloudflare Pages** - Free with custom domain support
- **Render** - Free static site hosting
- **Firebase Hosting** - Google's hosting solution

## 📧 Contact Form

The contact form currently shows a demo message. To make it functional, integrate one of these services:

### Formspree (Easy)

```javascript
// In js/script.js, replace the contact form submission with:
fetch("https://formspree.io/f/your-form-id", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(formData),
});
```

### EmailJS

1. Sign up at [EmailJS](https://www.emailjs.com/)
2. Follow their integration guide
3. Update the contact form handler in `js/script.js`

### Netlify Forms

If deploying to Netlify, add `netlify` attribute to your form:

```html
<form name="contact" netlify></form>
```

## 📁 Project Structure

```
Portfilio/
├── index.html          # Main HTML file
├── css/
│   └── style.css       # All styles
├── js/
│   ├── script.js       # Main JavaScript file
│   └── data.js         # Portfolio data (edit this!)
└── README.md           # This file
```

## 🛠️ Technologies Used

- HTML5
- CSS3 (with CSS Variables and Flexbox/Grid)
- Vanilla JavaScript (ES6+)
- Font Awesome Icons
- Google Fonts (Inter)

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## 💡 Tips

1. **Images**: Use optimized images for better performance
2. **Analytics**: Add Google Analytics or other tracking
3. **SEO**: Update meta tags in index.html
4. **Performance**: Consider lazy loading images
5. **Accessibility**: Test with screen readers

## 📄 License

Free to use for personal and commercial projects.

## 🤝 Support

If you need help:

- Check the code comments
- Review the data.js file structure
- Ensure you're serving via HTTP (not file://)

## 🎨 Customization Ideas

- Add a blog section
- Include testimonials
- Add more project filters
- Create a dark mode toggle
- Add animations and transitions
- Include a resume/CV download
- Add language switcher

---

Made with ❤️ by You

**Deploy your portfolio and share it with the world! 🚀**
