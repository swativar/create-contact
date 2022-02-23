import React from "react";
import { useState, useEffect, Fragment, useRef } from "react";
import { Link, withRouter } from "react-router-dom";

const ContactsList = (props) => {
  const [contactsData, setContactsData] = useState([]);
  const [delId, setDelId] = useState("");

  useEffect(() => {
    if (localStorage.getItem("Data")) {
      var data = JSON.parse(localStorage.getItem("Data"));
      var sortedData = data.sort(function(a, b){
        if(a.name < b.name) { return -1; }
        if(a.name > b.name) { return 1; }
        return 0;
    })
      setContactsData(data);
    } else {
      localStorage.setItem("Data", "[]");
    }
  }, []);

  const deleteContact = (e, id) => {
    e.preventDefault();
    const dataCopy = [...contactsData];
    const filteredData = dataCopy.filter((item) => {
      return item.id !== id;
    });
    setContactsData(filteredData);
    localStorage.setItem("Data", JSON.stringify(filteredData));
    document.querySelector("#closeBtn").click();
  };

  const editContact = (e, id) => {
    props.history.push(`/edit-contact/${id}`);
  };
  return (
    <>
      <div style={{ backgroundColor: "#f6f6f6", height: "100vh" }}>
        <div className="container">
          {/* <h4 className="mt-5 text-center"></h4> */}
          <div className="pt-5">
            <div class="card text-light" style={{ backgroundColor: "#00aef3" }}>
              <div class="card-body p-3">
                <h5 className="mb-0">Contacts List</h5>
              </div>
            </div>
          </div>
          <div className="clearfix mt-3">
            <button
              className="btn float-right text-light"
              onClick={() => props.history.push("/create-contact")}
              style={{ backgroundColor: "#00aef3" }}
            >
              Create Contact
            </button>
          </div>
          <div className="card mt-3">
            <div className="row px-5 py-3">
              {contactsData.length > 0 ? (
                contactsData.map((item, index) => {
                  return (
                    <React.Fragment key={index}>
                      <div className="col-md-4">
                        <div class="card">
                          <div className="card-header">
                            <div className="clearfix">
                              <span class="badge badge-info float-right mx-1 px-2">
                                <i
                                  class="fa fa-trash"
                                  style={{
                                    fontSize: "12px",
                                    color: "#fff",
                                    fontWeight: "normal",
                                    cursor:'pointer'
                                  }}
                                  onClick={() => setDelId(item.id)}
                                  data-toggle="modal"
                                  data-target="#myModal"
                                ></i>
                              </span>
                              <span class="badge badge-info float-right mx-1 px-2">
                                <i
                                  class="fa fa-edit"
                                  style={{
                                    fontSize: "12px",
                                    color: "#fff",
                                    fontWeight: "normal",
                                    cursor:'pointer'
                                  }}
                                  onClick={(e) => editContact(e, item.id)}
                                ></i>
                              </span>
                            </div>
                            <h5 class="card-title mt-2">{item.name}</h5>
                          </div>
                          {item.url &&
                        <img class="card-img-top" src={item.url} alt="Card image" />
                            }
                          <div class="card-body">
                            <p class="card-text mb-0">
                              Phone No - {item.phone}
                            </p>
                            <p class="card-text">
                              Type of contact - {item.type}
                            </p>
                            {item.isWhatsapp && (
                              <span class="badge badge-primary">
                                Whatsapp No.
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </React.Fragment>
                  );
                })
              ) : (
                // <div className="col-8 mx-auto">
                //   <div class="card p-5 mt-5">
                    <div className="py-3">
                      <p className="text-center mb-0">No Data Saved</p>
                    </div>
                //   </div>
                // </div>
              )}
            </div>
          </div>
        </div>
        <div class="modal fade" id="myModal">
          <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
              <div class="modal-header">
                <button
                  type="button"
                  id="closeBtn"
                  class="close"
                  data-dismiss="modal"
                >
                  &times;
                </button>
              </div>
              <div class="modal-body">
                Are you sure you want to delete this contact?
              </div>
              <div class="modal-footer">
                <button
                  className="btn btn-primary"
                  onClick={(e) => deleteContact(e, delId)}
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactsList;
