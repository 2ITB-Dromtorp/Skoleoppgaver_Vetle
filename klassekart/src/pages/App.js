import '../App.css';
import { useNavigate } from 'react-router-dom';

export let Elever = [
  {fornavn: "Matheo", etternavn: "Kant Pangopoulos", epost: "matheop@viken.no", klasse: "2ITB", fellesfaggruppe: "2IM2"},
  {fornavn: "Elias", etternavn: "Høgrann Godager", epost: "eliasgod@viken.no", klasse: "2ITB", fellesfaggruppe: "2IM1"},
  {fornavn: "Johannes", etternavn: "Hermann Rebård Evensen", epost: "johanneeve@viken.no", klasse: "2ITB", fellesfaggruppe: "2IM1"},
  {fornavn: "Theodor", etternavn: "Julien-Løvås", epost: "theodorju@viken.no", klasse: "2ITB", fellesfaggruppe: "2IM2"},
  {fornavn: "Gabriel", etternavn: "Karisari Ueland", epost: "gabrielu@viken.no", klasse: "2ITB", fellesfaggruppe: "2IM2"},
  {fornavn: "Kristoffer", etternavn: "Bekkevold", epost: "kristofbek@viken.no", klasse: "2ITB", fellesfaggruppe: "2IM1"},
  {fornavn: "Vetle", etternavn: "Fongen", epost: "vetlefon@viken.no", klasse: "2ITB", fellesfaggruppe: "2IM1"},
  {fornavn: "Axel", etternavn: "Sequeidia Sandbakken", epost: "axelsan@viken.no", klasse: "2ITB", fellesfaggruppe: "2IM2"},
  {fornavn: "Philip", etternavn: "Beyer", epost: "philipbey@viken.no", klasse: "2ITB", fellesfaggruppe: "2IM1"},
  {fornavn: "Silas", etternavn: "Surland-Fjær", epost: "silass@viken.no", klasse: "2ITB", fellesfaggruppe: "2IM2"},
  {fornavn: "Alva", etternavn: "Cecilia Øvrom", epost: "alvaov@viken.no", klasse: "2ITB", fellesfaggruppe: "2IM1"},
  {fornavn: "Mattis", etternavn: "Eintveit Møller", epost: "mattismol@viken.no", klasse: "2ITB", fellesfaggruppe: "2IM1"},
  {fornavn: "Ahmad", etternavn: "Murtaza Zahid", epost: "ahmadza@viken.no", klasse: "2ITB", fellesfaggruppe: "2IM1"},
  {fornavn: "Andreas", etternavn: "Hurlen Kristiansen", epost: "andreashkr@viken.no", klasse: "2ITB", fellesfaggruppe: "2IM2"}
]

function App() {
  const navigate = useNavigate();
  return (
    <div className="App">
      <header className="App-header">
        <button onClick={() => navigate('/classlist')}>Til klasseliste</button>
        <button onClick={() => navigate('/classmap')}>Til klassekartet</button>
      </header>
    </div>
  );
}

export default App;
