import { createRouter, createWebHistory } from "vue-router";
import store from "../store/index.js";
import { users } from "../assets/users.js";
import HomePage from "../views/HomePage.vue";
import UserProfile from "../views/UserProfile.vue";
import AdminPage from "../views/AdminPage.vue";

const routes = [
  {
    path: "/",
    name: "HomePage",
    component: HomePage,
  },
  {
    path: "/user/:userId",
    name: "UserProfile",
    component: UserProfile,
  },

  {
    path: "/admin",
    name: "AdminPage",
    component: AdminPage,
    meta: {
      requiresAdmin: true,
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const user = store.state.User.user;

  if (!user) {
    await store.dispatch("User/setUser", users[0]);
  }

  const isAdmin = true;
  const requiresAdmin = to.matched.some((record) => record.meta.requiresAdmin);

  if (requiresAdmin && !isAdmin) next({ name: "HomePage" });
  else next();
});

export default router;
