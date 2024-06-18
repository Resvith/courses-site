<template>
  <div>
    <div id="course_overview">
      <h1>{{ course.title }}</h1>
      <p>{{ course.description }}</p>
      <img :src="course.img_url" alt="Course Image" class="img-fluid rounded" />
    </div>
    <div v-if="course.modules.length" class="mt-4">
      <h2>Modules</h2>
      <div id="course-overview">
        <div v-for="module in course.modules" :key="module.id" class="mb-3">
          <button
            class="btn btn-primary"
            type="button"
            @click="toggleCollapse(module.id)"
            :aria-expanded="isModuleOpen(module.id)"
            :aria-controls="'module-' + module.id"
          >
            {{ module.title }}
          </button>
          <div :id="'module-' + module.id" class="collapse mt-2">
            <div class="card card-body">
              <ul>
                <li v-for="lesson in module.lessons" :key="lesson.lesson_id">
                  <a
                    v-if="isBought"
                    href="#"
                    @click.prevent="openLesson(lesson)"
                    >{{ lesson.title }}</a
                  >
                  <a v-else class="disable-link"
                    >{{ lesson.title }}
                    <i class="fas fa-lock"></i></a
                  >
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Modal -->
    <div
      class="modal fade"
      id="lessonModal"
      tabindex="-1"
      aria-labelledby="lessonModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="lessonModalLabel">{{ selectedLesson.title }}</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body d-flex flex-column">
            <iframe
              :src="selectedLesson.video_url"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
            <p>{{ selectedLesson.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { Modal, Collapse } from "bootstrap";
export default {
  data() {
    return {
      areModulesLoaded: false,
      course: {
        course_id: this.$route.params.id,
        creator_id: 0,
        title: "",
        description: "",
        price: 0,
        img_url: "",
        modules: [],
      },
      selectedLesson: {
        title: "",
        description: "",
        video_url: "",
      },
      isBought: false,
      openModules: [],
    };
  },
  mounted() {
    this.lessonModal = new Modal(document.getElementById("lessonModal"));
  },
  created() {
    this.fetchCourseDetails();
    this.fetchModules(this.$route.params.id);
    this.isCourseBought();
  },
  methods: {
    async isCourseBought() {
      const userToken = localStorage.getItem("token");
      const courseId = this.$route.params.id;
      await axios
        .get(`http://localhost:3000/api/is-course-bought/${userToken}/${courseId}`)
        .then((response) => {
          this.isBought = response.data;
        })
        .catch((error) => {
          console.error("Error checking if course is bought:", error);
        });
      console.log("isBought:", this.isBought);
    },
    openLesson(lesson) {
      this.selectedLesson = lesson;
      this.lessonModal.show();
    },
    async fetchCourseDetails() {
      const courseId = this.$route.params.id;
      try {
        const response = await axios.get(`http://localhost:3000/api/course/${courseId}`);
        this.course.course_id = response.data.course_id;
        this.course.creator_id = response.data.creator_id;
        this.course.title = response.data.title;
        this.course.description = response.data.description;
        this.course.price = response.data.price;
        this.course.img_url = response.data.img;
      } catch (error) {
        console.error("Error fetching course details:", error);
      }
    },
    async fetchModules(courseId) {
      try {
        const response = await axios.get(`http://localhost:3000/api/modules/${courseId}`);
        for (let i = 0; i < response.data.length; i++) {
          const mod = response.data[i];
          const lessons = await this.fetchLessons(mod.module_id);
          this.course.modules.push({
            id: mod.module_id,
            title: mod.name,
            lessons: lessons,
          });
        }
      } catch (error) {
        console.error("Error fetching course modules:", error);
      } finally {
        this.areModulesLoaded = true;
      }
    },
    async fetchLessons(moduleId) {
      try {
        const lessons = [];
        const response = await axios.get(`http://localhost:3000/api/lessons/${moduleId}`);
        for (let i = 0; i < response.data.length; i++) {
          const lesson = response.data[i];
          lessons.push({
            id: lesson.lesson_id,
            title: lesson.name,
            video_url: lesson.video_url,
            description: lesson.text_description,
          });
        }
        return lessons;
      } catch (error) {
        console.error("Error fetching course lessons:", error);
        return [];
      }
    },
    toggleCollapse(moduleId) {
      const moduleIndex = this.openModules.indexOf(moduleId);
      if (moduleIndex >= 0) {
        this.openModules.splice(moduleIndex, 1);
      } else {
        this.openModules.push(moduleId);
      }
      this.$nextTick(() => {
        const collapseElement = document.getElementById(`module-${moduleId}`);
        if (collapseElement) {
          const bsCollapse = new Collapse(collapseElement, {
            toggle: false,
          });
          if (this.openModules.includes(moduleId)) {
            bsCollapse.show();
          } else {
            bsCollapse.hide();
          }
        }
      });
    },
    isModuleOpen(moduleId) {
      return this.openModules.includes(moduleId);
    },
  },
};
</script>

<style scoped>
/* Modal Styles */
@media (min-width: 992px) {
  .modal-dialog.modal-lg {
    max-width: 80%;
  }
}
@media (max-width: 576px) {
  .modal-dialog.modal-lg {
    max-width: 95%;
  }
}
.modal-body {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0;
}
.modal-body iframe {
  width: 100%;
  height: calc(100vw * 9 / 16); /* 16:9 aspect ratio */
  max-height: 60vh; /* Limit the height for small screens */
}
@media (max-width: 576px) {
  .modal-body iframe {
    height: calc(100vw * 9 / 16);
  }
}
.modal-body p {
  margin-top: 10px;
  padding: 0 15px;
  max-width: 100%;
}
.disable-link {
  color: gray; /* Optional: style it to look disabled */
  text-decoration: none; /* Optional: remove underline */
  cursor: not-allowed; /* Optional: change the cursor to indicate it's not clickable */
}
li {
  list-style: none;
}
</style>