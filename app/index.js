const { getExcelFiles, getExcelData } = require('./excel')
const generateReturnFile = require('./csv')
const moment = require('moment')
const { convertToPence, convertToPounds } = require('./convert-currency')

const convertSettlementToPostgreSql = async () => {
  const excelFiles = await getExcelFiles()
  let content = ''

  for (const excelFile of excelFiles) {
    const data = await getExcelData(excelFile.path)
    const lines = data.slice(1)
    const paymentRequests = []

    lines.forEach(line => {
      const existingPaymentRequests = paymentRequests.find(x => x[1] === line[1])
      if (existingPaymentRequests) {
        existingPaymentRequests[5] += convertToPence(line[5])
        if (moment(line[0], ['MM/DD/YYYY']) > moment(existingPaymentRequests[0], ['MM/DD/YYYY'])) {
          existingPaymentRequests[0] = line[0]
        }
      } else {
        line[5] = convertToPence(line[5])
        paymentRequests.push(line)
      }
    })

    paymentRequests.forEach(paymentRequest => {
      content = content.concat(`SITIAgri,${paymentRequest[3]},${paymentRequest[1]},legacy,01-MAY-22,S,${convertToPounds(paymentRequest[5])},${moment(paymentRequest[0], ['MM/DD/YYYY']).format('YYYY-MM-DD')},UNKNOWN,D,\r\n`)
    })
  }
  await generateReturnFile(content)
}

(async function () {
  await convertSettlementToPostgreSql()
}())
