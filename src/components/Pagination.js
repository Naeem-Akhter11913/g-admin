import { CFormSelect } from '@coreui/react'
import React from 'react'

const Pagination = ({ totalItem, totalPage, currentPage }) => {
    return (
        <>
            <hr />
            <div className="d-flex gap-3 justify-content-end align-items-center">
                <div className="d-flex align-items-center">
                    <p className="mx-3 mb-0">Rows per page:</p>
                    <CFormSelect size="sm" className="mb-0" aria-label="Small select example"
                        style={{ width: "70px" }}>
                        <option value="10">5</option>
                        <option value="20">10</option>
                        <option value="30">20</option>
                    </CFormSelect>
                </div>

                <div className="d-flex gap-3 align-items-center">
                    <p className="mb-0">{currentPage} – {totalPage} of {totalItem}</p>

                    <div className="d-flex gap-3 align-items-center">
                        <p style={{ cursor: 'pointer' }} className="fs-5 mb-0">{'<'}</p>
                        <p style={{ cursor: 'pointer' }} className="fs-5 mb-0">{'>'}</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Pagination