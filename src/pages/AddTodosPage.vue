<template>
  <q-page class="page">
    <div class="content-wrapper">
      <h1>Add Todo</h1>
      <q-input outlined v-model="title" label="Add New Todo" />
      <q-btn @click="onAdd()" color="primary" label="Save" />
    </div>
  </q-page>
</template>

<script lang="ts">
import { api } from 'src/boot/axios';
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const title = ref('');
    const onAdd = async () => {
      const response = await api.post('/todos', { title: title.value });
      console.log(response.data);
    };
    return { title, onAdd };
  },
});
</script>

<style lang="scss">
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
