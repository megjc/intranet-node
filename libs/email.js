'use strict'
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
let messages = {
  'expired_docs': {
    from: 'Traveling Officers Database <do_not_reply@megjc.gov.jm>',
    subject: 'Provision of updated vehicle documents'
  }
}

exports.sendEmail = (details)=>{
  let message = getMessage(),
      name = details.name,
      list_of_docs = buildList(details.docs),
      message_start = `<div style="margin: 0 auto;width:600px;height:auto;font-size:14px;background-color:#FFFFFF">Good day ${name},
                      <p>Based on our records, please see below related vehicle documents and respective expiry dates:</p>
                      <div style="width:auto;height:auto;background-color:#F5F5F5;padding: 12px 0 12px 0">
                      ${list_of_docs}
                      </div>`,
      message_end = `<p>If available, kindly submit outstanding documents as soon as possible to the <strong>Human Resource and Management Divison.</strong></p>
                      <p>If you have already submitted documents listed in this email, kindly disregard this message.</p>
                      <p>Best,</p>
                        <div style="text-align:center;position:fixed;bottom:0;height:auto;min-height:200px;margin:0 auto; width:600px">
                            <p style="color:#999999;font-size:11px">
                                  This is an auto generated email sent from the <strong>Traveling Officers Database</strong><br />
                                  Developed by the Software Development Team, <br />
                                  Information, Communication and Technology Branch,<br />
                                  Ministry of Economic Growth and Job Creation,<br />
                                  The Towers, 25 Dominica Drive, Kingston 5 <br />
                                  Email us at <a href="mailto:ict@megjc.gov.jm">ict@megjc.gov.jm</a>
                            </p>
                        </div>
                      </div>`
  message.to = details.email
  message.html = message_start + message_end
  sgMail.send(message).then(()=>console.log('Mail successfully sent'))
}

function buildList( docs ){
  let ul_start = '<ul>',
      ul_end = '</ul>',
      list_items = '',
      i = 0, len = docs.length
  for(; i < len; i++)
     list_items += `<li><strong> ${docs[i].title} expires on ${docs[i].expiry_date} </strong></li>`
  let list = ul_start + list_items + ul_end
  return list
}

function getMessage(){
  return messages['expired_docs']
}
