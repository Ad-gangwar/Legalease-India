import React, { useState } from 'react';
import { FiAlertCircle } from 'react-icons/fi';
import { Icon } from '@iconify/react';
import uploadImgToCloudinary from '../../../utils/Cloudinary_Upload';

export default function Profile({ lawyer }) {
  const [qualificationForms, setQualificationForms] = useState([]);
  const [selectedFile, setSelectedFile] = useState("");
  const [previewURL, setPreviewURL] = useState("");

  const addQualificationForm = () => {
    setQualificationForms([...qualificationForms, {}]);
  };

  const deleteQualificationForm = (index) => {
    const updatedForms = [...qualificationForms];
    updatedForms.splice(index, 1);
    setQualificationForms(updatedForms);
  };


  const [experienceForms, setExperienceForms] = useState([]);

  const addExperienceForm = () => {
    setExperienceForms([...experienceForms, {}]);
  };

  const deleteExperienceForm = (index) => {
    const updatedForms = [...experienceForms];
    updatedForms.splice(index, 1);
    setExperienceForms(updatedForms);
  };

  const handleFileInputChange = async (e) => {
    const file = e.target.files[0];
    const data = await uploadImgToCloudinary(file);
    // console.log(data);
    setPreviewURL(data.url);
    setSelectedFile(data.url);
}
  return (
    <div style={{ maxWidth: '700px' }} className="mx-auto">
      {lawyer.isApproved && (
        <p className="p-2 rounded bg-warning bg-opacity-25" style={{ color: 'brown' }}>
          <span className="mx-1">
            <FiAlertCircle />
          </span>
          To get approved please complete your profile. We'll review and approve manually within 3 days.
        </p>
      )}

      <h4 className="my-4">Profile Information</h4>
      <form>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name*
          </label>
          <input type="text" className="form-control" id="name" />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address*
          </label>
          <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
        </div>
        <div className="mb-3">
          <label htmlFor="phone" className="form-label">
            Phone*
          </label>
          <input type="text" className="form-control" id="phone" />
        </div>
        <div className="mb-3">
          <label htmlFor="bio" className="form-label">
            Bio*
          </label>
          <input type="text" className="form-control" id="bio" />
        </div>
        <div className="mb-3 row">
          <div className="mb-3 d-flex flex-column col-lg-4 col-md-4">
            <label htmlFor="gender" className="form-label">
              Gender*
            </label>
            <select name="gender" className="p-2 form-control">
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
            <select name="specialization" className="p-2 form-control">
              <option value="Select">Select</option>
              <option value="Notary">Notary</option>
              <option value="Law Firm">Law Firm</option>
              <option value="lawyer">Lawyer</option>
            </select>
          </div>
          <div className="mb-3 d-flex flex-column col-lg-4 col-md-4">
            <label htmlFor="fees" className="form-label">
              Fees*
            </label>
            <input type="text" className="form-control" id="fees" />
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
                  <input type="date" className="form-control" id={`startDate${index}`} name={`startDate${index}`} />
                </div>
                <div className='d-flex flex-column col-lg-6 col-md-6 mb-3'>
                  <label htmlFor={`endDate${index}`} className="form-label">
                    Ending Date:
                  </label>
                  <input type="date" className="form-control" id={`endDate${index}`} name={`endDate${index}`} />
                </div>
              </div>
              <div className='row'>
                <div className='d-flex flex-column col-lg-6 col-md-6 mb-3'>
                  <label htmlFor={`university${index}`} className="form-label">
                    University:
                  </label>
                  <input type="text" className="form-control" id={`university${index}`} name={`university${index}`} />
                </div>
                <div className='d-flex flex-column col-lg-6 col-md-6 mb-3'>
                  <label htmlFor={`degree${index}`} className="form-label">
                    Degree:
                  </label>
                  <input type="text" className="form-control" id={`degree${index}`} name={`degree${index}`} />
                </div>
              </div>


              {/* Delete button */}
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
                  <input type="date" className="form-control" id={`startDate${index}`} name={`startDate${index}`} />
                </div>
                <div className='d-flex flex-column col-lg-6 col-md-6 mb-3'>
                  <label htmlFor={`endDate${index}`} className="form-label">
                    Ending Date:
                  </label>
                  <input type="date" className="form-control" id={`endDate${index}`} name={`endDate${index}`} />
                </div>
              </div>
              <div className='row'>
                <div className='d-flex flex-column col-lg-6 col-md-6 mb-3'>
                  <label htmlFor={`position${index}`} className="form-label">
                    Position:
                  </label>
                  <input type="text" className="form-control" id={`position${index}`} name={`position${index}`} />
                </div>
                <div className='d-flex flex-column col-lg-6 col-md-6 mb-3'>
                  <label htmlFor={`university${index}`} className="form-label">
                    University:
                  </label>
                  <input type="text" className="form-control" id={`university${index}`} name={`university${index}`} />
                </div>
              </div>


              {/* Delete button */}
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
          />
        </div>

        <div className='d-flex align-items-center gap-3 my-4'>
          {selectedFile && (<div className='rounded-circle border-2 border-primary'>
            <img src={previewURL} alt='' className='rounded-circle' width={50} />
          </div>)}

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
          Update Profile
        </button>
      </form>
    </div>
  );
}
