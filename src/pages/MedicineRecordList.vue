<template>

    <container>
        <div slot="content">
<m-form/>
<data-table/>
</div>
    </container>


</template>

<script>
import DataTable from "@/components/medicineRecordList/Table.vue";
import mForm from "@/components/medicineRecordList/Form.vue";
import Container from '@/components/Container.vue'

export default {
  components: {
    DataTable,
    Container,
    mForm,
  }
};
</script>