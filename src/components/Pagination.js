import { CFormSelect } from '@coreui/react';
import React from 'react';

const Pagination = ({ totalItem, totalPage, currentPage, setPage, setLimit }) => {

    const handleLimitChange = (e) => {
        setLimit(Number(e.target.value));
        setPage(1); // reset to first page when limit changes
    };

    const handlePrev = () => {
        if (currentPage > 1) {
            setPage(prev => prev - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPage) {
            setPage(prev => prev + 1);
        }
    };

    return (
        <>
            <hr />
            <div className="d-flex gap-3 justify-content-end align-items-center">
                <div className="d-flex align-items-center">
                    <p className="mx-3 mb-0">Rows per page:</p>
                    <CFormSelect
                        size="sm"
                        className="mb-0"
                        aria-label="Small select example"
                        style={{ width: "70px" }}
                        onChange={handleLimitChange}
                    >
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="20">20</option>
                    </CFormSelect>
                </div>

                <div className="d-flex gap-3 align-items-center">
                    <p className="mb-0">{currentPage} of {totalPage} ({totalItem} items)</p>
                    <div className="d-flex gap-3 align-items-center">
                        <p
                            style={{ cursor: currentPage === 1 ? 'not-allowed' : 'pointer', opacity: currentPage === 1 ? 0.5 : 1 }}
                            className="fs-5 mb-0"
                            onClick={handlePrev}
                        >
                            {'<'}
                        </p>
                        <p
                            style={{ cursor: currentPage === totalPage ? 'not-allowed' : 'pointer', opacity: currentPage === totalPage ? 0.5 : 1 }}
                            className="fs-5 mb-0"
                            onClick={handleNext}
                        >
                            {'>'}
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Pagination;
