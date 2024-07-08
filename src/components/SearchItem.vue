<template>
  <div class="search-container">
    <input
      v-model="searchQuery"
      @input="onSearch"
      type="search"
      class="form-control"
      placeholder="Search courses..."
      aria-label="Search"
    >
  </div>
</template>

<script>
export default {
  name: 'SearchItem',
  data() {
    return {
      searchQuery: '',
    }
  },
  methods: {
    onSearch() {
      this.$emit('search', this.searchQuery);
    }
  }
}
</script>

<style scoped>
.search-container {
  margin-bottom: 20px;
}
</style>