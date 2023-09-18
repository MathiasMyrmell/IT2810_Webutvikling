# Dokumentasjon

## Kjøre lokalt eller server
Clone repo og kjør `npm install` og `npm start`. Eller trykk her http://it2810-30.idi.ntnu.no/project2 (URLen du putter inn skal være lenken til startsiden av prosjektet deres på GitLab. Altså ikke bare bytt på tallene på eksempellinken vi skrev på nettsiden. Kopier direkte fra URLen til startsiden deres.).


## Innhold og funksjonalitet
For dette prosjektet hadde vi en single page application med flere "sider". Dette gjorde vi med React Router. På nettsiden har vi en front page, en side for commits og en side for issues. På denne måten hadde vi nok sider til å fordele alt av krav og funksjonalitet på en fornuftig måte. Dette gjorde det også relativt enkelt å få en responsiv side, siden vi ikke hadde altfor mange elementer på hver side.

Vi brukte HTML Web Storage til å lagre URLen og tokenen som blir oppgitt, slik at brukeren ikke trengte å oppgi denne informasjon på hver side. URLen er lagret med localStorage, men vi har lagt til en knapp der brukeren kan velge en ny URL. Tokenen ønsker vi ikke å lagre permanent, dermed bruke vi sessionStorage for denne dataen. Resultatet av dette er at nettsiden husker URLen til repoet til neste gang, men brukeren må fortsatt kunne oppgi tokenen for å få tilgang. Det vi likte med HTML Web Storage var at det fungerte som en global variabel, noe som var nyttig fordi vi trengte å dele URLen og tokenen på en lettvindt måte.

Et av kravene var å implementere interaktiv presentasjon av dataen. Tabellen som viser commits har muligheten til å bli sortert og man kan også søke i commits meldingene.

## Teknisk krav

#### Bruk av React
React har to typer komponenter, funksjonelle og klasser. Opprinnelig hadde funksjonelle og klasser sine egne bruksområder. Etter at React la til hooks, så har funsjonelle komponenter fått mye av samme funksjonalitet som klasse komponenter. Den største endringen var at funksjonelle komponenter nå kunne ha states. Dermed har det blitt vanlig å primært bruke klasse komponenter. Siden det var krav om å bruke klasse komponenter minst én gang, valgte vi å implementere navbaren som klasse komponent. 

Hovedkomponentene våre er Home, Commits, Issues og Navbar. Commmits-komponentet har en "child component" kalt VerticalBar. Her var det hensiktsmessig å lage et nytt komponent, siden vi bruker VerticalBar til å lage grafer to ganger. Issues-komponentet har en "child component" kalt IssuesList. Et av kravene var å bruke Context API for å dele data. Dette valgte vi å gjøre i Issues og IssuesList. IssuesList tar imot en context med data om issues og skiller mellom Open og Closed issues. Vanligvis hadde vi implementert dette med props og ikke context, da som context er mest brukt til å sende data gjennom flere nivåer.

Med React er det også vanlig å bruke UI-komponenter fra eksterne biblioteker. Dette har vi gjort ved importere grafer fra react-chartjs-2.

#### GitLab Rest API og AJAX
Vi brukte Rest API for å hente data fra GitLab. Vi brukte `fetch()` for å hente data fra gitlab. Vi brukte `async` og `await` i react funskjonene for å vente til at dataen var hentet før resten av koden ble kjørt, slik at det ikke ble feilmedldinger. Dataen ble hentet med `fetch()` hver gang komponentet ble mounted. For Home-komponentet brukte vi `fetch()` for å sjekke at URLen og tokenen var gyldig, mens Commits og Issues hentet data fra hver sin URL.

