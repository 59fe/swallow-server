module.exports = {
  "key": "tms-secret", /** (string) cookie key (default is koa":sess) */
  "maxAge": 86400000 * 30, /** (number) maxAge in ms (default is 1 days) */
  "overwrite": true, /** (boolean) can overwrite or not (default true) */
  "httpOnly": true, /** (boolean) httpOnly or not (default true) */
  "signed": true, /** (boolean) signed or not (default true) */
  "domain": ".dbike.me"
}