import React from 'react'
import { Link } from 'react-router-dom';
import { BsArrowRight } from 'react-icons/bs';


export default function ServiceCard({ item, index }) {
    // Create a service type identifier based on the service name
    const getServiceType = (serviceName) => {
        const serviceMap = {
            "Legal Document Drafting and Review": "documents",
            "Consultation Services": "consultation",
            "Dispute Resolution Services": "dispute-resolution",
            "Notarial Services": "notarial",
            "Litigation Support": "litigation-support",
            "Regulatory Compliance": "compliance",
            "Legal Representation": "legal-representation",
            "Intellectual Property Services": "intellectual-property",
            "Family Law Services": "family-law",
            "Real Estate Services": "real-estate",
            "Corporate and Business Services": "corporate",
            "Employment and Labor Law Services": "employment",
            "Cyber Law and Data Protection": "cyber-law",
            "Legal Training and Workshops": "training",
            "Customized Legal Services": "customized"
        };
        return serviceMap[serviceName] || "documents";
    };

    const serviceType = getServiceType(item.name);

    return (
        <div className="p-4 shadow  d-flex flex-column justify-content-between bg-white" style={{ height: "100%" }}>
            <h3 className="mb-4 my-bold">{item.name}</h3>
            <p className="mb-4">{item.description}</p>
            <div className="d-flex justify-content-between">
                <Link to={`/subServices/${serviceType}`} className="btn btn-outline-danger rounded-circle h-100 d-flex align-items-center">
                    <BsArrowRight className='arrow mx-0' />
                </Link>
                <span className="px-3 py-1 rounded-start text-white my-bold mybg fs-4">{index + 1}</span>
            </div>
        </div>
    )
}
