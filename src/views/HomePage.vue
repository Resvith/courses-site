<template>
        <div>
            <photo-carousel></photo-carousel>
            <trusted-companies></trusted-companies>
            <courses-selection></courses-selection>
        </div>
</template>
    
<script>

import CoursesSelection from '../components/HomePage/CoursesSelection.vue';
import PhotoCarousel from '../components/HomePage/PhotoCarousel.vue';
import TrustedCompanies from '../components/HomePage/TrustedCompanies.vue';
export default {
    name: 'HomePage',
    components: {
        PhotoCarousel,
        TrustedCompanies,
        CoursesSelection,
    },
}
</script>
