<template>
  <v-toolbar app color="primary" dark>
    <v-toolbar-title>
      <router-link to="/" tag="span" style="cursor: pointer;">
        <span>Simple</span>
        <span class="font-weight-light">Tools</span>
      </router-link>
      <!-- <span class="font-weight-light"> / JSON Formatter</span> -->
    </v-toolbar-title>
    <v-spacer />

    <v-menu
      offset-y
      transition="slide-y-transition"
    >
      <template v-slot:activator="{ on }">
        <v-btn icon v-on="on">
          <v-icon>apps</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-tile
          v-for="app in this.$root.apps"
          :key="app.name"
          :to="app.url"
        >
          <v-list-tile-content>
            <v-list-tile-title v-text="app.name"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-menu>

    <v-btn icon to="/about">
      <v-icon>info</v-icon>
    </v-btn>
  </v-toolbar>
</template>

<script>
  export default {
    data() {
      return {
        items: [
          { title: 'Jason Oner', avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg' },
          { title: 'Travis Howard', avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg' },
          { title: 'Ali Connors', avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg' },
          { title: 'Cindy Baker', avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg' },
        ],
      }
    }
  }
</script>
