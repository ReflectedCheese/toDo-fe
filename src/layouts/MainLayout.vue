<template>
  <q-layout view="hHh lpR fFf" class="background">
    <div class="title" @click="onHomeClick()">Todo App</div>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { ROUTE_NAMES } from 'src/router/routes';
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  components: {},

  setup() {
    const router = useRouter();

    const onHomeClick = () => {
      router.push({ name: ROUTE_NAMES.TODOS.LIST });
    };
    return { onHomeClick };
  },
});
</script>

<style lang="scss" scoped>
.title {
  cursor: pointer;
  display: flex;
  justify-content: center;
  font-size: 30px;
  font-weight: 600;
  color: white;
}

.background {
  background: linear-gradient(to bottom, #68eacc 0%, #497be8 100%);
}
</style>
