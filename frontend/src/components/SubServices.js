import React, { useState } from 'react';
import Layout from './Layout/Layout';
import { BsArrowRight } from 'react-icons/bs';
import { 
  documentServices, 
  consultationServices, 
  disputeResolutionServices, 
  notarialServices, 
  litigationSupportServices, 
  complianceServices, 
  legalRepresentationServices, 
  intellectualPropertyServices, 
  familyLawServices, 
  realEstateServices, 
  corporateServices, 
  employmentServices, 
  cyberLawServices, 
  trainingServices, 
  customizedServices 
} from '../assets/data/subServices';
import { Link, useParams } from 'react-router-dom';

export default function SubServices() {
  const [searchQuery, setSearchQuery] = useState('');
  const { serviceType } = useParams();

  // Get the appropriate service list based on service type
  const getServiceList = (type) => {
    const serviceMap = {
      'documents': documentServices,
      'consultation': consultationServices,
      'dispute-resolution': disputeResolutionServices,
      'notarial': notarialServices,
      'litigation-support': litigationSupportServices,
      'compliance': complianceServices,
      'legal-representation': legalRepresentationServices,
      'intellectual-property': intellectualPropertyServices,
      'family-law': familyLawServices,
      'real-estate': realEstateServices,
      'corporate': corporateServices,
      'employment': employmentServices,
      'cyber-law': cyberLawServices,
      'training': trainingServices,
      'customized': customizedServices
    };
    return serviceMap[type] || documentServices;
  };

  const currentServices = getServiceList(serviceType);

  const filteredServices = searchQuery
    ? currentServices.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : currentServices;

  // Get service type display name
  const getServiceTypeName = (type) => {
    const typeMap = {
      'documents': 'Legal Document Services',
      'consultation': 'Legal Consultation Services',
      'dispute-resolution': 'Dispute Resolution Services',
      'notarial': 'Notarial Services',
      'litigation-support': 'Litigation Support Services',
      'compliance': 'Regulatory Compliance Services',
      'legal-representation': 'Legal Representation Services',
      'intellectual-property': 'Intellectual Property Services',
      'family-law': 'Family Law Services',
      'real-estate': 'Real Estate Services',
      'corporate': 'Corporate and Business Services',
      'employment': 'Employment and Labor Law Services',
      'cyber-law': 'Cyber Law and Data Protection Services',
      'training': 'Legal Training and Workshop Services',
      'customized': 'Customized Legal Services'
    };
    return typeMap[type] || 'Legal Services';
  };

  return (
    <Layout>
      <section style={{ backgroundColor: "#fff9ea" }} className='py-5'>
        <div className="container text-center">
          <h2 className='iconText'>{getServiceTypeName(serviceType)}</h2>
          <div className="mx-auto mt-4 py-3 d-flex" style={{ maxWidth: "570px" }}>
            <input
              type="search"
              className="py-3 px-3 w-100 border-0 cursor-pointer rounded-start shadow-lg"
              placeholder="Search Service"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="btn mt-0 rounded-0 rounded-end btn-danger shadow-lg">
              Search
            </button>
          </div>
        </div>
      </section>

      <div className="container-md my-5">
        <div className="row">
          {filteredServices.map((item, index) => (
            <div className="col-lg-3 col-md-4 col-sm-6 col-xs-12 mb-5 pulse" key={index}>
              <div className="p-4 shadow  d-flex flex-column justify-content-between" style={{ height: "100%" }}>
                <h3 className="mb-3 my-bold">{item.name}</h3>
                {item.description && <p className="mb-3 text-muted">{item.description}</p>}
                <div className="d-flex justify-content-between">
                  <Link 
                    to={serviceType === 'documents' ? `/DocumentServices/${item.name.replace(/\s+/g, '')}` : `/service/${serviceType}/${item.name.replace(/\s+/g, '')}`} 
                    className="btn btn-outline-danger rounded-circle h-100 d-flex align-items-center"
                  >
                    <BsArrowRight className='arrow mx-0' />
                  </Link>
                  <span className="px-3 d-flex align-items-center rounded-start text-white my-bold mybg">{index + 1}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
