import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/HomePage.vue";
import LoginPage from "@/views/LoginPage.vue";
import RegisterPage from "@/views/RegisterPage.vue";
import Dashboard from "@/views/DashboardPage.vue";
import CourseOverview from "@/views/CourseOverviewPage.vue";
import CartPage from "@/views/CartPage.vue";

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home,
    },
    {
        path: "/login",
        name: "LoginPage",
        component: LoginPage,
    },
    {
        path: "/register",
        name: "RegisterPage",
        component: RegisterPage,
    },
    {
        path: "/dashboard",
        name: "Dashboard",
        component: Dashboard,
    },
    {
        path: '/course/:id',
        name: 'CourseOverview',
        component: CourseOverview
    },
    {
        path: '/cart',
        name: 'CartPage',
        component: CartPage
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;