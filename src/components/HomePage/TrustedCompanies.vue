<template>
    <div id="trusted-companies">
        <h3>Trusted by millions users and over 2000 companies</h3>
        <div class="container">
            <div class="row">
                <div class="col-6 col-md-4 col-lg-2" v-for="company in companies" :key="company.logoUrl">
                    <img :src="company.logoUrl" alt="company logo" class="img-fluid company-logo">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'TrustedCompanies',
    data() {
        return {
            companies: [
                { logoUrl: require('@/assets/companies_logo/google.svg') },
                { logoUrl: require('@/assets/companies_logo/apple.svg') },
                { logoUrl: require('@/assets/companies_logo/coca-cola.svg') },
                { logoUrl: require('@/assets/companies_logo/snap.svg') },
                { logoUrl: require('@/assets/companies_logo/heineken.svg') },
                { logoUrl: require('@/assets/companies_logo/adobe.svg') },
            ]
        }
    }
}
</script>

<style>
#trusted-companies {
    background-color: #f1f0de;
}
h3 {
    padding: 50px;
}
.company-logo {
    max-width: 100%;
    max-height: 50px;
    object-fit: contain;
    margin-bottom: 100px;
    filter: grayscale(100%);
}
</style>