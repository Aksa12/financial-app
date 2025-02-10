# Financial Dashboard

This project is a **financial dashboard application** built using Vue and Vuetify. It provides users with an interface to visualize financial data. The dashboard includes features like data tables, interactive charts, and filter functionality, enabling users to analyze and explore expenses dynamically.

---

## Functionality

This application includes the following features:
1. **Expense Table**: 
   - Displays expenses grouped by vendors.
   - Updates dynamically based on filters.
2. **Expenses per Month**: 
   - Visualizes monthly expenses through Bar chart.
   - Includes values displayed directly inside each bar.
   - Updates dynamically based on filters.
3. **GL Account-wise expense distribution**:
   - Shows GL Account-wise expense distribution through Donut Chart.
   - Includes percentage values inside slices and a total expense summary in the center.
4. **Dynamic Filters**:
   - Filter data by **vendor** or **GL account**.
   - Updates both the table and charts instantly and allows user to select multiple values.
---

## 🛠️ Technologies Used

| Technology       | Purpose                                                   |
|-------------------|-----------------------------------------------------------|
| **Vue**           | Framework for building the application's front-end.       |
| **Vuetify**       | Material Design component framework for Vue.              |
| **Chart.js**      | Charting library for visualizing financial data.          |
| **Vue-Chart.js**  | Wrapper for integrating Chart.js with Vue.                |
| **TypeScript**    | Enforces static type checking for better code quality.    |
| **Vite**          | Build tool for fast development and optimized builds.     |

---

## 📂 Project Structure

Here’s the directory structure of the project:

```
FINANCIAL-DASHBOARD
├── assets/       # Custom styles and assets (e.g., images, json data)
├── components/   # Reusable Vue components (ExpenseTable, ExpenseFilter, Charts)
├── layouts/      # Application layouts
├── pages/        # Application views (index.vue)
├── public/       # Public static files (e.g., favicon, global assets)
```

---

## 💿 Install

Set up your project using your preferred package manager. Use the corresponding command to install the dependencies:

```bash
# Install using npm
npm install

# Or install using yarn
yarn install
```

---

## 💡 Usage

### Starting the Development Server

To start the development server with hot-reload, run the following command. The server will be accessible at [http://localhost:3000](http://localhost:3000):

```bash
# Start the development server
npm run dev
```

### Building for Production

To build your project for production, use:

```bash
# Build for production
npm run build
```

Once the build process is completed, your application will be ready for deployment in a production environment.

---