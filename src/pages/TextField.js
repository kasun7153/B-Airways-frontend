import React from 'react'
import {ErrorMessage, useField} from "formik"


function TextField({label,...props}) {
    const [field,meta]=useField(props)

    return (
        <div className='w-full'>
            
            {field.name==="birthday"? 
            <input {...field} {...props} type="text" placeholder="Birthday" onFocus={(e) => e.target.type = 'date'} className={`w-full py-1 px-2 rounded bg-blue-50 inline-block border-2 ${meta.touched && meta.error ?"border-red-500":"border-blue-900"}`}  />
            :
            
            <input {...field} {...props} 
            className={`w-full py-1 px-2 rounded bg-blue-50 inline-block border-2 ${meta.touched && meta.error ?"border-red-500":"border-blue-900"}`}/>}
            
        <ErrorMessage name={field.name} component="div" className="text-red-500 text-left"/>
        </div>
    )
}

export default TextField
