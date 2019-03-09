<template>
  <container>
    <div slot="content">
      <section ref="print">
        <logo/>
        <v-card>
          <v-card-text>
            <p class="text-sm-left"></p>
            <p class="text-lg-left">
              <v-menu
                :close-on-content-click="false"
                v-model="menu"
                :nudge-right="40"
                lazy
                transition="scale-transition"
                offset-y
                full-width
                max-width="290px"
                min-width="290px"
              >
                <v-text-field
                  slot="activator"
                  v-model="date"
                  full-width="360"
                  label="Date "
                  hint="YYYY-MM-DD format"
                  persistent-hint
                  prepend-icon="event"
                  readonly
                ></v-text-field>
                <v-date-picker v-model="date" no-title @input="menu = false"></v-date-picker>
              </v-menu>
            </p>
            <h1 style="    text-align: center;">Referral Letter</h1>
            <v-flex xs12>
             <v-textarea solo rows="10" name="input-7-4" label="content.."></v-textarea>
            
            </v-flex>
            <p class="text-xs-right"  style="margin-top:200px">Signature</p>
          </v-card-text>
        </v-card>
        <div class="no-print">
          <v-btn @click="print()">PRINT</v-btn>
        </div>
      </section>
    </div>
  </container>
</template>

<script>
import Logo from "@/components/Logo.vue";
import Container from "@/components/Container.vue";

export default {
  components: {
    Logo,
    Container
  },
  data: () => ({
    menu: false,
    date: new Date().toISOString().substr(0, 10)
  }),

  methods: {
    print() {
      this.$print(this.$refs.print);
    }
  }
};
</script>
