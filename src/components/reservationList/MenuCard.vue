<template>
  <v-card color="grey lighten-4" min-width="350px" flat>
    <v-list>
      <v-list-tile avatar>
        <v-list-tile-avatar>
           <slot name="icon"></slot>
        </v-list-tile-avatar>

        <v-list-tile-content>
          <v-list-tile-title>
            <a href="/"><slot name="name"></slot></a>
          </v-list-tile-title>
          <v-list-tile-sub-title><slot name="details"></slot></v-list-tile-sub-title>
        </v-list-tile-content>
      </v-list-tile>
      <br>
      <v-list-tile-action class="text-md-center">
        <div style="width:70%;display: block;margin-left: auto;margin-right: auto;">
          <slot name="checkInBtn"></slot>
        </div>
      </v-list-tile-action>
    </v-list>

    <v-divider></v-divider>

    <v-list>
      <v-list-tile>
        <v-list-tile-sub-title>
          <v-icon>phone</v-icon>
          <slot name="phone"></slot>
          <br>
          <v-icon>email</v-icon>
          <slot name="email"></slot>
        </v-list-tile-sub-title>
      </v-list-tile>
    </v-list>

    <v-list>
      <v-list-tile>
        <v-list-tile-title>
          <b><slot name="time"></slot></b>
          for <slot name="duration"></slot> mins
        </v-list-tile-title>
        <v-spacer></v-spacer>
        <v-list-tile-action>
          <slot name="editBtn"></slot>
        </v-list-tile-action>
        <v-list-tile-action>
          <slot name="cancelBtn"></slot>
        </v-list-tile-action>
      </v-list-tile>
    </v-list>
  </v-card>
</template>
