<!-- src/components/SearchItem.vue -->
<template>
  <div class="search-container">
    <form @submit.prevent="onSearch">
      <div class="input-group">
        <input
          v-model="searchQuery"
          type="search"
          class="form-control"
          placeholder="Search courses..."
          aria-label="Search"
        >
        <div class="input-group-append">
          <button type="submit" class="btn btn-outline-secondary">
            <i class="fas fa-search"></i>
          </button>
        </div>
      </div>
    </form>
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
      if (this.searchQuery.trim()) {
        this.$router.push({ name: 'SearchResults', query: { q: this.searchQuery } });
      }
    }
  }
}
</script>

<style scoped>
.search-container {
  margin-bottom: 20px;
}
.input-group {
  width: 100%;
}
.input-group-append .btn {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}
</style>