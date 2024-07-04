<template>
    <div class="container mt-5">
      <h1>User Profile</h1>
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">Account Information</h5>
          <p><strong>Username:</strong> {{ username }}</p>
          <p><strong>Account Type:</strong> {{ userType }}</p>
          <p><strong>Email:</strong> {{ email }}</p>
          
          <a href="#" class="text-primary text-decoration-underline" @click.prevent="showChangePasswordModal">
            Change Password
          </a>
          
          <h5 class="mt-4">Delete Account</h5>
          <p class="text-danger">Warning: This action cannot be undone.</p>
          <button @click="confirmDeleteAccount" class="btn btn-danger">Delete Account</button>
        </div>
      </div>
  
      <!-- Change Password Modal -->
      <div class="modal fade" id="changePasswordModal" tabindex="-1" aria-labelledby="changePasswordModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="changePasswordModalLabel">Change Password</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <form @submit.prevent="changePassword">
                <div class="mb-3">
                  <label for="currentPassword" class="form-label">Current Password</label>
                  <input type="password" class="form-control" id="currentPassword" v-model="currentPassword" required>
                </div>
                <div class="mb-3">
                  <label for="newPassword" class="form-label">New Password</label>
                  <input type="password" class="form-control" id="newPassword" v-model="newPassword" required>
                </div>
                <div class="mb-3">
                  <label for="confirmPassword" class="form-label">Confirm New Password</label>
                  <input type="password" class="form-control" id="confirmPassword" v-model="confirmPassword" required>
                </div>
                <button type="submit" class="btn btn-primary">Change Password</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import { Modal } from 'bootstrap';
  import { mapState } from 'vuex';

  export default {
    name: 'UserProfilePage',
    data() {
      return {
        username: '',
        accountType: '',
        email: '',
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
        changePasswordModal: null,
      };
    },
    computed: {
      ...mapState({
        userType: state => state.userType
      })
    },
    created() {
      this.fetchUserData();
    },
    mounted() {
      this.changePasswordModal = new Modal(document.getElementById('changePasswordModal'));
    },
    methods: {
      async fetchUserData() {
        try {
          const token = localStorage.getItem('token');
          const response = await axios.get(`http://localhost:3000/api/user-profile/${token}`);
          const userData = response.data;
          this.username = userData.username;
          this.accountType = userData.user_type;
          this.email = userData.email;
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      },
      showChangePasswordModal() {
        this.changePasswordModal.show();
      },
      async changePassword() {
        if (this.newPassword !== this.confirmPassword) {
          alert('New passwords do not match');
          return;
        }
        try {
          const token = localStorage.getItem('token');
          await axios.post('http://localhost:3000/api/change-password', {
            token,
            currentPassword: this.currentPassword,
            newPassword: this.newPassword
          });
          alert('Password changed successfully');
          this.currentPassword = '';
          this.newPassword = '';
          this.confirmPassword = '';
          this.changePasswordModal.hide();
        } catch (error) {
          console.error('Error changing password:', error);
          alert('Failed to change password');
        }
      },
      async confirmDeleteAccount() {
        if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
          try {
            const token = localStorage.getItem('token');
            await axios.delete(`http://localhost:3000/api/delete-account/${token}`);
            alert('Account deleted successfully');
            this.$store.dispatch('logoutState');
            this.$router.push('/');
          } catch (error) {
            console.error('Error deleting account:', error);
            alert('Failed to delete account');
          }
        }
      }
    }
  };
  </script>