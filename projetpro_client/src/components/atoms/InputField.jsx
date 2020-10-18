import React from 'react'

export function InputField({
    type="",
    name="",
    id="",
    value="",
    onChange= () => {},
    disabled= Boolean,
}) {
    

    return (
            <input className="input" type={type} name={name} id={id} value={value} onChange={onChange}/>
    )
}
