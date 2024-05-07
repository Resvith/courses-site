<template>
    <div class="course-item" @mouseover="hover = true" @mouseleave="hover = false">
        <img :src="course.imageUrl" alt="course image" class="img-fluid">
        <h3>{{ course.title }}</h3>
        <p>${{ course.price }}</p>
        <div v-if="hover" class="course-info">
            <h4>{{ course.title }}</h4>
            <p>{{ course.description }}</p>
            <button @click="addToFavourites(course)">Add to Favourites</button>
            <button @click="addToCart(course)">Add to Cart</button>
        </div>
    </div>
  </template>

<script>
export default {
    name: "courseItem",
    data() {
        return {
            hover: false,
        };
    },
    methods: {
        addToFavourites(course) {
            alert('Added to favourites: ' + course.title);
        },
        addToCart(course) {
            alert('Added to cart: ' + course.title);
        }
    },
    props: {
        course: {
            type: Object,
            required: true
        },
    }

}
</script>

<style scoped>
.course-item {
    position: relative;
    width: 350px;
    margin: 10px;
}

.course-info {
    position: absolute;
    width: 300px;
    top: 0;
    left: 100%;
    right: 0;
    bottom: 0;
    background-color: rgba(255, 255, 255, 0.9);
    color: black;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
}

img {
    width: 100%;
    height: auto;
    display: block;
    margin-bottom: 10px;
}
</style>