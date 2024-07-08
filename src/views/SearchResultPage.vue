<template>
    <div class="container">
      <h1>Search Results for "{{ searchQuery }}"</h1>
      <div v-if="loading">Loading...</div>
      <div v-else-if="results.length === 0">No results found.</div>
      <div v-else class="row">
        <div v-for="course in results" :key="course.course_id" class="col-md-4 mb-4">
          <CourseItem
            :img="course.img"
            :title="course.title"
            :price="course.price"
            :description="course.description"
            :url="course.course_id"
          />
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import CourseItem from '@/components/CourseItem.vue';
  
  export default {
    name: 'SearchResultsPage',
    components: {
      CourseItem,
    },
    data() {
      return {
        searchQuery: '',
        results: [],
        loading: true,
      };
    },
    created() {
      this.searchQuery = this.$route.query.q;
      this.searchCourses();
    },
    methods: {
      async searchCourses() {
        this.loading = true;
        try {
          const response = await axios.get(`http://localhost:3000/api/search?q=${this.searchQuery}`);
          this.results = response.data;
        } catch (error) {
          console.error('Error searching courses:', error);
        } finally {
          this.loading = false;
        }
      },
    },
    watch: {
      '$route.query.q'(newQuery) {
        this.searchQuery = newQuery;
        this.searchCourses();
      },
    },
  };
  </script>