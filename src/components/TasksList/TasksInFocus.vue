<template>
  <div class="w-full">
    <NavBarTasks
      id="NavBarInFocus"
      class="pt-[8px]"
      title="Задачи в фокусе"
      @reload="reload"
    />
    <TasksListNew
      :new-task-props="{ focus: 1 }"
    />
  </div>
</template>

<script>
import TasksListNew from '../TasksListNew.vue'
import NavBarTasks from '@/components/Navbar/NavBarTasks.vue'

import * as TASK from '@/store/actions/tasks.js'

export default {
  components: {
    TasksListNew,
    NavBarTasks
  },
  mounted () {
    this.reload()
  },
  methods: {
    reload () {
      this.$store.dispatch(TASK.IN_FOCUS_TASKS_REQUEST)
    }
  }
}

</script>
