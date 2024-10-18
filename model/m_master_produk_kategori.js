const mysql             = require('mysql2')
const config_database   = require('../config/database')
const db                = config_database.db
const eksekusi          = config_database.eksekusi

module.exports = 
{
    getSemua : function() {
        let sqlSyntax = mysql.format (
            `select * from master_produk_kategori`
        )
        return eksekusiS(sqlSyntax)
    }
}