# 🎨 Loading Spinner Implementation Guide

## Overview
The SIGAP-PNJ project now uses **SpinKit Chase Dot** spinner for all loading states with consistent brand colors.

## Quick Start

### 1. Import (if using modules)
```javascript
import { createChaseSpinner, createLoadingState, createTableLoadingRow, setButtonLoading } from '/src/js/utils/loadingSpinner.js';
```

### 2. Or Use Global Functions (already available)
All functions are available globally as `window.createChaseSpinner`, etc.

## Usage Examples

### Basic Spinner
```html
<div class="sk-chase sk-chase-primary">
  <div class="sk-chase-dot"></div>
  <div class="sk-chase-dot"></div>
  <div class="sk-chase-dot"></div>
  <div class="sk-chase-dot"></div>
  <div class="sk-chase-dot"></div>
  <div class="sk-chase-dot"></div>
</div>
```

### JavaScript: Loading State for Containers
```javascript
container.innerHTML = window.createLoadingState('Memuat data...', '#00BCD4', '40px');
```

### JavaScript: Table Loading Row
```javascript
tbody.innerHTML = window.createTableLoadingRow(7, 'Memuat data kegiatan...');
```

### JavaScript: Button Loading State
```javascript
const button = document.getElementById('myButton');

// Start loading
window.setButtonLoading(button, true, 'Memproses...');

// Stop loading
window.setButtonLoading(button, false);
```

### JavaScript: Create Custom Spinner
```javascript
const spinner = window.createChaseSpinner('#00BCD4', '30px');
element.innerHTML = spinner;
```

## CSS Classes

### Size Classes
- `.sk-chase-sm` - 20px
- `.sk-chase-md` - 30px
- Default - 40px
- `.sk-chase-lg` - 50px
- `.sk-chase-xl` - 70px

### Color Classes
- `.sk-chase-primary` - #00BCD4 (cyan)
- `.sk-chase-secondary` - #0097A7 (dark cyan)
- `.sk-chase-danger` - #EF4444 (red)
- `.sk-chase-success` - #10B981 (green)
- `.sk-chase-warning` - #F59E0B (yellow)
- `.sk-chase-white` - #FFFFFF (white for dark backgrounds)

### Example with Classes
```html
<div class="sk-chase sk-chase-primary sk-chase-lg">
  <div class="sk-chase-dot"></div>
  <div class="sk-chase-dot"></div>
  <div class="sk-chase-dot"></div>
  <div class="sk-chase-dot"></div>
  <div class="sk-chase-dot"></div>
  <div class="sk-chase-dot"></div>
</div>
```

## Common Patterns

### 1. Table Loading
```javascript
tbody.innerHTML = window.createTableLoadingRow(columnCount, 'Custom message...');
```

### 2. Card/Container Loading
```javascript
container.innerHTML = window.createLoadingState('Memuat...', '#00BCD4', '40px');
```

### 3. Button with Spinner
```javascript
button.addEventListener('click', async function() {
  window.setButtonLoading(this, true, 'Menyimpan...');
  
  try {
    await saveData();
  } finally {
    window.setButtonLoading(this, false);
  }
});
```

### 4. Inline Spinner in Text
```javascript
const spinner = window.createButtonSpinner('#ffffff');
button.innerHTML = `${spinner} Processing...`;
```

## Demo
Visit `/demo-spinner.html` to see all variants in action!

## Files Modified
- ✅ `/public/index.html` - Added SpinKit CSS and utility script
- ✅ `/public/assets/css/loading-spinner.css` - Custom styles
- ✅ `/public/src/js/utils/loadingSpinner.js` - Utility functions
- ✅ Multiple dashboard files updated with new spinners

## Benefits
- ✨ Consistent, professional loading experience
- 🎨 Brand-aligned colors
- ⚡ Smooth animations
- 📱 Responsive and lightweight
- 🔧 Easy to implement and maintain
