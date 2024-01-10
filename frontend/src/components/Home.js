import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Layout from './Layout/Layout';
import LawyerImg from '../assets/images/lawyer-01.jpg'
import { faqs } from '../assets/data/faqs';
import { services } from '../assets/data/services';
import ServiceCard from './shared/ServiceCard';

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

export default function Home() {
  const navigate = useNavigate();
  const [selectedQuestion, setSelectedQuestion] = useState(null);

  const handleQuestionClick = (index) => {
    setSelectedQuestion(selectedQuestion === index ? null : index);
  };

  return (
    <Layout>
      <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
          {/* <input
            className="form-control my-3 shadow-lg"
            type="search"
            placeholder="Search"
            aria-label="Search"
            style={{
              maxWidth: "80%",
              position: "absolute",
              top: "15%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: "10",
            }}
          /> */}
          <div className="carousel-item active">
            <img src="https://lawmin.gov.in/sites/default/files/banner-img3.jpg" className="d-block img-fluid" alt="..." style={{ filter: "brightness(70%)" }} />
          </div>
          <div className="carousel-item">
            <img src="https://lawmin.gov.in/sites/default/files/AzadikaAmritMahotsav-lawmin.jpg" className="d-block img-fluid" alt="..." style={{ filter: "brightness(70%)" }} />
          </div>
          <div className="carousel-item">
            <img src="https://lawmin.gov.in/sites/default/files/G20.png" className="d-block img-fluid" alt="..." style={{ filter: "brightness(70%)" }} />
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

      <section className='mt-4 sbg'>
        <div className="container" >
          <div className="row">
            {externalLinksData.map((link, index) => (
              <div className="col-lg-4 col-sm-12 col-md-6 my-3">
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
      <section>
        <div className='container m-5 mx-auto'>
          <div className='row'>
            <div className='col-lg-4 col-md-12 p-3 px-4 text-center'>
              <img src={LawyerImg} alt='' className='rounded-circle img-fluid' style={{ maxWidth: "350px" }} />
            </div>
            <div className='col-lg-8 col-md-12 p-3 px-5 d-flex align-items-start flex-column justify-content-center'>
              <h2 className='fw-bold break-word word-wrap  text-start'>Welcome to <span className='fs-1 mainText'>Legal-Ease India</span></h2>
              <p className='text-para my-4 '>
                At Legal-Ease India, we are on a mission to revolutionize the way legal services are accessed and delivered. We understand that legal matters are an integral part of our lives, and the traditional methods of seeking legal assistance can often be time-consuming and challenging.
              </p>
              <button className='btn btn-danger rounded-pill p-3 my-3 my-bold' onClick={() => navigate("/about")}>Know More</button>
            </div>
          </div>
        </div>
      </section>

      {/* -------------------services section------------------------- */}
      <section>
        <div className="container-md my-5">
          <h2 className='text-center fw-bold mainText display-6 mb-4'>Our Services</h2>
          <div className="row">
            {services.slice(0, 6).map((item, index) => (
              <div className="col-lg-4 col-md-6 col-12 mb-5" key={index}>
                <ServiceCard item={item} index={index} />
              </div>
            ))}
          </div>
          <button className='btn btn-danger rounded-pill py-3 px-4 my-bold fs-5' onClick={()=> navigate('/services')}>Browse More</button>
        </div>
      </section>


      {/* ----------------------------Faqs section---------------------- */}
      <section className='sbg'>
        <div className="mt-4 p-4 pb-0 rounded">
          <h3 className="text-center iconText">Frequently Asked Questions</h3>
          <div className="accordion mt-4">
            {faqs.map((faq, index) => (
              <div key={index} className="accordion-item" style={{ width: '80%', margin: 'auto' }}>
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
        </div>
      </section>

    </Layout>
  )
}
