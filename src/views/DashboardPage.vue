<template>
    <div class="dashboard container">
      <h1>Your Courses</h1>
      <div class="course-list">
        <CourseItem
          v-for="(course, index) in courses"
          :key="index"
          :image="course.image"
          :title="course.title"
          :url="course.url"
          :price="course.price"
          :description="course.description"
        />
      </div>
    </div>
  </template>
  
  <script>
  import CourseItem from "@/components/CourseItem.vue";
  
  export default {
    name: 'DashboardPage',
    components: {
      CourseItem
    },
    data() {
      return {
        courses: [
          // Example course data
          { image: 'https://dummyimage.com/600x400/000000/0011ff&text=TEST+img', title: 'Course 231897777777777777777777777777777777777777777777777777777777777777771', url: '#', price: 10.00, description: "This is some random description lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum "},
          { image: 'https://dummyimage.com/600x400/000000/0011ff&text=TEST+img', title: 'Course 2', url: '#', price: 15.99, description: "This is some random description lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum " },
          { image: 'https://dummyimage.com/600x400/000000/0011ff&text=TEST+img', title: 'Course 3', url: '#', price: 20.00, description: "This is some random description lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum " },
          { image: 'https://dummyimage.com/600x400/000000/0011ff&text=TEST+img', title: 'Course 4', url: '#', price: 20.00, description: "This is some random description lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum " },
          { image: 'https://dummyimage.com/600x400/000000/0011ff&text=TEST+img', title: 'Course 5', url: '#', price: 20.00, description: "This is some random description lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum " },
          { image: 'https://dummyimage.com/600x400/000000/0011ff&text=TEST+img', title: 'Course 6', url: '#', price: 20.00, description: "This is some random description lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum " },
          { image: 'https://dummyimage.com/600x400/000000/0011ff&text=TEST+img', title: 'Course 7', url: '#', price: 20.00, description: "This is some random description lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum " },
          { image: 'https://dummyimage.com/600x400/000000/0011ff&text=TEST+img', title: 'Course 8', url: '#', price: 20.00, description: "This is some random description lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum " },
          { image: 'https://dummyimage.com/600x400/000000/0011ff&text=TEST+img', title: 'Course 9', url: '#', price: 20.00, description: "This is some random description lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum " },
          { image: 'https://dummyimage.com/600x400/000000/0011ff&text=TEST+img', title: 'Course 10', url: '#', price: 20.00, description: "This is some random description lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum " },
          { image: 'https://dummyimage.com/600x400/000000/0011ff&text=TEST+img', title: 'Course 11', url: '#', price: 20.00, description: "This is some random description lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum " },
          { image: 'https://dummyimage.com/600x400/000000/0011ff&text=TEST+img', title: 'Course 12', url: '#', price: 20.00, description: "This is some random description lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum " },
        ]
      };
    }
  };
  </script>
  
  <style scoped>
  .dashboard {
    padding: 20px;
    min-height: calc(100vh - 15vh); /* Screen view - footer min size */
  }
  .course-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;
  }
  </style>