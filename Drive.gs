function onDriveItemsSelected(e) {
  const itemId = e.drive.selectedItems[0].id;
  const fileTitle = e.drive.selectedItems[0].title.split('.pdf')[0];
  const appointmentDate = fileTitle.split(' ').reverse()[0];
  const sheetTitle = appointmentDate + ' LFC';

  //find clinic list
  const matchingFiles = DriveApp.getFilesByName(sheetTitle);
  let fileId;
  while (matchingFiles.hasNext()){
    const file = matchingFiles.next();
    if (file.getName() === sheetTitle) {
      fileId = file.getId();
    }
  }
  
  //open Clinic list for details
  let patientName;
  let patientEmail;
  
  const sheet = SpreadsheetApp.openById(fileId);
  const lastRow = sheet.getLastRow();
  
  for (let i = 1; i <= lastRow; i++){
    const patient = sheet.getRange('C' + i).getValue();
    if (patient !== '' && fileTitle.indexOf(patient) >= 0) {
      patientName = patient;
      patientEmail = sheet.getRange('G' + i).getValue();
    }
  }
  
  //send to add on card mailer sendEmail
  return sendEmail(patientName, patientEmail, appointmentDate, itemId)
}
