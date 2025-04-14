// import { CImage } from '@coreui/react';
// import React, { useEffect, useState } from 'react';
// import PreviewImageModal from './PreviewImageModal';
// import Swal from 'sweetalert2';

// const ImageShow = ({ images, name, setProduct, removeImageFieldState }) => {
//     const [img, setImg] = useState([]);
//     const [visible, setVisible] = useState(false);
//     const [imageURLs, setImageURL] = useState(null);

//     useEffect(() => {
//         if (!images) return setImg([]);

//         let newImages = [];

//         if (!Array.isArray(images)) {
//             const url = images instanceof File ? URL.createObjectURL(images) : images;
//             newImages = [{ name, url }];
//         } else {
//             newImages = images.map((file) => {
//                 return {
//                     name,
//                     url: file instanceof File ? URL.createObjectURL(file) : file
//                 }
//             });

//         }
//         setImg((prev) => {
//             const combined = [...prev, ...newImages];

//             const unique = combined.reduce((acc, current) => {
//                 if (!acc.find(item => item.url === current.url)) {
//                     acc.push(current);
//                 }
//                 return acc;
//             }, []);

//             return unique;
//         });

//         // Clean up blob URLs
//         return () => {
//             newImages.forEach((img) => {
//                 if (img.url.startsWith('blob:')) {
//                     URL.revokeObjectURL(img.url);
//                 }
//             });
//         };
//     }, [images]);


//     const confirmDelete = (index , url, name) => {
//         console.log(index , url, name)
//         setProduct((prev) => {
//             if (Array.isArray(prev[name])) {
//                 const updatedImages = prev[name].filter((u, i) => {
//                     const convertToUrl = u instanceof File ? URL.createObjectURL(u) : u;
//                     console.log(convertToUrl, url)
//                     return u !== url
//                 }
                
//                 );
//                 console.log(updatedImages)
//                 removeImageFieldState(index, name); // Clean up the state
//                 return { ...prev, [name]: updatedImages };
//             } else {
//                 removeImageFieldState(null, name);
//                 return { ...prev, [name]: '' };
//             }
//         });
//         console.log(img)
//         // setImg((prev) => {
//         //     const updatedImages = prev.filter((u, i) => u.url !== url);
//         //     return updatedImages;
//         // });

//         // setImg((prev) => prev.filter((u, i) => u !== url));
//     };

//     const deleteImage = (index , url, name) => {
//         Swal.fire({
//             title: 'Are you sure?',
//             text: "You won't be able to revert this!",
//             icon: 'warning',
//             showCancelButton: true,
//             confirmButtonColor: 'rgb(28 60 91)',
//             cancelButtonColor: 'rgb(112 20 20)',
//             confirmButtonText: 'Yes, delete it!',
//             background: '#212631'
//         }).then((result) => {
//             if (result.isConfirmed) {
//                 confirmDelete(index , url, name);
//             }
//         });
//     };

//     return (
//         <div className='d-flex flex-wrap gap-2'>
//             {img && img.map(({ url }, index) => (
//                 <div
//                     key={index}
//                     className='d-flex'
//                     style={{ position: 'relative' }}
//                 >
//                     <p
//                         className='z-3 text-danger'
//                         style={{
//                             position: 'absolute',
//                             top: '0px',
//                             right: '5px',
//                             cursor: 'pointer',
//                             margin: 0,
//                             padding: 4
//                         }}
//                         onClick={() => deleteImage(index , url, name)}
//                     >
//                         X
//                     </p>
//                     <CImage
//                         onClick={() => {
//                             setVisible(true);
//                             setImageURL(url);
//                         }}
//                         rounded
//                         thumbnail
//                         src={url}
//                         width={50}
//                         height={50}
//                         style={{ objectFit: 'cover' }}
//                     />
//                 </div>
//             ))}

//             <PreviewImageModal
//                 visible={visible}
//                 setVisible={setVisible}
//                 imageURL={imageURLs}
//             />
//         </div>
//     );
// };

// export default ImageShow;


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
            setImg([{ name, url: images instanceof File ? URL.createObjectURL(images) : images }]);
        }

        if (images && Array.isArray(images)) {
            let imageURL = images.map(file => {
                return { name, url: file instanceof File ? URL.createObjectURL(file) : file }
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