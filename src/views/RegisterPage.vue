<template>
  <form class="container" @submit.prevent="submitRegistration">
    <!-- Sign Up Information -->
    <p id="loginInformation"> {{ loginMessage }}</p>
    <!-- Email input -->
    <div data-mdb-input-init class="form-outline mb-4">
      <p class="error" v-if(errors.emailError)>{{ errors.emailError }}</p>
      <input v-model=userData.email type="email" id="email" class="form-control" required/>
      <label class="form-label" for="email">Email address</label>
    </div>

    <!-- Username input -->
    <div data-mdb-input-init class="form-outline mb-4">
      <p class="error" v-if(errors.usernameError)>{{ errors.usernameError }}</p>
      <input v-model=userData.username type="text" id="username" class="form-control" required/>
      <label class="form-label" for="username">Username</label>
    </div>

    <!-- Password input -->
    <div data-mdb-input-init class="form-outline mb-4">
      <p class="error" v-if(errors.passwordError)>{{ errors.passwordError }}</p>
      <input v-model=userData.password type="password" id="password" class="form-control" required/>
      <label class="form-label" for="password">Password</label>
    </div>

    <!-- Password input -->
    <div data-mdb-input-init class="form-outline mb-4">
      <p class="error" v-if(errors.reapeatPasswordError)>{{ errors.reapeatPasswordError }}</p>
      <input v-model=userData.reapeatPassword type="password" id="passwordRepeat" class="form-control" required/>
      <label class="form-label" for="passwordRepeat">Reapeat Password</label>
    </div>

    <!-- Submit button -->
    <button type="submit" data-mdb-button-init data-mdb-ripple-init class="btn btn-primary btn-block mb-4">Sign Up</button>

    <!-- Register buttons -->
    <div class="text-center">
      <p>Already a member? <a href="#!">Login</a></p>
    </div>
  </form>

</template>

<script>
import axios from 'axios';
export default {
  name: 'RegisterPage',
  data() {
    return {
      userData: {
        username: '',
        password: '',
        reapeatPassword: '',
        email: '',
      },
      errors: {
        usernameError: '',
        passwordError: '',
        reapeatPasswordError: '',
        emailError: '',
      }
    }
  },
  methods: {

    submitRegistration() {
      if (!this.arePasswordsTheSame()) {
        return;
      }
      if (!this.enoughPasswordComplexity()) {
        this.errors.passwordError = 'Password must be at least 8 characters long and contain at least one uppercase letter, one number and one special character';
        return;
      }
      this.isUsernameAvailable(this.userData.username);
      this.isEmailAvailable(this.userData.email); 
    },

    async isUsernameAvailable() {
        try {
            const response = await axios.get(`http://localhost:3000/api/check-username/${this.userData.username}`);
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.error('Error checking username availability:', error.response ? error.response.data : error.message);
            return null;
      }
    },

    async isEmailAvailable() {
      try {
            const response = await axios.get(`http://localhost:3000/api/check-email/${this.userData.email}`);
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.error('Error checking username availability:', error.response ? error.response.data : error.message);
            return null;
      }
    },

    arePasswordsTheSame(){
      if (this.userData.password !== this.userData.reapeatPassword) {
        this.errors.reapeatPasswordError = 'Passwords do not match';
        return false;
      } else {
        this.errors.reapeatPasswordError = '';
        return true;
      }
    },

    enoughPasswordComplexity() {
      const password = this.userData.password.trim();

      console.log('Password:', password);
      console.log('Type:', typeof password);
      console.log('Length:', password.length);

      // Test 1: At least 8 characters
      const lengthTest = /.{8,}/;
      const lengthTestResult = lengthTest.test(password);
      
      // Test 2: At least one uppercase letter
      const upperCaseTest = /[A-Z]/;
      const upperCaseTestResult = upperCaseTest.test(password);
      
      // Test 3: At least one digit
      const digitTest = /\d/;
      const digitTestResult = digitTest.test(password);
      
      // Test 4: At least one special character
      const specialCharTest = /[`!@#$%^&*()_\-+=[\]{};':"\\|,.<>/?~ ]/;
      const specialCharTestResult = specialCharTest.test(password);
 
      // Debug
      // console.log('Uppercase Test Result:', upperCaseTestResult);
      // console.log('Digit Test Result:', digitTestResult);
      // console.log('Special Character Test Result:', specialCharTestResult);
      // console.log('All Tests Pass:', allTestsPass);
      // console.log('Length Test Result:', lengthTestResult);
      
      // Combine all tests
      const allTestsPass = lengthTestResult && upperCaseTestResult && digitTestResult && specialCharTestResult;
      return allTestsPass;
    }
  }
}

</script>

<style>
  .error {
    color: red;
  }
</style>