
### Building the code

```bash
git clone the repo
npm i
npm i -g gulp
gulp
```

This package produces the following:

## Files generated during build
* lib/* - intermediate-stage commonjs build artifacts
* dist/* - the bundled script, along with other resources

## Files to be added to SharePoint
* sharepoint/solution/directline-bot-extension.sppkg - the SharePoint app file to be uploaded to your App Catalog

## Test/Build options

### Starts the local server to host the extension.
gulp serve --nobrowser 

### Paste the following at the end of any SharePoint modern page in your tenant to test/debug
> Be sure to update the properties noted in the JSON (DirectLineSecret, BotName)

?loadSPFX=true&debugManifestsFile=https://localhost:4321/temp/manifests.js&customActions={"15be81a7-b6b8-4a75-8de3-0da288492e77":{"location":"ClientSideExtension.ApplicationCustomizer","properties":{"DirectLineSecret":"b8SE7pQLcjM.q4HbLlxpaGgt8QvAuBVtqgjbbI2CurwxnxhtP52hcrs", "BotName": "Withum IT Bot"}}}

### Deployment
gulp bundle --ship

gulp package-solution --ship


