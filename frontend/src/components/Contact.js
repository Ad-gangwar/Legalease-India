import React from 'react'
import Layout from './Layout/Layout'
import toast from 'react-hot-toast';

export default function Contact() {
  return (
    <Layout>
      <div className="container my-5" style={{maxWidth: "768px"}}>
        <h2 className="text-center iconText mainText">Contact Us</h2>
        <p className="mb-5 text-center">
          Got an issue? Want to send feedback about a beta feature? Let us know.
        </p>
        <form>
          <div className="mb-4">
            <label htmlFor="email" className="form-label">
              Your Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="example@gmail.com"
              className="form-control rounded"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="subject" className="form-label">
              Subject
            </label>
            <input
              type="text"
              id="subject"
              placeholder="Let us know, how we can help you?"
              className="form-control rounded"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="message" className="form-label">
              Your message
            </label>
            <textarea
              rows="6"
              id="message"
              placeholder="Leave a comment...."
              className="form-control rounded"
            />
          </div>
          <button type="submit" className="btn btn-danger rounded" onClick={()=>{
            toast.success('Email sent successfully!');
          }}>Submit</button>
        </form>
      </div>
    </Layout>
  )
}
