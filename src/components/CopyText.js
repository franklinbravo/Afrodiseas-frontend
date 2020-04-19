const copy = (input) => {
    let aux = document.createElement("input");
    aux.setAttribute("value", input);
    document.body.appendChild(aux);
    aux.select();
    document.execCommand("copy");
    document.body.removeChild(aux);
}
export default copy;