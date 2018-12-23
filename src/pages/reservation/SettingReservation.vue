<template>
  <div>
    <v-layout>
      <v-flex xs12 sm7 offset-sm1>
        <h1>Period Setting</h1>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field type="number"  v-model="averageMin" messages="ex: 10 mins" label="average mins of hour" ></v-text-field>
          <v-text-field type="number"  v-model="averageMin" messages="ex: 9 hours" label="total working hours" ></v-text-field>
          <v-text-field type="number"  v-model="averageMin" messages="ex: start from 9 am" label="start working time" ></v-text-field><br/>
          <v-btn @click="submit" small >submit</v-btn>
          <v-btn @click="clear" small >clear</v-btn>
        </v-form>
      </v-flex>
    </v-layout>
  </div>
</template>
