import React from 'react'

export default function ButtonMenu ({
    name,
    buttonType = "carré" || "rectangleHoriz" || "rectangleVerti",
    onClick = () => {},
  }) {

let btnForme = ""
if (buttonType === "carré"){
    btnForme = "carré"
}
if (buttonType === "rectangleHoriz"){
    btnForme = "rectangleHoriz"
}
if (buttonType === "rectangleVerti"){
    btnForme = "rectangleVerti"
}
if (buttonType === "connexion"){
    btnForme = "connexion"
}

    return (
        <div className="btn-menu"> 
            <button className={`btn-menu-all ${btnForme}`} onClick={onClick} type="button">
                {name}
            </button>
        </div>
    );
}
