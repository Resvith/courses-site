<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <router-link :to="{ path: './' }">
        CourseCrafters
      </router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Courses Category
            </a>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
              <li class="dropdown-submenu">
                <a class="dropdown-item dropdown-toggle" href="#">Web Development</a>
                <ul class="dropdown-menu">
                  <li>
                    <a class="dropdown-item" href="#">HTML</a>
                  </li>
                  <li class="dropdown-submenu">
                    <a class="dropdown-item dropdown-toggle" href="#">CSS</a>
                    <ul class="dropdown-menu">
                      <li><a class="dropdown-item" href="#">Sass</a></li>
                      <li><a class="dropdown-item" href="#">Less</a></li>
                      <li><a class="dropdown-item" href="#">Bootstrap</a></li>
                    </ul>
                  </li>
                  <li class="dropdown-submenu">
                    <a class="dropdown-item dropdown-toggle" href="#">JS</a>
                    <ul class="dropdown-menu">
                      <li><a class="dropdown-item" href="#">JQuery</a></li>
                      <li><a class="dropdown-item" href="#">React</a></li>
                      <li><a class="dropdown-item" href="#">Angular</a></li>
                      <li><a class="dropdown-item" href="#">Vue.js</a></li>
                    </ul>
                  </li>
                </ul>
              </li>
              <li><a class="dropdown-item" href="#">Mobile Development</a></li>
              <li><a class="dropdown-item" href="#">AI</a></li>
            </ul>
          </li>
        </ul>
        <form class="d-flex my-2 my-md-0 ms-auto d-none d-md-flex">
          <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
          <button class="btn btn-outline-success" type="submit">Search</button>
        </form>
        <router-link :to="{ path: './login' }">
          <button v-if="!isLoggedIn" class="btn btn-outline-primary ms-2 d-lg-none" type="button">Log In</button>
        </router-link>
        <router-link :to="{ path: './register' }">
          <button v-if="!isLoggedIn" class="btn btn-primary ms-2 d-lg-none" type="button">Register</button>
        </router-link>
        <button v-if="isLoggedIn" class="btn btn-primary ms-2 d-lg-none d-lg-inline-block" type="button" v-on:click="logout">Log Out</button> <!-- Just for testing -->
      </div>
      <router-link :to="{ path: './login' }">
          <button v-if="!isLoggedIn" class="btn btn-outline-primary ms-auto d-none d-lg-inline-block" type="button">Log In</button>
      </router-link>
      <router-link :to="{ path: './register' }">
        <button v-if="!isLoggedIn" class="btn btn-primary ms-2 d-none d-lg-inline-block" type="button">Register</button>
      </router-link>
      <button v-if="isLoggedIn" class="btn btn-outline-primary ms-2 d-none d-lg-inline-block" type="button" v-on:click="logout">Log Out</button> <!-- Just for testing -->
    </div>
  </nav>
</template>

<script>
import axios from 'axios';
// import { mapActions } from 'vuex';
import { mapState } from 'vuex';

export default {
  name: 'TheNav',
  components: {
  },

  created() {
    this.checkSession();
    console.log("created nav");
  },

  computed: {
    ...mapState({
        isLoggedIn: state => state.isLoggedIn
    })
  },

  methods: {
    // Checking everytime when page is loaded if user is logged in
    async checkSession() {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          return;
        }
        const response = await axios.get(`http://localhost:3000/api/check-session/${token}`, { withCredentials: true });
        if (response.data.success) {
          this.$store.dispatch('loginState');
        }
      } catch (error) {
        console.error(error);
      }
    },

    // ...mapActions(['logoutState']),
    async logout() {
      try {
        const token = localStorage.getItem('token');
        // console.log("Stored token from nav: ", token);
        if (!token) {
          this.$router.push({ path: './login' });
          return;
        }
        try {
          await axios.delete(`http://localhost:3000/api/logout/${token}`, { withCredentials: true });
        } catch (error) {
          console.error("Database deleting error,", error);
        }
        await localStorage.removeItem('token');
        // this.logoutState();
        this.$store.dispatch('logoutState');
        // console.log("Should push to login now");
        this.$router.push({ path: './login' });
      } catch (error) {
        console.error(error);
      }
    }
  }
}
</script>

<style>
/* Styles to make submenu is same line above */
.dropdown-submenu {
  position: relative;
}

.dropdown-submenu:hover > .dropdown-menu {
  display: block;
}

.dropdown-submenu .dropdown-menu {
  top: 0;
  left: 100%;
  margin-top: -5px;
}
</style>