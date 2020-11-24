import React from 'react'

const InputImage = ({setImageFn, setPreviewImageFn, id}) => {
      return (
            <input 
                  name={id} 
                  id={id} 
                  type='file' 
                  style={{
                        width: '0.1px',
                        height: '0.1px',
                        opacity: '0',
                        overflow: 'hidden',
                        position: 'absolute',
                        zIndex: '-1'
                  }}
                  onChange={e => {
                        setImageFn(e.target.files[0]) 
                        setPreviewImageFn &&
                        setPreviewImageFn(URL.createObjectURL(e.target.files[0]))
                  }}
            />
      )
}

export default InputImage
