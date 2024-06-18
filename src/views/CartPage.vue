<template>
    <div class="container">
      <h1 class="my-4">Cart Page</h1>
      <div class="product-container">
        <CartProduct
          v-for="product in products"
          :key="product.id"
          :id="product.id"
          :img="product.img"
          :title="product.title"
          :description="product.description"
          :price="product.price"
          @remove="removeProduct"
        />
      </div>
      <div v-if="products.length !== 0" class="my-4">
        <h3>Total: {{ products.reduce((acc, product) => acc + product.price, 0) }} zł</h3>
        <button class="btn btn-primary">Checkout</button>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import CartProduct from '@/components/CartProduct.vue';

  export default {
    components: {
      CartProduct
    },
    data() {
      return {
        products: []
      };
    },

    created() {
        this.loadUserCart();
    },

    methods: {
      removeProduct(id) {
        this.products = this.products.filter(product => product.id !== id);
      },

      async loadUserCart() {
        
        try {
            const response = await axios.get(`http://localhost:3000/api/cart/${localStorage.getItem('token')}`);
            // console.log(response.data);
            response.data.forEach(course => {
                this.products.push({
                id: course.course_id,
                img: course.img,
                title: course.title,
                description: course.description,
                price: course.price
                });
            });
            } catch (error) {
                console.error(error);
            }
      },

    }
  }
  </script>
  
  <style scoped>
  .product-container {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }
  </style>