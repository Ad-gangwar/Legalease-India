import React from 'react'
import Layout from './Layout/Layout';
import { services } from '../assets/data/services';
import ServiceCard from './shared/ServiceCard';

export default function Services() {
  return (
    <Layout>
      <div className="container-md mt-5">
      <h2 className='text-center fw-bold display-6 mb-4 fst-italic mainText'>Our Services</h2>
        <div className="row">
          {services.map((item, index) => (
            <div className="col-lg-4 col-md-6 col-12 mb-5" key={index}>
              <ServiceCard item={item} index={index} />
            </div>
          ))}
        </div>
      </div>
    </Layout>
  )
}
