# ExpenseTracker

![ExpenseTracker Screenshot](C:\Users\Ismail\Pictures\Screenshots\Ekran görüntüsü 2025-08-17 192425.png)

---

## Overview

**ExpenseTracker** is a full-stack web application built to help users manage their personal finances efficiently. The frontend is developed using **Angular**, providing a responsive and modern user interface, while the backend is powered by **Django**, ensuring secure data handling and scalability.

This project allows users to track incomes and expenses, categorize transactions, and visualize financial data in a clear and interactive dashboard.

---

## Features

- **Expense and Income Management**: Add, edit, and delete transactions easily.
- **Categories and Tags**: Organize transactions by custom categories for better insights.
- **Reports and Charts**: Visualize income and expenses using dynamic charts.
- **Responsive UI**: Works seamlessly on both desktop and mobile devices.
- **Deployment-Ready**: Angular build served through Django templates and static files.

---

## Technologies Used

- **Frontend:** Angular 15+, TypeScript, HTML5, CSS3
- **Backend:** Django 4+, Python 3.10+
- **Database:** MySQL
- **Tools:** Node.js, npm, Angular CLI, NVM (Node Version Manager)
- **Other:** Bootstrap (for responsive UI)

---

## How To Use

-**Virtual Environment(venv):** To use the python virtaul environment use the first navigate your way to venv file (cd ..path/ExpenseTracker) then run "venv/Scripts/activate"
-**Database(MySQL):** For db you should navigate your way to project file (cd ..path/ExpenseTracker/project) and change the password and admin according to your name and password and keep the MySQL service running
-**Frontend(Angular):** For accessing frontend go to "..path/ExpenseTracker/Frontend/src/app" and first run "npm install" then you can run the angular server on localhost:4200 by typing "ng serve"
-**Run server(Django):** When you are in "..path/ExpenseTracker/" type "python manage.py runserver" and it will run the backend on localhost:8000 and you can go to a browser of your choice and type localhost:8000 and access the site.



## Folder Structure
ExpenseTracker/
├── Backend/ # Django backend
│ ├── manage.py # Django management script
│ ├── requirements.txt # Python dependencies
│ ├── templates/
│ │ └── index.html # Angular entry point
│ └── static/
│ ├── main-.js # Angular JS bundle
│ ├── styles-.css # Angular CSS bundle
│ └── polyfills-*.js # Angular polyfills
├── Frontend/ # Angular frontend
│ ├── src/
│ ├── angular.json
│ ├── package.json
│ └── ...other Angular files
├── .gitignore
├── README.md
└── LICENSE




