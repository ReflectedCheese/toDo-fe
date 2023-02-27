<template>
  <q-page class="page">
    <div class="content-wrapper">
      <div class="header">Add Todo</div>
      <q-input outlined label="Title" v-model="title" />
      <q-input outlined label="Description" v-model="description" />
      <div>
        <q-btn @click="onAdd()" color="primary" label="Save" />
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { createTodo } from 'src/services/todos.service';
import { useRouter } from 'vue-router';
import { ROUTE_NAMES } from 'src/router/routes';

export default defineComponent({
  setup() {
    const title = ref('');
    const description = ref('');
    const router = useRouter();

    const onAdd = async () => {
      if (title.value) {
        createTodo(title.value, description.value);

      router.push({ name: ROUTE_NAMES.TODOS.LIST });

      }
    };
    return { title, description, onAdd };
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
