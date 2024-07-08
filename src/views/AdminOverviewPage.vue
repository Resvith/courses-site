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
      this.fetchActiveUsers();
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
      async fetchActiveUsers() {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`http://localhost:3000/api/admin/active-users/${token}`, {
            headers: { Authorization: `Bearer ${token}` }
            });
            this.users = response.data;
        } catch (error) {
            console.error('Error fetching active users:', error);
        }
        },
      editCourse(courseId) {
        this.$router.push({ path: '/course-management', query: { mode: 'edit', courseId: courseId }});
      },
      async deleteCourse(courseId) {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
            console.error('No token found');
            return;
            }

            const confirmDelete = confirm('Are you sure you want to delete this course?');
            if (!confirmDelete) {
            return;
            }

            const response = await axios.delete(`http://localhost:3000/api/courses/${token}/${courseId}`);

            if (response.data.success) {
            alert('Course deleted successfully');
            // Remove the deleted course from the courses array
            this.courses = this.courses.filter(course => course.course_id !== courseId);
            } else {
            alert('Failed to delete course: ' + response.data.error);
            }
        } catch (error) {
            console.error('Error deleting course:', error);
            if (error.response) {
            alert('Failed to delete course: ' + error.response.data.error);
            } else {
            alert('An error occurred while deleting the course');
            }
        }
        },
      editUser(userId) {
        // Implement user editing logic
        console.log('Edit user:', userId);
      },
      async deleteUser(userId) {
        try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('No token found');
          return;
        }

        const confirmDeactivate = confirm('Are you sure you want to deactivate this user? They will no longer be able to access their account.');
        if (!confirmDeactivate) {
          return;
        }

        const response = await axios.post(`http://localhost:3000/api/admin/deactivate-user/${token}/${userId}`);

        if (response.data.success) {
          alert('User deactivated successfully');
          // Remove the deactivated user from the users array
          this.users = this.users.filter(user => user.user_id !== userId);
        } else {
          alert('Failed to deactivate user: ' + response.data.error);
        }
      } catch (error) {
        console.error('Error deactivating user:', error);
        if (error.response) {
          alert('Failed to deactivate user: ' + error.response.data.error);
        } else {
          alert('An error occurred while deactivating the user');
        }
      }
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