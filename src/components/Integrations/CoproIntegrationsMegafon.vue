<template>
  <IntegrationsModalBoxMegafon
    v-if="showIntegration"
    title="Интеграция с Мегафон"
    :error="error"
    @cancel="changeShowIntegrationState(false)"
    @onSave="phoneIntegrate"
  />
  <ModalBoxDelete
    v-if="removeIntegrationModal"
    title="Разорвать интеграцию"
    :text="'Вы уверены, что хотите разорвать интеграцию?'"
    @cancel="showRemoveIntegration(false)"
    @yes="removeIntegration"
  />
  <NavBar
    class="pt-[8px]"
    title="Интеграции"
    route="/settings/integrations"
    :breadcrumbs="[{ name: 'Мегафон', selected: true }]"
  />
  <div class="w-full px-10 py-[20px] bg-white rounded-[8px]">
    <div
      class="flex w-[450px] justify-center flex-col"
    >
      <div class="flex items-center">
        <img
          class="h-[30px] w-[30px]"
          src="@/assets/images/megafon/megafon_logo.png"
        >
        <span class="ml-[10px] font-[500]">
          Корпоративная интеграция через Мегафон
        </span>
      </div>
      <span
        v-if="isOrganizationIntegrated"
        class="my-[20px]"
      >
        Интегрировано с: {{ atsLink }}
      </span>
      <button
        v-if="!isOrganizationIntegrated"
        class="mt-[10px] rounded-[10px] h-[40px] text-white bg-orange-300"
        @click="changeShowIntegrationState(true)"
      >
        Интеграция
      </button>
      <button
        v-else
        class="mt-[10px] rounded-[10px] h-[40px] text-white bg-[#CD5C5C]"
        @click="showRemoveIntegration(true)"
      >
        Разорвать интеграцию
      </button>
    </div>
    <div
      v-if="isOrganizationIntegrated"
      class="mt-[30px] flex flex-col w-[450px]"
    >
      <span class="mb-1">Пользователи Мегафон</span>
      <span class="mb-1 text-[11px]">Установите пользователям ЛидерТаск их логины из ЛК Мегафон</span>
      <div
        v-for="(megafonUser, index) in megafonUsers"
        :key="index"
        class="mb-[10px] flex h-[34px] gap-[8px]"
      >
        <div class="flex-1">
          <EmployeesPopper
            :uid-user="megafonUser.uidUser"
            class="w-full"
            @select="setUserUid(index, $event)"
          />
        </div>

        <div class="flex-1">
          <PopMenu
            class="w-[calc(100%+24px)]"
            @openMenu="loadUsers"
          >
            <span class="block cursor-pointer rounded-[6px] text-[12px] bg-[#f4f5f7] px-[8px] py-[5px] truncate">
              {{ megafonUser.megafonUserLogin || 'Логин' }}
            </span>
            <template #menu>
              <div class="w-[200px]">
                <svg
                  v-if="areAtsLoginsLoading"
                  class="m-auto w-[24px] h-[24px] text-gray-200 animate-spin fill-orange-400"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <PopMenuItem
                  v-for="atsLogin in atsLogins"
                  v-else
                  :key="atsLogin.id"
                  @click="setUserLogin(index, atsLogin.login)"
                >
                  {{ atsLogin.login }}
                </PopMenuItem>
              </div>
            </template>
          </PopMenu>
        </div>
        <div
          class="flex-none w-[34px] h-[34px] flex justify-center items-center rounded-[6px] hover:bg-[#f4f5f7] cursor-pointer"
          @click="deleteUserLogin(index)"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.92308 3.14286H9.07692C9.07692 2.8587 8.96346 2.58617 8.7615 2.38524C8.55954 2.18431 8.28562 2.07143 8 2.07143C7.71438 2.07143 7.44046 2.18431 7.2385 2.38524C7.03654 2.58617 6.92308 2.8587 6.92308 3.14286ZM5.84615 3.14286C5.84615 2.57454 6.07308 2.02949 6.477 1.62763C6.88093 1.22576 7.42876 1 8 1C8.57124 1 9.11907 1.22576 9.523 1.62763C9.92692 2.02949 10.1538 2.57454 10.1538 3.14286H14.4615C14.6043 3.14286 14.7413 3.1993 14.8423 3.29976C14.9433 3.40023 15 3.53649 15 3.67857C15 3.82065 14.9433 3.95691 14.8423 4.05738C14.7413 4.15784 14.6043 4.21429 14.4615 4.21429H13.8542L12.5565 13.6836C12.4684 14.3253 12.1497 14.9135 11.6593 15.3394C11.1688 15.7653 10.5399 16 9.88892 16H6.11108C5.4601 16 4.83116 15.7653 4.34072 15.3394C3.85028 14.9135 3.53155 14.3253 3.44354 13.6836L2.14585 4.21429H1.53846C1.39565 4.21429 1.25869 4.15784 1.15771 4.05738C1.05673 3.95691 1 3.82065 1 3.67857C1 3.53649 1.05673 3.40023 1.15771 3.29976C1.25869 3.1993 1.39565 3.14286 1.53846 3.14286H5.84615ZM6.92308 6.89286C6.92308 6.75078 6.86635 6.61452 6.76537 6.51405C6.66438 6.41358 6.52742 6.35714 6.38462 6.35714C6.24181 6.35714 6.10485 6.41358 6.00387 6.51405C5.90288 6.61452 5.84615 6.75078 5.84615 6.89286V12.25C5.84615 12.3921 5.90288 12.5283 6.00387 12.6288C6.10485 12.7293 6.24181 12.7857 6.38462 12.7857C6.52742 12.7857 6.66438 12.7293 6.76537 12.6288C6.86635 12.5283 6.92308 12.3921 6.92308 12.25V6.89286ZM9.61539 6.35714C9.75819 6.35714 9.89515 6.41358 9.99614 6.51405C10.0971 6.61452 10.1538 6.75078 10.1538 6.89286V12.25C10.1538 12.3921 10.0971 12.5283 9.99614 12.6288C9.89515 12.7293 9.75819 12.7857 9.61539 12.7857C9.47258 12.7857 9.33562 12.7293 9.23463 12.6288C9.13365 12.5283 9.07692 12.3921 9.07692 12.25V6.89286C9.07692 6.75078 9.13365 6.61452 9.23463 6.51405C9.33562 6.41358 9.47258 6.35714 9.61539 6.35714ZM4.51077 13.5389C4.56362 13.9239 4.75485 14.2768 5.04906 14.5322C5.34328 14.7877 5.72056 14.9285 6.11108 14.9286H9.88892C10.2796 14.9288 10.6572 14.7881 10.9516 14.5326C11.246 14.2771 11.4374 13.9241 11.4903 13.5389L12.7675 4.21429H3.23246L4.51077 13.5389Z"
              fill="#7E7E80"
            />
          </svg>
        </div>
      </div>
      <button
        class="mb-3 text-[13px] text-[#4c4c4d] text-left px-[8px]"
        type="button"
        @click="onAddNewMegafonUser"
      >
        + Добавить пользователя
      </button>
    </div>
    <article
      v-if="!isOrganizationIntegrated"
      class="mt-[30px]"
    >
      <p class="font-[500]">
        Инструкция по интеграции:
      </p>
      <p class="mt-[10px] font-[600] text-[18px]">
        Шаг 1. Добавьте ЛидерТаск в ЛК Мегафона
      </p>
      <p class="mt-[10px]">
        <ul class="list-inside list-decimal">
          <li class="mb-3">
            Зарегистрируйтесь на сайте
            <a
              class="text-[#04b]"
              href="https://id.megafon.ru/sso/login-b2b"
              target="_blank"
            >
              Мегафон
            </a>
            и войдите в личный кабинет.
          </li>
          <li class="mb-3">
            Зайдите в раздел "Настройки" и выберите "Интеграция с CRM" в правом верхнем углу.
            <img
              class="block max-w-[800px]"
              src="@/assets/images/megafon/step_1.png"
              alt="Интерфейс личного кабинета"
            >
          </li>
          <li class="mb-3">
            Найдите пункт "Ваша CRM" в списке и нажмите подключить.
            <img
              class="block max-w-[800px]"
              src="@/assets/images/megafon/step_2.png"
              alt="Список CRM в ЛК"
            >
          </li>
          <li class="mb-3">
            Заполните поля в соответствии со скриншотом:
            <ul class="list-inside list-disc gap-y-10px flex flex-col gap-y-[5px]">
              <li>
                <div class="inline-flex items-center gap-x-[5px]">
                  В поле "Имя вашей CRM" введите:
                  <ButtonCopy
                    text="LeaderTask CRM"
                  />
                </div>
              </li>
              <li>
                <div class="inline-flex items-center gap-x-[5px]">
                  В поле "Адрес вашей CRM" введите:
                  <ButtonCopy
                    text="https://api.leadertask.ru/megafon"
                  />
                </div>
              </li>
              <li>
                <div class="inline-flex items-center gap-x-[5px]">
                  В поле "Ключ для авторизации в вашей CRM":
                  <ButtonCopy
                    :text="ownerKey"
                  />
                </div>
              </li>
            </ul>
            <img
              class="block max-w-[800px]"
              src="@/assets/images/megafon/step_3.png"
              alt="Параметры CRM в ЛК"
            >
          </li>
        </ul>
      </p>
    </article>
  </div>
