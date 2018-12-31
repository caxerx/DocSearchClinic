<template>
    <v-container>
        <v-layout>
            <div id="DocInfo_div" slot="content">
                <h1>Doctor Information </h1>
                <v-data-table
                id="DocInfo_v_data_table"
                :items="infos"
                hide-actions
                hide-headers
                class="elevation-1"
                >
                    <template slot="items" slot-scope="props">
                        <td>{{props.item.name}}</td>
                        <td class="text-xs-left">{{props.item.detail}}</td>                        
                    </template>                        
                </v-data-table>
            </div>            
        </v-layout>
    </v-container>
</template>

<script>
export default {
    data(){
        return{
            infos:[
                {
                    value: false,
                    name:"Doctor Name", 
                    detail:"Yellow Green"
                },
                {
                    value: false,
                    name:"Gender", 
                    detail:"hideyoshi"
                }
            ]
        }
    }
};
</script>

