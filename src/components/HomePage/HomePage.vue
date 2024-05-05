<template>
        <div>
            <photo-carousel></photo-carousel>
            <trusted-companies></trusted-companies>
        </div>
</template>
    
<script>
import PhotoCarousel from './PhotoCarousel.vue';
import TrustedCompanies from './TrustedCompanies.vue';

export default {
    name: 'HomePage',
    components: {
        PhotoCarousel,
        TrustedCompanies,
    },
}
</script>
