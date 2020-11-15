import React from 'react'

export function InputField({
    type="",
    name="",
    id="",
    value="",
    onChange= () => {},
    disabled= Boolean,
    placeholder="",
}) {
    

    return (
            <input className="input" type={type} name={name} placeholder={placeholder} id={id} value={value} onChange={onChange}/>
    )
}
