<template>
    <div class="container mt-5">
      <h1>Edit User</h1>
      <form @submit.prevent="saveUser">
        <div class="mb-3">
          <label for="username" class="form-label">Username:</label>
          <input v-model="user.username" type="text" class="form-control" id="username" required>
        </div>
        <div class="mb-3">
          <label for="email" class="form-label">Email:</label>
          <input v-model="user.email" type="email" class="form-control" id="email" required>
        </div>
        <div class="mb-3">
          <label for="accountType" class="form-label">Account Type:</label>
          <select v-model="user.user_type" class="form-select" id="accountType" required>
            <option value="user">User</option>
            <option value="creator">Creator</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <button type="submit" class="btn btn-primary">Save Changes</button>
        <button type="button" class="btn btn-secondary ms-2" @click="cancel">Cancel</button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'EditUserPage',
    data() {
      return {
        user: {
          user_id: null,
          username: '',
          email: '',
          user_type: ''
        }
      };
    },
    created() {
      this.fetchUserData();
    },
    methods: {
      async fetchUserData() {
        const userId = this.$route.params.id;
        try {
          const response = await axios.get(`http://localhost:3000/api/admin/users/${userId}`);
          this.user = response.data;
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      },
      async saveUser() {
        try {
          await axios.put(`http://localhost:3000/api/admin/users/${this.user.user_id}`, this.user);
          alert('User updated successfully');
          this.$router.push('/admin-management');
        } catch (error) {
          console.error('Error updating user:', error);
          alert('Failed to update user');
        }
      },
      cancel() {
        this.$router.push('/admin-management');
      }
    }
  };
  </script>