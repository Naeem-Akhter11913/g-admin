import { CImage } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import PreviewImageModal from './PreviewImageModal';
import Swal from 'sweetalert2';

const ImageShow = ({ images, name, setProduct, removeImageFieldState }) => {

    const [img, setImg] = useState([]);
    const [visible, setVisible] = useState(false)
    const [imageURLs, setImageURL] = useState(null)


    useEffect(() => {
        if (images && !Array.isArray(images)) {
            setImg([{ name, url: images.startsWith("blob:") ? URL.createObjectURL(images) : images }]);
        }

        if (images && Array.isArray(images)) {
            let imageURL = images.map(file => {
                return { name, url: file.startsWith("blob:") ? URL.createObjectURL(file) : file }
            });
            setImg([...imageURL]);
            return () => URL.revokeObjectURL(imageURL);
        }

        if (!images) {
            setImg([]);
        }
    }, [images]);

    const confirmDelete = (index, name) => {
        setProduct(prev => {
            if (Array.isArray(prev[name])) {
                const updatedImages = prev[name].filter((_, i) => i !== index);
                removeImageFieldState(index, name)
                return { ...prev, [name]: updatedImages };
            } else {
                removeImageFieldState(null, name)
                return { ...prev, [name]: '' };
            }
        });
    }

    const deleteImage = (index, name) => {

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "rgb(28 60 91)",
            cancelButtonColor: "rgb(112 20 20)",
            confirmButtonText: "Yes, delete it!",
            background: '#212631'
        }).then((result) => {
            if (result.isConfirmed) {
                confirmDelete(index, name);
            }
        });


    }

    return (
        <div className='d-flex'>
            {img && img.map(({ url, name }, index) =>
                <div key={index} className='d-flex' style={{ position: "relative", }}>
                    <p
                        className='z-3 text-danger'
                        style={{
                            position: "absolute",
                            top: "0px",
                            right: "5px",
                            cursor: "pointer",
                            margin: 0,
                            padding: 4
                        }}
                        onClick={() => deleteImage(index, name)}
                    >X</p>
                    <CImage onClick={() => {
                        setVisible(!visible);
                        setImageURL(url)
                    }}
                        rounded thumbnail src={url} width={50} height={50} />
                </div>
            )}

            <PreviewImageModal visible={visible} setVisible={setVisible} imageURL={imageURLs} />
        </div>
    )
}

export default ImageShow