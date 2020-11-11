//HOMEPAGE CARD
function onHomepage(e) {

  const user = Session.getActiveUser().getEmail();
  const userName = user.split('@')[0];
  userName = userName.substr(0, 1).toUpperCase() + userName.slice(1).toLowerCase();

  const textParagraph = CardService.newTextParagraph()
        .setText( 'Hey ' + userName + ', please select a file in your Drive.');

  const cardSection = CardService.newCardSection()
     .addWidget(textParagraph);
     
  const card = CardService.newCardBuilder()
    .setName("Open")
    .setHeader(CardService.newCardHeader().setTitle("Send Patient Letters"))
    .addSection(cardSection)
    .build();

  return card;
}