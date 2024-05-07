<template>
    <div class="container">
        <h1>A broad selection of courses</h1>
        <h4>Choose from 1000+ online video courses with new additions published every month</h4>
        <div class="btn-group">
            <button type="button" class="btn">Python</button>
            <button type="button" class="btn">Excel</button>
            <button type="button" class="btn">Web Development</button>
            <button type="button" class="btn">JavaScript</button>
            <button type="button" class="btn">DataScience</button>
            <button type="button" class="btn">Amazon AWS</button>
            <button type="button" class="btn">Drawing</button>
        </div>
        <div class="container bordered">
            <h2>Expand your career opportunities with Python</h2>
            <p>Python is a versatile and widely-used programming language with many applications. This course explores
                Python's place in the scientific ecosystem, and how the language, with several readily-available
                open-source libraries, can serve as a powerful tool for data analysis and visualization. </p>
            <button type="button" class="btn">Explore Python</button>

            <div>
                <CourseItem v-for="course in courses" :key="course.id" :course="course"></CourseItem>
            </div>
        </div>
    </div>
</template>

<script>
import CourseItem from './CourseItem.vue';
export default {
    name: "CoursesSelection",
    components: {
        CourseItem
    },

    data() {
        return {
            courses: [{
                id: 1,
                title: "Python for Data Science and Machine Learning Bootcamp",
                price: 19.99,
                description: "Learn how to use NumPy, Pandas, Seaborn, Matplotlib, Plotly, Scikit-Learn, Machine Learning, Tensorflow, and more!",
                imageUrl: "@/assets/python.png",
            },
            {
                id: 2,
                title: "Python and Django Full Stack Web Developer Bootcamp",
                price: 19.99,
                description: "Learn to build websites with HTML , CSS , Bootstrap , Javascript , jQuery , Python 3 , and Django!",
                imageUrl: "https://img-a.udemycdn.com/course/480x270/822444_a6db.jpg",
            },
            {
                id: 3,
                title: "Complete Python Bootcamp: Go from zero to hero in Python 3",
                price: 19.99,
                description: "Learn Python like a Professional! Start from the basics and go all the way to creating your own applications and games!",
                imageUrl: "https://img-a.udemycdn.com/course/480x270/567828_67d0.jpg",
            },
            {
                id: 4,
                title: "Python for Finance: Investment Fundamentals & Data Analytics",
                price: 19.99,
                description: "Learn Python Programming and Conduct Real-World Financial Analysis in Python - Complete Python Training",
                imageUrl: "https://img-a.udemycdn.com/course/480x270/705264_caa9_11.jpg",
            },
            {
                id: 5,
                title: "Automate the Boring Stuff with Python Programming",
                price: 19.99,
                description: "A practical programming course for office workers, academics, and administrators who want to improve their productivity.",
                imageUrl: "https://img-a.udemycdn.com/course/480x270/543600_64d1_2.jpg",
            },
            {
                id: 6,
                title: "Python and Flask Bootcamp: Create Websites using Flask!",
                price: 19.99,
                description: "Learn how to build web applications using Python and Flask",
                imageUrl: "https://img-a.udemycdn.com/course/480x270/1470810_a8b8.jpg",
            },]
        }
    },
}
</script>

<style>
.bordered {
    border: 1px solid #ccc;
    padding: 10px;
    margin: 10px 0;
}
</style>