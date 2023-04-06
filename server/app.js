const express = require('express')
const cors = require('cors')
const app = express()
const {Data, Status, sequelize} = require('./models/index')

const port = 3000

app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(cors())

app.get('/', async (req, res, next) => {
    try {
        let allData = await Data.findAll({
            attributes: [
                'id',
                'productID',
                'productName',
                'amount',
                'customerName',
                ['statusId', 'status'],
                [sequelize.fn('TO_CHAR', sequelize.col('transactionDate'), 'MM-YYYY'), 'transactionDate'],
                'createBy',
                [sequelize.fn('TO_CHAR', sequelize.col('createOn'), 'MM-YYYY'),'createOn']
            ],
            include: [{
                model: Status,
                as: 'Status',
                attributes: ['name']
            }],
            group: ['transactionDate', 'Data.id', 'Status.id'],
            order: ['transactionDate']
        })

        res.status(200).json({allData})
    } catch (error) {
        console.log(error)
        res.status(500).json({message: 'Internal server error'})
    }
})

app.post('/', async (req, res, next) => {
    console.log(req.body)
    const {productID, productName, amount, customerName, statusId, transactionDate, createBy, createOn} = req.body

    try {
        const latestData = await Data.findAll({
            order: [['id', 'DESC']],
            limit: 1
        })
        const nextId = latestData[0].id

        const data = await Data.create({
            id: nextId + 1,
            productID: +productID,
            productName: productName,
            amount: +amount,
            customerName: customerName,
            statusId: +statusId,
            transactionDate: transactionDate,
            createBy: createBy,
            createOn: createOn
        })

        res.status(201).json({message: 'New data successfully added!'})
    } catch (error) {
        console.log(error)
        if(error.name === 'SequelizeValidationError'){
            let valErr = error.errors.map(el => {
                return el.message;
            });

            next({status: 400, message: valErr});
        } else {
            res.status(500).json({message: 'Internal server error'})
        }
    }
})

app.get('/status', async (req, res, next) => {
    try {
        let allStatus = await Status.findAll()

        res.status(200).json({allStatus})
    } catch (error) {
        res.status(500).json({message: 'Internal server error'})
    }
})

app.get('/:id', async (req, res, next) => {
    let dataId = req.params.id

    try {
        let data = await Data.findByPk(dataId,{
            include: [{
                model: Status,
                as: 'Status',
                attributes: ['name']
            }]
        })

        if(!data){
            res.status(404).json({message: `Data with ID ${dataId} does not exist`})
        } else {
            res.status(200).json({data})
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({message: 'Internal server error'})
    }
})

app.put('/:id', async (req, res, next) => {
    const dataId = req.params.id
    const {productID, productName, amount, customerName, statusId, transactionDate, createBy, createOn} = req.body

    try {
        const existFlag = await Data.findByPk(dataId)

        if(existFlag){
            const data = await Data.update({
                productID: productID ? productID : existFlag.productID,
                productName: productName ? productName : existFlag.productName,
                amount: amount ? +amount : existFlag.amount,
                customerName: customerName ? customerName : existFlag.customerName,
                statusId: statusId ? +statusId : existFlag.statusId,
                transactionDate: transactionDate ? transactionDate : existFlag.transactionDate,
                createBy: createBy ? createBy : existFlag.createBy,
                createOn: createOn ? createOn : existFlag.createOn
            }, {
                where: {
                    id: dataId
                }
            })

            res.status(200).json({message: `Data with ID ${dataId} has been successfully updated!`})
        } else {
            res.status(404).json({message: `Data with ID ${dataId} does not exist`})
        }
    } catch (error) {
        if(error.name === 'SequelizeValidationError'){
            let valErr = error.errors.map(el => {
                return el.message;
            });

            next({status: 400, message: valErr});
        } else {
            res.status(500).json({message: 'Internal server error'})
        }
    }
})

app.listen(port, () => {
    console.log('Port:', port)
})