import Vue from "vue";
import VueRouter from "vue-router";
import Index from "../views/Index.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Index",
    redirect: "home",
    component: Index,
    children: [
      {
        path: "home",
        name: "Home",
        // route level code-splitting
        // this generates a separate chunk (home.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: function() {
          return import(/* webpackChunkName: "home" */ "../views/Home.vue");
        }
      },
      {
        path: "statement",
        name: "Statement",
        component: function() {
          return import(
            /* webpackChunkName: "statement" */ "../views/Statement.vue"
          );
        }
      },
      {
        path: "remind",
        name: "Remind",
        component: function() {
          return import(/* webpackChunkName: "remind" */ "../views/Remind.vue");
        }
      },
      {
        path: "manage",
        name: "Manage",
        component: function() {
          return import(/* webpackChunkName: "manage" */ "../views/Manage.vue");
        }
      }
    ]
  }
];

const router = new VueRouter({
  mode: process.env.IS_ELECTRON ? "hash" : "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
