<template>
  <footer class="bg-dark text-light py-4">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-4 col-6 mb-3">
          <ul class="list-unstyled">
            <li><a href="#" class="text-light">CourseCrafters Business</a></li>
            <li><a href="#" class="text-light">Teach on CourseCrafters</a></li>
            <li><a href="#" class="text-light">Get the app</a></li>
            <li><a href="#" class="text-light">About us</a></li>
            <li><a href="#" class="text-light">Contact us</a></li>
          </ul>
        </div>
        <div class="col-md-4 col-6 mb-3">
          <ul class="list-unstyled">
            <li><a href="#" class="text-light">Careers</a></li>
            <li><a href="#" class="text-light">Blog</a></li>
            <li><a href="#" class="text-light">Help and Support</a></li>
            <li><a href="#" class="text-light">Affiliate</a></li>
            <li><a href="#" class="text-light">Investors</a></li>
          </ul>
        </div>
        <div class="col-md-4 col-6 mb-3">
          <ul class="list-unstyled">
            <li><a href="#" class="text-light">Terms</a></li>
            <li><a href="#" class="text-light">Privacy policy</a></li>
            <li><a href="#" class="text-light">Sitemap</a></li>
            <li><a href="#" class="text-light">Accessibility statement</a></li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'FooterComponent'
}
</script>

<style scoped>
a {
  text-decoration: none;
  color: inherit;
}
a:hover {
  text-decoration: underline;
}
footer {
  min-height: 15vh; /* Upewnij się, że ta wartość odpowiada Twoim potrzebom układu */
}
</style>