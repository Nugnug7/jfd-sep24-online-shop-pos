const mysql             = require('mysql2')
const config_database   = require('../config/database')
const db                = config_database.db
const eksekusi          = config_database.eksekusi
const bcrypt            = require('bcryptjs')

module.exports = 
{
    cari_email : function(form_email) {
        let sqlSyntax = mysql.format (
            `SELECT * FROM user WHERE email = ?`,
            [form_email]
        )
        return eksekusi(sqlSyntax)
    },

    insert_user : function(req) {
        let sqlData = {
            email           : req.body.form_email,
            password        : bcrypt.hashSync(req.body.form_password),
            nama_lengkap    : req.body.form_namaLengkap,
            //role_id         : 1,
        }    
        
        let sqlSyntax = mysql.format (
            `INSERT INTO user SET ?`,
            [sqlData]

        )
        return eksekusi(sqlSyntax)  
    },

    simpanPassword : function(req) {
        let sqlData = {
            password        : bcrypt.hashSync(req.body.form_password)
            
        }    
        
        let sqlSyntax = mysql.format (
            `UPDATE user SET ?`,
            [sqlData]

        )
        return eksekusi(sqlSyntax)
    },

}