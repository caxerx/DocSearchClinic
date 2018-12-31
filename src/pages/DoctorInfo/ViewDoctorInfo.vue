<template>
  <v-container>
    <v-layout v-bind:style="layoutStyle">
      <div id="DocInfo_div" slot="content"  style="padding-right: 100px;">
        <h1>Doctor Information</h1>
        <v-data-table
          id="DocInfo_v_data_table"
          :items="infos"
          hide-actions
          hide-headers
          class="elevation-1"
        >
          <template slot="items" slot-scope="props">
            <td class="text-xs-left">
              <b>{{props.item.name}}</b>
            </td>
            <td class="text-xs-left">
              <span v-for="detail in props.item.details" :key="detail">{{detail }}  </span>
            </td>
          </template>
        </v-data-table>
      </div>
    
      <div id="DocQuali_div" slot="content" style="padding-right: 50px;">
        <h1>Qualification</h1>
        <v-data-table
          id="DocQuali_v_data_table"
          :items="quali"
          hide-actions
          hide-headers
          class="elevation-1"
        >
          <template slot="items" slot-scope="props">
            <td class="text-xs-left">{{props.item.details}}</td>
          </template>
        </v-data-table>
      </div>
   
      <div id="Service_div" slot="content"  >
        <h1>Services</h1>
        <v-data-table
          id="Service_v_data_table"
          :items="Services"
          hide-actions
          hide-headers
          class="elevation-1"
        >
          <template slot="items" slot-scope="props">
            <td class="text-xs-left">{{props.item.details}}</td>
          </template>
        </v-data-table>
      </div>
    </v-layout>
    <div v-bind:style="layoutStyle">
     <h1>Clinic/Hospital Information</h1>
    <v-layout  v-for="clinic in clinics" :key="clinic" style="padding-top: 25px;">   
    
      <br>
      <v-flex  style="padding-right: 25px;">
      <h2>{{clinic.name}}</h2>
      <h3>{{clinic.Address}} </h3>

      <h2 style="padding-top: 25px;">opening hour</h2>
      <table>
        <tr v-for="time in clinic.times" :key="time"><th>{{time.date}}</th> <td>{{time.am}} </td> <td>{{time.pm}} </td>  </tr>
      </table>
              
      </v-flex>
        <v-flex id="ClinicMap_div">
          <h2>Map</h2>
          <iframe
            v-bind:src="clinic.map"
            width="600"
            height="450"
            frameborder="0"
            style="border:0"
            allowfullscreen
          ></iframe>
        </v-flex>
      
   
    </v-layout>
    </div>
  </v-container>
  
</template>
<style>
table {
  border-collapse: collapse;
  width: 100%;
  border:1px solid #ddd;
  background-color: white;
}

th, td {
  padding: 8px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

tr:hover {background-color:#f5f5f5;}
</style>
<script>

export default {
 
  data() {
    return {
      infos: [
        {
          name: "Doctor Name",
          details: ["Yellow Green"]
        },
        {
          name: "Gender",
          details: ["hideyoshi"]
        },
        {
          name: "Professional",
          details: ["General Pratice", "Paediatrics"]
        }
      ],
      quali: [
        {
          details: "MBBS (HK) 1975"
        },
        {
          details: "FHKAM (OPHTHALMOLOGY) 1993"
        }
      ],
      Services: [
        {
          details: "General Consultation"
        },
        {
          details: "XXXXX"
        }
      ],
      layoutStyle: {
        padding: "20px"
      },
      clinics: [
        {
          name: "ABC Clinic",
          Address:
            "Unit A, 99/F, HSH Kowloon Centre, 192-194 Nathan Road, Jordan, Kowloon",
          times:[
            {
            date: "Monday",
            am:"9:00 - 12:00",
            pm:"14:00 - 17:00"
          }, 
          {
            date: "Tuesday",
            am:"9:00 - 12:00",
            pm:"14:00 - 17:00"
          }, 
           {
            date: "Wednesday ",
            am:"9:00 - 12:00",
            pm:"14:00 - 17:00"
          },
           {
            date: "Thursday ",
            am:"9:00 - 12:00",
            pm:"14:00 - 17:00"
          },
            {
            date: "Friday",
            am:"9:00 - 12:00",
            pm:"14:00 - 17:00"
          },
            {
            date: "Saturday",
            am:"9:00 - 12:00",
            pm:"--"
          },
            {
            date: "Sunday",
            am:"--",
            pm:"--"
          },
          ],
          
          map:
            "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3691.3280691625514!2d114.16985791495483!3d22.303429085322!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjLCsDE4JzEyLjMiTiAxMTTCsDEwJzE5LjQiRQ!5e0!3m2!1szh-TW!2shk!4v1546153405835"
        }, 
         {
          name: "CDE Hospital",
          Address:
            "Unit A, 99/F, HSH Kowloon Centre, 192-194 Nathan Road, Jordan, Kowloon",
          times:[
            {
            date: "Monday",
            am:"9:00 - 12:00",
            pm:"14:00 - 17:00"
          }, 
          {
            date: "Tuesday",
            am:"9:00 - 12:00",
            pm:"14:00 - 17:00"
          }, 
           {
            date: "Wednesday ",
            am:"9:00 - 12:00",
            pm:"--"
          },
           {
            date: "Thursday ",
            am:"9:00 - 12:00",
            pm:"14:00 - 17:00"
          },
            {
            date: "Friday",
            am:"9:00 - 12:00",
            pm:"14:00 - 17:00"
          },
            {
            date: "Saturday",
            am:"9:00 - 12:00",
            pm:"--"
          },
            {
            date: "Sunday",
            am:"--",
            pm:"--"
          },
          ],
          
          map:
            "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3691.3280691625514!2d114.16985791495483!3d22.303429085322!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjLCsDE4JzEyLjMiTiAxMTTCsDEwJzE5LjQiRQ!5e0!3m2!1szh-TW!2shk!4v1546153405835"
        }
      ]
    };
  }
};
</script>

