<template>
        <div>
            <photo-overlay
                :image-url="home1"
                header="Learning that gets you"
                paragraph="Skills for your present (and your future). Get started with us."/>
        </div>
</template>
    
<script>
import PhotoOverlay from './PhotoOverlay.vue';

export default {
    name: 'HomePage',
    components: {
        PhotoOverlay
    },
    data() {
        return {
            home1: require('@/assets/home1.jpg'),
        }
    }
}
</script>
