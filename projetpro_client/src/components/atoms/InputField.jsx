import React from 'react'

export function InputField({
    type="",
    name="",
    id="",
    value="",
    onChange= () => {},
}) {
    

    return (
            <input className="input" type={type} name={name} id={id} value={value} onChange={onChange}/>
    )
}
