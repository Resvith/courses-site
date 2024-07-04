<!-- CheckoutPage.vue -->
<template>
    <div class="container">
      <h1 class="my-4">Checkout</h1>
      
      <!-- Billing Information Form -->
      <form @submit.prevent="validateAndSubmit" class="mb-4">
        <div class="mb-3">
          <label for="fullName" class="form-label">Full Name</label>
          <input v-model="form.fullName" type="text" class="form-control" id="fullName" required>
        </div>
        <div class="mb-3">
          <label for="email" class="form-label">Email</label>
          <input v-model="form.email" type="email" class="form-control" id="email" required>
        </div>
        <div class="mb-3">
          <label for="address" class="form-label">Address</label>
          <input v-model="form.address" type="text" class="form-control" id="address" required>
        </div>
        <div class="mb-3">
          <label for="city" class="form-label">City</label>
          <input v-model="form.city" type="text" class="form-control" id="city" required>
        </div>
        <div class="mb-3">
          <label for="zipCode" class="form-label">Zip Code</label>
          <input v-model="form.zipCode" type="text" class="form-control" id="zipCode" required>
        </div>
      </form>
  
      <!-- Cart Summary -->
      <div class="card mb-4">
        <div class="card-header">
          <h5 class="mb-0">Cart Summary</h5>
        </div>
        <div class="card-body">
          <ul class="list-group list-group-flush">
            <li v-for="item in cartItems" :key="item.id" class="list-group-item d-flex justify-content-between align-items-center">
              {{ item.title }}
              <span>{{ item.price }} zł</span>
            </li>
          </ul>
          <div class="mt-3 d-flex justify-content-between">
            <strong>Total:</strong>
            <strong>{{ cartTotal }} zł</strong>
          </div>
        </div>
      </div>
  
      <!-- Checkout Button -->
      <button @click="openPaymentModal" class="btn btn-primary btn-lg">Proceed to Payment</button>
  
      <!-- Payment Modal -->
      <div class="modal fade" id="paymentModal" tabindex="-1" aria-labelledby="paymentModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="paymentModalLabel">Payment Confirmation</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <p>This is where a payment system would be implemented. For demonstration purposes, please enter the total amount to simulate a successful payment.</p>
              <div>
                <p>Amount {{ this.cartTotal }}</p>
                </div>
              <div class="mb-3">
                <label for="paymentAmount" class="form-label">Enter Payment Amount (zł)</label>
                <input v-model="paymentAmount" type="number" class="form-control" id="paymentAmount" step="0.01">
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button @click="processPayment" type="button" class="btn btn-primary">Confirm Payment</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import { Modal } from 'bootstrap';
  
  export default {
    name: 'CheckoutPage',
    data() {
      return {
        form: {
          fullName: '',
          email: '',
          address: '',
          city: '',
          zipCode: '',
        },
        cartItems: [],
        paymentAmount: '',
        paymentModal: null,
      };
    },
    computed: {
      cartTotal() {
        return this.cartItems.reduce((total, item) => total + parseFloat(item.price), 0).toFixed(2);
      },
    },
    mounted() {
      this.loadCartItems();
      this.paymentModal = new Modal(document.getElementById('paymentModal'));
    },
    methods: {
      async loadCartItems() {
        try {
          const response = await axios.get(`http://localhost:3000/api/cart/${localStorage.getItem('token')}`);
          this.cartItems = response.data;
        } catch (error) {
          console.error('Error loading cart items:', error);
        }
      },
      validateAndSubmit() {
        // Implement form validation logic here
        console.log('Form submitted:', this.form);
      },
      openPaymentModal() {
        this.paymentModal.show();
      },
      async processPayment() {
        if (parseFloat(this.paymentAmount) === parseFloat(this.cartTotal)) {
          try {
            const response = await axios.post('http://localhost:3000/api/process-payment', {
              token: localStorage.getItem('token'),
              amount: this.paymentAmount,
            });
            if (response.data.success) {
              alert('Payment successful! Courses have been added to your account.');
              this.paymentModal.hide();
              this.$router.push('/dashboard');
            } else {
              alert('Payment failed. Please try again.');
            }
          } catch (error) {
            console.error('Error processing payment:', error);
            alert('An error occurred. Please try again.');
          }
        } else {
          alert('Please enter the correct total amount.');
        }
      },
    },
  };
  </script>