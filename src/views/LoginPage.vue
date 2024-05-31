<template>
    <form class="container" @submit.prevent="submitLogin">
        <p id="loginInformation"> {{ loginMessage }}</p>
        <!-- Email input -->
        <div data-mdb-input-init class="form-outline mb-4">
          <input v-model=userData.username type="text" id="usernameInput" class="form-control" required/>
          <label class="form-label" for="usernameInput">Username</label>
        </div>
      
        <!-- Password input -->
        <div data-mdb-input-init class="form-outline mb-4">
          <input v-model=userData.password type="password" id="passwordInput" class="form-control" required/>
          <label class="form-label" for="passwordInput">Password</label>
        </div>
      
        <!-- 2 column grid layout for inline styling -->
        <div class="row mb-4">
          <div class="col d-flex justify-content-center">
            <!-- Checkbox -->
            <div class="form-check">
              <input class="form-check-input" type="checkbox" value="" id="form2Example31" checked />
              <label class="form-check-label" for="form2Example31"> Remember me </label>
            </div>
          </div>
      
          <div class="col">
            <!-- Simple link -->
            <a href="#!">Forgot password?</a>
          </div>
        </div>
      
        <!-- Submit button -->
        <button type="submit" data-mdb-button-init data-mdb-ripple-init class="btn btn-primary btn-block mb-4">Sign in</button>
      
        <!-- Register buttons -->
        <div class="text-center">
          <p>Not a member? <a href="#!">Register</a></p>
          <p>or sign up with:</p>
          <button  type="button" data-mdb-button-init data-mdb-ripple-init class="btn btn-link btn-floating mx-1">
            <i class="fab fa-facebook-f"></i>
          </button>
      
          <button  type="button" data-mdb-button-init data-mdb-ripple-init class="btn btn-link btn-floating mx-1">
            <i class="fab fa-google"></i>
          </button>
      
          <button  type="button" data-mdb-button-init data-mdb-ripple-init class="btn btn-link btn-floating mx-1">
            <i class="fab fa-twitter"></i>
          </button>
      
          <button  type="button" data-mdb-button-init data-mdb-ripple-init class="btn btn-link btn-floating mx-1">
            <i class="fab fa-github"></i>
          </button>
        </div>
      </form>

</template>

<script>
  import axios from 'axios';
    export default {
        name: 'LoginPage',
        data() {
            return {
                userData: {
                    username: 'admin',
                    password: 'admin',
                },
                loginMessage: '',
                isLoggedIn: false,
            }
        },

        created() {
          this.checkSession();
        },

        methods: {
            submitLogin() {
              axios.post('http://localhost:3000/api/login', this.userData)
                .then(response => {
                  console.log("Is login correct:", response.data.success);
                  if(response.data.success) {
                    localStorage.setItem('token', response.data.token);
                    this.loginMessage = "";
                    this.$router.push('/');
                  } else {
                    this.loginMessage = response.data.message;
                  }
                })
                .catch(error => {
                  console.error("There was an error:", error);
                });
            },

            async checkSession() {
              // console.log("Checking session");
              // console.log("Vue Token: ", localStorage.getItem('token'));
              if (!localStorage.getItem('token')) {
                // console.log("Token not found");
                return;
              }
              // console.log("Token exists");
              await axios.get(`http://localhost:3000/api/check-session/${localStorage.getItem('token')}`, { withCredentials: true })
                .then(response => {
                  // console.log("Token response: ", response.data);
                    if (response.data.success) {
                        this.$router.push('/');
                    } else {
                        // Do nothing or notify user if needed
                    }
                })
                .catch(error => {
                    console.error("There was an error:", error);
                });
            },
        },
    }
</script>

<style>
  #loginInformation {
    color: red;
    font-size: 1.5em;
  }
</style>