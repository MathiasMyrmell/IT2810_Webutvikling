# Dokumentasjon
## Kjøre lokalt eller server
Clone repo og kjør `npm install` i både frontend og backend mappene. Deretter åpner du en ny terminal og kjører `cd frontend` og `npm start`. Hvis du har problemer med importing av @material-ui/core, kjør `npm install @material-ui/core --force`.

Hvis du har lyst å teste backenden, må du kjøre `cd backend` og `node index.js`. Deretter åpner du en ny terminal og kjører `cd frontend` og `npm start`. Til slutt må du også gå i `index.ts` for å kommentere ut linje 12 og "ukommentere" linje 11 for å kunne bruke localhost.

Hvis du ikke vil kjøre lokalt, trykk her http://it2810-30.idi.ntnu.no/project3. Husk VPN hvis du ikke er på eduroam!


## Innhold og funksjonalitet
Vi har laget en nettside der man kan finne oppskrifter og lage sine egne oppskrifter. På selve nettsiden finnes det et søkefelt for å kunne søke på titlene til oppskriftene. Man kan også filtrere basert på hvilke ingredienser man ønsker å ha med. Det er også mulighet til å sortere oppskriftene alfabetisk. Oppskriftene blir presentert som en liste, der man har mulighet til å trykke på en oppskrift for å se hvilke ingredienser den består av, og hva framgangsmåten er. Vi har brukt pagination for å kunne håndtere data på en ryddig måte. Under "Make recepies" kan man legge til egne oppskrifter, med ingredienser og framgangsmåte. 


## Stack og database
I dette prosjektet har vi brukt GRAND (GraphQL, React, Apollo, Neo4j Database) som stack. GraphQL gjør at man slipper å hente store sett med resultater ved gjennomføring av queries, og at man heller kan hente kun den dataen man trenger. Videre håndterer Apollo state management for GraphQL-dataene, samt backend forespørseler og svar. Databasen er hostet med Neo4j, som blandt annet også fører til at grunneleggende spørringer og mutasjoner kan brukes ganske enkelt. Eksempelvis henter vi oppskrifter, ferdig sortert og filtrert, ved å generere queries med følgende funksjon:

<img src="query.png" alt="Kode for databasespørring for oppskrifter." width="600" />
<br>

Disse kan da hentes ved å bruke useQuery-hooken. Videre kan man legge til nye oppskrifter med useMutation-hooken, hvor vi da definerer mutasjonene med følgende funksjon:

<img src="mutation.png" alt="Kode for å lage en mutasjon til å lage ny oppskrift." width="600" />
<br>


## Global state management
I React er det lett å sende verdier til "child components" med props. Men hvis man skal dele verdier til komponenter på samme nivå eller høyere nivå, er det smart å bruke en løsning for global state management. Vi hadde lyst å lære oss teknologien som er mest relevant. Derfor valgte vi å bruke Redux, på grunn av dens populæritet.


## Biblioteker
Her valgte vi å bruke Material UI for mange av komponentene. Dette er et bibliotek med komponenter som skal gjøre det lettere å designe brukergrensesnittet. Mye av nettsiden vår baserer seg på Material UI komponenter, blant annet oppskriftslisten, pagination og ulike "forms"-elementer. For det meste var det greit å bruke Material UI. Vi slet noen ganger med ulike imports og ulike versjoner, men ellers var det en positiv opplevelse.


## Universell utforming
For denne nettsiden har vi gjort flere tilpasninger for at webinnholdet skal være tilgjengelig for alle.

