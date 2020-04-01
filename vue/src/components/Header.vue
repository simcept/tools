<template>
  <v-toolbar app color="primary" dark>
    <v-toolbar-title>
      <router-link to="/" tag="span" style="cursor: pointer;">
        <span>Simple</span>
        <span class="font-weight-light">Tools</span>
      </router-link>
      <span
        class="font-weight-light hidden-sm-and-down"
        v-if="this.$root.currentApp"
      >
        &nbsp;/ {{ this.$root.currentApp }}
      </span>
    </v-toolbar-title>
    <v-spacer />

    <v-menu offset-y transition="slide-y-transition">
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
