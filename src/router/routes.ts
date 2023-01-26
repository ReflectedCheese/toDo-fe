import { RouteRecordRaw } from 'vue-router';

export const ROUTE_NAMES = {
  TODOS: {
    LIST: 'todos-list',
    ADD: 'add-todo',
  },
};

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: ROUTE_NAMES.TODOS.LIST,
        component: () => import('src/pages/TodosPage.vue'),
      },
      {
        path: '/todo/add',
        name: ROUTE_NAMES.TODOS.ADD,
        component: () => import('src/pages/AddTodosPage.vue'),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
