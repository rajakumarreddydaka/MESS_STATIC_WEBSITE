# 🍽️ MessMate - Hostel Mess Menu Web App

MessMate is a static web application built with **React + Vite** to view daily and monthly hostel mess menus (Veg / Non-Veg & Special Mess) for Men's and Women's Hostels.

This guide provides a step-by-step walkthrough for anyone—even with no prior experience—to run the project, convert new monthly Excel menus into JSON data, and update the website.

---

## 📋 Prerequisites & Tools Required

Before you start, make sure you have installed:
1. **Git**: [Download Git](https://git-scm.com/)
2. **Node.js** (v18 or higher): [Download Node.js](https://nodejs.org/)
3. **Python** (v3.8 or higher): [Download Python](https://www.python.org/)

---

## 🚀 Step 1: Clone & Setup the Repository

Open **Git Bash**, **Terminal**, or **PowerShell** on your computer and run:

```bash
# 1. Clone the repository
git clone [https://github.com/rajakumarreddydaka/MESS_STATIC_WEBSITE.git](https://github.com/rajakumarreddydaka/MESS_STATIC_WEBSITE.git)

# 2. Go into the project root folder
cd MESS_STATIC_WEBSITE

# 3. Create a Python virtual environment
python -m venv .venv

# 4. Activate the virtual environment
# On Windows (PowerShell):
.venv\Scripts\Activate.ps1
# On Windows (Git Bash / Command Prompt):
source .venv/Scripts/activate
# On macOS / Linux:
source .venv/bin/activate

# 5. Install required Python packages for converting Excel files
pip install pandas openpyxl

📦 Step 2: Install Frontend Dependencies
Bash
# Navigate to the frontend directory
cd frontend

# Install Node modules
npm install

# Return to root directory
cd ..
📅 Step 3: Convert Excel Menu for a New Month
Whenever a new monthly menu is released in Excel (.xlsx), follow these steps to convert it into site-ready JSON data.

1. Place the Excel File
Copy the new Excel file into the project root folder (MESS_STATIC_WEBSITE/).

Naming standard: <month>_<year>.xlsx (e.g., december_2026.xlsx or january_2027.xlsx).

Required sheet names: The workbook must contain two sheets:

Veg & Non-Veg

Special

2. Run the Converter Script
Run the Python converter script based on the hostel type:

For Men's Hostel:
Bash
python convert_menu.py <excel_filename>.xlsx --month <MONTH_NUMBER> --year <YEAR>

# Example for December 2026:
python convert_menu.py december_2026.xlsx --month 12 --year 2026
For Women's Hostel:
Bash
python convert_womens_menu.py <womens_excel_filename>.xlsx

# Example for December 2026 Women's Hostel:
python convert_womens_menu.py december_womens_2026.xlsx
The script will generate converted JSON files under output/<hostel>/<YEAR>/<MONTH_NUMBER>/.

📂 Step 4: Copy Converted JSON to Frontend Public Assets
The React app reads static JSON files directly from frontend/public/data/. Copy the newly generated output into the public directory:

On Windows (PowerShell):
PowerShell
# 1. Create directory structure for Men's Hostel (e.g. Month 12, Year 2026)
New-Item -ItemType Directory -Force -Path "frontend/public/data/mens/2026/12"

# 2. Copy converted JSON files
Copy-Item -Path "output/mens/2026/12/*" -Destination "frontend/public/data/mens/2026/12/" -Force
On Linux / macOS / Git Bash:
Bash
# 1. Create directory structure for Men's Hostel
mkdir -p frontend/public/data/mens/2026/12

# 2. Copy converted JSON files
cp -r output/mens/2026/12/* frontend/public/data/mens/2026/12/
(Repeat step 4 for womens hostel data if updating Women's Hostel menu).

🧪 Step 5: Test the Website Locally
Test the website locally to confirm that the new month's menu loads properly:

Bash
# Go to frontend directory
cd frontend

# Start Vite local development server
npm run dev
Open the URL shown in your terminal (usually http://localhost:5173/MESS_STATIC_WEBSITE/) in Google Chrome.

Select your Hostel (Men's or Women's) and Mess Type (Veg/Non-Veg or Special Mess).

Use the date picker to select a date in your newly updated month and check if the food items display accurately.

⬆️ Step 6: Commit and Push Changes to GitHub
Once everything works cleanly in your browser, publish the changes live:

Bash
# 1. Go back to project root folder
cd ..

# 2. Check changed files
git status

# 3. Stage all changed files
git add .

# 4. Commit changes with a message
git commit -m "Add and update mess menu for December 2026"

# 5. Push changes to GitHub main branch
git push origin main
📂 Folder Structure Overview
Plaintext
MESS_STATIC_WEBSITE/
├── convert_menu.py           # Men's Hostel Excel to JSON converter
├── convert_womens_menu.py    # Women's Hostel Excel to JSON converter
├── .gitignore                # Ignores build artifacts, node_modules, and *.xlsx files
├── output/                   # Directory where generated JSON outputs are stored
└── frontend/                 # React frontend project (Vite)
    ├── public/
    │   └── data/             # Static menu JSON data served dynamically to React
    └── src/
        ├── App.jsx           # Core app components and data loading logic
        └── App.css           # Styling and design theme rules
⚠️ Important Troubleshooting Tips
Syntax Errors in App.jsx: If npm run dev fails with a Pre-transform error, inspect src/App.jsx in VS Code to fix any accidental typos or spaces in variable names (e.g. menuError).

Excel Files Not Needed on GitHub: Excel workbooks (*.xlsx) are ignored by .gitignore so they are not uploaded to GitHub. Keep local backup copies in your project folder.

Month Number Flag: Always pass --month as a number (1 for Jan, 11 for Nov, 12 for Dec), not text.