import { api } from 'src/boot/axios';
import { Todo } from 'src/components/models';
import { Ref, ref } from 'vue';

const todos: Ref<Array<Todo>> = ref([]);

const setTodos = (newTodos: Array<Todo>) => (todos.value = newTodos);

const updateTodo = async (todo: Todo) => {
  const response = await api.put(`/todos/${todo.id}`, todo);
  if (response.status === 200) {
    const index = todos.value.findIndex((t) => t.id === todo.id);
    todos.value[index] = todo;
  }
};

export { todos, setTodos, updateTodo };
