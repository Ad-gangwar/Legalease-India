import React, { useState, useEffect } from 'react';
import { FiAlertCircle } from 'react-icons/fi';
import { Icon } from '@iconify/react';
import uploadImgToCloudinary from '../../../utils/Cloudinary_Upload';
import toast from 'react-hot-toast';
import HashLoader from 'react-spinners/HashLoader';
import { URL } from '../../../utils/config';

export default function Profile({ serviceProvider }) {
  const [qualificationForms, setQualificationForms] = useState([]);
  const [experienceForms, setExperienceForms] = useState([]);
  const [selectedFile, setSelectedFile] = useState("");
  const [previewURL, setPreviewURL] = useState("");
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("legalToken");

  const [serviceProviderData, setData] = useState({
    name: "",
    email: "",
    phone: "",
    bio: "",
    gender: "",
    address: "",
    specialization: "",
    fees: "",
    qualifications: [],
    experiences: [],
    about: "",
    organisation: ""
  });

  useEffect(() => {
    setData({
      name: serviceProvider.name,
      email: serviceProvider.email,
      phone: serviceProvider.phone,
      address: serviceProvider.address,
      bio: serviceProvider.bio,
      gender: serviceProvider.gender,
      specialization: serviceProvider.specialization,
      fees: serviceProvider.fees,
      about: serviceProvider.about,
      photo: serviceProvider.photo,
      organisation: serviceProvider.organisation,
    });
    setExperienceForms(serviceProvider.experiences);
    setQualificationForms(serviceProvider.qualifications);
  }, [serviceProvider]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleQualificationChange = (index, e) => {
    const { name, value } = e.target;
    const updatedQualificationForms = [...qualificationForms];
    updatedQualificationForms[index][name] = value;
    setQualificationForms(updatedQualificationForms);
  };

  const handleExperienceChange = (index, e) => {
    const { name, value } = e.target;
    const updatedExperienceForms = [...experienceForms];
    updatedExperienceForms[index][name] = value;
    setExperienceForms(updatedExperienceForms);
  };

  const addQualificationForm = () => {
    setQualificationForms([...qualificationForms, { startDate: "", endDate: "", university: "", degree: "" }]);
  };

  const deleteQualificationForm = (index) => {
    const updatedForms = [...qualificationForms];
    updatedForms.splice(index, 1);
    setQualificationForms(updatedForms);
  };

  const addExperienceForm = () => {
    setExperienceForms([...experienceForms, { startDate: "", endDate: "", organisation: "", position: "" }]);
  };

  const deleteExperienceForm = (index) => {
    const updatedForms = [...experienceForms];
    updatedForms.splice(index, 1);
    setExperienceForms(updatedForms);
  };

  const handleFileInputChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const data = await uploadImgToCloudinary(file);
      setPreviewURL(data.url);
      setSelectedFile(data.url);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const experiences = experienceForms
      .filter((exp) => exp.startDate || exp.endDate || exp.organisation || exp.position)
      .map((exp) => ({
        startDate: exp.startDate,
        endDate: exp.endDate,
        organisation: exp.organisation,
        position: exp.position,
      }));

    const qualifications = qualificationForms
      .filter((qual) => qual.startDate || qual.endDate || qual.university || qual.degree)
      .map((qual) => ({
        startDate: qual.startDate,
        endDate: qual.endDate,
        university: qual.university,
        degree: qual.degree,
      }));

    const data = {
      ...serviceProviderData,
      experiences,
      qualifications,
    };

    try {
      const response = await fetch(URL + "/serviceProvider/" + serviceProvider._id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (response && !response.err) {
        toast.success("Updated Successfully!");
        setLoading(false);
        window.location.reload();
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error(
        `An unexpected error occurred: ${error.message || "Unknown error"}`
      );
    }
  };


  return (
    <div style={{ maxWidth: '700px' }} className="mx-auto">
      {serviceProvider.isApproved==='pending' && (
        <p className="p-2 rounded bg-warning bg-opacity-25" style={{ color: 'brown' }}>
          <span className="mx-1">
            <FiAlertCircle />
          </span>
          To get approved please complete your profile. We'll review and approve manually within 3 days.
        </p>
      )}

      <h4 className="my-4">Profile Information</h4>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name*
          </label>
          <input type="text" className="form-control" id="name" value={serviceProviderData.name} name='name'
            onChange={handleInputChange} />
        </div>

        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label" >
            Email address*
          </label>
          <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='email' value={serviceProviderData.email}
            onChange={handleInputChange} />
        </div>

        <div className="mb-3">
          <label htmlFor="address" className="form-label">
            Address*
          </label>
          <input type="text" className="form-control" id="address" value={serviceProviderData.address} name='address'
            onChange={handleInputChange} />
        </div>

        <div className="mb-3">
          <label htmlFor="organisation" className="form-label" >
            Currently working at*
          </label>
          <input type="text" className="form-control" id="organisation"  name='organisation' value={serviceProviderData.organisation} placeholder='Enter the name of the organisation or the address'
            onChange={handleInputChange} />
        </div>

        <div className="mb-3">
          <label htmlFor="phone" className="form-label">
            Phone*
          </label>
          <input type="text" className="form-control" id="phone" name='phone' value={serviceProviderData.phone}
            onChange={handleInputChange} />
        </div>

        <div className="mb-3">
          <label htmlFor="bio" className="form-label">
            Bio*
          </label>
          <input type="text" className="form-control" id="bio" name='bio' value={serviceProviderData.bio}
            onChange={handleInputChange} />
        </div>

        <div className="mb-3 row">
          <div className="mb-3 d-flex flex-column col-lg-4 col-md-4">
            <label htmlFor="gender" className="form-label">
              Gender*
            </label>
            <select name="gender" className="p-2 form-control" value={serviceProviderData.gender} onChange={handleInputChange}>
              <option value="Select">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="mb-3 d-flex flex-column col-lg-4 col-md-4">
            <label htmlFor="specialization" className="form-label">
              Specialization*
            </label>
            <select name="specialization" className="p-2 form-control" value={serviceProviderData.specialization} onChange={handleInputChange}>
              <option value="Select">Select</option>
              <option value="Notary">Notary</option>
              <option value="Law Firm">Law Firm</option>
              <option value="serviceProvider">Lawyer</option>
            </select>
          </div>

          <div className="mb-3 d-flex flex-column col-lg-4 col-md-4">
            <label htmlFor="fees" className="form-label">
              Fees*
            </label>
            <input type="text" className="form-control" id="fees" name='fees' value={serviceProviderData.fees}
              onChange={handleInputChange} />
          </div>
        </div>

        <div id="qualificationContainer">
          {qualificationForms.map((form, index) => (
            <div key={index} className="mb-3">
              <div className='row'>
                <div className='d-flex flex-column col-lg-6 col-md-6 mb-3'>
                  <label htmlFor={`startDate${index}`} className="form-label">
                    Starting Date:
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id={`startDate${index}`}
                    name='startDate'
                    onChange={(e) => handleQualificationChange(index, e)}
                    value={form.startDate}
                  />
                </div>
                <div className='d-flex flex-column col-lg-6 col-md-6 mb-3'>
                  <label htmlFor={`endDate${index}`} className="form-label">
                    Ending Date:
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id={`endDate${index}`}
                    name='endDate'
                    onChange={(e) => handleQualificationChange(index, e)}
                    value={form.endDate}
                  />
                </div>
              </div>
              <div className='row'>
                <div className='d-flex flex-column col-lg-6 col-md-6 mb-3'>
                  <label htmlFor={`university${index}`} className="form-label">
                    University:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id={`university${index}`}
                    name='university'
                    onChange={(e) => handleQualificationChange(index, e)}
                    value={form.university}
                  />
                </div>
                <div className='d-flex flex-column col-lg-6 col-md-6 mb-3'>
                  <label htmlFor={`degree${index}`} className="form-label">
                    Degree:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id={`degree${index}`}
                    name='degree'
                    onChange={(e) => handleQualificationChange(index, e)}
                    value={form.degree}
                  />
                </div>
              </div>

              <button type="button" className="btn p-0 mb-3" onClick={() => deleteQualificationForm(index)}>
                <Icon icon="mdi:delete-circle" width={35} className='mainText' />
              </button>
            </div>
          ))}

          <button type="button" className="btn btn-dark mb-4" onClick={addQualificationForm} style={{ fontSize: "14px" }}>
            Add Qualifications
          </button>
        </div>

        <div id="experienceContainer">
          {experienceForms.map((form, index) => (
            <div key={index} className="mb-3">
              <div className='row'>
                <div className='d-flex flex-column col-lg-6 col-md-6 mb-3'>
                  <label htmlFor={`startDate${index}`} className="form-label">
                    Starting Date:
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id={`startDate${index}`}
                    name='startDate'
                    onChange={(e) => handleExperienceChange(index, e)}
                    value={form.startDate}
                  />
                </div>
                <div className='d-flex flex-column col-lg-6 col-md-6 mb-3'>
                  <label htmlFor={`endDate${index}`} className="form-label">
                    Ending Date:
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id={`endDate${index}`}
                    name='endDate'
                    onChange={(e) => handleExperienceChange(index, e)}
                    value={form.endDate}
                  />
                </div>
              </div>
              <div className='row'>
                <div className='d-flex flex-column col-lg-6 col-md-6 mb-3'>
                  <label htmlFor={`position${index}`} className="form-label">
                    Position:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id={`position${index}`}
                    name='position'
                    onChange={(e) => handleExperienceChange(index, e)}
                    value={form.position}
                  />
                </div>
                <div className='d-flex flex-column col-lg-6 col-md-6 mb-3'>
                  <label htmlFor={`organisation${index}`} className="form-label">
                    Organisation:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id={`organisation${index}`}
                    name='organisation'
                    onChange={(e) => handleExperienceChange(index, e)}
                    value={form.organisation}
                  />
                </div>
              </div>

              <button type="button" className="btn p-0 mb-3" onClick={() => deleteExperienceForm(index)}>
                <Icon icon="mdi:delete-circle" width={35} className='mainText' />
              </button>
            </div>
          ))}

          <button type="button" className="btn btn-dark mb-4" onClick={addExperienceForm} style={{ fontSize: "14px" }}>
            Add Experience
          </button>
        </div>

        <div className="mb-4">
          <label htmlFor="about" className="form-label">
            About*
          </label>
          <textarea
            rows="6"
            id="message"
            placeholder="Tell something about yourself...."
            className="form-control rounded"
            name='about'
            value={serviceProviderData.about} onChange={handleInputChange}
          />
        </div>

        <div className='d-flex align-items-center gap-3 my-4'>
          {selectedFile && (
            <div className='rounded-circle border-2 border-primary'>
              <img src={previewURL} alt='' className='rounded-circle' width={50} />
            </div>
          )}

          <div>
            <input
              type='file'
              name='photo'
              id='customFile'
              onChange={handleFileInputChange}
              accept='.jpg, .png'
              className='cursor-pointer h-100'
              style={{ display: 'none' }}
            />
            <label
              htmlFor='customFile'
              className='my-bold rounded cursor-pointer sbg'
              style={{ display: 'inline-block', padding: '7px 11px', border: '1px solid #ccc', borderRadius: '5px' }}
            >
              Upload Photo
            </label>
          </div>
        </div>

        <button type="submit" className="btn btn-danger w-100 text-center py-3 mt-3 fs-5">
          {loading ? <HashLoader size={35} color='white' /> : 'Update Profile'}
        </button>
      </form>
    </div>
  );
}