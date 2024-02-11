import React, { useState} from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Layout from './Layout/Layout';
import LawyerImg from '../assets/images/lawyer-01.jpg'
import { faqs } from '../assets/data/faqs';
import { services } from '../assets/data/services';
import ServiceCard from './shared/ServiceCard';
import { Icon } from '@iconify/react';
import { News } from '../assets/data/news';
import formatDate from '../utils/formatDate';
import HelpImage from '../assets/images/help-image.png';

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

// console.log(News);

export default function Home() {
  const navigate = useNavigate();

  const [selectedQuestion, setSelectedQuestion] = useState(null);

  const handleQuestionClick = (index) => {
    setSelectedQuestion(selectedQuestion === index ? null : index);
  };

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

      {/* ---------------About section------------------ */}
      <section className='pt-4'>
        <div className='container mx-auto'>
          <div className='row'>
            <div className='col-lg-4 col-md-12 p-3 px-4 text-center'>
              <img src={LawyerImg} alt='' className='rounded-circle img-fluid' style={{ maxWidth: "320px" }} />
            </div>
            <div className='col-lg-8 col-md-12 p-3 px-5 d-flex align-items-start flex-column justify-content-center'>
              <h2 className='fw-bold break-word word-wrap  text-start'>Welcome to <span className='fs-1 mainText'>Legal-Ease India</span></h2>
              <p className='text-para my-4 '>
                At Legal-Ease India, we are on a mission to revolutionize the way legal services are accessed and delivered. We understand that legal matters are an integral part of our lives, and the traditional methods of seeking legal assistance can often be time-consuming and challenging.
              </p>
              <button className='btn btn-danger rounded-pill py-3 px-4 my-3 my-bold' onClick={() => navigate("/about")}>Know More</button>
            </div>
          </div>
        </div>
      </section>

      {/* help section */}
      <section className='mb-4'>
        <div className='row container mx-auto'>
          <div className='col-md-8 d-flex flex-column justify-content-end mb-4'>
            <div className='d-xl-flex gap-3 align-items-end'>
              <h1 className='mainText iconText'>Seamless Legal Support </h1>
              <h5 className='iconText my-2 pb-1'>Navigate Our Services with Ease</h5>
            </div>
            <ul className='list-unstyled ps-3 my-3'>
              <li className='text-para my-3'>
                1. Browse through the services and select the service category you want.
              </li>
              <li className='text-para my-3'>
                2. The services list under selected category will appear. Now select the service to be taken.
              </li>
              <li className='text-para my-3'>
                3. The information regarding that service will appear. Select the service provider to continue.
              </li>
              <li className='text-para my-3'>
                4. Read the instructions and carefully and provide the needed documents.
              </li>
            </ul>
            <button className='btn btn-danger rounded-pill p-3 mt-3 my-bold w-50' style={{ maxWidth: "150px" }} onClick={() => navigate("/help")}>Learn More</button>
          </div>
          <div className='col-md-4 text-center mb-4'>
            <img src={HelpImage} style={{ maxWidth: "450px" }} className='img-fluid'></img>
          </div>
        </div>
      </section>

      {/* -------------------services section------------------------- */}
      <section className='sbg py-1'>
        <div className="container-md my-4">
          <h2 className='text-center iconText mainText display-6 mb-3'>Our Services</h2>
          <p className='text-center mb-5 text-para'>Discover a personalized approach to legal solutions with our comprehensive array of services, carefully tailored to meet your unique needs.</p>
          <div className="row">
            {services.slice(0, 3).map((item, index) => (
              <div className="col-lg-4 col-md-6 col-12 mb-5 pulse sbg" key={index}>
                <ServiceCard item={item} index={index} key={index} />
              </div>
            ))}
          </div>
          <button className='btn btn-danger rounded-pill py-3 px-4 my-bold fs-5' onClick={() => navigate('/services')}>Browse More</button>
        </div>
      </section>

      {/* news and updates section */}
      <section className='bg-info bg-opacity-10 py-5'>
        <div className="container pb-2">
          <h2 className="mb-3 iconText text-center mainText display-6">Recent News and Updates</h2>
          <p className='text-center text-para mb-5'>Stay Informed, Stay Ahead - Breaking Legal News and Updates to Keep You at the Forefront of Legal Developments.</p>
          <div className=' p-3 border border-1 border-danger rounded bg-white shadow-lg'>
            <div className='overflow-auto'>
              <div
                id="newsSection"
                className="rounded scrollY"
                style={{ maxHeight: '400px' }}
              >
                {News.map((news, index) => (
                  <div key={index} className='my-4'>
                    <h5 className='my-bold text-danger'>{news.title}</h5>
                    <p className="mb-2 text-muted">{formatDate(news.date)}</p>
                    <p>{news.content}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* ----------------------------Faqs section---------------------- */}
      <section className='sbg pt-1'>
        <div className="mt-4 p-4 pb-0 rounded">
          <h2 className="text-center iconText mainText display-6 mb-4">Frequently Asked Questions</h2>
          <div className='row'>
            <div className="accordion mt-4 col-md-8">
              {faqs.map((faq, index) => (
                <div key={index} className="accordion-item" style={{ width: '90%', margin: 'auto' }}>
                  <h2 className="accordion-header" id={`faqHeading${index}`}>
                    <button
                      className={`accordion-button ${selectedQuestion === index ? '' : 'collapsed'}`}
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target={`#faqCollapse${index}`}
                      aria-expanded={selectedQuestion === index}
                      aria-controls={`faqCollapse${index}`}
                      onClick={() => handleQuestionClick(index)}
                      style={{ backgroundColor: '#f8f9fa', border: 'none' }}
                    >
                      {faq.question}
                    </button>
                  </h2>
                  <div
                    id={`faqCollapse${index}`}
                    className={`accordion-collapse collapse ${selectedQuestion === index ? 'show' : ''}`}
                    aria-labelledby={`faqHeading${index}`}
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body">
                      {faq.content}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className='col-md-4 d-flex align-items-center justify-content-center'>
              <img src="https://www.bytestechnolab.com/wp-content/uploads/2022/12/magento-development-service.webp" alt='faqs' className='img-fluid w-100' style={{maxWidth: "400px"}}></img>
            </div>
          </div>
        </div>
      </section>

      {/* below carousel of external websites */}
      <section className="wrapper carousel-wrapper">
        <h1 style={{ display: 'none' }}>Section</h1>
        <div
          id="carouselExample"
          className="carousel slide"
          data-bs-ride="false"
          data-bs-interval="false"
        >
          <div className="carousel-inner container">
            {[0, 1, 2].map((groupIndex) => (
              <div key={groupIndex} className={`carousel-item ${groupIndex === 0 ? 'active' : ''}`}>
                <div className="d-flex justify-content-around">
                  {images.map((image, index) => (
                    <Link
                      key={index}
                      to={image.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      role="link"
                    >
                      <img
                        src={image.src}
                        alt={image.alt}
                        title={image.title}
                        draggable={false}
                        width={200}
                        height={150}
                      />
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExample"
            data-bs-slide="prev"
          >
            <span aria-hidden="true"><Icon icon="fa-solid:chevron-left" width={30} color='black' /></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExample"
            data-bs-slide="next"
          >
            <span aria-hidden="true"><Icon icon="fa-solid:chevron-right" width={30} color='black' /></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </section>
    </Layout>
  )
}
