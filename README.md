# 🎨 Art Gallery Pagination System

A sophisticated React TypeScript application that demonstrates advanced pagination and data selection capabilities using the Art Institute of Chicago API. This project showcases modern web development practices with an elegant user interface built using PrimeReact components.

## 🌐 Live Demo

**[View Live Application](http://pegination-api.s3-website.ap-south-1.amazonaws.com/)**

*🚀 Hosted on AWS S3 for optimal performance and reliability*

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Architecture](#architecture)
- [Installation](#installation)
- [Usage](#usage)
- [API Integration](#api-integration)
- [Component Structure](#component-structure)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

---

## 🎯 Overview

This application serves as a comprehensive demonstration of:

- **Advanced Pagination**: Navigate through thousands of artworks with smooth, responsive pagination
- **Intelligent Row Selection**: Bulk selection with cross-page persistence and auto-selection capabilities
- **Real-time Data Fetching**: Dynamic API integration with the Art Institute of Chicago's collection
- **Modern UI/UX**: Clean, professional interface using PrimeReact component library

### Key Highlights

- 🎨 **12 artworks per page** with seamless navigation
- 🔢 **Smart bulk selection** with configurable row counts
- 📱 **Responsive design** optimized for all device sizes
- ⚡ **Real-time updates** with efficient state management
- 🎭 **Rich artwork metadata** including titles, origins, and artist information

---

## ✨ Features

### 🔍 **Core Functionality**

| Feature | Description |
|---------|-------------|
| **Paginated Data Display** | Browse through artwork collections with 12 items per page |
| **Dynamic Row Selection** | Select individual rows or use bulk selection with custom counts |
| **Cross-Page Selection** | Maintain selections when navigating between pages |
| **Auto-Selection Logic** | Intelligent selection that continues across multiple pages |
| **Interactive Overlay** | Click-to-configure selection parameters |

### 🎨 **User Interface**

- **Clean Data Table**: Organized display of artwork information
- **Visual Selection Indicators**: Clear checkboxes and selection feedback
- **Responsive Pagination Controls**: Easy navigation with page size options
- **Interactive Icons**: Animated dropdown arrows with rotation effects
- **Professional Styling**: PrimeReact's Lara Light Cyan theme

### 📊 **Data Management**

- **Real-time API Integration**: Live data from Art Institute of Chicago
- **Efficient State Management**: React hooks for optimal performance
- **Type Safety**: Full TypeScript implementation
- **Error Handling**: Robust error management and fallbacks

---

## 🛠 Technology Stack

### **Frontend Framework**
- ![React](https://img.shields.io/badge/React-19.1.0-61DAFB?style=flat&logo=react&logoColor=white)
- ![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-3178C6?style=flat&logo=typescript&logoColor=white)
- ![Vite](https://img.shields.io/badge/Vite-7.0.4-646CFF?style=flat&logo=vite&logoColor=white)

### **UI Components**
- ![PrimeReact](https://img.shields.io/badge/PrimeReact-10.9.6-007ACC?style=flat&logo=react&logoColor=white)
- ![RemixIcon](https://img.shields.io/badge/RemixIcon-4.6.0-FF6B6B?style=flat&logo=remix&logoColor=white)

### **HTTP Client**
- ![Axios](https://img.shields.io/badge/Axios-1.11.0-5A29E4?style=flat&logo=axios&logoColor=white)

### **Development Tools**
- ![ESLint](https://img.shields.io/badge/ESLint-9.30.1-4B32C3?style=flat&logo=eslint&logoColor=white)
- ![TypeScript ESLint](https://img.shields.io/badge/TS--ESLint-8.35.1-000000?style=flat&logo=typescript&logoColor=white)

### **Hosting**
- ![AWS S3](https://img.shields.io/badge/AWS_S3-Hosting-FF9900?style=flat&logo=amazon-aws&logoColor=white)

---

## 🏗 Architecture

### **Component Hierarchy**

```
App (Main Container)
├── PrimeReactProvider (Theme & Context)
│   ├── DataTable (Primary Data Display)
│   │   ├── Column (Multiple Selection)
│   │   ├── Column (Action Dropdown)
│   │   ├── Column (Title)
│   │   ├── Column (Place of Origin)
│   │   ├── Column (Artist Display)
│   │   ├── Column (Inscriptions)
│   │   ├── Column (Date Start)
│   │   └── Column (Date End)
│   ├── OverlayPanel (Selection Input)
│   │   └── InputNumber (Row Count Input)
│   └── Paginator (Navigation Controls)
```

### **State Management**

```typescript
// Core Application State
const [page_no, setPage_no] = useState<number>(1);           // Current page
const [page, setPage] = useState<any>();                     // Current page data
const [selectedRows, setSelectedRows] = useState<any>([]);   // Selected items
const [selectionValue, setSelectionValue] = useState<number>(4); // Bulk selection count

// Auto-selection Logic
const [numberOfAutoSelectedRows, setNumberOfAutoSelectedRows] = useState<number>(0);
const [nextAutoSelectPage, setNextAutoSelectPage] = useState<number>(1);
```

### **Data Flow**

1. **API Request** → Fetch artwork data from Art Institute of Chicago
2. **State Update** → Store fetched data in component state
3. **Render** → Display data in PrimeReact DataTable
4. **User Interaction** → Handle selection and pagination events
5. **State Synchronization** → Update selection state across page changes

---

## 🚀 Installation

### **Prerequisites**

- Node.js (v18.0.0 or higher)
- npm or yarn package manager
- Modern web browser

### **Quick Start**

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd "API Pagination"
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:5173
   ```

### **Build for Production**

```bash
# Build the application
npm run build

# Preview production build
npm run preview
```

---

## 📖 Usage

### **Basic Navigation**

1. **Browse Artworks**: Use the paginator at the bottom to navigate through pages
2. **Select Items**: Click checkboxes to select individual artworks
3. **Bulk Selection**: Click the dropdown arrow in the header to open the selection panel
4. **Configure Selection**: Enter a number in the input field to select that many rows
5. **Cross-Page Selection**: Selected items persist when navigating between pages

### **Advanced Features**

#### **Bulk Selection Workflow**

```typescript
// Example: Select 6 rows
1. Click the dropdown arrow (↓) in the table header
2. Enter "6" in the input field
3. Press Enter or click outside to apply
4. First 6 rows on current page will be selected
5. If selection count exceeds page size, selection continues on next pages
```

#### **Selection Persistence**

- Selected items remain active when navigating between pages
- Auto-selection logic continues across multiple pages if needed
- Selection count resets when manually deselecting all items

### **API Integration Details**

The application fetches data from:
```
https://api.artic.edu/api/v1/artworks?page={page_number}
```

**Mapped Data Fields:**
- `id` - Unique artwork identifier
- `title` - Artwork title
- `place_of_origin` - Geographic origin
- `artist_display` - Artist information
- `inscriptions` - Artwork inscriptions
- `date_start` - Creation start date
- `date_end` - Creation end date

---

## 🧩 Component Structure

### **App.tsx** (Main Component)

**Key Responsibilities:**
- State management for pagination and selection
- API data fetching with Axios
- Event handling for user interactions
- Selection logic coordination

**Core Hooks:**
```typescript
useEffect(() => {
  fetchAPI();
}, [page_no]); // Fetch data on page change

useEffect(() => {
  // Handle auto-selection logic
}, [selectionValue]);

useEffect(() => {
  // Manage cross-page selection
}, [page]);
```

### **Data Table Configuration**

```typescript
<DataTable
  value={page}                    // Current page data
  selectionMode="checkbox"        // Enable row selection
  selection={selectedRows}        // Selected items
  onSelectionChange={handler}     // Selection event handler
  dataKey="id"                   // Unique identifier
/>
```

### **Pagination Setup**

```typescript
<Paginator
  first={(page_no - 1) * numberOfRows}  // Current position
  rows={numberOfRows}                   // Items per page
  totalRecords={120}                   // Total items (configurable)
  rowsPerPageOptions={[10, 20, 30]}    // Page size options
  onPageChange={onPageChange}          // Navigation handler
/>
```

---

## 🌐 Deployment

### **AWS S3 Hosting**

This application is hosted on **Amazon S3** as a static website, providing:

- **Global CDN Distribution**: Fast loading times worldwide
- **High Availability**: 99.999999999% (11 9's) durability
- **Cost-Effective**: Pay-per-use pricing model
- **Scalability**: Handles traffic spikes automatically

**Live URL:** [http://pegination-api.s3-website.ap-south-1.amazonaws.com/](http://pegination-api.s3-website.ap-south-1.amazonaws.com/)

**Deployment Region:** Asia Pacific (Mumbai) - `ap-south-1`

### **Deployment Process**

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Upload to S3 bucket**
   - Create S3 bucket with static website hosting enabled
   - Upload `dist/` folder contents
   - Configure bucket policy for public read access
   - Set index document to `index.html`

3. **Configure S3 Website Hosting**
   ```json
   {
     "IndexDocument": {
       "Suffix": "index.html"
     },
     "ErrorDocument": {
       "Key": "index.html"
     }
   }
   ```

---

## 🔧 Configuration

### **Environment Variables**

Create a `.env` file for environment-specific configurations:

```env
VITE_API_BASE_URL=https://api.artic.edu/api/v1
VITE_ITEMS_PER_PAGE=12
VITE_DEFAULT_SELECTION=4
```

### **Customization Options**

**Pagination Settings:**
```typescript
const numberOfRows = 12;  // Items per page
const totalRecords = 120; // Total available items
```

**Theme Customization:**
```typescript
import "primereact/resources/themes/lara-light-cyan/theme.css";
// Available themes: lara-light-blue, lara-dark-blue, bootstrap4-light-blue, etc.
```

**Selection Behavior:**
```typescript
const [selectionValue, setSelectionValue] = useState<number>(4); // Default selection count
```

---

## 🤝 Contributing

We welcome contributions! Please follow these guidelines:

### **Development Setup**

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Run tests: `npm run lint`
5. Commit changes: `git commit -m 'Add amazing feature'`
6. Push to branch: `git push origin feature/amazing-feature`
7. Open a Pull Request

### **Code Standards**

- Follow TypeScript best practices
- Use ESLint configuration provided
- Maintain component documentation
- Write meaningful commit messages

### **Testing**

```bash
# Run linting
npm run lint

# Type checking
npm run build
```

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Art Institute of Chicago** for providing the comprehensive API
- **PrimeReact Team** for the excellent component library
- **React Community** for the robust ecosystem
- **AWS** for reliable hosting infrastructure

---

## 📞 Support

For questions, issues, or contributions:

- Create an issue on GitHub
- Review the documentation above
- Check the live demo for reference behavior

---

<div align="center">

**Built with ❤️ using React, TypeScript, and PrimeReact**

*Hosted on AWS S3 for optimal performance*

</div>
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
