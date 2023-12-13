import React, { useEffect, useState } from "react";
import Form from "../Form/Form";
import SubmitButton from "../Button/SubmitButton/SubmitButton";
import classes from "./CreateAppo.module.css";

const CreateAppo = () => {
  const [docSearch, setDocSearch] = useState("");
  const [doctors, setDoctors] = useState([]);
  const [docHide, setDocHide] = useState(false);

  const [patients, setPatients] = useState([]);
  const [patHide, setPatHide] = useState(false);
  const [patSearch, setPatSearch] = useState("");

  console.log(patients);

  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIyLCJleHAiOjE3MDI0NTA2NTF9.xZNkdMJvHmhymHlBMG3z8dNOj-4I0IddxJQXBWdJros";
  const API = "https://devec.healthxbd.com/api";
  const clinicId = 1;

  //   useEffect(() => {
  //     const handleoutsideclick = (event) => {
  //       if (event.target.tagname !== "INPUT") {
  //         setDocHide(false);
  //       }
  //     };
  //     document.addEventListener("click", handleoutsideclick);
  //   }, []);

  useEffect(() => {
    let dataPat = async () => {
      try {
        let response = await fetch(
          `${API}/v1/user-details/phone?number=${patSearch}&skip=0&limit=10`,
          {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        let data = await response.json();

        if (response.ok) {
          setPatients(data);
        }
      } catch {
        setPatients([]);
      }
    };
    dataPat();
  }, [patSearch]);

  useEffect(() => {
    let fetchDoc = async () => {
      try {
        let response = await fetch(
          `${API}/v2/clinic/clinic-doctors?clinic_id=${clinicId}&name=${docSearch}&skip=0&limit=10`,
          {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        );
        let data = await response.json();

        if (response.ok) {
          setDoctors(data[1]);
        }
      } catch {
        setDoctors([]);
      }
    };
    fetchDoc();
  }, []);

  return (
    <div>
      <Form title="Create Appoinment" text="Details Info">
        <form action="">
          <div className={classes.label}>
            <label htmlFor="">
              Search Patient by Phone:{" "}
              <input
                type="text"
                value={patSearch}
                onChange={(e) => setPatSearch(e.target.value)}
                onFocus={() => setPatHide(true)}
              />
            </label>
            {/* ------------- */}
            {patHide && (
              <div>
                {patients &&
                  patients.map((pat, i) => (
                    <div key={i}>
                      <div
                        onClick={() => {
                          setPatSearch(pat?.User?.name);
                        }}
                      >
                        <option value="">
                          {pat?.User?.name} - {pat?.User?.phone}
                        </option>
                      </div>
                    </div>
                  ))}
              </div>
            )}
            <label htmlFor="">
              Search Doctor by name:{" "}
              <input
                type="text"
                value={docSearch}
                onChange={(e) => setDocSearch(e.target.value)}
                onFocus={() => setDocHide(true)}
              />
            </label>
            {/* ---------------- */}
            {docHide && (
              <div>
                {doctors &&
                  doctors.map((doc, i) => (
                    <div key={i}>
                      <div
                        onClick={() => {
                          setDocHide(false);
                          setDocSearch(doc?.User?.name);
                        }}
                      >
                        <option value="">
                          {doc?.Doctor?.dr_title} {doc?.User?.name} |{" "}
                          {doc?.DoctorSpeciality?.speciality || "--"}
                        </option>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
          <SubmitButton title="Add Doctor" />
        </form>
      </Form>
    </div>
  );
};

export default CreateAppo;
