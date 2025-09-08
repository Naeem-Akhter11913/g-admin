import React, { lazy, Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { CContainer, CSpinner } from '@coreui/react'

import routes from '../routes'
const ProtectedRoute = lazy(() => import('./ProtectedRoute'))



const AppContent = () => {
  return (
    <CContainer className="px-4" lg>
      <Suspense fallback={
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
          <CSpinner color="primary" />
        </div>
      }>

        <Routes>
          {routes.map((route, idx) => {
            return (
              route.element && (
                <Route
                  key={idx}
                  path={route.path}
                  name={route.name}
                  element={
                    <ProtectedRoute>
                      <route.element />
                    </ProtectedRoute>
                  }
                />
              )
            )
          })}
          <Route path="/" element={<Navigate to="dashboard" replace />} />
        </Routes>
      </Suspense>
    </CContainer>
  )
}

export default React.memo(AppContent)