import { useContext, useState } from "react";
import { UserContext } from './UserContext';
import axios from "axios"




function Unos() {
    const { userRole } = useContext(UserContext);
    const [novaZivotinja, setNovaZivotinja] = useState
        ({
            id: "",
            ime: "",
            vrsta: "",
            cip: false,
            godine: "",
            opis: "",
            pregled: "",
            udomljen: false
        });

    function promjenaUlaza(event) {
        const { name, value } = event.target;
        setNovaZivotinja({ ...novaZivotinja, [name]: value });

    }

    function obradiPodatke(objekt) {
        return {
            "ime": objekt.ime,
            "vrsta": objekt.vrsta,
            "cip": objekt.cip,
            "godine": objekt.godine,
            "opis": objekt.opis,
            "pregled": objekt.pregled,
            "udomljen": objekt.udomljen
        }
    }
    function changeCip() {
        setNovaZivotinja({ ...novaZivotinja, cip: !novaZivotinja.cip })
    }

    const unesiNovuZivotinju = event => {
        event.preventDefault();
        console.log(novaZivotinja);

        const zaSlanje = obradiPodatke(novaZivotinja)

        axios.post('http://localhost:3001/zivotinje', zaSlanje)
            .then(rez => console.log(rez))
    };

    return (
        <div>
            {userRole == "user" ? <p>Trebate biti admin za pristup ovoj stranici</p>
                :
                <div className="input-forma-zivotinja">
                    <form onSubmit={unesiNovuZivotinju}>
                        <div className="input-forma-lijevo">
                            <label> Ime:
                                <input name="ime" onChange={promjenaUlaza} required type="text"></input>
                            </label>

                            <label> Macka
                                <input onChange={promjenaUlaza} type="radio" id="macka" name="vrsta" value="macka" />
                            </label>
                            <label> Pas
                                <input onChange={promjenaUlaza} type="radio" id="pas" name="vrsta" value="pas" />
                            </label>

                            <label> Godine
                                <input onChange={promjenaUlaza} name="godine" required type="number"></input>
                            </label>
                            <label> Opis
                                <input onChange={promjenaUlaza} name="opis" type="text"></input>
                            </label>
                        </div>
                        <div className="input-forma-desno">
                            <label> Cipiran
                                <input onChange={changeCip} name="cip" type="checkbox"></input>
                            </label>
                            <label>Datum pregleda:
                                <input type="date" name="pregled" onChange={promjenaUlaza} pattern="\d{4}-\d{2}-\d{2}"></input>

                            </label>

                        </div>

                        <button type="submit">Spremi</button>
                    </form>
                </div>
            }
        </div>
    );





}

export default Unos;