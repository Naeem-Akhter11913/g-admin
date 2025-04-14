import React, { useEffect, useRef, useState } from 'react'
import { CButton, CCard, CCardHeader, CTable, CContainer, CSpinner } from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilPencil, cilPlus, cilTrash } from '@coreui/icons';
import Pagination from '../../../components/Pagination';
import { useDispatch, useSelector } from 'react-redux';
import { deleteBlog, getBlog } from '../../../store/action/service.blog.action';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import { bClearState } from '../../../store/reducers/service.blog.slice';
import { Link, useNavigate } from 'react-router-dom';

const columns = [
    { key: 'id', label: '#', _props: { scope: 'col' } },
    { key: 'blogtype', label: 'Blog type', _props: { scope: 'col' } },
    { key: 'heading_1', label: 'Heading 1', _props: { scope: 'col' } },
    { key: 'heading_2', label: 'Heading 2', _props: { scope: 'col' } },
    { key: 'action', label: 'Action', _props: { scope: 'col' } },
];



const BlogTable = () => {
    const dispatch = useDispatch();
    const { accessToken, errorMessage, successMessage, loading } = useSelector(state => state.user);
    const { blogs, successMSG, errorMSG, bIsLoading, totalPages, totalItems, currentPage, blogOperationLoading } = useSelector(state => state.blogs);

    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(5);
    const [totalPage, setTotalPage] = useState(totalPages);
    const [totalItem, setTotalItem] = useState(totalItems);
    const [items, setItems] = useState([]);
    const navigate = useNavigate()
    const indexRef = useRef();


    const handleDelete = item => {

        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: "rgb(28 60 91)",
            cancelButtonColor: "rgb(112 20 20)",
            background: '#212631',
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                indexRef.current = item;
                dispatch(deleteBlog({ accessToken, id: item }));
            }
        })
    };
    useEffect(() => {
        if (blogs && Array.isArray(blogs)) {

            setItems(blogs.map((item, index) => ({
                _id: item._id,
                id: index + 1,
                blogtype: item.type,
                heading_1: item.mainHeading,
                heading_2: item.firstHeading,
                action: renderActionButtons(item._id),
            })));

            setTotalPage(totalPages);
            setTotalItem(totalItems);
        }

    }, [blogs]);

    const renderActionButtons = (id) => (
        <>
            <Link to={`/blog/add-blog?blogid=${id}`} className="text-decoration-none">
                <CButton color="primary" size="sm" className="me-2">
                    <CIcon icon={cilPencil} />
                </CButton>
            </Link>
            <CButton color="danger" size="sm" onClick={() => handleDelete(id)}>
                {blogOperationLoading ? <CSpinner size="sm" /> : <CIcon icon={cilTrash} />}
            </CButton>
        </>
    );

    useEffect(() => {
        if (successMSG) {
            if (indexRef.current) {
                setItems(
                    items.filter(item => item._id !== indexRef.current)
                        .map((item, index) => ({
                            ...item,
                            id: index + 1,
                        }))
                );
                indexRef.current = null;
            }
            toast.success(successMSG, { position: 'top-right' });
        }
        if (errorMSG) {
            dispatch(getBlog({ accessToken, page, limit }));
            toast.error(errorMSG, { position: 'top-right' });
        }
        dispatch(bClearState());
    }, [successMSG, errorMSG])

    useEffect(() => {
        dispatch(getBlog({ accessToken, page, limit }));
    }, [dispatch, accessToken, page, limit]);

    return (
        <CCard className="p-3">
            {bIsLoading ? <div className="d-flex justify-content-center align-items-center" style={{ height: '60vh' }}>
                <CSpinner color="primary" />
            </div> :
                <>
                    <CCardHeader className='d-flex justify-content-between mb-3'>
                        <h4 style={{ textWrap: 'nowrap' }}>Total Blogs</h4>
                        <CContainer className="d-flex justify-content-end">
                            <Link to="/blog/add-blog" className="text-decoration-none">
                                <CButton color="success" size="sm" className='me-2' >
                                    <CIcon icon={cilPlus} /> Create Blog
                                </CButton>
                            </Link>
                        </CContainer>
                    </CCardHeader>

                    <CTable columns={columns} items={items} />
                    {/* <Pagination totalItem={totalItem} totalPage={totalPage} currentPage={currentPage} /> */}
                    <Pagination
                        totalItem={totalItem}
                        totalPage={totalPage}
                        currentPage={page} // not currentPage from Redux
                        setPage={setPage}
                        setLimit={setLimit}
                    />

                </>
            }

        </CCard>
    )
}

export default BlogTable;