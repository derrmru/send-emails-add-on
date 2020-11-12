function sendEmail(patientName, patientEmail, appointmentDate, itemId) {
   const action = CardService.newAction().setFunctionName('send').setParameters({'patientName': patientName, 'appointmentDate': appointmentDate, 'itemId': itemId})

   const fixedFooter = CardService.newFixedFooter()
            .setPrimaryButton(CardService.newTextButton()
                .setBackgroundColor('#248ec2')
                .setText("Send Email")
                .setOnClickAction(action));
                
   const email = CardService.newTextInput()
                .setFieldName("Email")
                .setTitle("Email")
                .setHint('Patients Email')
                .setValue(patientEmail);
                
   const sender = CardService.newTextInput()
                .setFieldName("Sender's Email")
                .setTitle("Sender")
                .setHint('Your Email')
                .setValue(Session.getActiveUser().getEmail());
                
                
   const subject = CardService.newTextInput()
                .setFieldName("Subject")
                .setTitle("Email Subject")
                .setHint('Email Subject')
                .setValue('Podogo Foot Clinic | Your Report');

  //username derived from email
  var user = Session.getActiveUser().getEmail();
  var userName = user.split('@')[0];
  userName = userName.substr(0, 1).toUpperCase() + userName.slice(1).toLowerCase();

  const emailContent = CardService.newTextInput()
                .setMultiline(true)
                .setFieldName("Email Body")
                .setTitle("Body")
                .setHint("The main section of your email")
                .setValue('Dear ' + patientName + ',\n\nPlease see attached report regarding your recent appointment on ' + appointmentDate + '\n\nIf you have any queries, please do not hesitate to get in touch.\n\nAll the best\n' + userName);
                
   //THE FORM       
  const form = CardService.newCardSection()
              .addWidget(email)
              .addWidget(sender)
              .addWidget(subject)
              .addWidget(emailContent);
              
  //THE CARD      
  const card = CardService.newCardBuilder()
              .setHeader(CardService.newCardHeader()
                  .setTitle('Send Email'))
              .setFixedFooter(fixedFooter)
              .addSection(form);
              
  return card.build();
}

function send(e) {
  const formInputs = e.formInputs;
  Logger.log(formInputs)
  const recipient = formInputs.Email[0];
  const subject = formInputs["Subject"][0];
  const body = formInputs["Email Body"][0];
  
  GmailApp.sendEmail(recipient, subject, body, {
        htmlBody:
          '<html style="font-family: fixed width, arial; font-size: 12px;">' +
            '<div>' +
              '<p style="white-space: pre-line">' + body + '</p>' +
              '<img src="https://www.podogo.com/wp-content/uploads/2019/07/Podogo_Long_Black_LS.png" style="width: 200px; margin-left: 10px" />' +
              '<p style="font-size: 11px; margin-left: 10px;"><strong>A:</strong> 17 Harley Street, London W1G 9QH</p>' +
              '<div>' +
                '<a href="https://www.facebook.com/PodogoLondon/"><img src="https://www.londonfootandanklesurgery.co.uk/wp-content/uploads/2020/05/Facebook-Black.png" style="margin-left: 10px;" /></a>' +
                '<a href="https://www.instagram.com/podogo_london/"><img src="https://www.londonfootandanklesurgery.co.uk/wp-content/uploads/2020/05/Instagram-Black.png" style="margin-left: 10px;" /></a>' +
                '<a href="https://twitter.com/podogo_london"><img src="https://www.londonfootandanklesurgery.co.uk/wp-content/uploads/2020/05/Twitter-Black.png" style="margin-left: 10px;" /></a>' +
              '</div>' +
            '</div>' +
          '</html>', 
       attachments: [DriveApp.getFileById(e.parameters.itemId).getAs(MimeType.PDF)]
        })
        
  return onHomepage()
}
