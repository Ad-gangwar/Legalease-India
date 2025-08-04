import React from 'react'
import HashLoader from 'react-spinners/HashLoader';
import { Icon } from '@iconify/react';

export default function Loading({ 
  size = 90, 
  color = '#dc3545', 
  message = "Loading...",
  fullScreen = false,
  className = ""
}) {
  const containerClass = fullScreen 
    ? 'd-flex align-items-center justify-content-center w-100 vh-100' 
    : 'd-flex align-items-center justify-content-center w-100 h-100 my-5 py-5';

  return (
    <div className={`${containerClass} ${className}`}>
      <div className="text-center">
        <HashLoader color={color} size={size}/>
        {message && (
          <p className="mt-3 text-muted fw-bold">{message}</p>
        )}
      </div>
    </div>
  )
}

// Error fallback component
export function ErrorFallback({ 
  error, 
  message = "Something went wrong", 
  onRetry,
  className = ""
}) {
  return (
    <div className={`d-flex align-items-center justify-content-center w-100 h-100 my-5 py-5 ${className}`}>
      <div className="text-center">
        <Icon icon="mdi:alert-circle-outline" className="text-danger mb-3" width={60} />
        <h4 className="text-danger mb-3">{message}</h4>
        {error && (
          <p className="text-muted mb-3">{error}</p>
        )}
        {onRetry && (
          <button 
            className="btn btn-danger rounded-pill px-4"
            onClick={onRetry}
          >
            <Icon icon="mdi:refresh" className="me-2" />
            Try Again
          </button>
        )}
      </div>
    </div>
  )
}

// Empty state component
export function EmptyState({ 
  message = "No data available", 
  icon = "mdi:inbox-outline",
  className = ""
}) {
  return (
    <div className={`d-flex align-items-center justify-content-center w-100 h-100 my-5 py-5 ${className}`}>
      <div className="text-center">
        <Icon icon={icon} className="text-muted mb-3" width={60} />
        <h4 className="text-muted">{message}</h4>
      </div>
    </div>
  )
}

// Skeleton loader for cards
export function CardSkeleton({ count = 3, className = "" }) {
  return (
    <div className={`row ${className}`}>
      {[...Array(count)].map((_, index) => (
        <div key={index} className="col-lg-4 col-md-6 col-12 mb-4">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <div className="d-flex align-items-center mb-3">
                <div className="bg-light rounded-circle me-3" style={{ width: '50px', height: '50px' }}></div>
                <div className="flex-grow-1">
                  <div className="bg-light rounded mb-2" style={{ height: '20px', width: '70%' }}></div>
                  <div className="bg-light rounded" style={{ height: '16px', width: '50%' }}></div>
                </div>
              </div>
              <div className="bg-light rounded mb-2" style={{ height: '16px' }}></div>
              <div className="bg-light rounded mb-2" style={{ height: '16px', width: '80%' }}></div>
              <div className="bg-light rounded" style={{ height: '16px', width: '60%' }}></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
