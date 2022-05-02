function NamensKomponente() {
                return (
                    <i>Welt</i>
                )
            }


function AusgabenKomponente(props){
    return (
        <h1 id="erster">Hallo <NamensKomponente />, {props.name}</h1>
    )
}
ReactDOM.render(<AusgabenKomponente name="Test" />,document.getElementById("root"))
