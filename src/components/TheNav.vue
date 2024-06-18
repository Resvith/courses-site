<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <router-link v-if="!isLoggedIn" :to="{ path: '/' }">
        CourseCrafters
      </router-link>
      <router-link v-else :to="{ path: '/dashboard' }">
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
      </div>

      <!--  OPPTIONS DROPDOWN MENU  -->
      <div class="dropdown position-relative d-inline-block">
        <button v-if="isLoggedIn" class="btn d-inline-block ms-auto dropdown-toggle" type="button" id="userOptionsDropdown" data-bs-toggle="dropdown" aria-expanded="false" v-on:click="openUserOptions">
            <i class="fas fa-user"></i>
        </button>
        
        <ul  class="dropdown-menu" aria-labelledby="userOptionsDropdown">
          <li><button class="dropdown-item" v-on:click="navigateTo('profile')">Profile</button></li>
          <li><button class="dropdown-item" v-on:click="navigateTo('settings')">Settings</button></li>
          <li><button class="dropdown-item" v-on:click="logout">Logout</button></li>
        </ul>
      </div>

      <!--  CART DROPDOWN MENU -->
      <div class="dropdown position-relative d-inline-block">
        <button v-if="isLoggedIn" class="btn d-inline-block dropdown-toggle" type="button" id="cartDropdown" data-bs-toggle="dropdown" aria-expanded="false" v-on:click="openCart">
          <i class="fas fa-shopping-cart"></i>
        </button>

        <div class="dropdown-menu dropdown-menu-end p-3" aria-labelledby="cartDropdown" style="width: 300px;">
          <div class="overflow-auto cart-items-container" style="max-height: 200px;">
            <!-- Example item in cart -->
            <div 
              v-for="item in cartItems" 
              :key="item.id" 
              class="d-flex justify-content-between align-items-center mb-2 cart-item"
              @click="navigateTo('/course/' + item.id)"
              style="cursor: pointer;"
            >
              <div>
                <small class="text-muted">{{ item.title }}</small>
              </div>
              <div>
                <span class="text-muted">{{ item.price }}</span>
              </div>
            </div>
          </div>
          <div class="d-flex justify-content-between mt-3">
            <button class="btn btn-primary btn-sm" v-on:click="navigateTo('cart')">Go to Cart</button>
            <button class="btn btn-success btn-sm" v-on:click="navigateTo('payment')">Go to Payment</button>
          </div>
        </div>
      </div>

      <!--  LOGIN/REGISTER/LOGOUT BUTTONS  -->
      <router-link :to="{ path: '/login' }">
          <button v-if="!isLoggedIn" class="btn btn-outline-primary ms-auto d-none d-lg-inline-block" type="button">Log In</button>
      </router-link>
      <router-link :to="{ path: '/register' }">
        <button v-if="!isLoggedIn" class="btn btn-primary ms-2 d-none d-lg-inline-block" type="button">Register</button>
      </router-link>
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

  data() {
    return {
      cartItems: [
        { id: 1, title: 'Course 1', price: '$10' },
        { id: 2, title: 'Course 2', price: '$20' },
        { id: 3, title: 'Course 3', price: '$30' },
        { id: 4, title: 'Course 1', price: '$10' },
        { id: 5, title: 'Course 2', price: '$20' },
        { id: 6, title: 'Course 3', price: '$30' },
        { id: 7, title: 'Course 1', price: '$10' },
        { id: 8, title: 'Course 2', price: '$20' },
        { id: 9, title: 'Course 3', price: '$30' },
        { id: 10, title: 'Course 1', price: '$10' },
        { id: 12, title: 'Course 2', price: '$20' },
        { id: 13, title: 'Course 3', price: '$30' },
        { id: 14, title: 'Course 1', price: '$10' },
        { id: 15, title: 'Course 2', price: '$20' },
        { id: 16, title: 'Course 3', price: '$30' },

      ],
    }
  },

  created() {
    this.checkSession();
  },

  computed: {
    ...mapState({
        isLoggedIn: state => state.isLoggedIn
    })
  },

  methods: {
    navigateTo(route) {
      this.$router.push({ path: route });
    },

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
          this.$router.push({ path: '/login' });
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
        this.$router.push({ path: '/login' });
      } catch (error) {
        console.error(error);
      }
    },

    async openCart() {
      console.log("Cart is opened");
    },

    openUserOptions() {
      this.isUserOptionsOpen = !this.isUserOptionsOpen;
    },
  }
}
</script>

<style scoped>
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

/* .dropdown-menu {
  right: 0;
  left: auto;
} */

  .cart-items-container {
    padding-right: 10px; /* Dodaj margines, aby scroll nie nachodził na treść */
  }

  .cart-item {
    border-bottom: 1px solid lightgrey; /* Dodaj delikatne linie oddzielające kursy */
    padding-bottom: 4px;
  }

  .cart-item:last-child {
    border-bottom: none; /* Usuń dolną granicę dla ostatniego elementu */
  }

  .dropdown-menu .dropdown-item:focus, 
  .dropdown-menu .dropdown-item:hover, 
  .dropdown-menu .dropdown-item:active {
    background-color: #f8f9fa; /* Usuń efekt czarnych linii */
    color: #000;
  }

  /* Dodatkowe style na lepsze dostosowanie wyglądu */
  .dropdown-menu {
    box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075); /* Dodaj delikatny cień dla lepszego efektu */
  }
</style>