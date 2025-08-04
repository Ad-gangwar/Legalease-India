import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Layout from './Layout/Layout';
import LawyerImg from '../assets/images/lawyer-01.jpg'
import { services } from '../assets/data/services';
import ServiceCard from './shared/ServiceCard';
import { Icon } from '@iconify/react';
import { News } from '../assets/data/news';
import formatDate from '../utils/formatDate';
import HelpImage from '../assets/images/help-image.png';
import FAQs from './shared/FAQs';

const externalLinksData = [
  {
    extLink: "https://legalaffairs.gov.in/",
    imgSrc: "https://lawmin.gov.in/sites/all/themes/landj/images/link-tab1.jpg",
    deptName: "Department of Legal Affairs"
  },
  {
    extLink: "https://legislative.gov.in/",
    imgSrc: "https://lawmin.gov.in/sites/all/themes/landj/images/link-tab4.jpg",
    deptName: "Legislative Department"
  },
  {
    extLink: "https://doj.gov.in/",
    imgSrc: "https://lawmin.gov.in/sites/all/themes/landj/images/link-tab3.jpg",
    deptName: "Department of Justice"
  }
];

const images = [
  {
    link: 'https://www.g20.org/en/',
    src: 'https://legalaffairs.gov.in/sites/default/files/G20_India_Logo_0.png',
    alt: 'G20 India Logo',
    title: 'G20',
  },
  {
    link: 'https://yoga.ayush.gov.in/',
    src: 'https://legalaffairs.gov.in/sites/default/files/yoga-logo-21.png',
    alt: 'Yoga',
    title: 'International Day of Yoga',
  },
  {
    link: 'https://www.india.gov.in/',
    src: 'https://legalaffairs.gov.in/sites/default/files/india-gov.png',
    alt: 'National Portal Of India',
    title: 'National Portal Of India',
  },
  {
    link: 'https://data.gov.in/',
    src: 'https://legalaffairs.gov.in/sites/default/files/data-gov.png',
    alt: 'Data portal',
    title: 'Data portal',
  },
  {
    link: 'https://mygov.in/',
    src: 'https://legalaffairs.gov.in/sites/default/files/mygov.png',
    alt: 'MyGov',
    title: 'MyGov',
  },
  {
    link: 'http://www.makeinindia.com/',
    src: 'https://legalaffairs.gov.in/sites/default/files/makeinindia.png',
    alt: 'Make in india',
    title: 'Make In India',
  },
];

