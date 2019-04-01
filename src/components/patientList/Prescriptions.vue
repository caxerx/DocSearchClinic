<template>
  <div>
    <v-toolbar flat color="white">
      <v-toolbar-title>Prescriptions</v-toolbar-title>

      <v-spacer></v-spacer>
      <v-dialog v-model="dialog" max-width="500px">
        <template v-slot:activator="{ on }">
          <v-btn color="primary" dark class="mb-2" v-on="on">New Item</v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>

          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.drug" label="Drug"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.df" label="DOSAGE & FREQUENCY"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.duration" label="days"></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="close">Cancel</v-btn>
            <v-btn color="blue darken-1" flat @click="save">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-toolbar>
    <v-data-table :headers="headers" :items="prescriptions">
      <template v-slot:items="props">
        <td class="text-sm-left">{{ props.item.drug }}</td>
        <td class="text-sm-left">{{ props.item.df }}</td>
        <td class="text-sm-left">{{ props.item.duration }}</td>
        <td class="justify-center layout px-0">
          <v-icon small class="mr-2" @click="editItem(props.item)">edit</v-icon>
          <v-icon small @click="deleteItem(props.item)">delete</v-icon>
        </td>
      </template>
    </v-data-table>

    <v-list style="width:100%">
       <v-layout justify-end>
         <v-btn @click="cancelShow()"> Cancel</v-btn>
        <!-- <slot name="cancelShow"></slot> -->
        <v-btn>Save</v-btn>
       </v-layout>
    </v-list>
  </div>
</template>

<script>
export default {
  data: () => ({
    dialog: false,
    headers: [
      {
        text: "DRUG",
        align: "left",
        sortable: false,
        value: "name"
      },
      { text: "DOSAGE & FREQUENCY", value: "calories", sortable: false },
      { text: "DURATION(days)", value: "duration", sortable: false },
      { text: "Action(s)", value: "fat", sortable: false }
    ],
    prescriptions: [],
    editedIndex: -1,
    editedItem: {
      drug: "",
      df: 0,
      duration: 0
    },
    defaultItem: {
      drug: "",
      df: 0,
      duration: 0
    }
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  created() {
    this.initialize();
  },

  methods: {
    initialize() {
      this.prescriptions = [];
    },

    editItem(item) {
      this.editedIndex = this.prescriptions.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.prescriptions.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.prescriptions.splice(index, 1);
    },

    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.prescriptions[this.editedIndex], this.editedItem);
      } else {
        this.prescriptions.push(this.editedItem);
      }
      this.close();
    },

    cancelShow(){
        this.$emit('input',false);
    }
  }
};
</script>