const mysql             = require('mysql2')
const config_database   = require('../config/database')
const db                = config_database.db
const eksekusi          = config_database.eksekusi

module.exports = 
{
    cari_email : function(form_email) {
        let sqlSyntax = mysql.format (
            `select * from user where email= ?`,
            [form_email]
        )
        return eksekusi(sqlSyntax)
    },

    insert_user : function(req) {
        let sqlData = {
            email           : req.session.email,
            password        : req.session.password,
            nama_lengkap    : req.session.nama_lengkap,
        }    
        
        let sqlSyntax = mysql.format (
            `INSERT INTO user 
             (email, password, nama_lengkap) 
             VALUES 
             ('?', '?', '?');`,

            [sqlData]
        )
        return eksekusi(sqlSyntax)
        
    },

}