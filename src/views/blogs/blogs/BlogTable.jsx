import React from 'react'
import { CButton, CCard, CCardHeader, CTable, CContainer } from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilPencil, cilPlus, cilTrash } from '@coreui/icons';
import Pagination from '../../../components/Pagination';

const columns = [
    { key: 'id', label: '#', _props: { scope: 'col' } },
    { key: 'class', label: 'Class', _props: { scope: 'col' } },
    { key: 'heading_1', label: 'Heading 1', _props: { scope: 'col' } },
    { key: 'heading_2', label: 'Heading 2', _props: { scope: 'col' } },
    { key: 'action', label: 'Action', _props: { scope: 'col' } },
];

// Define delete function to avoid errors
const handleDelete = (e) => {
    e.preventDefault();
    console.log("Delete button clicked");
};

// Define action buttons for each row
const actionButtons = (
    <>
        <CButton color="primary" size="sm" className="me-2">
            <CIcon icon={cilPencil} />
        </CButton>
        <CButton color="danger" size="sm" onClick={handleDelete}>
            <CIcon icon={cilTrash} />
        </CButton>
    </>
);

const items = [
    { id: 1, class: 'Mark', heading_1: 'Otto', heading_2: '@mdo', action: actionButtons },
    { id: 2, class: 'Jacob', heading_1: 'Thornton', heading_2: '@fat', action: actionButtons },
    { id: 3, class: 'Larry the Bird', heading_1: '', heading_2: '@twitter', action: actionButtons },
];

const BlogTable = () => {
    return (
        <CCard className="p-3">
            <CCardHeader className='d-flex justify-content-between mb-3'>
                <h4 style={{textWrap:'nowrap'}}>Total Blogs</h4>
                <CContainer className="d-flex justify-content-end">
                    <CButton color="success" size="sm" >
                        <CIcon icon={cilPlus} />
                    </CButton>
                </CContainer>
            </CCardHeader>

            <CTable columns={columns} items={items} />
            <Pagination />

        </CCard>
    )
}

export default BlogTable;