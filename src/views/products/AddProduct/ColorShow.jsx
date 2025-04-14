import React, { useEffect, useState } from 'react'

const ColorShow = ({ colorArray , setProduct }) => {
    const [color,setColor] = useState([]);
    const deleteColor = index => {
        const updateColor = colorArray.split(",").filter((_,i) => i !== index)
        setProduct(pre => ({...pre, ['color']:updateColor.join(',')}));
    }

    useEffect(() =>{
        if(colorArray && !Array.isArray(colorArray)){
            setColor(colorArray.split(','))
        }
    },[colorArray])

    return (
        <div className="d-flex gap-2">
            {color.filter(item => item.length > 0).map((color, index) => (
                <div
                    key={index}
                    style={{
                        height: "30px",
                        width: "30px",
                        borderRadius: 4,
                        backgroundColor: color,
                        position: "relative",
                    }}
                >
                    <p
                        style={{
                            position: "absolute",
                            top: "-10px",
                            right: "0px",
                            cursor: "pointer",
                            margin: 0,
                            padding: 4
                        }}

                        onClick={() => deleteColor(index)}
                    >
                        x
                    </p>
                </div>
            ))}
        </div>

    )
}

export default ColorShow