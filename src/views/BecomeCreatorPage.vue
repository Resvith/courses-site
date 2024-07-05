<template>
    <div class="container mt-5">
      <h1 class="mb-4">Become a Creator</h1>
      <form @submit.prevent="submitForm">
        <div class="mb-3">
          <label for="bankAccount" class="form-label">Bank Account Number</label>
          <input v-model="form.bankAccount" type="text" class="form-control" id="bankAccount" required>
        </div>
        <div class="mb-3">
          <label for="name" class="form-label">First Name</label>
          <input v-model="form.name" type="text" class="form-control" id="name" required>
        </div>
        <div class="mb-3">
          <label for="surname" class="form-label">Last Name</label>
          <input v-model="form.surname" type="text" class="form-control" id="surname" required>
        </div>
        <div class="mb-3">
          <label for="birthday" class="form-label">Date of Birth</label>
          <input v-model="form.birthday" type="date" class="form-control" id="birthday" required>
        </div>
        <div class="mb-3">
          <label for="address" class="form-label">Address</label>
          <input v-model="form.address" type="text" class="form-control" id="address" required>
        </div>
        <div class="mb-3">
          <label for="city" class="form-label">City</label>
          <input v-model="form.city" type="text" class="form-control" id="city" required>
        </div>
        <div class="mb-3">
          <label for="postalCode" class="form-label">Postal Code</label>
          <input v-model="form.postalCode" type="text" class="form-control" id="postalCode" required>
        </div>
        <div class="mb-3">
          <label for="country" class="form-label">Country</label>
          <input v-model="form.country" type="text" class="form-control" id="country" required>
        </div>
        <div class="mb-3 form-check">
            <input v-model="form.termsAccepted" type="checkbox" class="form-check-input" id="termsCheck" required>
            <label class="form-check-label" for="termsCheck">
            I accept the <a href="#" @click.prevent="showTerms">terms and conditions</a>
            </label>
        </div>
        <button type="submit" class="btn btn-primary">Become a Creator</button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'BecomeCreatorPage',
    data() {
      return {
        form: {
          bankAccount: '',
          name: '',
          surname: '',
          birthday: '',
          address: '',
          city: '',
          postalCode: '',
          country: '',
          termsAccepted: false
        }
      }
    },
    methods: {
      async submitForm() {
        if (!this.form.termsAccepted) {
          alert('Please accept the terms and conditions');
          return;
        }
  
        try {
          const token = localStorage.getItem('token');
          const response = await axios.post('http://localhost:3000/api/become-creator', {
            ...this.form,
            token
          });
  
          if (response.data.success) {
            alert('Your account has been upgraded to creator status!');
            this.$store.commit('setUserType', 'creator');
            this.$router.push('/dashboard');
          } else {
            alert('There was an error upgrading your account. Please try again.');
          }
        } catch (error) {
          console.error('Error upgrading account:', error);
          alert('An error occurred. Please try again.');
        }
      },
      showTerms() {
        // Implement a method to show terms and conditions
        alert('Terms and conditions would be shown here.');
      }
    }
  }
  </script>
  
  <style scoped>
  .form-check {
    display: flex;
    align-items: center;
  }
  
  .form-check-input {
    margin-right: 0.5rem;
  }
  
  .form-check-label {
    margin-bottom: 0;
  }
  </style>