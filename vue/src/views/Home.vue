<template>
  <v-container>
    <v-layout wrap justify-center text-xs-center>
      <v-flex xs12>
        <div class="headline font-weight-light">
          <p>
            Everything runs in your browser. We do not send your in/outputs to
            our servers. 😎
          </p>
        </div>
      </v-flex>
      <v-flex xs12>
        <v-container grid-list-xl>
          <v-layout wrap>
            <v-flex xs12 sm6 md4 v-for="app in this.$root.apps" :key="app.name">
              <v-hover>
                <v-card
                  slot-scope="{ hover }"
                  :class="`app-card elevation-${hover ? 5 : 2}`"
                  :to="app.url"
                  ripple
                >
                  <v-card-text class="py-5">
                    <div class="headline">{{ app.name }}</div>
                    <div class="mt-3 text-xs-center" style="color: #999;">
                      {{ app.description }}
                    </div>
                  </v-card-text>
                </v-card>
              </v-hover>
            </v-flex>
          </v-layout>
        </v-container>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<style>
@media (min-width: 600px) {
  .app-card {
    min-height: 190px;
  }
}
</style>
