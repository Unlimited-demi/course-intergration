import DashboardView from "@/views/DashboardView.vue";
import Courses from "../views/Courses.vue";

import Resources from "../views/Resources.vue";
// New import for add course route/component
import AddCourseModal from "../components/organisms/modals/AddCourseModal.vue";
import { createRouter, createWebHistory } from "vue-router";

export const routes = [
    { path: '/', component: DashboardView },
    
    { path: "/resources-onboarding", component: Resources },
    {
        path: '/courses',
        name: 'CourseList',
        component: () => import('@/views/CourseList.vue')
      },
      {
        path: '/courses/:id',
        name: 'CourseDetail',
        component: () => import('@/views/CourseDetail.vue')
      },
      {
        path: '/courses/add',
        name: 'AddCourse',
        component: () => import('@/views/AddCourse.vue')
      },
      {
        path: '/',
        redirect: '/courses'
      }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;