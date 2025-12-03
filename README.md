# Singer Portfolio - Image Update Guide

## ✨ Premium Features

### Full-Screen Video Background
The hero section features a **cinematic video background** with:
- **Autoplay & Loop**: Video plays automatically and loops seamlessly
- **Responsive Design**: Full-screen coverage on all device sizes with proper object-fit
- **Adaptive Overlay**: Gradient overlay that adjusts for both dark and light themes
- **Optimized Performance**: Video is muted and uses `playsinline` for mobile compatibility
- **Professional Polish**: Text remains readable with carefully tuned overlay opacity

### Dark/Light Mode Toggle
Your portfolio includes a premium animated theme switcher located in the top navigation bar. Features:
- **Smooth Transitions**: All colors and backgrounds smoothly animate when switching themes
- **Theme Persistence**: Your preference is saved and remembered across visits
- **Animated Button**: The toggle button rotates 360° when clicked with icon transitions
- **Optimized for Both Modes**: All sections are carefully designed for both dark and light themes

The portfolio defaults to dark mode, but visitors can easily switch to light mode with one click.

## 📸 How to Add Your Photos, Videos, and Content

This portfolio is designed to be easily customizable. Follow this guide to add your personal content.

### 1. **About Section Portrait**
- **File ID**: `aboutImg`
- **Replace**: Line 75 in `index.html`
- **Current**: `placeholder-about.jpg`
- **Recommended size**: 600x800px (portrait orientation)
- **Usage**: Your main professional portrait photo

### 2. **Album Covers**
Replace these three album/single covers in the Music section:
- **Album 1**: `albumCover1` - Line 106 in `index.html`
- **Album 2**: `albumCover2` - Line 121 in `index.html`
- **Album 3**: `albumCover3` - Line 136 in `index.html`
- **Recommended size**: 800x800px (square)
- **File format**: JPG or PNG

### 3. **Video Thumbnails**
- **Video 1**: `videoThumb1` - Line 161 in `index.html`
- **Video 2**: `videoThumb2` - Line 173 in `index.html`
- **Recommended size**: 1280x720px (16:9 ratio)
- **Tip**: Use captivating performance shots

### 4. **Gallery Photos**
Replace all 6 gallery images:
- `galleryImg1` through `galleryImg6` (Lines 194-215 in `index.html`)
- **Recommended size**: 800x800px or larger
- **Mix**: Performance shots, studio sessions, backstage moments, candid photos

### 5. **Update Text Content**

#### Hero Section (Lines 26-40)
```html
<h1 class="hero-title">
    <span class="hero-title-line">Voice of</span>
    <span class="hero-title-line hero-title-emphasis">Emotion</span>
</h1>
<p class="hero-subtitle">Professional Singer • Performer • Artist</p>
```

#### About Section (Lines 61-95)
- Update heading (Line 79)
- Update paragraphs (Lines 80-89)
- Update stats (Lines 91-104):
  - Years of experience
  - Number of performances
  - Follower count

#### Music Section (Lines 100-150)
- Update song/album titles (Lines 108, 123, 138)
- Update artist names if needed

### 6. **Social Media Links**

Update these in `script.js` (Lines 173-178):
```javascript
const socialLinks = {
    instagram: 'https://instagram.com/your-profile',
    youtube: 'https://youtube.com/your-channel',
    spotify: 'https://spotify.com/artist/your-profile',
    twitter: 'https://twitter.com/your-handle'
};
```

### 7. **Name and Branding**

Global updates needed:
- **Nav Logo** (Line 22): Change "SAM" to your name/brand
- **Page Title** (Line 6): Update "Sam - Professional Singer & Artist"
- **Meta Description** (Line 7): Customize your description
- **Footer** (Line 239): Update copyright name

## 🚀 Quick Start

1. **Place your images** in the same folder as `index.html`
2. **Update image filenames** in `index.html` to match your files
3. **Customize text content** as described above
4. **Update social links** in `script.js`
5. **Open** `index.html` in your browser to see your portfolio!

## 🎨 Color Customization

To change the color scheme, edit `styles.css` (Lines 2-11):
```css
--color-accent-primary: #6366f1;      /* Main accent color */
--color-accent-secondary: #8b5cf6;    /* Secondary accent */
```

Popular alternatives:
- **Rose Gold**: `#f43f5e` and `#ec4899`
- **Emerald**: `#10b981` and `#059669`
- **Amber**: `#f59e0b` and `#d97706`

## 📝 Important Notes

- All image IDs are clearly marked with `id="..."` attributes
- Keep images optimized for web (compressed, appropriate sizes)
- Test the portfolio on mobile devices to ensure responsiveness
- The portfolio works offline - no server needed!

## 🎵 Adding Music/Video Players

To integrate actual music or video players:
- **Spotify**: Use Spotify Embed codes
- **YouTube**: Use YouTube iframe embeds
- **SoundCloud**: Use SoundCloud widget
- Replace the placeholder play buttons with actual embedded players

---

Need help? All placeholder images are clearly marked in the HTML with descriptive alt text!
# Sameeksha-portfolio
