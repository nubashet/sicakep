const checkKanwil = {
  yes: true,
  no: false
}
const checkRole = {
  user: 'user',
  supervisor: 'supervisor',
  admin: 'admin',
  superadmin: 'super-admin'
}
const checkDivision = {
  administrasi: 'Administrasi',
  pemasyarakatan: 'Pemasyarakatan',
  keimigrasian: 'Keimigrasian',
  yankumham: 'Pelayanan Hukum dan HAM',
  nonuser: 'non-user'
}
checkExpenseType = {
  barang: 'belanja barang',
  pegawai: 'belanja pegawai',
  modal: 'belanja modal'
}

module.exports = { checkKanwil, checkRole, checkDivision, checkExpenseType }
