<template>
  <q-page class="page">
    <div class="content-wrapper">
      <div class="header">Todos</div>
      <div v-if="todos.length">
        <div
          @click="onTodoClick(todo.id.toString())"
          class="todo"
          :class="{ 'todo--completed': todo.completed }"
          v-for="(todo, index) in todos"
          :key="index"
        >
          <q-checkbox
            :model-value="todo.completed"
            @update:model-value="toggleTodo(todo)"
          />
          {{ todo.title }}
          <span v-if="todo.description"> - {{ todo.description }}</span>
        </div>
      </div>
      <div v-if="todos.length === 0 && !isFirstRender">Er zijn geen todo's</div>
      <q-btn @click="onAdd()" color="primary" label="Add" />
    </div>
  </q-page>
</template>

<script lang="ts">
import { api } from 'boot/axios';
import { Todo } from 'components/models';
import { ROUTE_NAMES } from 'src/router/routes';
import { todos, updateTodo, setTodos } from 'src/services/todos.service';
import { defineComponent, onBeforeMount, ref } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  setup() {
    const router = useRouter();
    const isFirstRender = ref(true);

    onBeforeMount(async () => {
      const response = await api.get('/todos');
      if (response.status === 200) {
        setTodos(response.data);
      }

      isFirstRender.value = false;
    });

    const toggleTodo = async (todo: Todo) => {
      todo.completed = !todo.completed;
      updateTodo(todo);
    };

    const onAdd = () => {
      router.push({ name: ROUTE_NAMES.TODOS.ADD });
    };

    const onTodoClick = (id: string) => {
      router.push({ name: ROUTE_NAMES.TODOS.EDIT, params: { id } });
    };

    return { todos, isFirstRender, toggleTodo, onAdd, onTodoClick };
  },
});
</script>

<style lang="scss" scoped>
.page {
  display: flex;
  justify-content: center;
  align-items: flex-start;
}

body {
  width: 100%;
  height: 100vh;
  /* overflow: hidden; */
  padding: 10px;
  background: linear-gradient(to bottom, #68eacc 0%, #497be8 100%);
}

.content-wrapper {
  background: #fff;
  max-width: 400px;
  width: 100%;
  margin: 120px auto;
  padding: 25px;
  border-radius: 5px;
  box-shadow: 0px 10px 15px rgba(0, 0, 0, 0.1);
}

.header {
  font-size: 30px;
  font-weight: 600;
  margin-bottom: 1rem;
}

.todo {
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 3px;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);
  margin: 0 0 1em;
  padding: 1em;
  cursor: pointer;
  user-select: none;
}

.todo--completed {
  background-color: #f5f5f5;
  border-color: #ddd;
  color: #999;
  text-decoration: line-through;
}
</style>
