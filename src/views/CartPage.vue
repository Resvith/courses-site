<template>
    <div class="container">
      <h1 class="my-4">Cart Page</h1>
      <div class="product-container">
        <CartProduct
          v-for="product in products"
          :key="product.id"
          :id="product.id"
          :img="product.img"
          :description="product.description"
          :price="product.price"
          @remove="removeProduct"
        />
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
        products: [
          { id: 1, img: 'https://via.placeholder.com/150', description: 'Product 1', price: 100 },
          { id: 2, img: 'https://via.placeholder.com/150', description: 'Product 2', price: 200 },
        ]
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
                description: course.title,
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