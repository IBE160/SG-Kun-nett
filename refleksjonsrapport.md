# Refleksjonsrapport – AI CV & Job Application Assistant

## 1. Innledning

I dette prosjektet skulle vi utvikle en AI-basert assistent som genererer skreddersydde jobbsøknader basert på brukerens CV og en stillingsannonse. Arbeidet fulgte BMAD-rammeverket og inkluderte bruk av Gemini CLI, GitHub, Node.js/Express, React/Vite og AI-modeller.

Denne refleksjonsrapporten beskriver arbeidsprosessen vår, utfordringer, læringspunkter og hva vi ville gjort annerledes.

---

## 2. Arbeidsprosess

### 2.1. Oppstart og init-fasen

I starten brukte vi mye tid på å forstå hvordan Gemini CLI og BMAD-workflowene fungerer. Vi måtte:

- installere Homebrew, Node og Gemini CLI  
- håndtere feil som “Unknown command” og manglende workflow-filer  
- rydde i prosjektstrukturen og sikre riktig kontekst  

Vi lærte hvor sensitivt BMAD-systemet er for riktig mappe, riktig branch og korrekt oppsett. Det var krevende, men ga oss bedre forståelse for verktøykjeden.

---

### 2.2. Planleggingsfasen (Fase 2)

Denne fasen var omfattende og krevde mye analyse. Vi produserte:

- `prd.md` – kravspesifikasjon  
- `epics.md` – EPICs og user stories  
- `ux-design.md` – brukerreiser, flyt, wireframes og designvalg  
- `architecture.md` – teknisk arkitektur og datamodell  
- `timeline.md` – milepælsplan  
- oppdatert valideringsrapport  

UX-delen var spesielt nyttig. AI stilte spørsmål som tvang oss til å konkretisere brukerreisen, fargevalg, layout og funksjonelle behov. Dette gav produktet en tydelig retning før vi skrev kode.

---

### 2.3. Valideringsfasen

BMAD sin PRD-validering avdekket flere mangler:

- user stories måtte vertikalt slices  
- arkitekturen trengte tydeligere detaljer  
- EPICs manglet traceability  

Dette var nyttig fordi det viste viktigheten av strukturert planlegging før implementasjon.

---

### 2.4. Overgang til implementasjon

Da læreren begynte med frontend-design og dashboard-visning i klassen, ble det klart at vi var gått videre til **Fase 3: Implementasjon**. Samtidig foreslo Gemini en 1-ukes MVP-plan, som var en rask og realistisk tilnærming.

Vi lærte betydningen av å prioritere funksjoner og fokusere på kjerneverdien:

> Brukeren skal kunne lime inn CV + stillingsannonse → få en generert søknad.

Dette ble kjernen i MVP-en.

---

## 3. Utfordringer

### 3.1. Teknisk kompleksitet

Vi møtte flere utfordringer:

- Homebrew og sudo-tilgang  
- feilkommander i Gemini pga. feil kontekst  
- workflow-avbrudd  
- mismatch mellom dokumentasjon og reelle filer  

Dette tok tid, men lærte oss hvordan utviklingsmiljøet fungerer.

---

### 3.2. AI-styrt utvikling

Det var uvant å jobbe med et verktøy der:

- AI lager filer  
- AI genererer workflows  
- input må være ekstremt presis  

Vi lærte at AI ikke kan “gjette” seg fram; vi må styre dialogen og gi kontekst. AI fungerer best når strukturen er riktig.

---

### 3.3. Kontekstbytte mellom verktøy

Det krevde mye fokus å holde oversikt over:

- vanlig terminal  
- Gemini CLI  
- VS Code companion  
- BMAD-workflows  
- Git-brancher  

Dette ble etter hvert enklere, men var opprinnelig ganske forvirrende.

---

## 4. Hva vi lærte

### 4.1. God planlegging gir bedre implementasjon

Når PRD, UX, arkitektur og timeline var ferdig, ble det mye lettere å begynne på koden. Vi slapp å gjette, og visste hva som skulle bygges.

### 4.2. Effektiv bruk av AI

Vi lærte:

- hvordan AI kan hjelpe i planlegging  
- hvordan AI kan generere både tekst, filer og kode  
- at presise spørsmål gir bedre resultater  
- at AI ikke erstatter kritisk tenkning  

### 4.3. Fullstack-utvikling i praksis

Vi fikk erfaring med:

- Node.js + Express  
- API-design  
- React/Vite frontend  
- kobling mellom backend og frontend  
- AI-integrasjon  

### 4.4. MVP-tankegang

Den største læringen var å fokusere på hovedfunksjonen først:

> Lever kjernen. Alt annet er “nice to have”.

Dette ga bedre arbeidsflyt og mer fremgang.

---

## 5. Hva vi ville gjort annerledes

1. Satt opp utviklingsmiljøet riktig fra start  
2. Begynt MVP-implementasjonen tidligere  
3. Unngått noe av overplanleggingen BMAD fører til  
4. Vært mer disiplinert med Git-brancher og kontekst  

---

## 6. Konklusjon

Prosjektet har vært krevende, men svært lærerikt. Vi har fått praktisk erfaring med:

- AI-assistert utvikling  
- UX-design og systemarkitektur  
- fullstack webutvikling  
- prosjektstruktur og planlegging  
- moderne AI-verktøy (Gemini, BMAD, CLI)  

Vi sitter igjen med bedre ferdigheter, økt forståelse for AI i utviklingsprosesser, og en klarere idé om hvordan man bygger en MVP raskt og effektivt.

Dette prosjektet har gitt oss erfaringer vi tar med videre både faglig og praktisk.
