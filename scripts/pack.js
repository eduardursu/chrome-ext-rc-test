const fs = require("fs")
const path = require("path")
const ChromeExtension = require("crx")
const keyPath = path.resolve(__dirname, "../key.pem")
const update_url= "https://s3.amazonaws.com/download-dev.dnsfilter.com/chrome-extension/test"
//Parse manifest keys,values as object
const manifest = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../dist/manifest.json"), "utf8"))
//Add the update_url value
manifest.update_url = update_url+"/updates.xml"
console.log("\x1b[36m"," update_url : "+manifest.update_url+"\n" )  
//Save changes to manifest.json
fs.writeFileSync(
  path.resolve(__dirname, "../dist/manifest.json"),
  JSON.stringify(manifest, null, 2)
)

const crx = new ChromeExtension(
  {
        codebase: update_url+"/dnsfilter-chrome-extension.crx",
        privateKey: fs.readFileSync(keyPath),
      }
)

crx
  .load(path.resolve(__dirname, "../dist"))
  .then((crx) => crx.pack())
  .then((crxBuffer) => {
    fs.writeFileSync(
      path.resolve(__dirname, "../releases/updates.xml"),
      crx.generateUpdateXML()
    )
    fs.writeFileSync(
      path.resolve(__dirname, "../releases/dnsfilter-chrome-extension.crx"),
      crxBuffer
    )
    console.log("\x1b[32m"," Packing completed. Check the files\n")
  })
  .catch((error) => console.error(error))
