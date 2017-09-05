/**
 * @desc Send application emails.
 * @author Tremaine Buchanan
 * @since 2017-06
 */
'use strict'
const exec = require('child_process').exec
let email = {
    subject: '',
    body: '',
    receipent: '',
    mail: '',
  /**
   * [build description]
   * @param  number id        Ticket id
   * @param  string receipent Receipent's email address
   */
  build: ( id, receipent )=>{
    this.subject = '\"ICT Help Desk Ticket #' + id + '\"'
    this.body = '\"Good day, \n\nThanks for submitting your issue through the ' +
                'ICT Help Desk application.\n\nYour issue will be resolved ' +
                'within 24-48 hours.\n\nIf our team is unable to resolve your ' +
                'issue within a timely manner or within the stipulated ' +
                'timeframe, we will promptly communicate same to you. ' +
                '\n\nSincerely, \nInformation, Technology and Communication ' +
                'Branch,\nMinistry of Economic Growth and Job Creation"'
    this.receipent = receipent
    this.mail = 'echo ' + this.body + " " +
           '| mail -s ' + this.subject + " " +
           this.receipent + "," + process.env.ICT_EMAIL + " " + '-aFROM:' + process.env.EMAIL_FROM + ''
  },
  /**
   * Executes process to send email.
   */
  send: ()=>{
    if(process.env.SEND_EMAILS == 'true'){
      return exec(this.mail, (error, stdout, sterr)=>{
        if(error) return console.log(error)

        console.log('Email sent successfully')
      })
    }
  }
}

exports.email = email
