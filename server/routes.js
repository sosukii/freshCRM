const {Router} = require('express')
const router = Router()
const Contract = require('./db/models/Contract')
const User = require('./db/models/User')
const workActivity = require('./db/models/workActivity')

// /api/auth

router.post('newcontract', async(req,res)=>{
    console.log('req.body: ',req.body)
    const contractInstance = new Contract()
    const {workers, ...data} = req.body
    contractInstance.company = req.body.company
    contractInstance.contactFace = req.body.contactFace
    contractInstance.address = req.body.address
    contractInstance.totalSum = req.body.totalSum
    contractInstance.phone = req.body.phone
    contractInstance.additional = req.body.additional
    contractInstance.start = req.body.dogovor_date
    // for(let [key, value] of Object.entries(data)){
    //     contractInstance[key] = value
    // }

    workers.map(async e=>{
        contractInstance.workers.push(e.id)
    })
    console.log('экземпляр договора, который мы сохраняем в бд (он корректный!): ',contractInstance)
        await contractInstance.save(async (err, currentDogovor) => {
            console.log('че такое currentDogovor : ', currentDogovor)
            for (let e of workers) {
                const user = await User.findOne({_id: e.id})
                if (!user.paymentPerHour) {
                    res.json({message: `Отказ. Установите зарплату в час для сотрудника: ${user.name}, и попробуйте снова.`})
                } else {
                    const workActivityInstance = new workActivity()

                        workActivityInstance.dogovor_id = currentDogovor._id
                        workActivityInstance.dogovor_date = req.body.dogovor_date
                        workActivityInstance.worker_id = e.id
                        workActivityInstance.hours = 8
                        workActivityInstance.tips = 8 * user.paymentPerHour
                        console.log('типс текущего воркера: ',workActivityInstance.tips)
                        console.log('wa instance получился такой (такой создаем): ',workActivityInstance)
                        await workActivityInstance.save(async (err, currentWAInstance) => {
                            console.log('-----------currentWAInstance: ', currentWAInstance)
                            const result = await User.updateOne(
                                {_id: e.id},
                                {$push: {workTime: currentWAInstance._id}}
                            )
                            console.log('результат добавления ObjectId в массив workTime конкретного работника: ', result)
                        })

                }
            }
        })


    //res.status(201).json({message:'Договор успешно сохранен!'})
})

router.post('contracts',async (req,res)=>{
    const contracts = await Contract.find({})
    res.send(contracts)
})
router.post('allstaff',async (req,res)=>{
    const staff = await User.find({})
    res.send(staff)
})
router.post('allWA', async (req,res) => {
    const allWA = await workActivity.find({})
    res.send(allWA)
})
router.post('getCurrentWorkTime', async (req,res) => {
    const currentWorkTime = []
    for(let e of req.body){
        const user = await User.findOne( { _id: e } )
        for(let elem of user.workTime) {
            const wa = await workActivity.findOne({_id:elem})
            currentWorkTime.push(wa)

        }
    }
    console.log(currentWorkTime)
    res.send(currentWorkTime)
})

router.post('setnewstart', async (req,res)=>{
    if(req.body.company && req.body.start){
        console.log('тело запроса с клиента: ',req.body)
        const result = await Contract.updateOne(
            {company:req.body.company},
            { $set: {start:req.body.start}
            }
        )
        console.log('result after updateOne: ',result)
        return res.status(201)
    } else {
        return res.json({message:'Пустой запрос!'})
    }
})
router.post('setPayment', async (req,res) => {
    try {
        const {worker_id, payment} = req.body
        const result = await User.updateOne(
            {_id:worker_id},
            { paymentPerHour:payment }
        )
        console.log(result)
        res.status(201).json({message:'payment update has been changed success ~'})
    } catch (e) {
        console.log(e)
        res.status(400).json({message: 'update false'})
    }
})
router.post('setRole', async (req,res)=>{
    try{
        const result = await User.findOneAndUpdate(
            {_id:req.body.worker_id},
            {roles:req.body.role}
        )
        if(result){
            res.status(201).json({message:'role update has been changed success ~'})
        }
    } catch (e) {
        console.log(e)
        res.status(400).json({message: 'update false'})
    }
})

