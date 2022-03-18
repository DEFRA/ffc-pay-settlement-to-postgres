const path = require('path')
const fs = require('fs').promises
const INPUT_DIRECTORY = path.join(__dirname, '..', 'input')
const XLSX = require('xlsx')

const getExcelFiles = async () => {
  const excelFiles = []

  const directory = await fs.readdir(INPUT_DIRECTORY)

  directory.filter(file => {
    return (file.indexOf('.') !== 0) && (file.slice(-5) === '.xlsx')
  }).forEach(file => {
    excelFiles.push({ path: path.resolve(INPUT_DIRECTORY, file), name: file.replace('.xlsx', '') })
  })
  return excelFiles
}

const getExcelData = async (filepath) => {
  const workbook = XLSX.readFile(filepath)
  const sheetNames = workbook.SheetNames
  const worksheet = sheetNames[0]
  return XLSX.utils.sheet_to_json(workbook.Sheets[worksheet], { raw: false, header: 1 })
}

module.exports = {
  getExcelFiles,
  getExcelData
}
