<template>
    <div class="container">
        <h1 class="mb-4">A broad selection of courses</h1>
        <h4 class="mb-4">Choose from 1000+ online video courses with new additions published every month</h4>
       
        <div class="course-list">
            <CourseItem
                v-for="course in courses"
                :key="course.course_id"
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
import axios from 'axios';
import CourseItem from '@/components/CourseItem.vue';

export default {
    name: "CoursesSelection",
    components: {
        CourseItem
    },
    data() {
        return {
            courses: []
        }
    },
    created() {
        this.fetchCourses();
    },
    methods: {
        async fetchCourses() {
            try {
                const response = await axios.get('http://localhost:3000/api/courses');
                this.courses = response.data;
            } catch (error) {
                console.error('Error fetching courses:', error);
                if (error.response) {
                console.error('Error data:', error.response.data);
                console.error('Error status:', error.response.status);
                console.error('Error headers:', error.response.headers);
                } else if (error.request) {
                console.error('Error request:', error.request);
                } else {
                console.error('Error message:', error.message);
                }
            }
            }
    }
}
</script>

<style scoped>
.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
}

h1, h4 {
    color: #333;
}

.course-list {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: flex-start;
}

/* New styles for CourseItem to control width and layout */
:deep(.course-item) {
    flex: 0 0 calc(33.333% - 14px); /* Three items per row, accounting for gap */
    max-width: calc(33.333% - 14px);
    margin-bottom: 20px;
}

/* Responsive adjustments */
@media screen and (max-width: 992px) {
    :deep(.course-item) {
        flex: 0 0 calc(50% - 10px); /* Two items per row on medium screens */
        max-width: calc(50% - 10px);
    }
}

@media screen and (max-width: 768px) {
    :deep(.course-item) {
        flex: 0 0 100%; /* Full width on small screens */
        max-width: 100%;
    }
}
</style>