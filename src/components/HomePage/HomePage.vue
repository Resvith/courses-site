<template>
        <div>
            <photo-carousel></photo-carousel>
            <trusted-companies></trusted-companies>
            <courses-selection></courses-selection>
        </div>
</template>
    
<script>
import CoursesSelection from './CoursesSelection.vue';
import PhotoCarousel from './PhotoCarousel.vue';
import TrustedCompanies from './TrustedCompanies.vue';

export default {
    name: 'HomePage',
    components: {
        PhotoCarousel,
        TrustedCompanies,
        CoursesSelection
    },
}
</script>
