let gasten = [];
let huidigeTaal = 'nl';

const vertalingen = {
  nl: {
    titel: "Welkom bij de trouwerij van Nataša en Elric",
    invoerPlaceholder: "Voornaam Achternaam",
    knop: "Bekijk je tafelnummer",
    naamNietGevonden: "❌ Naam niet gevonden. Probeer het opnieuw.",
    zitAanTafel: "🎉 Je zit aan tafel",
    samenMet: "Samen met:",
    kiesTaal: "Kies taal",
    vulNaam: "Voer je naam in"
  },
  rs: {
    titel: "Dobrodošli na venčanje Nataše i Elrica",
    invoerPlaceholder: "Ime i Prezime",
    knop: "Pogledaj broj stola",
    naamNietGevonden: "❌ Ime nije pronađeno. Pokušajte ponovo.",
    zitAanTafel: "🎉 Vaš sto je broj",
    samenMet: "Za stolom su:",
    kiesTaal: "Izaberite jezik",
    vulNaam: "Unesite vaše ime"
  }
};

function zetTaal(taal) {
  huidigeTaal = taal;
  const t = vertalingen[taal];

  document.querySelector("h1").textContent = t.titel;
  document.querySelector("input").placeholder = t.invoerPlaceholder;
  document.getElementById("zoekButton").textContent = t.knop;
  document.getElementById("invoerTekst").textContent = t.vulNaam;
  document.getElementById("taalLabel").textContent = \`\${t.kiesTaal} / \${vertalingen[taal === 'nl' ? 'rs' : 'nl'].kiesTaal}\`;
}

fetch('gasten.json')
  .then(response => response.json())
  .then(data => {
    gasten = data;

    const namenlijst = document.getElementById("namenlijst");
    gasten.forEach(g => {
      const optie = document.createElement("option");
      optie.value = \`\${g.Voornaam} \${g.Achternaam}\`.trim();
      namenlijst.appendChild(optie);
    });
  })
  .catch(error => {
    document.getElementById("result").innerHTML = "Kon gastenlijst niet laden.";
  });

function zoekGast() {
  const input = document.getElementById('nameInput').value.trim().toLowerCase();
  const gevonden = gasten.find(g => (\`\${g.Voornaam} \${g.Achternaam}\`.trim()).toLowerCase() === input);

  const resultaat = document.getElementById('result');
  const t = vertalingen[huidigeTaal];

  if (gevonden) {
    const tafel = gevonden.Tafel;
    const tafelgenoten = gasten.filter(g => g.Tafel === tafel);
    const namen = tafelgenoten.map(p => \`\${p.Voornaam} \${p.Achternaam}\`.trim()).join(', ');

    resultaat.innerHTML = \`
      \${t.zitAanTafel} <strong>\${tafel}</strong><br/><br/>
      <strong>\${t.samenMet}</strong><br/>
      \${namen}
    \`;
  } else {
    resultaat.innerHTML = t.naamNietGevonden;
  }
}
