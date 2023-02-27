<template>
  <q-page class="page">
    <div v-if="todo" class="content-wrapper">
      <div class="header">Edit Todo</div>
      <q-input outlined label="Title" v-model="todo.title" />
      <q-input outlined label="Description" v-model="todo.description" />
      <q-checkbox v-model="todo.completed" label="Completed" />
      <div class="buttons">
        <q-btn @click="onSave()" color="primary" label="Save" />
        <q-btn @click="onDelete()" color="negative" label="Delete" />
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import { Todo } from 'src/components/models';
import { ROUTE_NAMES } from 'src/router/routes';
import { getTodo, updateTodo, deleteTodo } from 'src/services/todos.service';
import { defineComponent, onBeforeMount, Ref, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

export default defineComponent({
  setup() {
    const route = useRoute();
    const router = useRouter();
    const todo = ref() as Ref<Todo>;

    onBeforeMount(async () => {
      const { id } = route.params;
      if (id) {
        todo.value = await getTodo(id.toString());
      }
    });

    const onSave = async () => {
      await updateTodo(todo.value);
      router.push({ name: ROUTE_NAMES.TODOS.LIST });
    };

    const onDelete = async () => {
      await deleteTodo(todo.value.id.toString());
      router.push({ name: ROUTE_NAMES.TODOS.LIST });
    };

    return { todo, onSave, onDelete };
  },
});
</script>

<style lang="scss" scoped>
.page {
  display: flex;
  justify-content: center;
  align-items: flex-start;
}

.content-wrapper {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.q-checkbox {
  margin-left: -0.5rem;
}
.header {
  font-size: 30px;
  font-weight: 600;
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

.content-wrapper {
  background: #fff;
  max-width: 400px;
  width: 100%;
  margin: 120px auto;
  padding: 25px;
  border-radius: 5px;
  box-shadow: 0px 10px 15px rgba(0, 0, 0, 0.1);
}

.buttons {
  display: flex;
  gap: 0.5rem;
}
</style>
