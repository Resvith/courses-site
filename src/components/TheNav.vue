<template>
  <nav class="navbar navbar-expand navbar-light bg-light">
    <div class="container-fluid">
      <router-link :to="{ path: isLoggedIn ? '/dashboard' : '/' }" class="navbar-brand d-flex align-items-center">
        <img src="@/assets/favicon.png" alt="CourseCrafters Logo" class="me-2" style="height: 30px; width: auto;">
        <span>CourseCrafters</span>
      </router-link>
      <div class="navbar-nav me-auto course-category-wrapper">
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Courses Category
          </a>
          <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
            <li class="dropdown-submenu">
              <a class="dropdown-item dropdown-toggle" href="#" @click="searchCategory('Web Development')">Web Development</a>
              <ul class="dropdown-menu">
                <li><a class="dropdown-item" href="#" @click="searchCategory('HTML')">HTML</a></li>
                <li class="dropdown-submenu">
                  <a class="dropdown-item dropdown-toggle" href="#" @click="searchCategory('CSS')">CSS</a>
                  <ul class="dropdown-menu">
                    <li><a class="dropdown-item" href="#" @click="searchCategory('Sass')">Sass</a></li>
                    <li><a class="dropdown-item" href="#" @click="searchCategory('Less')">Less</a></li>
                    <li><a class="dropdown-item" href="#" @click="searchCategory('Bootstrap')">Bootstrap</a></li>
                  </ul>
                </li>
                <li class="dropdown-submenu">
                  <a class="dropdown-item dropdown-toggle" href="#" @click="searchCategory('JavaScript')">JavaScript</a>
                  <ul class="dropdown-menu">
                    <li><a class="dropdown-item" href="#" @click="searchCategory('jQuery')">jQuery</a></li>
                    <li><a class="dropdown-item" href="#" @click="searchCategory('React')">React</a></li>
                    <li><a class="dropdown-item" href="#" @click="searchCategory('Angular')">Angular</a></li>
                    <li><a class="dropdown-item" href="#" @click="searchCategory('Vue.js')">Vue.js</a></li>
                  </ul>
                </li>
              </ul>
            </li>
            <li><a class="dropdown-item" href="#" @click="searchCategory('Mobile Development')">Mobile Development</a></li>
            <li><a class="dropdown-item" href="#" @click="searchCategory('Programming')">Programming</a></li>
            <li><a class="dropdown-item" href="#" @click="searchCategory('Backend Development')">Backend Development</a></li>
            <li><a class="dropdown-item" href="#" @click="searchCategory('Python')">Python</a></li>
            <li><a class="dropdown-item" href="#" @click="searchCategory('Data Science')">Data Science</a></li>
            <li><a class="dropdown-item" href="#" @click="searchCategory('Machine Learning')">Machine Learning</a></li>
            <li><a class="dropdown-item" href="#" @click="searchCategory('Algorithms')">Algorithms</a></li>
            <li><a class="dropdown-item" href="#" @click="searchCategory('Databases')">Databases</a></li>
          </ul>
  </li>
  </div>

  <div class="d-flex align-items-center">
    <!-- Cart icon -->
    <div class="dropdown position-relative d-inline-block me-2">
      <button v-if="isLoggedIn" class="btn d-inline-block dropdown-toggle" type="button" id="cartDropdown" data-bs-toggle="dropdown" aria-expanded="false" @click="openCart">
        <i class="fas fa-shopping-cart"></i>
      </button>

      <div class="dropdown-menu dropdown-menu-end p-3" aria-labelledby="cartDropdown" style="width: 300px;">
        <div class="overflow-auto cart-items-container" style="max-height: 200px;">
          <div
            v-for="item in cartItems"
            :key="item.id"
            class="d-flex justify-content-between align-items-center mb-2 cart-item"
            @click="navigateTo('/course/' + item.id)"
            style="cursor: pointer;"
          >
            <div style="margin-right: 10px;">
              <img :src="item.img" alt="Course Image" style="width: 30px; height: 30px;">
            </div>
            <div style="flex: 1; overflow: hidden;">
              <small class="text-muted text-truncate" style="max-width: 200px;">{{ item.title }}</small>
            </div>
            <div style="margin-left: 10px;">
              <span class="text-muted">{{ item.price }} zł</span>
            </div>
          </div>
        </div>

        <div class="d-flex justify-content-between mt-3">
          <span>Total:</span>
          <span>{{ cartItems.reduce((acc, item) => acc + parseFloat(item.price), 0).toFixed(2) }} zł</span>
        </div>

        <div class="d-flex justify-content-between mt-3">
          <button class="btn btn-primary btn-sm" @click="navigateTo('cart')">Open Cart</button>
          <button class="btn btn-success btn-sm" @click="navigateTo('checkout')">Checkout</button>
        </div>
      </div>
    </div>

    <!-- User options dropdown -->
    <div class="dropdown position-relative d-inline-block">
      <button v-if="isLoggedIn" class="btn d-inline-block dropdown-toggle" type="button" id="userOptionsDropdown" data-bs-toggle="dropdown" aria-expanded="false" @click="openUserOptions">
        <i class="fas fa-user"></i>
      </button>
      
      <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="userOptionsDropdown">
        <li><button class="dropdown-item" @click="navigateTo('profile')">Profile</button></li>
        <li><button class="dropdown-item" @click="navigateTo('settings')">Settings</button></li>
        <li v-if="userType=='user'"><button class="dropdown-item" @click="navigateTo('become-creator')">Become creator</button></li>
        <li v-else-if="userType=='admin'"><button class="dropdown-item" @click="navigateTo(`admin-management`)">Admin panel</button></li>
        <li v-else><button class="dropdown-item" @click="navigateTo(`creator/${creatorId}`)">Creator panel</button></li>
        <li><button class="dropdown-item" @click="logout">Logout</button></li>
      </ul>
    </div>

    <!-- Login/Register buttons -->
    <div v-if="!isLoggedIn" class="ms-2">
      <router-link :to="{ path: '/login' }" class="btn btn-outline-primary">Log In</router-link>
      <router-link :to="{ path: '/register' }" class="btn btn-primary ms-2">Register</router-link>
    </div>
  </div>
