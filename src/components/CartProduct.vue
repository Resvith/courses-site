<template>
    <div class="product-card d-flex align-items-center" :id="id">
      <img :src="img" class="product-img" alt="Product Image">
      <div class="product-details d-flex flex-column flex-grow-1 mx-3">
        <p class="product-description">{{ description }}</p>
        <p class="product-price">{{ price }}</p>
      </div>
      <button class="btn btn-danger btn-sm" @click="$emit('remove', id)">X</button>
    </div>
  </template>
  
  <script>
  export default {
    name: 'CartProduct',
    props: {
      id: {
        type: Number,
        required: true
      },
      img: {
        type: String,
        required: true
      },
      description: {
        type: String,
        required: true
      },
      price: {
        type: Number,
        required: true
      }
    }
  }
  </script>
  
  <style scoped>
  .product-card {
    margin: 10px;
    padding: 10px;
    width: 100%;
    border: 1px solid #ddd;
    border-radius: 5px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
  }
  .product-img {
    width: 100px;
    height: 100px;
    object-fit: cover;
  }
  .product-details {
    flex-grow: 1;
    margin-left: 15px;
  }
  .product-description {
    margin-bottom: 5px;
    color: #333;
  }
  .product-price {
    color: #28a745;
    font-weight: bold;
  }
  </style>