import { useState } from "react";
import axios from "axios"
import { UserContext } from './UserContext';
import { useContext, useEffect } from "react";



function Obavijesti() {

    const current = new Date();
    const date = `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`;

    const { userRole } = useContext(UserContext);
    const [idCounter, setIdCounter] = useState();
    const [pokaziFormu, setPokaziFormu] = useState(false);
    const [listaObavijesti, setListaObavijesti] = useState([]);
    const [obavijesti, setObavijesti] = useState
        ({
            id: "",
            naslov: "",
            datum: "",
            tekst: "",
            vazno: false,

        });

    useEffect(() => {
        axios
            .get("http://localhost:3001/obavijesti/")
            .then(res => setListaObavijesti(res.data));
    }, []);

    function checkboxChange() {
        setObavijesti({ ...obavijesti, vazno: !obavijesti.vazno })

    }


    const writeData = event => {
        event.preventDefault();
        console.log(obavijesti);
        setObavijesti({ ...obavijesti, datum: date })

        const zaSlanje = obradiPodatke(obavijesti)

        axios.post('http://localhost:3001/obavijesti', zaSlanje)
            .then(rez => console.log(rez))
        axios
            .get("http://localhost:3001/obavijesti/")
            .then(res => setListaObavijesti(res.data));
    };

    function promjenaUlaza(event) {
        const { name, value } = event.target;
        setObavijesti({ ...obavijesti, [name]: value });

    }

    function obradiPodatke(objekt) {
        setIdCounter(idCounter + 1)
        return {
            "naslov": objekt.naslov,
            "datum": objekt.datum,
            "tekst": objekt.tekst,
            "vazno": objekt.vazno

        }
    }
    function novaObavijestForma() {
        setPokaziFormu(!pokaziFormu)
    }

    async function obrisiObavijest(e) {
        await axios.delete(` http://localhost:3001/obavijesti/${e.target.id}`);
        const rezultat = await axios.get("http://localhost:3001/obavijesti");
        setListaObavijesti(rezultat.data);

    }
    return (
        <div>
            <button onClick={novaObavijestForma}>Nova obavijest</button>
            {
                pokaziFormu &&
                <form onSubmit={writeData}>
                    <div>
                        <label>
                            Naslov
                            <input
                                type='text'
                                name='naslov'
                                maxLength="20"
                                value={obavijesti.naslov}
                                onChange={promjenaUlaza}
                                required
                            />
                        </label>
                        <label>
                            Obavijest:
                            <textarea minLength="10" maxLength="200"
                                name="tekst"
                                value={obavijesti.tekst}
                                onChange={promjenaUlaza}
                                required>
                            </textarea>
                        </label>
                        {userRole == "admin" &&
                            <label> Vazno
                                <input name="vazno" value={obavijesti.vazno
                                } onChange={checkboxChange} type="checkbox"></input>
                            </label>
                        }
                    </div>
                    <button type='submit' >Spremi</button>
                </form>
            }
            <div className="sve-obavijesti">

                {
                    listaObavijesti.map(e => (
                        <div key={e.id} className="kartica-obavijesti">
                            {e.vazno ? <div className="obavijest-title-pane-vazno">
                                <p> {e.naslov}</p>
                                {e.vazno == true && <h3>VAZNO</h3>}
                                <p>{e.datum}</p>
                            </div> : <div className="obavijest-title-pane">
                                <p> {e.naslov}</p>
                                {e.vazno == true && <h3>VAZNO</h3>}
                                <p>{e.datum}</p>
                            </div>

                            }

                            <p>{e.tekst}</p>

                            {userRole == "admin" && <button className="botun-brisanje" id={e.id} onClick={obrisiObavijest}>Obriši</button>}
                        </div>
                    ))

                }
            </div>



        </div >
    );
}

export default Obavijesti;