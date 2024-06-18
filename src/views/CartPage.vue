<template>
    <div class="container">
      <h1 class="my-4">Your Cart</h1>
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
      <div v-if="products.length === 0" class="my-4 cart-empty">
        <h3>Your cart is empty</h3>
        </div>  

      <!-- Modal -->
      <div
        class="modal fade"
        id="confirmationModal"
        tabindex="-1"
        aria-labelledby="confirmationModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="confirmationModalLabel">Delete confirmation</h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              Do you want to delete this product?
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
              <button
                type="button"
                class="btn btn-danger"
                @click="confirmRemove"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
<script>
import axios from 'axios';
import CartProduct from '@/components/CartProduct.vue';
import { Modal } from 'bootstrap';

export default {
  components: {
    CartProduct
  },
  data() {
    return {
      products: [],
      productIdToDelete: null,
      confirmationModalInstance: null
    };
  },
  created() {
    this.loadUserCart();
  },
  methods: {
    showConfirmationModal(id) {
      this.productIdToDelete = id;
      this.confirmationModalInstance = new Modal(
        document.getElementById('confirmationModal'),
      );
      this.confirmationModalInstance.show();
    },
    async confirmRemove() {
      if (this.productIdToDelete !== null) {
        this.products = this.products.filter(
          product => product.id !== this.productIdToDelete,
        );
        await axios.delete(`http://localhost:3000/api/cart/${localStorage.getItem('token')}/${this.productIdToDelete}`);
        this.productIdToDelete = null;
        this.confirmationModalInstance.hide();
      }
    },
    removeProduct(id) {
      this.showConfirmationModal(id);
    },
    async loadUserCart() {
      try {
        const response = await axios.get(`http://localhost:3000/api/cart/${localStorage.getItem('token')}`);
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
    }
  }
}
</script>
  
  <style scoped>
  .product-container {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }

  .cart-empty {
    text-align: center;
    min-height: 60vh;
    margin: auto;
  }
  </style>