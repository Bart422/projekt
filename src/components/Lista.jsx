import axios from "axios";
import { useState } from "react";
import { UserContext } from './UserContext';
import { useContext, useEffect } from "react";


function Lista() {

    const [lista, setLista] = useState([]);
    const [filterDom, setFilterDom] = useState("all");
    const [filterVrsta, setFilterVrsta] = useState("pas");

    const { userRole } = useContext(UserContext);
    const [zivotinja, setZivotinja] = useState({
        ime: "",
        vrsta: "",
        cip: false,
        godine: "",
        opis: "",
        pregled: "",
        udomljen: true,
        id: ""
    });


    useEffect(() => {
        axios
            .get("http://localhost:3001/zivotinje/")
            .then(res => setLista(res.data));
    }, []);

    function udomi(e) {
        e.target.id
    }
    function urediZivotinju() {
    }

    return (
        <div>
            <div onChange={(e) => (setFilterVrsta(e.target.value))}>
                <label> Macka
                    <input name="vrsta" type="radio" value="macka" ></input>
                </label>
                <label> Pas
                    <input name="vrsta" type="radio" value="pas"></input>
                </label>
                <label> All
                    <input name="vrsta" type="radio" value="all" ></input>
                </label>
            </div>

            <div className="sve-zivotinje-kartica">
                {lista.map(e => (filterVrsta == e.vrsta &&
                    < div key={e.id} className="kartica-zivotinje" >
                        <h2>{e.ime}</h2>
                        <p>Vrsta:{e.vrsta}</p>
                        <p>Udomljen:{e.udomljen ? <p>Da</p> : <p>Ne</p>}</p>
                        <p>{e.opis}</p>
                        {e.udomljen == false && <button id={e.id} onClick={udomi}>Udomi</button>}
                        {userRole == "admin" && <button id={e.id} onClick={urediZivotinju}>Uredi</button>}
                    </div>
                ))}
                {lista.map(e => (filterVrsta == "all" &&
                    < div key={e.id} className="kartica-zivotinje" >
                        <h2>{e.ime}</h2>
                        <p>Vrsta:{e.vrsta}</p>
                        <p>Udomljen:{e.udomljen ? <p>Da</p> : <p>Ne</p>}</p>
                        <p>{e.opis}</p>
                        {e.udomljen == false && <button id={e.id} onClick={udomi}>Udomi</button>}
                        {userRole == "admin" && <button id={e.id} onClick={urediZivotinju}>Uredi</button>}
                    </div>
                ))}


            </div>
        </div >
    )

}

export default Lista;