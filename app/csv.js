const path = require('path')
const fs = require('fs').promises
const OUTPUT_DIRECTORY = path.join(__dirname, '..', 'output')

const generateReturnFile = async (content) => {
  const filename = 'SFI Pilot Migration Return File.csv'
  const filePath = path.resolve(OUTPUT_DIRECTORY, filename)

  await fs.writeFile(filePath, content)
  console.log(`Generated ${filename}`)
}

module.exports = generateReturnFile
