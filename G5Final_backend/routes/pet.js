import express from 'express'
import db2 from '../configs/mysql.js'
// 中介軟體處理上傳檔案
import multer from 'multer'
// 取副檔名工具
import { extname } from 'path'
const router = express.Router()
const upload = multer({
  storage: multer.diskStorage({
    // 儲存資料夾路徑
    destination: 'public/pet',
    filename: (req, file, cb) =>
      // 檔名修改
      cb(null, `${Date.now()}${extname(file.originalname)}`),
  }),
})

// 全部資料抓取
router.get('/', async function (req, res, next) {
  try {
    const [rows] = await db2.query(`SELECT * FROM PetCommunicator `)
    res.json(rows)
  } catch (err) {
    console.error('查詢錯誤：', err)
    res.status(500).send(err)
  }
})
// 已上架
router.get('/list', async function (req, res, next) {
  try {
    const [rows] = await db2.query(
      `SELECT * FROM PetCommunicator WHERE Status = '已刊登'`
    )
    res.json(rows)
  } catch (err) {
    console.error('查詢錯誤：', err)
    res.status(500).send(err)
  }
})
// 溝通師受預約列表
router.get('/comreserve', async function (req, res, next) {
  try {
    const [rows] = await db2.query(
      'SELECT PetCommunicatorReserve.*, Member.Avatar FROM PetCommunicatorReserve LEFT JOIN Member ON PetCommunicatorReserve.MemberID = Member.ID;'
    )
    res.json(rows)
  } catch (err) {
    console.error('查詢錯誤：', err)
    res.status(500).send(err)
  }
})
// 會員預約列表
router.get('/memreserve', async function (req, res, next) {
  try {
    const [rows] = await db2.query(`SELECT 
    PetCommunicatorReserve.*,PetCommunicator.Name,PetCommunicator.Img,Member.Avatar
    FROM 
    PetCommunicatorReserve 
    LEFT JOIN 
    PetCommunicator ON PetCommunicator.ID = PetCommunicatorReserve.PetCommID
    LEFT JOIN 
    Member ON Member.ID = PetCommunicator.MemberID`)
    res.json(rows)
  } catch (err) {
    console.error('查詢錯誤：', err)
    res.status(500).send(err)
  }
})
// 預約表單填寫
router.post('/reserve', upload.none(), async function (req, res, next) {
  const {
    petCommID,
    memberID,
    ReserveName,
    Phone,
    PetType,
    PetName,
    Approach,
    Time,
    Remark,
  } = req.body
  try {
    const [rows] = await db2.query(
      `INSERT INTO PetCommunicatorReserve 
    (PetCommID, MemberID, ReserveName, Phone, PetType, PetName, Approach, Time, Remark, Status) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        petCommID,
        memberID,
        ReserveName,
        Phone,
        PetType,
        PetName,
        Approach,
        Time,
        Remark,
        '1',
      ]
    )
    res.json(rows)
  } catch (err) {
    console.error('查詢錯誤：', err)
    res.status(500).send(err)
  }
})
// 師資刊登修改
router.post(
  '/communicatorEdit',
  upload.single('pic'),
  async function (req, res, next) {
    // 先處理checkbox陣列成字串
    let Approach = ''
    if (Array.isArray(req.body.Approach)) {
      Approach = req.body.Approach.join(',')
    } else {
      Approach = req.body.Approach
    }
    // 如果有上傳照片
    let Img = ''
    if (req.file) {
      Img = req.file.filename
    }
    //解構
    const { ID, Name, Service, Email, Fee, Introduction } = req.body

    try {
      const [rows] = await db2.query(
        `UPDATE PetCommunicator SET Name = ?, Service = ?, Approach = ?, Fee = ?, Email = ?, Introduction = ?, Img = ? WHERE ID = ?`,
        [Name, Service, Approach, Fee, Email, Introduction, Img, ID]
      )
      res.json(rows)
    } catch (err) {
      console.error('查詢錯誤：', err)
      res.status(500).send(err)
    }
  }
)
// 註冊成爲溝通師
router.post(
  '/communicatorCreate',
  upload.single('pic'),
  async function (req, res, next) {
    const { MemberID, RealName, Certificateid, CertificateDate } = req.body
    let Img = ''
    if (req.file) {
      Img = req.file.filename
    }
    try {
      const [rows] = await db2.query(
        `INSERT INTO PetCommunicator
      (MemberID, RealName, Certificateid, CertificateDate, Status,Img)
      VALUES (?, ?, ?, ?, ?,?)`,
        [MemberID, RealName, Certificateid, CertificateDate, '未刊登', Img]
      )
      res.json([rows])
      console.log('資料上傳成功')
    } catch (err) {
      console.error('查詢錯誤：', err)
      res.status(500).send(err)
    }
  }
)
// 取消預約
router.delete('/cancelReserve', upload.none(), async function (req, res, next) {
  const ID = req.body.ID
  try {
    const [rows] = await db2.query(
      `DELETE FROM PetCommunicatorReserve WHERE ID = ?`,
      [ID]
    )
    res.json('ok')
  } catch (err) {
    console.error('查詢錯誤：', err)
    res.status(500).send(err)
  }
})
export default router
