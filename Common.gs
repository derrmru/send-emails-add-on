//HOMEPAGE CARD
function onHomepage(e) {

  var user = Session.getActiveUser().getEmail();
  var userName = user.split('@')[0];
  userName = userName.substr(0, 1).toUpperCase() + userName.slice(1).toLowerCase();

  var textParagraph = CardService.newTextParagraph()
        .setText( userName + ', please select a file in your Drive.');

  var cardSection = CardService.newCardSection()
     .addWidget(textParagraph);
     
  var card = CardService.newCardBuilder()
    .setName("Open")
    .setHeader(CardService.newCardHeader().setTitle("Send Patient Letters"))
    .addSection(cardSection)
    .build();
  
  //Logger.log(files + ids)

  return card;
}

function noneFound() {

  var sWidget = CardService.newTextParagraph().setText('No Patient Was Found With These Details.\n\nPlease Try Again.')

  var section = CardService.newCardSection().addWidget(sWidget);
  
  var action = CardService.newAction().setFunctionName('updateProfile')

  var fixedFooter = CardService.newFixedFooter()
            .setPrimaryButton(CardService.newTextButton()
                .setBackgroundColor('#334971')
                .setText("Search Patient")
                .setOnClickAction(action))

  var noneCard = CardService.newCardBuilder()
              .setHeader(CardService.newCardHeader()
                  .setTitle('No Patient Found'))
              .setFixedFooter(fixedFooter)
              .addSection(section);
      
  return noneCard.build();
}
