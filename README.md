# Courses Site

## Project setup
### 1. Install Node.js from official website

### 2. Clone this repo into any folder:
```
git clone https://github.com/Resvith/courses-site.git
```
### 3. Enter that folder
### 4. Go into courses-site folder
```
cd courses-site
```
### 5. Install dependencies
```
npm install
```
### 6. Start local servers
```
npm run start
```
It starts local servers for vue.js and node.js, also opens new cmd window for npm commands <br>
### 7. Open http://localhost:8080/ in browser. 
### 8. Import CoursesSite from CoursesSiteDB.sql
Database should be named "CoursesSite".
### 9. Ensure it works on **port 5434**

## Using:
After importing database you could used standard users:<br>
**User:** 
```
login: user
password: user
```
**Admin:**
```
login: admin
password: admin
```
**Creator:**
```
login: creator
password: creator
```


## Features
1. **User Authentication**: Login, Register, Logout
2. **Course Management**: Create, Edit, Delete courses
3. **User Roles**: Admin, Creator, Regular User
4. **Shopping Cart**: Add/Remove courses, Checkout
5. **Course Viewing**: Access purchased courses, view lessons
6. **Admin Panel**: Manage users and courses
7. **Creator Dashboard**: View statistics, manage courses
8. **Search Functionality**: Find courses
9. **User Profile**: View and edit account details
10. **Responsive Design**: Adapts to different screen sizes
11. **Payment Simulation**: Mock payment process
12. **Category Navigation**: Browse courses by category
13. **Become a Creator**: Upgrade user account to creator status
