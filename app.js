const express       = require('express')
const app           = express()
const port          = 3000
const cookieParser  = require('cookie-parser')
const bodyParser    = require('body-parser')
const session       = require('express-session')
const fileupload    = require('express-fileupload')
const c_beranda     = require('./controller/c_beranda')
const c_auth        = require('./controller/c_auth')
const cek_login     = c_auth.cek_login
const c_toko        = require('./controller/c_toko')
const c_olshop      = require('./controller/c_olshop')



// Settingan session untuk login
app.use(cookieParser('secret'))
app.use(session({
    secret: 'rahasia',
    resave: true,
    saveUninitialized: false,
    cookie:{
        maxAge: (1000 * 60 )* 30
        // batas sesison expired
        // 1000 milidetik * 60 = 1 menit
        // 1 menit * 30 = 1/2 jam
    }
}))

// =============== App bagian framework, libary ===============
app.use( express.urlencoded({extended:false}))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static('public'))
app.use(fileupload())

app.set('view engine', 'ejs')
app.set('views', './view')

// =============== App bagian v_auth ===============
app.get('/', c_beranda.halaman_awal)
app.get('/auth/login' , c_auth.halaman_login)
app.post('/auth/proses-login' , c_auth.proses_login)
app.post('/auth/logout', cek_login, c_auth.proses_logout)
app.get('/auth/register', c_auth.halaman_daftar)
app.post('/auth/proses-register', c_auth.proses_register)
app.post('/auth/simpanPassword', cek_login, c_auth.simpan_password),


app.get('/percobaan-hash-password/:inputpassword', c_auth.percobaan)



// =============== App bagian v_toko ===============
app.get('/toko', cek_login, c_toko.index)

// ============== App bagian v_olshop =============
app.get('/olshop', cek_login, c_olshop.halaman_beranda)
app.get('/olshop/produk', cek_login, c_olshop.halaman_index_produk)
app.get('/olshop/produk/tambah', cek_login, c_olshop.halaman_form_tambah)
app.post('/olshop/produk/proses-insert', cek_login, c_olshop.proses_insert_produk)
app.get('/olshop/produk/detail/:id_produk', cek_login, c_olshop.detail_produk)
app.get('/olshop/keranjang/input/:id_produk', cek_login, c_olshop.keranjang_input)
app.get('/olshop/keranjang/list', cek_login, c_olshop.keranjang_list)
app.post('/olshop/keranjang/hapus/:id_keranjang', cek_login, c_olshop.keranjang_hapus)
app.post('/olshop/keranjang/bayar', cek_login, c_olshop.keranjang_bayar)
app.get('/olshop/UserProfile/uProfile', cek_login, c_olshop.halaman_profile)
app.get('/olshop/UserProfile/gantiPassword', cek_login, c_olshop.halaman_password),






app.listen(port, ()=>{
    console.log(`Aplikasi sudah menyala, buka http://localhost:${port}`)
})





