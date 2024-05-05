<template>
    <div id="carouselExample" class="carousel slide" data-bs-ride="carousel">
        <div class="carousel-inner">
            <div class="carousel-item active">
                <PhotoOverlay
                    :image-url="home1"
                    header="Learning that gets you"
                    paragraph="Skills for your present (and your future). Get started with us."/>   
            </div>
            <div class="carousel-item">
                <PhotoOverlay
                    :image-url="home2"
                    header="Skills that drive you forward"
                    paragraph="Technology and the world of work change fast — with us, you’re faster. Get the skills to achieve goals and stay competitive."/>
            </div>
        </div>
        <button class="carousel-control-prev custom-carousel-control" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next custom-carousel-control" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
        </button>
    </div>
</template>

<script>
import PhotoOverlay from './PhotoOverlay.vue';

export default {
    name: 'PhotoCarousel',
    components: {
        PhotoOverlay
    },

    data() {
        return {
            home1: require("@/assets/home1.jpg"),
            home2: require("@/assets/home2.jpg"),
        }
    },
}

</script>

<style>
.carousel-control-prev-icon,
.carousel-control-next-icon {
    filter: invert(100%);
}

</style>