const { getExcelFiles, getExcelData } = require('./excel')
const { generateInsert, generateValues } = require('./script')
const generateSql = require('./sql')

const convertSettlementToPostgreSql = async () => {
  const excelFiles = await getExcelFiles()

  for (const excelFile of excelFiles) {
    const data = await getExcelData(excelFile.path)
    const headers = data[0]
    const lines = data.slice(1)

    let statement = generateInsert(excelFile.name, headers)
    statement = generateValues(statement, lines)

    await generateSql(excelFile.name, statement)
  }
}

(async function () {
  await convertSettlementToPostgreSql()
}())
