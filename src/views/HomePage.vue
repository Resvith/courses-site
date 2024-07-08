<template>
    <div>
      <div class="container">
        <search-item @search="onSearch"></search-item>
      </div>
      <photo-carousel></photo-carousel>
      <trusted-companies></trusted-companies>
      <courses-selection></courses-selection>
    </div>
  </template>
     
  <script>
  import CoursesSelection from '../components/HomePage/CoursesSelection.vue';
  import PhotoCarousel from '../components/HomePage/PhotoCarousel.vue';
  import TrustedCompanies from '../components/HomePage/TrustedCompanies.vue';
  import SearchItem from '@/components/SearchItem.vue';
  
  export default {
    name: 'HomePage',
    components: {
      PhotoCarousel,
      TrustedCompanies,
      CoursesSelection,
      SearchItem
    },
    methods: {
      onSearch(query) {
        this.$router.push({ name: 'SearchResults', query: { q: query } });
      }
    }
  }
  </script>