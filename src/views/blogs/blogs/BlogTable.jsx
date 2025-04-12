import React, { useEffect, useState } from 'react'
import { CButton, CCard, CCardHeader, CTable, CContainer, CSpinner } from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilPencil, cilPlus, cilTrash } from '@coreui/icons';
import Pagination from '../../../components/Pagination';
import { useDispatch, useSelector } from 'react-redux';
import { deleteBlog, getBlog } from '../../../store/action/service.blog.action';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import { bClearState } from '../../../store/reducers/service.blog.slice';

const columns = [
    { key: 'id', label: '#', _props: { scope: 'col' } },
    { key: 'blogtype', label: 'Blog type', _props: { scope: 'col' } },
    { key: 'heading_1', label: 'Heading 1', _props: { scope: 'col' } },
    { key: 'heading_2', label: 'Heading 2', _props: { scope: 'col' } },
    { key: 'action', label: 'Action', _props: { scope: 'col' } },
];

// Define delete function to avoid errors




const BlogTable = () => {
    const dispatch = useDispatch();
    const { accessToken, errorMessage, successMessage, loading } = useSelector(state => state.user);
    const { blogs, successMSG, errorMSG, bIsLoading, totalPages, totalItems, currentPage } = useSelector(state => state.blogs);

    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [totalPage, setTotalPage] = useState(totalPages);
    const [totalItem, setTotalItem] = useState(totalItems);
    const [items, setItems] = useState([]);




    const handleDelete = item => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            // showCancelButton: true,
            // confirmButtonColor: '#3085d6',
            // cancelButtonColor: '#d33',
            // confirmButtonText: 'Yes, delete it!'
            showCancelButton: true,
            confirmButtonColor: "rgb(28 60 91)",
            cancelButtonColor: "rgb(112 20 20)",
            background: '#212631',
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(deleteBlog({ accessToken, id: item })).then(() => {
                    setItems(items.filter((itms, index) => itms._id !== item._id))
                });
            }
        })
    };

    useEffect(() => {
        if (blogs && Array.isArray(blogs)) {
            const data = JSON.stringify(blogs);
            const parsedData = JSON.parse(data);
            setItems(parsedData.map((item, index) => ({
                _id: item._id,
                id: index + 1,
                blogtype: item.type,
                heading_1: item.mainHeading,
                heading_2: item.firstHeading,
                action: <>
                    <CButton color="primary" size="sm" className="me-2">
                        <CIcon icon={cilPencil} />
                    </CButton>
                    <CButton color="danger" size="sm" onClick={() => handleDelete(item._id)}>
                        <CIcon icon={cilTrash} />
                    </CButton>
                </>
            })));

            setTotalPage(totalPages);
            setTotalItem(totalItems);
        }

        if (successMSG || errorMSG) {
            if (successMSG) {
                toast.success(successMSG, { position: 'top-right' });
                // dispatch(getBlog({ accessToken, page, limit }));

            }
            if (errorMSG) {
                toast.error(errorMSG, { position: 'top-right' });
            }
            dispatch(bClearState())
        }

    }, [blogs, successMSG, errorMSG]);


    useEffect(() => {
        dispatch(getBlog({ accessToken, page, limit }));
    }, []);
    return (
        <CCard className="p-3">
            {bIsLoading ? <div className="d-flex justify-content-center align-items-center" style={{ height: '60vh' }}>
                <CSpinner color="primary" />
            </div> :
                <>
                    <CCardHeader className='d-flex justify-content-between mb-3'>
                        <h4 style={{ textWrap: 'nowrap' }}>Total Blogs</h4>
                        <CContainer className="d-flex justify-content-end">
                            <CButton color="success" size="sm" >
                                <CIcon onClick={() =>{alert("Clicked")}} icon={cilPlus} />
                            </CButton>
                        </CContainer>
                    </CCardHeader>

                    <CTable columns={columns} items={items} />
                    <Pagination totalItem={totalItem} totalPage={totalPage} currentPage={currentPage} />
                </>
            }

        </CCard>
    )
}

export default BlogTable;