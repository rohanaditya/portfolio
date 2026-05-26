# React Portfolio Website

A modern, responsive portfolio website built with React and Vite. The site dynamically loads content from a JSON resume file, making it easy to update your portfolio without touching the code.

## Features

- ✨ **Dynamic Content**: Content loaded from a JSON file
- 📱 **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- ⚡ **Fast Performance**: Built with Vite for optimal speed
- 🎨 **Modern UI**: Clean, professional design with smooth animations
- 🔄 **Easy to Customize**: Simply edit the JSON file to update your portfolio

## Project Structure

```
├── src/
│   ├── components/
│   │   ├── Header.jsx          # Header with name and contact info
│   │   ├── Hero.jsx             # Hero section
│   │   ├── About.jsx            # About section
│   │   ├── Skills.jsx           # Skills section
│   │   ├── Experience.jsx       # Work experience section
│   │   ├── Education.jsx        # Education section
│   │   ├── Projects.jsx         # Projects showcase
│   │   └── Contact.jsx          # Contact section with social links
│   ├── data/
│   │   └── resume.json          # Your resume content (editable)
│   ├── styles/
│   │   └── App.css              # Global styles
│   ├── App.jsx                  # Main app component
│   └── main.jsx                 # React entry point
├── index.html                   # HTML template
├── package.json                 # Project dependencies
├── vite.config.js              # Vite configuration
└── README.md                    # This file
```

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Navigate to the project directory:
```bash
cd Portfolio
```

2. Install dependencies:
```bash
npm install
```

### Development

Start the development server:
```bash
npm run dev
```

The site will be available at `http://localhost:5173`

### Building for Production

Build the project:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## Customization

### Editing Your Resume

Edit `src/data/resume.json` to customize your portfolio content:

```json
{
  "personal": {
    "name": "Your Name",
    "title": "Your Title",
    "email": "your.email@example.com",
    "phone": "+1 (555) 123-4567",
    "location": "Your Location",
    "summary": "Your professional summary"
  },
  "about": {
    "description": "About you section"
  },
  "skills": [
    {
      "category": "Frontend",
      "items": ["Skill 1", "Skill 2", "Skill 3"]
    }
  ],
  "experience": [
    {
      "title": "Job Title",
      "company": "Company Name",
      "location": "Location",
      "startDate": "Jan 2022",
      "endDate": "Present",
      "description": "Job description"
    }
  ],
  "education": [
    {
      "school": "School Name",
      "degree": "Degree",
      "field": "Field of Study",
      "graduationDate": "2022",
      "details": "Additional details"
    }
  ],
  "projects": [
    {
      "title": "Project Name",
      "description": "Project description",
      "technologies": ["Tech1", "Tech2"],
      "link": "https://github.com/your-link"
    }
  ],
  "contact": {
    "email": "your.email@example.com",
    "phone": "+1 (555) 123-4567",
    "linkedin": "https://linkedin.com/in/yourprofile",
    "github": "https://github.com/yourprofile",
    "twitter": "https://twitter.com/yourprofile"
  }
}
```

### Styling

Customize the appearance by editing `src/styles/App.css`. The CSS includes:
- CSS variables for easy color theming
- Responsive breakpoints for mobile, tablet, and desktop
- Smooth animations and transitions

## Technologies Used

- **React** - UI library
- **Vite** - Build tool and dev server
- **CSS3** - Styling with modern features
- **JavaScript (ES6+)** - Modern JavaScript

## Component Overview

### Header
Displays your name, title, email, phone, and location with a gradient background.

### Hero
Welcome section with your professional summary.

### About
Detailed information about yourself.

### Skills
Organized skill categories with skill lists.

### Experience
Timeline of work experience with descriptions.

### Education
Educational background and certifications.

### Projects
Showcase of your projects with technologies and links.

### Contact
Contact information and social media links.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is open source and available under the MIT License.

## Contributing

Feel free to fork this project and customize it for your own use. If you have improvements or suggestions, feel free to submit a pull request.

---

**Happy coding! 🚀**
