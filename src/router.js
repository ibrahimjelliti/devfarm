import Logs from './views/Logs';
import Admin from './views/admin';
//import Workstation from './views/workstation';
import Vue from "vue";
import Router from "vue-router";

import auth from "./auth";

import Home from "./views/home";
import Profile from "./views/profile";
import DisplayData from "./views/display-data";
import defaultLayout from "./layouts/side-nav-outer-toolbar";
import simpleLayout from "./layouts/single-card";

Vue.use(Router);

const router = new Router({
  mode: 'history',
  hash: false,
  routes: [{
      path: "/home",
      name: "home",
      meta: {
        requiresAuth: true
      },
      components: {
        layout: defaultLayout,
        content: Home
      }
    },
    {
      path: "/workstations",
      name: "workstations",
      meta: {
        requiresAuth: true
      },
      components: {
        layout: defaultLayout,
        content: DisplayData
      }
    },
    {
      path: "/unaccessible-workstations",
      name: "Unaccessible workstations",
      meta: {
        requiresAuth: true
      },
      components: {
        layout: defaultLayout,
        content: DisplayData
      }
    },

    {
      path: "/profile",
      name: "profile",
      meta: {
        requiresAuth: true
      },
      components: {
        layout: defaultLayout,
        content: Profile
      }
    },
    {
      path: "/login-form",
      name: "login-form",
      meta: {
        requiresAuth: false
      },
      components: {
        layout: simpleLayout,
        // route level code-splitting
        // this generates a separate chunk (login.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        content: () =>
          import( /* webpackChunkName: "login" */ "./views/login-form")
      }
    },
    {
      path: "/",
      redirect: "/home"
    },
    {
      path: "/recovery",
      redirect: "/home"
    },
    {
      path: "*",
      redirect: "/home"
    }
  , {
      path: "/admin",
      name: "admin",
      meta: { requiresAuth: true },
      components: {
        layout: defaultLayout,
        content: Admin
      }
    }, {
      path: "/logs",
      name: "logs",
      meta: { requiresAuth: true },
      components: {
        layout: defaultLayout,
        content: Logs
      }
    }]
});

router.beforeEach((to, from, next) => {

  if (to.name === "login-form" && auth.authenticated()) {
    next({
      name: "home"
    });
  }

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!auth.authenticated()) {
      next({
        name: "login-form",
        query: {
          redirect: to.fullPath
        }
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;