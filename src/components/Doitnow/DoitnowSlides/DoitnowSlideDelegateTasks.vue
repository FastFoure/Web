<template>
  <div
    class="flex flex-col items-center text-center"
  >
    <SlideBodyTitle title="Делегируйте задачи!" />
    <div class="flex flex-col items-center gap-[45px]">
      <div class="max-w-[600px]">
        <article class="font-normal text-[18px] text-center leading-[29px] w-full pl-0">
          <p class=" text-[#4C4C4D]">
            Поручите задачу сотруднику, а наш бот проследит за ее выполнением в срок
          </p>
        </article>
      </div>
      <img
        v-if="showPreviewPicture"
        src="@/assets/images/slides/addEmployes.png"
        class="w-[560px] h-[315px] cursor-pointer"
        @click="playVideo"
      >
      <iframe
        v-if="!showPreviewPicture"
        width="560"
        height="315"
        :src="`https://www.youtube.com/embed/Jx-TBirC_Cc?${!showPreviewPicture ? 'autoplay=1' : ''}`"
        title="YouTube video player"
        allow="accelerometer;clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
        class="border-[3px] rounded-xl border-[#2E2E2E]"
      />

      <SlideBodyButton
        text="Поручить задачу"
        @click="clickShowInspector"
      />
    </div>
  </div>
</template>
<script>
import SlideBodyTitle from './SlideBodyTitle.vue'
import SlideBodyButton from './SlideBodyButton.vue'
export default {
  components: { SlideBodyTitle, SlideBodyButton },
  props: {
    showPreviewPicture: {
      type: Boolean,
      default: true
    }
  },
  emits: ['clickShowInspectorEmit', 'playVideoEmit'],
  methods: {
    clickShowInspector () {
      this.$emit('clickShowInspectorEmit')
    },
    playVideo () {
      this.$emit('playVideoEmit')
    }
  }
}
</script>
