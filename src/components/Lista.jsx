import axios from "axios";
import { useState } from "react";
import { UserContext } from './UserContext';
import { useContext, useEffect } from "react";


function Lista() {

    const [lista, setLista] = useState([]);
    const [filterDom, setFilterDom] = useState("all");
    const [filterVrsta, setFilterVrsta] = useState("all");
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

            <div className="sve-zivotinje-kartica">
                {lista.map(e => (
                    <div key={e.id} className="kartica-zivotinje">
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