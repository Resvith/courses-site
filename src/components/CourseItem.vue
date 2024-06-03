<template>
  <button class="course-item" @click="navigateToCourse()">
    <img :src="img" alt="Course Image" class="course-image"/>
    <h3 class="course-title">{{ title }}</h3>
    <p class="course-text"> {{ description }}</p>
    <!-- <p class="course-price">Price: {{ formatPrice(price) }} zł</p> -->
    <p class="course-price">Price: {{ price }}</p>
  </button>
</template>

<script>
export default {
  name: 'CourseItem',
  props: {
    title: {
      type: String,
      required: true
    },
    img: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true,
      default: 0
    },
    description: {
      type: String,
      required: true
    },
    url: {
      type: Number,
      required: true
    }
  },
  methods: {
    navigateToCourse() {
      this.$router.push({ path: this.url });
    },
    formatPrice(price) {
      return price.toFixed(2);
    }
  }
}
</script>

<style scoped>
.course-item {
  width: 100%;
  max-width: 400px;
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 4px;
  text-align: center;
  box-sizing: border-box;
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
  z-index: 1;
  position: relative;
  background-color: inherit;
  cursor: pointer;
  overflow: hidden;
  margin: 0 auto; /* Center the button horizontally */
}

.course-item * { /* Reset margins and padding for all child elements */
  margin: 0;
  padding: 0;
}

.course-item:hover {
  transform: scale(1.1);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  z-index: 10;
}

.course-image {
  width: 100%;
  height: auto;
  margin-bottom: 10px; /* Add some space below the image */
}

.course-title {
  font-size: 1.4em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 10px; /* Add some space below the title */
}

.course-text {
  font-size: 1em;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  margin-bottom: 10px; /* Add some space below the description */
}

.course-price {
  font-size: 1em;
}

</style>