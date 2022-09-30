import * as SLIDES from '@/store/actions/slides.js'

const state = {
  slides: [
    {
      name: 'welcome',
      mode: 'slide',
      visible: JSON.parse(localStorage.getItem('slides'))?.welcome?.visible ?? true,
      reminder: JSON.parse(localStorage.getItem('slides'))?.welcome?.reminder
    },
    {
      name: 'addAvatar',
      mode: 'slide',
      visible: JSON.parse(localStorage.getItem('slides'))?.addAvatar?.visible ?? true,
      reminder: JSON.parse(localStorage.getItem('slides'))?.addAvatar?.reminder
    },
    {
      name: 'addEmployees',
      mode: 'slide',
      visible: JSON.parse(localStorage.getItem('slides'))?.addEmployees?.visible ?? true,
      reminder: JSON.parse(localStorage.getItem('slides'))?.addEmployees?.reminder
    },
    {
      name: 'addReglaments',
      mode: 'slide',
      visible: JSON.parse(localStorage.getItem('slides'))?.addReglaments?.visible ?? true,
      reminder: JSON.parse(localStorage.getItem('slides'))?.addReglaments?.reminder
    },
    {
      name: 'delegateTasks',
      mode: 'slide',
      visible: JSON.parse(localStorage.getItem('slides'))?.delegateTasks?.visible ?? true,
      reminder: JSON.parse(localStorage.getItem('slides'))?.delegateTasks?.reminder
    }
  ]
}

const actions = {}

const mutations = {
  [SLIDES.CHANGE_VISIBLE]: (state, value) => {
    for (let i = 0; i < state.slides.length; i++) {
      if (state.slides[i].name === value.name) {
        let data = {}
        try {
          data = JSON.parse(localStorage.getItem('slides'))
          data[value.name].visible = value.visible
        } catch (e) {
          data = {
            welcome: {
              visible: true
            },
            addAvatar: {
              visible: true
            },
            addEmployees: {
              visible: true
            },
            addReglaments: {
              visible: true
            },
            delegateTasks: {
              visible: true
            }
          }
          data[value.name].visible = value.visible
        }
        state.slides[i].visible = value.visible
        state.slides[i].reminder = value.reminder ?? new Date()
        localStorage.setItem('slides', JSON.stringify(data))
      }
    }
  }
}

export default {
  state,
  actions,
  mutations
}