</template>
<script>
import PopMenu from '@/components/Common/PopMenu.vue'
import PopMenuItem from '@/components/Common/PopMenuItem.vue'

import * as CORP_MEGAFON from '@/store/actions/integrations/corpoMegafonInt'

import IntegrationsModalBoxMegafon from '@/components/Integrations/IntegrationsModalBoxMegafon.vue'
import ModalBoxDelete from '@/components/Common/ModalBoxDelete.vue'
import NavBar from '../Navbar/NavBar.vue'
import EmployeesPopper from './components/EmployeesPopper.vue'
import ButtonCopy from '@/components/ButtonCopy.vue'

export default {
  components: {
    NavBar,
    IntegrationsModalBoxMegafon,
    ModalBoxDelete,
    EmployeesPopper,
    ButtonCopy,
    PopMenu,
    PopMenuItem
  },
  data () {
    return {
      error: '',
      showIntegration: false,
      removeIntegrationModal: false,
      megafonUsers: [...this.$store.state.corpMegafonIntegration.megafonUsers],
      atsLogins: [],
      areAtsLoginsLoading: false
    }
  },
  computed: {
    user () {
      return this.$store.state.user.user
    },
    isOrganizationIntegrated () {
      return this.$store.state.corpMegafonIntegration.isIntegrated
    },
    orgEmployees () {
      return this.$store.state.navigator.navigator.emps.items
    },
    employees () {
      return this.$store.state.employees.employees
    },
    canEdit () {
      return this.employees[this.user.current_user_uid].type === 1 || this.employees[this.user.current_user_uid].type === 2 || true
    },
    ownerKey () {
      return this.$store.getters.getOwnerEmployee?.uid || ''
    },
    atsLink () {
      return this.$store.state.corpMegafonIntegration.atsLink
    }
  },
  methods: {
    changeShowIntegrationState (value) {
      if (this.canEdit) {
        this.showIntegration = value
      }
    },
    showRemoveIntegration (value) {
      if (this.canEdit) {
        this.removeIntegrationModal = value
      }
    },
    async phoneIntegrate (integrationData) {
      const data = {
        ...integrationData,
        organizationEmail: this.user.owner_email,
        crmKey: this.ownerKey
      }

      try {
        const action = !this.isOrganizationIntegrated ? CORP_MEGAFON.MEGAFON_CREATE_INTEGRATION : CORP_MEGAFON.MEGAFON_UPDATE_INTEGRATION
        await this.$store.dispatch(action, data)
        this.changeShowIntegrationState(false)
      } catch (ex) {
        this.error = ex
      }
    },
    removeIntegration () {
      this.$store.dispatch(CORP_MEGAFON.MEGAFON_REMOVE_CORP_INTEGRATION, this.user.owner_email)
        .then(() => {
          this.showRemoveIntegration(false)
        })
    },
    onAddNewMegafonUser () {
      this.megafonUsers.push({
        uidUser: '',
        megafonUserLogin: ''
      })
    },
    async loadUsers () {
      this.areAtsLoginsLoading = true
      const response = await this.$store.dispatch(CORP_MEGAFON.GET_ATS_LOGINS, {
        organizationEmail: this.user.owner_email,
        atsKey: this.$store.state.corpMegafonIntegration.atsKey
      })
      this.atsLogins = response.data.items

      this.areAtsLoginsLoading = false
    },
    setUserUid (index, uid) {
      this.megafonUsers[index].uidUser = uid
      this.saveUsers()
    },
    setUserLogin (index, login) {
      this.megafonUsers[index].megafonUserLogin = login
      this.saveUsers()
    },
    deleteUserLogin (index) {
      this.megafonUsers.splice(index, 1)
      this.saveUsers()
    },
    async saveUsers () {
      const newMegafonUsers = this.megafonUsers.filter(user => user.uidUser !== '' && user.megafonUserLogin !== '')
      await this.$store.dispatch(CORP_MEGAFON.MEGAFON_UPDATE_INTEGRATION, {
        atsKey: this.$store.state.corpMegafonIntegration.atsKey,
        atsLink: this.$store.state.corpMegafonIntegration.atsLink,
        megafonUsers: newMegafonUsers,
        organizationEmail: this.user.owner_email,
        crmKey: this.ownerKey
      })
    }
  }
}
</script>
<style scoped>
.light {
  --popper-theme-background-color: #ffffff;
  --popper-theme-background-color-hover: #ffffff;
  --popper-theme-text-color: #444444;
  --popper-theme-border-width: 0px;
  --popper-theme-border-style: solid;
  --popper-theme-border-radius: 8px;
  --popper-theme-padding: 10px 10px;
  --popper-theme-box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.1), 0px 3px 5px rgba(0, 0, 0, 0.12);
  margin: 0 !important;
  border: 0 !important;
}
</style>