export default function Home() {
  const navigate = useNavigate();

  return (
    <Layout>
      {/* Home carousel section */}
      <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src="https://lawmin.gov.in/sites/default/files/banner-img3.jpg" className="d-block img-fluid" alt="..." />
          </div>
          <div className="carousel-item">
            <img src="https://lawmin.gov.in/sites/default/files/AzadikaAmritMahotsav-lawmin.jpg" className="d-block img-fluid" alt="..." />
          </div>
          <div className="carousel-item">
            <img src="https://lawmin.gov.in/sites/default/files/G20.png" className="d-block img-fluid" alt="..." />
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      {/* external websites links section of law Departments */}
      <section className='py-4 sbg'>
        <div className="container" >
          <div className="row">
            {externalLinksData.map((link, index) => (
              <div className="col-lg-4 col-sm-12 col-md-6 my-3" key={index}>
                <div>
                  <Link to={link.extLink} target="_blank">
                    <img
                      src={link.imgSrc}
                      alt={link.deptName}
                      className="img-fluid"
                    />
                  </Link>
                </div>
                <div className='mybg p-2 my-bold text-center'>
                  <Link to={link.extLink} target="_blank" className="text-decoration-none text-white fs-5">
                    {link.deptName}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced About section */}
      <section className='py-5'>
        <div className='container'>
          <div className='row align-items-center'>
            <div className='col-lg-5 col-md-12 text-center mb-4'>
              <div className="position-relative">
                <img src={LawyerImg} alt='Legal Professional' className='rounded-circle img-fluid shadow-lg' style={{ maxWidth: "350px", border: '5px solid #dc3545' }} />
                <div className="position-absolute top-0 end-0 bg-danger text-white rounded-circle d-flex align-items-center justify-content-center"
                  style={{ width: '60px', height: '60px', transform: 'translate(20px, -20px)' }}>
                  <Icon icon="mdi:gavel" width={30} />
                </div>
              </div>
            </div>
            <div className='col-lg-7 col-md-12'>
              <div className="ps-lg-4">
                <h2 className='fw-bold mb-3'>
                  Welcome to <span className='text-danger'>Legal-Ease India</span>
                </h2>
                <p className='text-para mb-4 fs-5'>
                  At Legal-Ease India, we are on a mission to revolutionize the way legal services are accessed and delivered. We understand that legal matters are an integral part of our lives, and the traditional methods of seeking legal assistance can often be time-consuming and challenging.
                </p>
                <div className="d-flex flex-wrap gap-3 mb-4">
                  <div className="d-flex align-items-center bg-light p-3 rounded">
                    <Icon icon="mdi:shield-check" className="text-success me-2" width={24} />
                    <span className="fw-bold">Secure Platform</span>
                  </div>
                  <div className="d-flex align-items-center bg-light p-3 rounded">
                    <Icon icon="mdi:clock-outline" className="text-primary me-2" width={24} />
                    <span className="fw-bold">24/7 Support</span>
                  </div>
                  <div className="d-flex align-items-center bg-light p-3 rounded">
                    <Icon icon="mdi:account-group" className="text-info me-2" width={24} />
                    <span className="fw-bold">Expert Team</span>
                  </div>
                </div>
                <button className='btn btn-danger rounded-pill py-3 px-5 my-bold fs-5 shadow' onClick={() => navigate("/about")}>
                  <Icon icon="mdi:arrow-right" className="me-2" />
                  Know More
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced help section */}
      <section className='py-5' style={{ backgroundColor: '#fff9ea' }}>
        <div className='container'>
          <div className='row align-items-center'>
            <div className='col-lg-7 col-md-12 mb-4'>
              <div className="pe-lg-4">
                <h1 className='mainText iconText display-5 mb-3'>Seamless Legal Support</h1>
                <h5 className='iconText mb-4'>Navigate Our Services with Ease</h5>
                <div className="row g-3 mb-4">
                  <div className="col-md-6">
                    <div className="d-flex align-items-start">
                      <div className="bg-danger text-white rounded-circle d-flex align-items-center justify-content-center me-3"
                        style={{ width: '40px', height: '40px', flexShrink: 0 }}>
                        <span className="fw-bold">1</span>
                      </div>
                      <p className="text-para mb-0">Browse through the services and select the service category you want.</p>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="d-flex align-items-start">
                      <div className="bg-danger text-white rounded-circle d-flex align-items-center justify-content-center me-3"
                        style={{ width: '40px', height: '40px', flexShrink: 0 }}>
                        <span className="fw-bold">2</span>
                      </div>
                      <p className="text-para mb-0">The services list under selected category will appear. Now select the service to be taken.</p>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="d-flex align-items-start">
                      <div className="bg-danger text-white rounded-circle d-flex align-items-center justify-content-center me-3"
                        style={{ width: '40px', height: '40px', flexShrink: 0 }}>
                        <span className="fw-bold">3</span>
                      </div>
                      <p className="text-para mb-0">The information regarding that service will appear. Select the service provider to continue.</p>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="d-flex align-items-start">
                      <div className="bg-danger text-white rounded-circle d-flex align-items-center justify-content-center me-3"
                        style={{ width: '40px', height: '40px', flexShrink: 0 }}>
                        <span className="fw-bold">4</span>
                      </div>
                      <p className="text-para mb-0">Read the instructions carefully and provide the needed documents.</p>
                    </div>
                  </div>
                </div>
                <button className='btn btn-danger rounded-pill py-3 px-5 my-bold fs-5 shadow' onClick={() => navigate("/help")}>
                  <Icon icon="mdi:help-circle" className="me-2" />
                  Learn More
                </button>
              </div>
            </div>
            <div className='col-lg-5 col-md-12 text-center'>
              <div className="position-relative">
                <img src={HelpImage} className='img-fluid rounded bg-white shadow-lg p-4 pb-0' style={{ maxWidth: "450px", border: '3px solid #dc3545'}} alt="Help" />
                <div className="position-absolute top-0 start-0 bg-danger text-white rounded-circle d-flex align-items-center justify-content-center"
                  style={{ width: '50px', height: '50px', transform: 'translate(-20px, -20px)' }}>
                  <Icon icon="mdi:help" width={24} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced services section */}
      <section className='py-5' style={{ backgroundColor: '#f8f9fa' }}>
        <div className="container">
          <div className="text-center mb-5">
            <h2 className='iconText mainText display-5 mb-3'>Our Services</h2>
            <p className='text-para fs-5'>Discover a personalized approach to legal solutions with our comprehensive array of services, carefully tailored to meet your unique needs.</p>
          </div>
          <div className="row g-4">
            {services.slice(0, 3).map((item, index) => (
              <div className="col-lg-4 col-md-6 col-12" key={index}>
                <ServiceCard item={item} index={index} />
              </div>
            ))}
          </div>
          <div className="text-center mt-5">
            <button className='btn btn-danger rounded-pill py-3 px-5 my-bold fs-5 shadow' onClick={() => navigate('/services')}>
              <Icon icon="mdi:arrow-right" className="me-2" />
              Browse More Services
            </button>
          </div>
        </div>
      </section>

      {/* Enhanced news and updates section */}
      <section className='py-5'>
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="iconText mainText display-5 mb-3">Recent News and Updates</h2>
            <p className='text-para fs-5'>Stay Informed, Stay Ahead - Breaking Legal News and Updates to Keep You at the Forefront of Legal Developments.</p>
          </div>
          <div className='card border-0 shadow-lg' style={{ borderRadius: '15px' }}>
            <div className='card-header bg-danger text-white text-center py-3' style={{ borderRadius: '15px 15px 0 0' }}>
              <h4 className="mb-0">
                <Icon icon="mdi:newspaper" className="me-2" />
                Latest Legal News
              </h4>
            </div>
            <div className='card-body p-4'>
              <div className='overflow-auto'>
                <div
                  id="newsSection"
                  className="rounded scrollY"
                  style={{ maxHeight: '400px' }}
                >
                  {News.map((news, index) => (
                    <div key={index} className='mb-4 p-3 border-start border-danger border-4 bg-light rounded-end'>
                      <h5 className='fw-bold text-danger mb-2'>{news.title}</h5>
                      <p className="text-muted mb-2">
                        <Icon icon="mdi:calendar" className="me-1" />
                        {formatDate(news.date)}
                      </p>
                      <p className="mb-0">{news.content}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQs />

      {/* below carousel of external websites */}
      <section className='container overflow-hidden'>
        <div className='d-flex scrollX'>
          {images?.map((image, index) => (
            <figure key={index}>
              <Link to={image.link} target='_blank'>
                <img src={image.src} alt={image.alt} />
              </Link>
            </figure>
          ))}
          {images?.map((image, index) => (
            <figure key={`duplicate-${index}`}>
              <Link to={image.link} target='_blank'>
                <img src={image.src} alt={image.alt} />
              </Link>
            </figure>
          ))}
        </div>
      </section>
    </Layout>
  )
}
