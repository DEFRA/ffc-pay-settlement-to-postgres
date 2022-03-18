const { getExcelFiles, getExcelData } = require('./excel')
const generateReturnFile = require('./csv')
const moment = require('moment')

const convertSettlementToPostgreSql = async () => {
  const excelFiles = await getExcelFiles()
  let content = ''

  for (const excelFile of excelFiles) {
    const data = await getExcelData(excelFile.path)
    const lines = data.slice(1)
    lines.forEach(line => {
      content = content.concat(`SITIAgri,${line[3]},${line[1]},legacy,01-MAY-22,S,${line[5]},${moment(line[0], ['MM/DD/YYYY']).format('YYYY-MM-DD')},UNKNOWN,D,\r\n`)
    })
  }
  await generateReturnFile(content)
}

(async function () {
  await convertSettlementToPostgreSql()
}())
