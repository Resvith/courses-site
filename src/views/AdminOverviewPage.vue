<template>
    <div class="container admin-overview">
      <h1 class="my-4">Admin Overview</h1>
  
      <!-- Courses Section -->
      <div class="section">
        <h2>All Courses</h2>
        <table class="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Creator</th>
              <th>Price</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="course in courses" :key="course.course_id">
              <td>{{ course.course_id }}</td>
              <td>{{ course.title }}</td>
              <td>{{ course.creator_name }}</td>
              <td>{{ course.price }}</td>
              <td>{{ course.status }}</td>
              <td>
                <button @click="editCourse(course.course_id)" class="btn btn-sm btn-primary me-2">Edit</button>
                <button @click="deleteCourse(course.course_id)" class="btn btn-sm btn-danger">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
  
      <!-- Users Section -->
      <div class="section">
        <h2>All Users</h2>
        <table class="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Email</th>
              <th>User Type</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in users" :key="user.user_id">
              <td>{{ user.user_id }}</td>
              <td>{{ user.username }}</td>
              <td>{{ user.email }}</td>
              <td>{{ user.user_type }}</td>
              <td>
                <button @click="editUser(user.user_id)" class="btn btn-sm btn-primary me-2">Edit</button>
                <button @click="deleteUser(user.user_id)" class="btn btn-sm btn-danger">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'AdminOverviewPage',
    data() {
      return {
        courses: [],
        users: [],
      };
    },
    created() {
      this.fetchAllCourses();
      this.fetchAllUsers();
    },
    methods: {
      async fetchAllCourses() {
        try {
          const token = localStorage.getItem('token');
          const response = await axios.get(`http://localhost:3000/api/admin/courses`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          this.courses = response.data;
        } catch (error) {
          console.error('Error fetching courses:', error);
        }
      },
      async fetchAllUsers() {
        try {
          const token = localStorage.getItem('token');
          const response = await axios.get(`http://localhost:3000/api/admin/users`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          this.users = response.data;
        } catch (error) {
          console.error('Error fetching users:', error);
        }
      },
      editCourse(courseId) {
        // Implement course editing logic
        console.log('Edit course:', courseId);
      },
      deleteCourse(courseId) {
        // Implement course deletion logic
        console.log('Delete course:', courseId);
      },
      editUser(userId) {
        // Implement user editing logic
        console.log('Edit user:', userId);
      },
      deleteUser(userId) {
        // Implement user deletion logic
        console.log('Delete user:', userId);
      },
    },
  };
  </script>
  
  <style scoped>
  .admin-overview {
    padding: 20px 0;
  }
  
  .section {
    margin-bottom: 40px;
  }
  </style>