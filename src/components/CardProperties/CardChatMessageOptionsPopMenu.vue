<template>
  <PopMenu>
    <slot />
    <template #menu>
      <PopMenuItem
        icon="answer"
        @click="onQuoteMessage"
      >
        Ответить
      </PopMenuItem>
      <PopMenuItem
        v-if="isShowNewCover"
        icon="copy"
        @click="onNewCardCover"
      >
        Сделать обложкой
      </PopMenuItem>
      <PopMenuItem
        v-if="canDelete"
        icon="delete"
        type="delete"
        @click="onDeleteMessage"
      >
        Удалить
      </PopMenuItem>
    </template>
  </PopMenu>
</template>
<script>
import PopMenu from '@/components/Common/PopMenu.vue'
import PopMenuItem from '@/components/Common/PopMenuItem.vue'
export default {
  components: {
    PopMenu,
    PopMenuItem
  },
  props: {
    canDelete: {
      type: Boolean,
      default: true
    },
    isShowNewCover: {
      type: Boolean,
      default: false
    }
  },
  emits: ['onQuoteMessage', 'onDeleteMessage', 'onNewCardCover'],
  methods: {
    onQuoteMessage () {
      this.$emit('onQuoteMessage')
    },
    onDeleteMessage () {
      this.$emit('onDeleteMessage')
    },
    onNewCardCover () {
      this.$emit('onNewCardCover')
    }
  }
}

</script>
