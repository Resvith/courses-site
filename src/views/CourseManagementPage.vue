<template>
    <div class="course-management container my-5">
      <h1 class="mb-4">{{ mode === 'new' ? 'Create New Course' : 'Edit Course' }}</h1>
      <form @submit.prevent="saveCourse">
        <div class="card mb-4">
          <div class="card-body">
            <h2 class="card-title">Course Details</h2>
            <div class="mb-3">
              <input v-model="course.title" placeholder="Course Title" class="form-control">
            </div>
            <div class="mb-3">
              <textarea v-model="course.description" placeholder="Course Description" class="form-control" rows="3"></textarea>
            </div>
            <div class="mb-3">
              <input 
                v-model.number="course.price" 
                type="text" 
                inputmode="decimal" 
                step="0.01" 
                placeholder="Price" 
                class="form-control"
                @input="formatPrice"
              >
            </div>
          </div>
        </div>
  
        <div class="card mb-4">
          <div class="card-body">
            <h3 class="card-title">Course Image</h3>
            <div class="mb-3">
              <label for="imageUrl" class="form-label">Image URL</label>
              <input 
                v-model="course.img_url" 
                type="url" 
                id="imageUrl" 
                class="form-control"
                placeholder="Enter image URL"
              >
            </div>
            <div class="mb-3">
              <label class="form-label">Or Upload Image</label>
              <div 
                class="drop-zone"
                @dragover.prevent
                @dragenter.prevent
                @drop.prevent="handleDrop"
                @click="triggerFileInput"
              >
                <p>Drag your image here or click to select</p>
                <input 
                  type="file" 
                  ref="fileInput"
                  @change="handleFileSelect" 
                  accept="image/*"
                  class="file-input"
                >
              </div>
            </div>
            <div v-if="previewImageUrl" class="mt-3">
              <img :src="previewImageUrl" alt="Course image preview" class="preview-image">
            </div>
          </div>
        </div>
  
        <div class="modules">
          <h2 class="mb-3">Modules</h2>
          <div v-for="(module, index) in course.modules" :key="index" class="card mb-4">
            <div class="card-body">
              <input v-model="module.title" placeholder="Module Title" class="form-control mb-3">
              <div class="lessons">
                <h3 class="h5 mb-3">Lessons</h3>
                <div v-for="(lesson, lessonIndex) in module.lessons" :key="lessonIndex" class="card mb-3">
                  <div class="card-body">
                    <input v-model="lesson.title" placeholder="Lesson Title" class="form-control mb-2">
                    <input v-model="lesson.video_url" placeholder="Video URL" class="form-control mb-2">
                    <textarea v-model="lesson.description" placeholder="Lesson Description" class="form-control" rows="2"></textarea>
                  </div>
                </div>
                <button @click="addLesson(index)" type="button" class="btn btn-outline-primary">Add Lesson</button>
              </div>
            </div>
          </div>
          <button @click="addModule" type="button" class="btn btn-primary mb-4">Add Module</button>
        </div>
  
        <button type="submit" class="btn btn-success btn-lg">Save Course</button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        mode: 'new',
        course: {
          course_id: null,
          title: '',
          description: '',
          price: 0,
          img_url: '',
          modules: []
        },
        previewImageUrl: null
      };
    },
    created() {
      this.mode = this.$route.query.mode;
      if (this.mode === 'edit') {
        this.loadCourseData(this.$route.query.courseId);
      }
    },
    methods: {
      async loadCourseData(courseId) {
        try {
          // Fetch course details
          const courseResponse = await axios.get(`http://localhost:3000/api/course/${courseId}`);
          this.course = {
            course_id: courseResponse.data.course_id,
            title: courseResponse.data.title,
            description: courseResponse.data.description,
            price: courseResponse.data.price,
            img_url: courseResponse.data.img
          };
          this.previewImageUrl = this.course.img_url;
  
          // Fetch modules
          const modulesResponse = await axios.get(`http://localhost:3000/api/modules/${courseId}`);
          this.course.modules = await Promise.all(modulesResponse.data.map(async (module) => {
            // Fetch lessons for each module
            const lessonsResponse = await axios.get(`http://localhost:3000/api/lessons/${module.module_id}`);
            const lessons = lessonsResponse.data.map(lesson => ({
              id: lesson.lesson_id,
              title: lesson.name,
              video_url: lesson.video_url,
              description: lesson.text_description
            }));
  
            return {
              id: module.module_id,
              title: module.name,
              lessons: lessons
            };
          }));
  
        } catch (error) {
          console.error('Error loading course data:', error);
          // Handle error (e.g., show error message to user)
        }
      },
      addModule() {
        this.course.modules.push({ title: '', lessons: [] });
      },
      addLesson(moduleIndex) {
        this.course.modules[moduleIndex].lessons.push({ title: '', video_url: '', description: '' });
      },
      formatPrice(event) {
        let value = event.target.value;
        value = value.replace(/[^\d.,]/g, '');
        value = value.replace(',', '.');
        const parts = value.split('.');
        if (parts.length > 2) {
          value = parts[0] + '.' + parts.slice(1).join('');
        }
        const match = value.match(/^\d+\.?\d{0,2}/);
        if (match) {
          value = match[0];
        }
        this.course.price = value ? parseFloat(value) : '';
      },
      handleDrop(event) {
        const file = event.dataTransfer.files[0];
        this.handleFile(file);
      },
      handleFileSelect(event) {
        const file = event.target.files[0];
        this.handleFile(file);
      },
      handleFile(file) {
        if (file && file.type.startsWith('image/')) {
          const reader = new FileReader();
          reader.onload = (e) => {
            this.previewImageUrl = e.target.result;
          };
          reader.readAsDataURL(file);
        } else {
          alert('Please select an image file.');
        }
      },
      triggerFileInput() {
        this.$refs.fileInput.click();
      },
      async saveCourse() {
        try {
          const token = localStorage.getItem('token');
          let endpoint;
          if (this.mode === 'new') {
            endpoint = `http://localhost:3000/api/create-course/${token}`;
          } else {
            endpoint = `http://localhost:3000/api/update-course/${token}/${this.course.course_id}`;
          }
          console.log("Saving course to endpoint:", endpoint);
  
          const method = this.mode === 'new' ? 'post' : 'put';
  
          // Use the img_url from the input, not the preview
          const courseData = {
            ...this.course,
            img_url: this.course.img_url
          };
  
          await axios({
            method: method,
            url: endpoint,
            data: { course: courseData }
          });
  
          // Handle successful save
          alert('Course saved successfully!');
          this.$router.push('/dashboard'); // or wherever you want to redirect
        } catch (error) {
          console.error('Error saving course:', error);
          alert('Error saving course. Please try again.');
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .course-management {
    max-width: 800px;
  }
  
  @media (max-width: 768px) {
    .course-management {
      padding: 0 15px;
    }
  }
  
  .card {
    border: 1px solid #e0e0e0;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }
  
  .card-title {
    color: #333;
    font-weight: bold;
  }
  
  .btn-primary {
    background-color: #007bff;
    border-color: #007bff;
  }
  
  .btn-success {
    background-color: #28a745;
    border-color: #28a745;
  }
  
  .btn-outline-primary {
    color: #007bff;
    border-color: #007bff;
  }
  
  .btn:hover {
    opacity: 0.9;
  }
  
  .drop-zone {
    border: 2px dashed #007bff;
    border-radius: 5px;
    padding: 25px;
    text-align: center;
    cursor: pointer;
  }
  
  .drop-zone:hover {
    background-color: #f8f9fa;
  }
  
  .file-input {
    display: none;
  }
  
  .preview-image {
    max-width: 100%;
    max-height: 200px;
    object-fit: contain;
  }
  </style>