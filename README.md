# CollegeHub

## Overview
CollegeHub is a web application designed to assist prospective students in India to search for IT and Management colleges. It provides comprehensive information about colleges, including courses offered and contact details. The application is built using the MERN stack (MongoDB, Express, React, Node.js) and employs web scraping techniques using Scrapy to ensure data is accurate and up-to-date.

## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Features
- Search for IT and Management colleges in India.
- Detailed information about courses offered and contact details of colleges.
- User-friendly interface with great UI/UX.
- Responsive design compatible with various devices and screens.
- Accurate and up-to-date data sourced via web scraping.

## Technologies Used
- Frontend: React.js
- Backend: Node.js, Express.js
- Database: MongoDB
- Web Scraping: Scrapy (Python)
- Version Control: Git

## Installation

### Prerequisites
- Node.js (v14.x or higher)
- MongoDB
- Python (3.x)
- Scrapy

### Backend Setup
1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/collegehub.git
    cd collegehub/backend
    ```

2. Install backend dependencies:
    ```bash
    npm install
    ```

3. Create a `.env` file in the backend directory with the following content:
    ```plaintext
    MONGODB_URI=mongodb://localhost:27017/collegehub
    PORT=7000
    ```

4. Start the backend server:
    ```bash
    npm start
    ```

### Frontend Setup
1. Navigate to the frontend directory:
    ```bash
    cd ../frontend
    ```

2. Install frontend dependencies:
    ```bash
    npm install
    ```

3. Start the frontend server:
    ```bash
    npm start
    ```

### Web Scraping Setup
1. Navigate to the `scrapy` directory:
    ```bash
    cd ../scrapy
    ```

2. Install Scrapy:
    ```bash
    pip install scrapy
    ```

3. Run the Scrapy spider to collect data:
    ```bash
    scrapy crawl colleges
    ```

## Usage
1. Open your browser and navigate to `http://localhost:3000`.
2. Use the search functionality to find colleges and view detailed information.

## Project Structure
```plaintext
collegehub/
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   ├── .env
│   └── package.json
│
├── frontend/
│   ├── public/
│   ├── src/
│   ├── .env
│   └── package.json
│
├── scrapy/
│   ├── spiders/
│   ├── items.py
│   ├── middlewares.py
│   ├── pipelines.py
│   ├── settings.py
│   └── scrapy.cfg
│
└── README.md
