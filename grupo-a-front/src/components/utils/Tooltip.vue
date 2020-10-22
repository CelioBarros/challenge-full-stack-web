<template>
  <v-tooltip bottom>
    <template v-slot:activator="{ on }">
      <div v-on="on">
        <slot name="button"></slot>
      </div>
    </template>
    <slot name="text"></slot>
  </v-tooltip>
</template>
