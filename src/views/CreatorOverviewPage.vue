<template>
    <div class="container creator-overview">
      <!-- Add New Course Button -->
      <div class="add-course-section">
        <button class="btn btn-primary btn-lg add-course-btn" @click="addNewCourse">
          <i class="fas fa-plus-circle"></i> Add New Course
        </button>
      </div>
  
      <!-- Creator Statistics -->
      <div class="statistics-section">
        <h2>Creator Statistics</h2>
        <div class="row">
          <div class="col-md-3 col-sm-6">
            <div class="stat-card">
              <h3>Courses Sold</h3>
              <p>{{ statistics.coursesSold }}</p>
            </div>
          </div>
          <div class="col-md-3 col-sm-6">
            <div class="stat-card">
              <h3>Total Earnings</h3>
              <p>${{ statistics.totalEarnings.toFixed(2) }}</p>
            </div>
          </div>
          <div class="col-md-3 col-sm-6">
            <div class="stat-card">
              <h3>Available to Withdraw</h3>
              <p>${{ statistics.availableToWithdraw.toFixed(2) }}</p>
            </div>
          </div>
          <div class="col-md-3 col-sm-6">
            <div class="stat-card">
              <h3>Active Courses</h3>
              <p>{{ createdCourses.length }}</p>
            </div>
          </div>
        </div>
        <div class="withdraw-section">
        <button class="btn btn-primary withdraw-btn" @click="showWithdrawModal">
          Withdraw Available Funds
        </button>
      </div>
      </div>
  
      <!-- Created Courses List -->
      <div class="courses-section">
        <h2>Your Courses</h2>
        <div class="course-list">
          <div v-for="course in createdCourses" :key="course.course_id" class="course-item">
            <img :src="course.img" :alt="course.title" class="course-image">
            <div class="course-details">
              <h3>{{ course.title }}</h3>
              <p>{{ course.description }}</p>
              <p>Price: ${{ course.price }}</p>
            </div>
            <div class="course-actions">
              <button class="btn btn-secondary" @click="editCourse(course.course_id)">Edit</button>
              <button class="btn btn-danger" @click="deleteCourse(course.course_id)">Delete</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Withdraw Modal -->
      <div class="modal fade" id="withdrawModal" tabindex="-1" aria-labelledby="withdrawModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="withdrawModalLabel">Withdraw Funds</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <p>Available to withdraw: ${{ statistics.availableToWithdraw.toFixed(2) }}</p>
                <div class="mb-3">
                <label for="withdrawAmount" class="form-label">Amount to withdraw:</label>
                <input type="number" class="form-control" id="withdrawAmount" v-model="withdrawAmount" step="0.01" min="0" :max="statistics.availableToWithdraw">
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                <button type="button" class="btn btn-primary" @click="submitWithdraw">Withdraw</button>
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
    name: 'CreatorOverviewPage',
    data() {
      return {
        statistics: {
          coursesSold: 0,
          totalEarnings: 0,
          availableToWithdraw: 0,
        },
        createdCourses: [],
        withdrawAmount: 0,
        withdrawModal: null,
      };
    },
    created() {
      this.fetchCreatorStatistics();
      this.fetchCreatedCourses();
    },
    mounted() {
        this.withdrawModal = new Modal(document.getElementById('withdrawModal'));
    },
    methods: {

        showWithdrawModal() {
        this.withdrawAmount = 0; // Reset the withdraw amount
        this.withdrawModal.show();
        },

        async submitWithdraw() {
            if (this.withdrawAmount <= 0 || this.withdrawAmount > this.statistics.availableToWithdraw) {
                alert('Please enter a valid amount to withdraw.');
                return;
            }

            try {
                const token = localStorage.getItem('token');
                const response = await axios.post(`http://localhost:3000/api/withdraw/${token}/${this.withdrawAmount}`);
                
                if (response.data.success) {
                alert('Withdrawal successful!');
                this.withdrawModal.hide();
                this.fetchCreatorStatistics(); // Refresh statistics after withdrawal
                } else {
                alert('Withdrawal failed. Please try again.');
                }
            } catch (error) {
                console.error('Error processing withdrawal:', error);
                alert('An error occurred during withdrawal. Please try again.');
            }
        },


      async fetchCreatorStatistics() {
        try {
            const token = localStorage.getItem('token');
          const response = await axios.get(`http://localhost:3000/api/creator-statistics/${token}`);
          this.statistics = response.data;
        } catch (error) {
          console.error('Error fetching creator statistics:', error);
        }
      },
      async fetchCreatedCourses() {
        try {
          const token = localStorage.getItem('token');
          const response = await axios.get(`http://localhost:3000/api/creator-courses/${token}`);
          this.createdCourses = response.data;
        } catch (error) {
          console.error('Error fetching created courses:', error);
        }
      },
      addNewCourse() {
        // Navigate to the course creation page
        this.$router.push('/create-course');
      },
      editCourse(courseId) {
        // Navigate to the course edit page
        this.$router.push(`/edit-course/${courseId}`);
      },
      async deleteCourse(courseId) {
        if (confirm('Are you sure you want to delete this course?')) {
          try {
            const token = localStorage.getItem('token');  
            await axios.delete(`http://localhost:3000/api/courses/${token}/${courseId}`);
            this.createdCourses = this.createdCourses.filter(course => course.course_id !== courseId);
          } catch (error) {
            console.error('Error deleting course:', error);
          }
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .creator-overview {
    padding: 20px 0;
  }
  
  .add-course-section {
    text-align: center;
    margin-bottom: 30px;
  }
  
  .add-course-btn {
    font-size: 1.5em;
    padding: 15px 30px;
  }
  
  .statistics-section, .courses-section {
    margin-bottom: 40px;
  }
  
  .statistics-section .row {
    display: flex;
    }

    .withdraw-section {
    text-align: center;
    margin-top: 20px;
    }

    .withdraw-btn {
    padding: 10px 20px;
    }
    .stat-card {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    height: 100%;
    padding: 20px;
    }
  
  .stat-card h3 {
    font-size: 1.2em;
    margin-bottom: 10px;
  }
  
  .stat-card p {
    font-size: 1.5em;
    font-weight: bold;
    margin: 0;
  }
  
  .course-list {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
  }
  
  .course-item {
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 15px;
    width: calc(50% - 10px);
    display: flex;
    flex-direction: column;
  }
  
  .course-image {
    width: 100%;
    height: 200px;
    object-fit: cover;
    border-radius: 4px;
    margin-bottom: 15px;
  }
  
  .course-details h3 {
    font-size: 1.2em;
    margin-bottom: 10px;
  }
  
  .course-actions {
    margin-top: auto;
    display: flex;
    justify-content: space-between;
  }
  
  @media (max-width: 768px) {
    .course-item {
      width: 100%;
    }
  }
  </style>