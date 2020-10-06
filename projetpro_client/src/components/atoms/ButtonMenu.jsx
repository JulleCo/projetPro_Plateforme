import React from 'react'

export default function ButtonMenu ({
    name,
    buttonType = "carré" || "rectangleHoriz" || "rectangleVerti",
    onClick = () => {},
  }) {

let btnForme = ""
if (buttonType === "carré"){
    btnForme = "-carré"
}
if (buttonType === "rectangleHoriz"){
    btnForme = "-rectangleHoriz"
}
if (buttonType === "rectangleVerti"){
    btnForme = "-rectangleVerti"
}


    return (
        <div className="btn-menu"> 
            <button className={`btn-menu${btnForme} btn`} onClick={onClick} type="button">
                {name}
            </button>
        </div>
    );
}
