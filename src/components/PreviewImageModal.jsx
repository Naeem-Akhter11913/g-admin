import React, { useState } from 'react'
import { CButton, CImage, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from '@coreui/react'

const PreviewImageModal = ({ visible, setVisible , imageURL }) => {

    return (
        <>
            <CModal
                alignment="center"
                visible={visible}
                onClose={() => setVisible(false)}
                aria-labelledby="VerticallyCenteredExample"
            >
                <CModalHeader>
                    <CModalTitle id="VerticallyCenteredExample">Preview image powered by Naeem</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CImage
                        rounded thumbnail src={imageURL} width={'100%'} height={'100%'} />
                </CModalBody>

            </CModal>
        </>
    )
}

export default PreviewImageModal