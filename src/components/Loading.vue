<template>
  <div id='container'>
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs10 sm6 md4>
            <div>
              <p class="display-3 faded-title-text mb-0"> AIDA </p>
              <p class="headline faded-title-text pt-0"> Annotate Image Data by Assignment </p>
              <v-progress-linear :indeterminate="true"></v-progress-linear>
            </div>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  props: {
    fileName: {
      type: String,
      default: null
    }
  },

  methods: {
    ...mapActions({
      setImageName: 'image/setImageName',
      setFileName: 'backend/setFileName'
    })
  },

  computed: mapState({
    imageName: state => state.image.imageName
  }),

  async mounted () {
    try {
      await this.setImageName(this.$route.params.fileName.replace(/\.[^/.]+$/, ''))
      await this.setFileName(this.$route.params.fileName)
      this.$router.replace('/' + this.imageName)
    } catch (error) {
      console.log('could not load the data into AIDA')
      console.log(error)
    }
  }
}
</script>

<style scoped>
#container {
  background: linear-gradient(#0D47A1, #1976D2);
  display: flex;
  flex-direction: column;
  height: 100%;
}

.faded-title-text {
  color: #F0F6FC;
  opacity: 0.5;
  text-align: center;
}
</style>