</div>
</nav>
</template>
<script>
import axios from 'axios';
import { mapState } from 'vuex';
import { cartUpdateEvent } from '@/eventBus.js';
import { watch, onMounted, ref } from 'vue';

export default {
  name: 'TheNav',
  components: {
  },

  data() {
    return {
      creatorId: null,
    }
  },

  created() {
    this.checkSession();
    this.loadCartItems();
  },

  computed: {
    ...mapState({
        isLoggedIn: state => state.isLoggedIn,
        userType: state => state.userType
    })
  },

  setup() {
    const cartItems = ref([]);

    const loadCartItems = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const response = await axios.get(`http://localhost:3000/api/cart/${token}`);
          cartItems.value = response.data.map(course => ({
            id: course.course_id,
            img: course.img,
            title: course.title,
            price: course.price
          }));
        }
      } catch (error) {
        console.error('Error loading cart items:', error);
      }
    };

    watch(cartUpdateEvent, () => {
      loadCartItems();
    });

    onMounted(() => {
      loadCartItems();
    });

    return {
      cartItems,
      loadCartItems
    };
  },

  methods: {
    navigateTo(route) {
      this.$router.push({ path: `/${route}` });
    },

    searchCategory(category) {
      // Prevent the default action of the link
      event.preventDefault();
      // Navigate to the SearchResultPage with the category as a query parameter
      this.$router.push({ 
        name: 'SearchResults', 
        query: { q: category }
      })
    },

    async checkSession() {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          return;
        }
        const response = await axios.get(`http://localhost:3000/api/check-session/${token}`, { withCredentials: true });
        if (response.data.success) {
          await this.$store.dispatch('loginState');
          if (this.$store.state.userType == null) {
            await this.fetchUserType();
          }
          if (this.$store.state.userType !== 'user') {
            await this.fetchCreatorId();
          }
        }
      } catch (error) {
        console.error(error);
      }
    },

    async fetchCreatorId() {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;

        const response = await axios.get(`http://localhost:3000/api/creator-id/${token}`);
        if (response.data.creatorId) {
          this.creatorId = response.data.creatorId;
        }
      } catch (error) {
        console.error('Error fetching creator id:', error);
      }
    },

    async fetchUserType() {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;

        const response = await axios.get(`http://localhost:3000/api/user-type/${token}`);
        if (response.data.userType) {
          this.$store.commit('setUserType', response.data.userType);
        }
      } catch (error) {
        console.error('Error fetching user type:', error);
      }
    },

    async logout() {
      try {
        const token = localStorage.getItem('token');
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
        this.$store.dispatch('logoutState');
        this.$router.push({ path: '/login' });
      } catch (error) {
        console.error(error);
      }
    },

    openUserOptions() {
      this.isUserOptionsOpen = !this.isUserOptionsOpen;
    },

    openCart() {
      // This method can be used to perform any actions when opening the cart
      // For now, it's empty as the dropdown is handled by Bootstrap
    }
  }
}
</script>
<style scoped>
.navbar-nav .dropdown-menu {
  position: absolute;
}

.dropdown-submenu {
  position: relative;
}

.dropdown-submenu > .dropdown-menu {
  top: 0;
  left: 100%;
  margin-top: -6px;
  margin-left: -1px;
}

.dropdown-submenu:hover > .dropdown-menu {
  display: block;
}

.dropdown-submenu > a:after {
  display: block;
  content: " ";
  float: right;
  width: 0;
  height: 0;
  border-color: transparent;
  border-style: solid;
  border-width: 5px 0 5px 5px;
  border-left-color: #cccccc;
  margin-top: 5px;
  margin-right: -10px;
}

.cart-items-container {
  padding-right: 10px; 
}

.cart-item {
  border-bottom: 1px solid lightgrey;
  padding-bottom: 4px;
}

.cart-item:last-child {
  border-bottom: none; 
}

.dropdown-menu .dropdown-item:focus, 
.dropdown-menu .dropdown-item:hover, 
.dropdown-menu .dropdown-item:active {
  background-color: #f8f9fa;
  color: #000;
}

.dropdown-menu {
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
}

.text-truncate {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

@media (max-width: 991.98px) {
  .navbar {
    flex-wrap: wrap;
  }
  
  .course-category-wrapper {
    width: 100%;
    justify-content: center;
    order: 1;
    margin-top: 10px;
  }

  .navbar-brand {
    order: 0;
  }

  .d-flex.align-items-center {
    order: 0;
  }

  .dropdown-submenu > .dropdown-menu {
    margin-left: 15px;
  }

  .dropdown-submenu > a:after {
    transform: rotate(90deg);
  }
}
</style>