router.post('contractsForCurrentUser', async (req,res)=>{
    const user = req.body.name
    const contracts = await Contract.find({user})
    res.send(contracts)
})
router.post('updateWorkersOfDogovor', async (req,res)=> {

    try {
        const [first, second, ...workers] = req.body
         const arrWorkers_id = []
         for (let e of workers){
             arrWorkers_id.push(e.worker_id)
         }
         const result = await Contract.updateOne(
             {_id:first.dogovor_id},
             { $set: { workers: arrWorkers_id} }
         )

        const workers_idInCurrentDogovor = []
        for (let worker of workers){
            workers_idInCurrentDogovor.push(worker.worker_id)
        }

        const arrayOfDeletestObj = await workActivity.find(
            {dogovor_id:first.dogovor_id,dogovor_date:second.dogovor_date,worker_id:{$nin: workers_idInCurrentDogovor}}
        )
        console.log('**********************deletest obj wa(wa, которые есть, но сотрудник из договора удален!): ',arrayOfDeletestObj)

        if(arrayOfDeletestObj.length>0) {
            const resultOfDeleteWA = await workActivity.deleteMany(
                {dogovor_id:first.dogovor_id,dogovor_date:second.dogovor_date,worker_id:{$nin: workers_idInCurrentDogovor}}
            )
            console.log('удалять есть кого! зашли в блок иф')

            for(let obj of arrayOfDeletestObj){
                console.log('тут должен быть тип обджект айди', obj._id)
                 User.findOne(
                    {_id:obj.worker_id},  (err, user) => {
                        for (let i = 0; i <= user.workTime.length; i++) {
                            if (String(user.workTime[i]) == String(obj._id)) {
                                user.workTime.remove(obj._id)
                                //user.workTime.splice(i, 1)
                                break;
                            }
                        }
                        user.save((err, user) => {
                            console.log('Метод юсер. сейв (метод после чудоного цикла) err: ', err, ' some us...: ', user)
                        })
                    }
                )
            }
        }
        for (let e of workers) {
            let currentWorker_id
            const user = await User.findOne({_id: e.worker_id})
            //const allWAForCurrentDogovor = await workActivity.find({dogovor_id:first.dogovor_id,dogovor_date:second.dogovor_date})
            //console.log('1. все wa к этому договору и этой дате: ',allWAForCurrentDogovor)
            //console.log('---------------------------------------------------------')
            // allWAForCurrentDogovor.map(wa=>{
            //     if(e===wa.worker_id) {
            //         return wa
            //     }
            // })


            // кусок ниже был закомментирован чтобы тестить удаление (которое выше) ---------------------------------------
            if (!user.paymentPerHour) {
                res.json({message: `Отказ. Установите зарплату в час для сотрудника: ${user.name}`})
            } else {
                 const waExist = await workActivity.findOne(
                     {dogovor_id: first.dogovor_id, dogovor_date: second.dogovor_date, worker_id:e.worker_id}
                 )
                 if (waExist) {
                     if(waExist.hours!==e.work_time) {
                         await workActivity.updateOne(
                         { dogovor_id: first.dogovor_id, dogovor_date: second.dogovor_date, worker_id:e.worker_id },
                          { hours:e.work_time, tips:e.work_time * user.paymentPerHour }
                         )

                     } else {
                         console.log('часы одинаковые.')
                         console.log('else. часы в доке: ', waExist.hours)
                         console.log('else. часы с клиента: ', e.work_time)
                     }
                 } else {
                     console.log('такого wa ещё нет в коллекции')
                     const workActivityInstance = new workActivity()

                     workActivityInstance.dogovor_id = first.dogovor_id
                     workActivityInstance.dogovor_date = second.dogovor_date
                     workActivityInstance.worker_id = e.worker_id
                     workActivityInstance.worker_name = user.name
                     workActivityInstance.hours = e.work_time
                     workActivityInstance.tips = e.work_time * user.paymentPerHour
                     workActivityInstance.save()
                         .then(async currentWAInstance => {
                             console.log(currentWAInstance._id)
                             const result = await User.updateOne(
                                 {_id: e.worker_id},
                                 {$push: {workTime: currentWAInstance._id}}
                             )
                             console.log('результат добавления ObjectId в массив workTime конкретного работника: ', result)
                         })
                 }

                // if(!user[0].paymentPerHour){
                //     res.json({message: `Отказ. Установите зарплату в час для сотрудника: ${user[0].name}`})
                // } else {
                //     user[0].workTime.map(async one_event => {
                //         if (one_event.dogovor_id === first.dogovor_id && one_event.dogovor_date === second.dogovor_date) {
                //             console.log('объект с добавляемым договором и датой УЖЕ ЕСТЬ')
                //             await User.updateOne(
                //                 { _id: e.worker_id, workTime: {$each: {dogovor_id: first.dogovor_id, dogovor_date: second.dogovor_date}} },
                //
                //                 () => {
                //                     workTime.$each(elem=>{
                //                         if(elem.dogovor_id===first.dogovor_id && elem.dogovor_date === second.dogovor_date) {
                //                             if(elem.hours!==e.work_time) {
                //                                 $set: { elem.hours = e.work_time}
                //                             }
                //                             if(elem.tips!==user[0].paymentPerHour * e.work_time) {
                //                                 $set: { elem.tips = user[0].paymentPerHour * e.work_time}
                //                             }
                //                         }
                //                     })
                //                 }
                //             )
                //         } else {
                //             console.log('объекта с таким договором и такой датой ещё нет')
                //             const objToPushAtWorkTimeField = {
                //                 dogovor_date: second.dogovor_date,
                //                 dogovor_id: first.dogovor_id,
                //                 hours: e.work_time,
                //                 tips: user[0].paymentPerHour * e.work_time
                //             }
                //             await User.updateOne(
                //                 {_id: e.worker_id},
                //                 {$push: {workTime: objToPushAtWorkTimeField}}
                //             )
                //         }
                //     })

                //res.status(201).json({message:'всё круто!'})
            }
            // кусок выше был закомментирован чтобы тестить удаление (которое выше) ---------------------------------------
        }
    } catch (e){
         console.log(e)
         res.status(400).json({message:'update failed.'})
     }
})

router.post('middleware', roleMiddleware(['USER']), (req,res)=>{
    console.log('ok!')
})


module.exports = router