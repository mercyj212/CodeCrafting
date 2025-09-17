import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Posts from "../views/Posts.vue";
import PostCreate from "../views/PostCreate.vue";
import PostDetails from "../views/PostDetails.vue";
import PostEdit from "../views/PostEdit.vue";
import Register from "../views/Register.vue";
import { auth } from '../services/auth'

const routes  = [
    {
        path: "/", 
        name: "Home", 
        component: Home
    },

     {
        path: "/login", 
        name: "Login", 
        component: Login,
        meta: { hideNavbar: true}
    },

     {
        path: "/posts", 
        name: "Posts", 
        component: Posts,
        meta: { requireAuth: true}
    },

     {
        path: "/posts/create", 
        name: "PostCreate", 
        component: PostCreate,
        meta: { requireAuth: true}
    },

      {
        path: "/posts/:id", 
        name: "PostDetails", 
        component: PostDetails,
        props: true
    },

      {
        path: "/posts/:id/edit", 
        name: "PostEdit", 
        component: PostEdit,
        meta: { requireAuth: true},
        props: true
    },

      {
        path: "/register", 
        name: "Register", 
        component: Register,
        meta: { hideNavbar: true}
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
  const requireAuth = to.meta.requireAuth;
  const loggedIn = !!(auth.token || localStorage.getItem('token'));
  if (requireAuth && !loggedIn) return next({ name: 'Login'});
  if ((to.name === 'Login' || to.name === 'Register') && loggedIn) return next({ name: 'Posts'});
  next();
})

export default router;