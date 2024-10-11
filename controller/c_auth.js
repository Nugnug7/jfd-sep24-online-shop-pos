const bcrypt     = require('bcryptjs')
const model_user = require('../model/m_user')

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
            if (password_cocok ) {
                // Arahkan ke halaman utama sistem
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
    }

}