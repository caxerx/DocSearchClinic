


const state = {
    patientListData: {
        patient:{

        },

        clinc:{
            name:"I visit a clinic - George Town",

            patientList: [
                {
                    name: 'patient1',
                    date: new Date().toISOString().substr(0, 10),
                    details: 'break legs!',
                    time: '09:00',
                    duration: 45,
                    gender: "Male",
                    email: "ikouhaha888@gmail.com",
                    phoneNo: "12345678",
                    dob: "09/09/1999",
                    hkid: "R1234567(7)",
                    allergy: "1,2,3,4,5",
                    doctor:"Dr. Michael Wong",
                    clinc : "clinc1",
                 
                },
                {
                    name: 'patient2',
                    date: '2019-03-15',
                    details: 'break legs!',
                    time: '12:30',
                    duration: 30,
                    gender: "Male",
                    email: "ikouhaha888@gmail.com",
                    phoneNo: "12345678",
                    dob: "09/09/1999",
                    hkid: "R1234567(7)",
                    allergy: "1,2,3,4,5",
                    doctor:"Dr. Michael Wong",
                    clinc : "clinc2",
                    
                },
                {
                    name: 'patient3',
                    date: new Date().toISOString().substr(0, 10),
                    details: 'break legs!',
                    time: '13:40',
                    duration: 30,
                    gender: "Male",
                    email: "ikouhaha888@gmail.com",
                    phoneNo: "12345678",
                    dob: "09/09/1999",
                    hkid: "R1234567(7)",
                    allergy: "1,2,3,4,5",
                    doctor:"Dr. Michael Wong",
                    clinc : "clinc3",
                   
                },
                {
                    name: 'patient4',
                    date: '2019-03-16',
                    details: 'break legs!',
                    time: '13:40',
                    duration: 30,
                    gender: "Male",
                    email: "ikouhaha888@gmail.com",
                    phoneNo: "12345678",
                    dob: "09/09/1999",
                    hkid: "R1234567(7)",
                    allergy: "1,2,3,4,5",
                    doctor:"Dr. Michael Wong",
                    clinc : "clinc4",
                   
                }
              ],
        },
      
        //tempoary only
        medicalRecordList: [
            {

                no: "1",
                clinc: "WeServeEveryone Clinic",
                doctor:"Dr. Nirmala Rajgopalan",
                date: "2018-11-15",
                startTime: "10:00",
                symptom: ["DIABETES MELLITUS (ICD-250.)", "HYPERTENSION, BENIGN ESSENTIAL (ICD-401.1)"],
                medicine: ["PRINIVIL TABS 20 MG (LISINOPRIL) 1 po qd", "Last Refill: #30 x 2 : Carl Savem MD (08/27/2010)", "HUMULIN INJ 70/30 (INSULIN REG & ISOPHANE (HUMAN)) 20 units ac breakfast", "Last Refill: #600 u x 0 : Carl Savem MD (08/27/2010)"],
                amount: 100,

            },
            {
                no: "2",
                clinc: "WeServeEveryone Clinic",
                doctor:"Dr. Nirmala Rajgopalan",
                date: "2018-11-16",
                startTime: "10:00",
                symptom: ["DIABETES MELLITUS (ICD-250.)"],
                medicine: ["PRINIVIL TABS 20 MG (LISINOPRIL) 1 po qd"],
                amount: 200,

            },
            {

                no: "1",
                clinc: "WeServeEveryone Clinic",
                doctor:"Dr. Nirmala Rajgopalan",
                date: "2018-11-15",
                startTime: "10:00",
                symptom: ["DIABETES MELLITUS (ICD-250.)", "HYPERTENSION, BENIGN ESSENTIAL (ICD-401.1)"],
                medicine: ["PRINIVIL TABS 20 MG (LISINOPRIL) 1 po qd", "Last Refill: #30 x 2 : Carl Savem MD (08/27/2010)", "HUMULIN INJ 70/30 (INSULIN REG & ISOPHANE (HUMAN)) 20 units ac breakfast", "Last Refill: #600 u x 0 : Carl Savem MD (08/27/2010)"],
                amount: 100,

            },
        ],
        
    },
}




const getters = {
    getPatientListData: state => state.patientListData,

}


const actions = {
    actionViewMedicalListFromPatientList({commit},patient){
        commit("viewMedicalListFromPatientList",patient);
    }



}

const mutations = {
    ["viewMedicalListFromPatientList"](state,patient){
        state.patientListData.patient = patient;
    }

}

function reset() {
    state.queueData = {

    }
}



export default {
    state,
    getters,
    actions,
    mutations
}

