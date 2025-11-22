import { useContext, useEffect, useState } from "react";
import { assets, viewApplicationsPageData } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import Loading from "../components/Loading";

const ViewApplications = () => {
  const { backendUrl, companyToken } = useContext(AppContext);

  const [applicats, setApplicats] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);

  const toggleMenu = (index) => {
    setActiveMenu(activeMenu === index ? null : index);
  };

  //func to fetch company job appli data
  const fetchCompanyJobApplications = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/company/applicants", {
        headers: { token: companyToken },
      });
      if (data.success) {
        setApplicats(data.applications.reverse());
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // fuc to update job app status from admin
  const changeJobApplicationStatus = async (id, status) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/company/change-status",
        { id, status },
        { headers: { token: companyToken } }
      );

      if (data.success) {
        fetchCompanyJobApplications();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (companyToken) {
      fetchCompanyJobApplications();
    }
  }, [companyToken]);

  return applicats ? (
    applicats.length === 0 ? (
      <div className="flex items-center justify-center h-[70vh]">
        <p className="text-xl sm:text-2xl ">No Applications Available</p>
      </div>
    ) : (
      <div className="container mx-auto p-4">
        <div>
          <table className="w-full max-w-4xl bg-white border border-gray-200 max-sm:text-sm">
            <thead>
              <tr className="border-b">
                <th className="py-2 px-4 text-left">#</th>
                <th className="py-2 px-4 text-left">User Name</th>
                <th className="py-2 px-4 text-left max-sm:hidden">Job Title</th>
                <th className="py-2 px-4 text-left max-sm:hidden">Location</th>
                <th className="py-2 px-4 text-left">Resume</th>
                <th className="py-2 px-4 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {applicats
                .filter((item) => item.jobId && item.userId)
                .map((applicant, index) => (
                  <tr key={index} className="text-gray-700">
                    <td className="py-2 px-4 border-b text-center">
                      {index + 1}
                    </td>
                    <td className="py-2 px-4 border-b text-center flex items-center">
                      {
                        <img
                          className="w-10 h-10 rounded-full mr-3 max-sm:hidden"
                          src={applicant.userId.image}
                          alt="applicant.imgSrc"
                        />
                      }{" "}
                      <span>{applicant.userId.name}</span>
                    </td>
                    <td className="py-2 px-4 border-b max-sm:hidden">
                      {applicant.jobId.title}
                    </td>
                    <td className="py-2 px-4 border-b max-sm:hidden">
                      {applicant.jobId.location}
                    </td>
                    <td className="py-2 px-4 border-b">
                      <a
                        href={applicant.userId.resume}
                        target="_blank"
                        className="text-blue-500 bg-blue-50 hover:text-blue-600 font-medium px-3 py-1 rounded inline-flex items-center gap-1 transition-colors duration-200"
                      >
                        Resume{" "}
                        <img
                          src={assets.resume_download_icon}
                          alt="resume_download_icon"
                          className="w-4 h-4"
                        />
                      </a>
                    </td>

                    <td className="py-2 px-4 border-b relative">
                      {applicant.status === "Pending" ? (
                        <div className="relative inline-block text-left">
                          <button
                            onClick={() => toggleMenu(index)}
                            className="text-gray-500 px-2 py-1"
                          >
                            •••
                          </button>
                          {activeMenu === index && (
                            <div className="z-10 absolute right-0 md:left-0 mt-2 w-32 bg-white border border-gray-200 shadow">
                              <button
                                onClick={() =>
                                  changeJobApplicationStatus(
                                    applicant._id,
                                    "Accepted"
                                  )
                                }
                                className="block w-full text-left px-4 py-2 text-blue-500 hover:bg-gray-100"
                              >
                                Accept
                              </button>
                              <button
                                onClick={() =>
                                  changeJobApplicationStatus(
                                    applicant._id,
                                    "Rejected"
                                  )
                                }
                                className="block w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100"
                              >
                                Reject
                              </button>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div
                          className={`${
                            applicant.status === "Accepted"
                              ? "bg-green-100 text-green-600"
                              : "bg-red-100 text-red-600"
                          } px-3 py-1.5 rounded text-sm`}
                        >
                          {applicant.status}
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    )
  ) : (
    <Loading />
  );
};

export default ViewApplications;
