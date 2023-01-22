<template>
  <q-page class="page">
    <div class="content-wrapper">
      <h1>Todos</h1>
      <div v-for="(item, index) in todos" :key="index">{{ item.title }}</div>
    </div>
  </q-page>
</template>

<script lang="ts">
import { api } from 'boot/axios';
import { Todo } from 'components/models';
import { defineComponent, ref, Ref } from 'vue';

export default defineComponent({
  setup() {
    const todos: Ref<Array<Todo>> = ref([
      { id: 1, title: 'Todo 1', completed: false },
    ]);

    api.get('/todos').then((response) => {
      console.log(response.data);
      todos.value = response.data;
    });

    return { todos };
  },
});
</script>

<style lang="scss">
.page {
  display: flex;
  justify-content: center;
  align-items: flex-start;
}
</style>
