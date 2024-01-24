import React, { useEffect, useState } from 'react'
import Layout from '../Layout/Layout'
import { lawyersData } from '../../assets/data/lawyers';
import LawyerCard from '../shared/LawyerCard';
import { makeUnauthGetReq } from '../../utils/serverHelper';
import toast from 'react-hot-toast';

export default function Lawyers() {
  const [lawyers, setLawyers] = useState([]);

  useEffect(() => {
    const getAllLawyers = async () => {
      try {
        const response = await makeUnauthGetReq("/lawyer/");
        if (response.success) {
          setLawyers(response.data);
        }
      } catch (error) {
        console.error("Error:", error);
        toast.error(
          `An unexpected error occurred: ${error.message || "Unknown error"}`
        );
      }
    };

    getAllLawyers();

  }, [lawyers]);

  return (
    <Layout>
      {/* --------------------search section----------------------- */}
      <section style={{ backgroundColor: "#fff9ea" }} className='py-5'>
        <div className="container text-center">
          <h2 className='iconText'>Find a lawyer / Notary / Service Provider</h2>
          <div className="mx-auto mt-4 py-3 d-flex" style={{ maxWidth: "570px" }}>
            <input
              type="search"
              className="py-3 px-3 w-100 border-0 cursor-pointer rounded-start shadow-lg"
              placeholder="Search Lawyer"
            />
            <button className="btn mt-0 rounded-0 rounded-end btn-danger shadow-lg">
              Search
            </button>
          </div>
        </div>
      </section>

      {/* ---------------------------------lawyers section----------------------------- */}
      <section className="py-5">
        <div className="container">
          <div className="row w-100 mx-auto">
            {lawyers.map((lawyer, index) => (
              <div key={lawyer._id} className="col col-lg-3 col-md-4 col-sm-6 col-xs-12 my-2 mx-auto" style={{ maxWidth: "350px" }}>
                <LawyerCard lawyer={lawyer} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  )
}
