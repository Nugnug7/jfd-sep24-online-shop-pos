const path            = require('path')
const moment          = require('moment')
const m_prod_kategori = require('../model/m_master_produk_kategori')
const m_master_produk = require('../model/m_master_produk')


module.exports =
{
    halaman_beranda: async function (req,res) {
        let data = {
            kategoriProduk: await m_prod_kategori.getSemua()
        }
        res.render('v_olshop/beranda', data)
    },

    halaman_index_produk: async function (req,res) {
        let data = {
            kategoriProduk  : await m_prod_kategori.getSemua(),
            produkJual      : await m_master_produk.getSemua(),
            notifikasi      : req.query.notif,
        }
        res.render('v_olshop/produk/index', data)
    },

    
    halaman_form_tambah: async function (req,res) {
        let data = {
            kategoriProduk: await m_prod_kategori.getSemua()
        }
        res.render('v_olshop/produk/form-tambah', data)
    },

   proses_insert_produk: async function(req,res) {
        let foto1            = req.files.form_foto1

    // ganti nama file asli
        let email           = req.session.user[0].email.replaceAll('.','-')
        let datetime        = moment().format('YYYYMMDD_HHmmss')
        let filename_foto1  = email + '_' + datetime + '_' + foto1.name
        let folder_simpan   = path.join(__dirname, '../public/upload/produk-foto', filename_foto1)

        try {
            
            // pakai function mv() untuk meletakkan file di suatu folder/direktori
            foto1.mv(folder_simpan, async function(err) {
                if (err) {
                    return res.status(500).send(err)
                }
            })

            let insert = await m_master_produk.insert( req, filename_foto1 )
            if (insert.affectedRows > 0) {
                res.redirect('/olshop/produk?notif=Berhasil input produk baru')
            }
        } catch (error) {
            throw error
        }
    },
}