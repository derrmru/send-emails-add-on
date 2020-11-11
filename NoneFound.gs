function noneFound() {

  const sWidget = CardService.newTextParagraph().setText('This patient wasn\'t found please check name and date of file title.')

  const section = CardService.newCardSection().addWidget(sWidget);

  const noneCard = CardService.newCardBuilder()
              .setHeader(CardService.newCardHeader()
                  .setTitle('No Patient Details Found'))
              .addSection(section);
      
  return noneCard.build();
}