const bcrypt        = require('bcryptjs')
const model_user    = require('../model/m_user')
const { simpan_password } = require('./c_olshop')


module.exports = 
{
    halaman_login: function(req,res) {
        let data = {
            notifikasi: req.query.notif,
        }
        res.render('v_auth/login', data)
    },
    
    proses_login: async function(req,res) {
        // ambil inputan dari form login
        let form_email = req.body.form_email
        let form_password = req.body.form_password

        // cek email yang di input, ada di database
        let email_exist = await model_user.cari_email(form_email)
            if (email_exist.length > 0) {
             // Cek Password
            let password_cocok = bcrypt.compareSync(form_password, email_exist[0].password)
            if (password_cocok) {
                // Arahkan ke halaman utama sistem
                req.session.user = email_exist
                res.redirect('/toko')
            } else {
                // tendang ke halaman login
                let pesan = (`Password salah`)
                res.redirect(`/auth/login?notif= ${pesan}`)
            }
            } else {
                // Tendang ke halaman register
            let pesan = (`Email anda belum terdaftar, silahkan register lebih dulu`)
            res.redirect(`/auth/login?notif= ${pesan}`)
            }
    },

    cek_login: function (req,res,next) {
        if (req.session.user) {
            next()
        } else {
            // Lempar ke halaman login
            let pesan = (`Sesi anda sudah habis silahkan login dulu`)
            res.redirect(`/auth/login?notif= ${pesan}`)
        }
    },

    proses_logout: function(req,res) {
        req.session.destroy( (err) => {
            res.redirect('/') // will always fire after session is destroyed
        })
    },

    percobaan: function(req,res) {
        let inputpassword   = req.params.inputpassword
        let passwordhashed  = bcrypt.hashSync(inputpassword)
        res.send(
            `<span>inputpassword = ${inputpassword}</span><br>
            <span>passwordhashed = ${passwordhashed}</span><br>`
        )
    },


    halaman_daftar: function(req,res) {
        let data = {
            notifikasi: req.query.notif,
        }
        res.render('v_auth/register', data)
    },

    
    proses_register: async function(req,res) {
        // Ambil inputan dari form daftar
        let email            = req.body.form_email
        let password         = req.body.form_password
        let hashPassword     = bcrypt.hashSync(password)
        let namaLengkap      = req.body.form_namaLengkap
        
        // Insert user baru ke database
        try   { let insert    = await model_user.insert_user(req,email,hashPassword,namaLengkap)  
                          
                if (insert.affectedRows > 0) {
                res.redirect(`/auth/login?notif=Berhasil daftar`) 
                } 
                
                
                } catch (error) {
                     throw error
                }
    },
    

    simpan_password : async function(req,res) {
            let password         = req.body.form_password
    
      // Insert user baru ke database
      try   { let update    = await model_user.simpanPassword(req,password)  
                          
        if (update.affectedRows > 0) {
        res.redirect(`/auth/login?notif=Berhasil Ganti Password`) 
        } 
        
        
        } catch (error) {
             throw error
        }
    },



}

