/**
 * Cloud Function that creates logs
 * 
 * Responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */
 const {Logging} = require('@google-cloud/logging');
 const PROJECT_ID="beaming-source-302514"
 const LOG_NAME="loggingFun"
 
 async function quickstart(
   text,
   projectId = 'YOUR_PROJECT_ID', // Your Google Cloud Platform project ID
   logName = 'my-log' // The name of the log to write to
 ) {
   // Creates a client
   const logging = new Logging({projectId});
 
   // Selects the log to write to
   const log = logging.log(logName);
 
   // The data to write to the log
   // const text = 'Hello, world!';
 
   // The metadata associated with the entry
   const metadata = {
     resource: {type: 'global'},
     // See: https://cloud.google.com/logging/docs/reference/v2/rest/v2/LogEntry#logseverity
     severity: 'INFO',
   };
 
   // Prepares a log entry
   const entry = log.entry(metadata, text);
 
   async function writeLog() {
     // Writes the log entry
     await log.write(entry);
     console.log(`Logged: ${text}`);
   }
   writeLog();
 }
 
 exports.loggingFun = async (req, res) => {
   let message = req.query.message || req.body.message || 'Hello World!';
   await quickstart(message, PROJECT_ID, LOG_NAME);
   res.status(200).send(message);
 };
 