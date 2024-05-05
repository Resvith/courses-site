<template>
    <div class="photo-overlay">
      <img :src="imageUrl" alt="Descriptive Alt Text" class="img-fluid">
      <div class="overlay-text d-none d-lg-block">
        <h3>{{ header }}</h3>
        <p>{{ paragraph }}</p>
      </div>
      <div class="d-block d-lg-none">
        <h3>{{ header }}</h3>
        <p>{{ paragraph }}</p>
      </div>
    </div>
  </template>
    
  <script>
  export default {
    name: 'PhotoOverlay',
    props: {
        imageUrl: {
            type: String,
            required: true
        },
        header: {
            type: String,
            default: 'Image header'
        },
        paragraph: {
            type: String,
            default: 'Image description'
        }
    }
  }
  </script>
  
  <style scoped>
  .photo-overlay {
    position: relative;
    display: inline-block;
  }
  
  .photo-overlay img {
    display: block;
    width: 100%;
    height: auto;
  }
  
  .overlay-text {
    position: absolute;
    top: 50%;
    left: 15px;
    transform: translateY(-50%);
    background-color: #fff;
    padding: 20px;
    border: 2px solid #000;
    font-size: 20px;
    color: black;
    max-width: 500px;
  }

  h3 {
    margin-top: 12px;
  }
  </style>