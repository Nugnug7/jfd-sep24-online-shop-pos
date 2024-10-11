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

        // cek email yang di input, ada di databas
        let email_exist = model_user.cari_email(form_email)
        if (email_exist.length > 0) {
        // Cek Password
            res.send('email ada')
        } else {
        // Tendang ke halaman register
        let pesan = (`Email anda belum terdaftar, silahkan register lebih dulu`)
        res.redirect(`/auth/login?notif= ${pesan}`)
        }
    }

}