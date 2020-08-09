const Database = require('./db')
const createProffy = require('./createProffy')


Database.then(async (db)=> {
    //Inserir dados

    proffyValue = {
        name: 'Jorge Fonseca',
        avatar: 'https://avatars0.githubusercontent.com/u/48517415?s=460&u=dfde4de33864f39c9504e811f25d0b5a4017417d&v=4',
        whatsapp: '21 975275827',
        bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    }

    classValue = {
        subject: 'Química',
        cost: '20'
        //o proffy id vira pelo banco de dados
    }

    classScheduleValues = [
        //class_id vira pelo banco de dados após cadastrarmos a class
        {
            weekday: 1,
            time_from: 720,
            time_to: 1220
        },
        {
            weekday: 0,
            time_from: 520,
            time_to: 1220
        }
    ]
    // await createProffy (db, {proffyValue, classValue, classScheduleValues})
    //Consultar os dados inseridos

    //todos os proffys
    const selectedProffys = await db.all("SELECT * FROM proffys")
    // console.log(selectedProffys)

    //consultar as classes de um determinado professor e trazer junto os dados dele.
    const selectClassesAndProffys = await db.all (`
        SELECT classes.*, proffys.*
        FROM proffys
        JOIN classes ON (classes.proffy_id = proffys.id)
        WHERE classes.proffy_id = 1;
    `)
    // console.log(selectClassesAndProffys)

    // o horario que a pessoa trabalha, é das 8 -18h
    //o jorario do time from (8h) precisa ser menor ou igual ao horario solicitado
    //o time_to precisa ser acima

    const selectClassesSchedules = await db.all (`
        SELECT class_schedule.*
        FROM class_schedule
        WHERE class_schedule.class_id = "1"
        AND class_schedule.weekday = "0"
        AND class_schedule.time_from <= "520"
        AND class_schedule.time_to > "520"

    
    `)

    // console.log(selectClassesSchedules)

})