#### Responsiv Design
For responsiv design har vi for det meste brukt media-queries. For små skjermer brukte vi en bredde på 1200px. Ved denne bredden begynner tabeller og grafer å fylle mer av siden. Dette gjør vi ved å gi tabeller og grafer en bedre som skalerer med hensyn på vindusstørrelsen. Vi har også definert en mindre media-query på 512px som tar hånd om mobilskjermer. Her begynner navbarelementene å ligge vertikalt i stedet for horisontalt, noe som vil være en god løsning for mobiler. Vi har også en flytende layout når det gjelder tabllene i Issues og grafene i Commits, slik at de går under hverandre når det ikek er nok plass i bredden. Dette gjorde vi med css-flexbox. Ettersom prosjekttemplaten er generert av create-react-app så fikses meta-tagger med viewport automatisk i HTML-headen. Utenom det valgte vi ikke å gjøre noen endringer med viewport da vi følte media-queries dekket det meste av responsiv design behov.

#### Alle andre krav som er fylt
- HTML Web Storage - både localstorage og sessionstorage
- Typescript
- Versjon 16.X av node.js og versjon 8.X av npm
- Bruk create-react-app xxx --template typescript for å sette opp prosjektet
- Versjon 18 av React

#### Kjøring på Apache Virtual Machine
Ettersom denne React-applikasjonen bruker flere undersider med BrowserRouter, kreve Apache-serveren ekstra konfigurasjon. Dette ettersom Apache vil søke etter undersider i mappestrukturen, og ikke la React håndtere routingen. For å fikse dette måtte 'AllowOverride' endres fra 'None' til 'All' i Apachekonfigurasjonsfilen, og en egen .htaccess fil måtte brukes til å redirigere ukjente filbaner til React sin standard index.html.

## Testing

#### Jest
I prosjektet bruker vi Jest for å teste at nettsiden fungerer, da primært snapshot-tester på samtlige komponenter for å sjekke at disse elementene tegnes etter hensikt. Endringer på komponentene vil dermed føre til at testene feiler, og man må da oppdatere snapshottene for å sikre at testene gir riktig resultat. Videre tester man også at eksempelvis grafer tegnes riktig med gitte props som input. Kjør `npm test` hvis du vil teste.

#### Testing av ulike 3 enheter
Nettsiden er designet med hensyn på stor skjerm, så naturligvis funker nettsiden på enheter med stor skjerm. I nettlesere er det mulig å vise nettsiden med ulike enheter For mobiler valgte vi å teste med iPhone SE. For både horisontal og vertikal orientering var nettsiden funksjonell og leselig. Vi prøvde andre mobilenheter og de funket også.

#### Browser testing
Under utvikling av nettsiden brukte vi mye nettleseren Google Chrome. Dermed valgte vi å teste nettsiden på FireFox og Microsoft Edge. Utseendet og funksjonaliteten var likt på de ulike nettleserene, men vi opplevde problemer når det gjaldt rendering av nettsiden. Før dataen blir hentet med `fetch()` renderet vi bare en tom nettside for Issues og Commits. I Chrome var dette ikke et problem, men vi opplevde at FireFox brukte mye lenger tid på å hente dataen, og dermed var nettsiden vår blank mye lenger. Derfor valgte vi å lage en enkel loading screen, slik at brukeren ikke tror at nettsiden har kræsjet.

## Bruk av Git og kode
Vi brukte tid på å forstå hvordan netsiden skulle se ut og bruke REST APIet. Derfor ble Issues opprettet under veis som netsiden tok form, som førte til at ikke alle commits på starten refererte til en Issue. Utenom det har vi brukt branches for å kunne samarbeide på prosjektet. Selve koden synes vi selv er for det meste forståelig og for den delen av koden som er litt mer avanserte så har vi prøvd å kommentere slik at det blir forståelig.

## Kilder
- https://www.youtube.com/watch?v=Xhg-0mqxngA&t=1s&ab_channel=Andy%27sTechTutorials: Brukte denne videoen for å få mer forståelse til å starte med å fetche fra GitLab.
- https://bobbyhadz.com/blog/javascript-get-all-dates-between-two-dates: Brukte denne koden for å finne alle datoer mellom første commit og siste commit slik at vi kunne representere dette i grafen som labels.
- https://www.w3schools.com/css/tryit.asp?filename=trycss_table_fancy: Brukte mye av dette for CSSen til tabellene.
- https://www.w3schools.com/css/tryit.asp?filename=trycss_forms: Brukte mye av dette for CSSen til input, select og button.

