const { getExcelFiles, getExcelData } = require('./excel')
const generateReturnFile = require('./csv')

const convertSettlementToPostgreSql = async () => {
  const excelFiles = await getExcelFiles()
  let content = ''

  for (const excelFile of excelFiles) {
    const data = await getExcelData(excelFile.path)
    const lines = data.slice(1)
    lines.forEach(line => {
      content = content.concat(`SITIAgri,${line[3]},${line[1]},legacy,04-MAY-21,S,${line[5]},2021-08-27,UNKNOWN,D,\n`)
    })
  }
  await generateReturnFile(content)
}

(async function () {
  await convertSettlementToPostgreSql()
}())
