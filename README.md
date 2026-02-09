# 🚗 AutoHub Kenya - Online Car Marketplace

A modern, responsive car marketplace web application built with pure HTML, CSS, and JavaScript. Fully compliant with Kenya's Data Protection Act (2019).

![AutoHub Kenya](https://img.shields.io/badge/Status-Active-success)
![License](https://img.shields.io/badge/License-Educational-blue)
![Kenya DPA 2019](https://img.shields.io/badge/Kenya%20DPA-2019%20Compliant-green)

## 🎯 Project Overview

AutoHub Kenya is a capstone project for an Internet Technologies course, demonstrating:
- Modern frontend development with vanilla JavaScript
- Responsive web design for mobile and desktop
- Privacy-first approach compliant with Kenyan law
- Real-world application of web fundamentals

## ✨ Features

### Core Functionality
- 🔍 **Real-time Search** - Instant vehicle filtering across brand, model, and year
- 🎛️ **Advanced Filters** - Filter by brand, condition, year, price, and county
- ❤️ **Wishlist** - Save favorite vehicles for later viewing
- ⚖️ **Comparison Tool** - Compare up to 3 vehicles side-by-side
- 📱 **Fully Responsive** - Optimized for mobile, tablet, and desktop
- 🍪 **Cookie Consent** - GDPR-style consent banner for privacy compliance

### User Features
- ✅ **Registration Form** - Kenyan-specific validation (phone, ID, counties)
- 🔒 **Privacy Compliance** - Full Privacy Policy and Terms of Service
- 🌍 **47 Counties** - Complete coverage of all Kenyan counties
- 🚘 **Featured Brands** - Toyota, Nissan, Honda, Subaru, Volkswagen

### Legal Compliance
- ✅ Data Protection Act (2019) - Kenya
- ✅ Computer Misuse and Cybercrimes Act (2018)
- ✅ National ICT Policy (2019)
- ✅ ODPC Guidelines Implementation

## 🚀 Live Demo

**GitHub Pages**: [View Live Demo](https://yourusername.github.io/autohub-kenya/)

## 📸 Screenshots

### Homepage
Clean, modern interface with hero section and featured vehicles

### Listings Page
Advanced filtering and real-time search capabilities

### Registration Form
Comprehensive validation with Kenyan-specific fields

## 🛠️ Technologies Used

- **HTML5** - Semantic markup
- **CSS3** - Custom design system, CSS Grid, Flexbox
- **JavaScript (ES6+)** - Vanilla JS, no frameworks
- **LocalStorage** - Client-side data persistence
- **Cookies** - Session tracking and preferences (with consent)

## 📋 Requirements

- Modern web browser (Chrome, Firefox, Safari, Edge)
- JavaScript enabled
- No backend server required (frontend-only)

## 💻 Installation & Setup

### Local Development

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/autohub-kenya.git
cd autohub-kenya
```

2. **Open in browser**
```bash
# Simply open index.html in your browser
# Or use a local server:
python -m http.server 8000
# Then visit: http://localhost:8000
```

3. **Start developing**
- Edit HTML, CSS, or JS files
- Refresh browser to see changes
- No build process required!

### GitHub Pages Deployment

1. **Push to GitHub**
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. **Enable GitHub Pages**
- Go to repository Settings
- Navigate to Pages section
- Select branch: `main`
- Select folder: `/` (root)
- Click Save

3. **Access your site**
- URL: `https://yourusername.github.io/autohub-kenya/`
- Wait 1-2 minutes for deployment

## 📁 Project Structure

```
autohub-kenya/
├── index.html              # Homepage
├── listings.html           # Vehicle listings with filters
├── register.html           # User registration
├── privacy.html            # Privacy Policy (Kenya DPA 2019)
├── terms.html              # Terms of Service
├── comparison.html         # Vehicle comparison tool
├── wishlist.html           # Saved vehicles
├── styles.css              # Complete styling (1400+ lines)
├── script.js               # Core functionality & cookies
├── listings.js             # Listings page logic
├── register.js             # Form validation
├── comparison.js           # Comparison functionality
├── wishlist.js             # Wishlist management
├── DOCUMENTATION.md        # Technical documentation
└── README.md              # This file
```

## 🎨 Design System

### Color Palette
- **Primary**: `#FF6B35` (Vibrant Orange)
- **Secondary**: `#004E89` (Navy Blue)
- **Accent**: `#FFD23F` (Yellow)
- **Dark**: `#1A1A2E` (Almost Black)

### Typography
- **Headings**: Rajdhani (Google Fonts)
- **Monospace**: Space Mono (Google Fonts)

### Responsive Breakpoints
- **Mobile**: < 640px
- **Tablet**: 640px - 968px
- **Desktop**: > 968px

## 🔒 Privacy & Security

### Data Protection (Kenya DPA 2019)
- Explicit user consent before data collection
- Clear privacy notices in plain language
- User rights implementation (access, erasure, portability)
- Data minimization principles
- Cookie consent management

### Security Measures
- Client-side only (no data transmission)
- Input validation to prevent XSS
- SameSite cookies to prevent CSRF
- No sensitive data in cookies
- Secure password requirements

## 📱 Browser Support

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 🧪 Testing

### Functionality Checklist
- [x] Cookie consent banner works
- [x] Search and filters function correctly
- [x] Wishlist persists across sessions
- [x] Comparison limited to 3 vehicles
- [x] Form validation catches all errors
- [x] Responsive design on all devices

### Privacy Checklist
- [x] No cookies before consent
- [x] Privacy Policy accessible
- [x] Terms of Service accessible
- [x] Data clearing functions work
- [x] User rights documented

## 📝 Documentation

Comprehensive technical documentation is available in [DOCUMENTATION.md](DOCUMENTATION.md), covering:
- Technical architecture decisions
- Privacy implementation details
- Design rationale
- Deployment instructions
- Future enhancements

## 🤝 Contributing

This is an educational project. Contributions, issues, and feature requests are welcome!

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is created for educational purposes as part of an Internet Technologies course capstone project.

## 👨‍💻 Author

**AutoHub Kenya Development Team**
- Course: Internet Technologies
- Project: Capstone - Simple Online Marketplace

## 🙏 Acknowledgments

- **Legal Framework**: Office of the Data Protection Commissioner (ODPC), Kenya
- **Images**: Unsplash (free stock photos)
- **Fonts**: Google Fonts
- **Inspiration**: Modern car marketplaces and Kenyan automotive market needs

## 📞 Contact

- **Email**: info@autohub.co.ke
- **Privacy**: privacy@autohub.co.ke
- **ODPC**: www.odpc.go.ke

## 🔄 Version History

- **v1.0** (Feb 2024) - Initial release
  - Core marketplace functionality
  - Privacy compliance implementation
  - Responsive design
  - Documentation complete

---

**Note**: This is a frontend-only demonstration project. In a production environment, you would need:
- Backend server (Node.js, Django, etc.)
- Database (PostgreSQL, MongoDB)
- User authentication system
- Payment gateway integration
- Email/SMS services
- Proper server-side security

---

Made with ❤️ in Kenya 🇰🇪
