// This file handles the management of the state for the annotation tool.
// This specifies the layout of the annotation interface. This may include
// the required steps and instructions, the tools necessary to complete
// the annotations or the default image and annotation content.
import Vue from 'vue'

const state = {
  'type': 'dzi',
  'activeChannel': 0,
  'activeLayer': 0,
  'activeStep': 0,
  'steps': null
}

const getters = {
  // Get an array specifying the tools included in the current step.
  getStepTools: state => {
    if (state.steps) {
      return state.steps[state.activeStep].tools
    } else {
      return []
    }
  }
}

const actions = {
  resetEditorState: ({
    commit
  }) => {
    commit('resetEditorState')
  },

  setActiveStep: ({
    commit,
    dispatch
  }, step) => {
    if (typeof step.specificLayer === 'number') {
      dispatch('setActiveLayer', (step.specificLayer))
    }
    commit('setActiveStep', (step.id - 1))
  },

  setConfigActiveLayer: ({
    commit
  }, layerIndex) => {
    commit('setConfigActiveLayer', layerIndex)
  },

  loadConfig: ({
    commit,
    rootState
  }, payload) => {
    commit('loadConfig', {
      editor: payload,
      rootState: rootState
    })
  }
}

const mutations = {
  resetEditorState: (state) => {
    state = {}
  },

  setActiveStep: (state, stepIndex) => {
    state.activeStep = stepIndex
  },

  setConfigActiveLayer: (state, layerIndex) => {
    state.activeLayer = layerIndex
  },

  loadConfig: (state, payload) => {
    // Using Vue.set on the parent (rootState) to ensure that we don't fall into
    // the trap of Vue reactivity caveats.
    // https://vuejs.org/v2/guide/reactivity.html#Change-Detection-Caveats
    Vue.set(payload.rootState, 'editor', payload.editor)
  }
}

// Export all of the relevant logic so that it can be combined with the complete
// store and all other module logic.
export default {
  state,
  getters,
  actions,
  mutations
}
