<template>
  <div
    class="flex flex-col items-center text-center"
  >
    <SlideBodyTitle title="Добавьте фото профиля!" />
    <div class="flex flex-col items-center gap-[45px]">
      <div class="max-w-[600px]">
        <article class="font-normal text-[18px] text-center leading-[29px] w-full pl-0">
          <p class=" text-[#4C4C4D]">
            Это просто эстетично, а Ваши коллеги смогут быстрее найти вас в списках
          </p>
        </article>
      </div>
      <img
        v-if="showPreviewPicture"
        src="@/assets/images/slides/doitnowstart.png"
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

      <div class="mb-3">
        <input
          id="iconfile"
          type="file"
          class="hidden"
          accept="image/png, image/jpeg"
          @change="changeUserPhoto"
        >
        <label
          for="iconfile"
          class="w-[238px] h-[40px] justify-center cursor-pointer bg-[#F2B679] text-[#2E2E2E] text-[14px] px-[68px] py-3 rounded-md hover:bg-slate-200 hover:text-[#422b14] font-medium"
        >
          Загрузить
        </label>
        <br>
      </div>
    </div>
  </div>
</template>
<script>
import SlideBodyTitle from './SlideBodyTitle.vue'
export default {
  components: { SlideBodyTitle },
  props: {
    showPreviewPicture: {
      type: Boolean,
      default: true
    }
  },
  emits: ['changeUserPhotoEmit', 'playVideoEmit'],
  methods: {
    changeUserPhoto (event) {
      this.$emit('changeUserPhotoEmit', event)
    },
    playVideo () {
      this.$emit('playVideoEmit')
    }
  }
}
</script>