#### Synsproblemer
Her er det flere ting man må ta hensyn til. Det aller første vi tenkte på var valg av farger. Dette er viktig for å skape kontrast slik at det er lett å lese tekst og skille mellom objekter på nettsiden. Vi brukte en "color picker" som tar hensyn til hvilket farge teksten bør være med tanke på bakgrunnsfargen (https://m2.material.io/resources/color/#!/?view.left=1&view.right=0).

Deretter måtte vi ha et design som støtter skjermlesere. For å gjøre dette lastet vi ned skjermleserextension på Chrome for å teste dette. Alt var det for det meste bra bortsett fra oppskriftsboksene. Opprinnelig hadde vi bare en knapp med tekst for å kunne åpne oppskriftene, men skjermleseren klarte ikke å lese hva som sto på knappen. Derfor har oppskriftene nå en egen seksjon for tittel og en annen seksjon som fungerer som en knapp.

Det er også viktig at teksten og nettsiden er skalerbar. Her har vi vært opptatt med å lage et responsiv design slik at nettsiden fortsatt fungerer hvis man ønsker å zoome inn.

#### Hørsel
Nettsiden vår inneholder ikke lyder eller videoer. Dermed var det ikke noe vi trengte å gjøre her.

#### Motorikk
For motorikkdelen var det aller viktigste at all funksjonalitet er tilgjengelig med tastatur. Dette har vi testet manuelt. Navigasjonsbaren, søkeboksen, oppskriftene, inputsene i lag oppskrift-siden og "pagination-delen" er tilgjengelig ved å bare bruke "tab" og "tab+shift". Man vet også alltid hvor man befinner seg med hjelp av overskrifter og highlighting med farge på sidetallet man er på.

#### Kognisjon
Designet vårt er relativt simpelt og dermed også forståelig. De viktigste elementene skiller seg ut, som søkeboksen og oppskriftene. Når man skal lage oppskrifter får man også tilbakemelding på om oppskriften er lagt til på nettsiden eller om noe informasjon mangler.

#### Validering av tilgjengelighet
Her har vi brukt axe DevTools for å sjekke hvor tilgjengelig nettsiden vår er. Opprinnelig hadde vi 40 problemer som ble automatisk detektert av axe DevTools. Mye av dette gikk på å enten legge til labels på formelementer, sette på attributet "role", eller bruke alternativer til div-elementer der det var mulig. Etter disse endrinene klarte vi å fjerne alle disse problemene. Axe DevTools anbefalte også ta en vurdering på fargene vi har brukt og fargekontrastene mellom elementer. Som tidligere nevnt har vi brukt tatt hensyn til dette med hjelp av en "online color" picker (https://m2.material.io/resources/color/#!/?view.left=1&view.right=0).



## Bærekraftig web design
Her har vi gjort flere valg for å gjøre nettsiden mer bærekraftig. Hvilke farger man bruker har mye å si når det gjelder bærekraft. Lyse farger bruker mer energi enn mørke farger. Derfor valgte vi å ha en nettside som for det meste er mørk, sammen med at vi bare har en ekstra farge utenom svart og hvit. Vi har også bevisst valgt å ikke ha bilder, videoer og GIFs på nettsiden for å redusere energiforbruket. Blant annet unngikk vi å bruke datasett som inneholdt bilder. Å redusere datatrafikken er også viktig for å redusere energibruken. Med GraphQL henter vi bare 10 oppskrifter om gangen.


## Testing
Vi har gjort enhetstesting på RecipeMaker komponentet. Blant annet testet vi:
- Rendering
- Input fylling
- Riktig oppførsel etter vi legger til ingredienser
- Oppførsel når man prøver å legge til oppskrift uten gyldig informasjon

Når brukeren legger til informasjon så blir det lagt inn i GraphQL queries. Hvis stringen man legger til inneholder f.eks. `"` eller `\`, kan det skape syntaxfeil. Derfor har vi en saniteringsfunksjon som fjerner ugyldig tegn. Dette er en ren funksjon som kun returner en verdi og ikke endrer på noe andre plasser. Denne funksjonen ville vi teste også.

I tillegg til alt dette har vi med snapshot tester for å forsikre oss om at det ikke skjer uforutsette endringer i brukergrensesnittet. Herunder tester vi DOM/HTML-renderingen av App- og Home-componentene. I sistnevnte snapshottest lages en mock av graphql spørringresultater, i stedet for å hente result fra databasen. Dette er nyttig all den tid databasekoblingen ikke alltid er tilgjengelig, og man alikevel ønsker å sjekke at siden/komponenten ser elementmessig riktig ut.

For å kjøre testene selv, kjør `cd frontend` og `npm test`.

### End2End testing
Vi har brukt Cypress til End2End testing, video av testene kan sees her: 
<br>
![](frontend/cypress/videos/todo.spec.ts.mp4)
<br>
Vi har testet følgende funksjonalitet:
- Åpne nettsiden
- Søkefunksjonen
- Click på oppskrift for å se detaljer
- Click for å lukke detaljer på oppskrift
- Huk av ingrediens for å se oppskrifter med valgt ingrediens
- Navigasjon til "Make recipe" siden
- Feilmelding ved manglende input i "Make recipe" siden
Vi valgte å ikke teste lag oppskrift siden ved gjentatte tester vil det oppstå duplikater i databasen. Vi valgte heller å teste dette manuelt.

For å kjøre end2end testene selv, kjør `cd frontend` og `npx cypress open`. Husk å ha frontenden kjørende!

## Git
Med Git har vi delt opp oppgaven i issues. Når det gjelder commit-meldinger, har vi prøvd å referere til issues med nummer der det er mulig.



