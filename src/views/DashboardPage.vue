<template>
    <div class="dashboard container">
      <h1>Your Courses</h1>
      <div v-if="your_courses.length > 0" class="course-list">
            <CourseItem
                v-for="(course, index) in your_courses"
                :key="index"
                :img="course.img"
                :title="course.title"
                :price=0
                :description="course.description"
                :url="course.course_id"
            />
        </div>
        <div v-else class="no-course">
            <p>You haven't purchased any courses yet.</p>
        </div>
      <h1>All Courses</h1>
      <div class="course-list">
        <CourseItem
          v-for="(course, index) in courses"
          :key="index"
          :img="course.img"
          :title="course.title"
          :price="course.price"
          :description="course.description"
          :url="course.course_id"
        />
      </div>
    </div>
  </template>
  
  <script>
  import CourseItem from "@/components/CourseItem.vue";
  import axios from 'axios';
  
  export default {
    name: 'DashboardPage',
    components: {
        CourseItem
    },
    data() {
        return {
            courses: [],
            your_courses: [],
        };
    },
    async created() {
        try {
            const response = await axios.get('http://localhost:3000/api/courses');
            this.courses = response.data;

            const userToken = localStorage.getItem('token');
            const username = await axios.get(`http://localhost:3000/api/user-by-token/${userToken}`);
            const userCousers = await axios.get(`http://localhost:3000/api/courses/${username.data}`);
            this.your_courses = userCousers.data;
            console.log(userCousers.data);
        } catch (error) {
            console.error('Error fetching courses:', error);
        }
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
  gap: 20px;
  justify-content: flex-start; /* Aligns items to the left */
}

.course-item {
  flex: 0 0 calc(33.333% - 14px); /* Fixed width for 3 columns, accounting for gap */
  max-width: calc(33.333% - 14px);
  margin-bottom: 20px;
}

/* Media query for tablets */
@media screen and (max-width: 992px) {
  .course-item {
    flex: 0 0 calc(50% - 10px);
    max-width: calc(50% - 10px);
  }
}

/* Media query for mobile devices */
@media screen and (max-width: 768px) {
  .course-item {
    flex: 0 0 100%;
    max-width: 100%;
  }
}

  .no-course {
    text-align: center;
    margin-top: 50px;
    margin-bottom: 70px;
    font-size: 1.5em;
  }
  </style>