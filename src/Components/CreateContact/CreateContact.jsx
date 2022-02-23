import React from "react";
import { useState, useEffect, Fragment, useRef } from "react";
import { Link, withRouter } from "react-router-dom";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { storage } from "../Firebase";

const CreateContact = (props) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [type, setType] = useState("");
  const [isWhatsapp, setIsWhatsapp] = useState(false);
  const [file, setFile] = useState(null);
  const [url, setURL] = useState("");
  const [uploading , setUploading] = useState(false);
  const [uploadingProgress , setUploadingProgress] = useState(0);

  //const storage = getStorage();

  useEffect(() => {
    if (props.updating) {
      var editArr = [...JSON.parse(localStorage.getItem("Data"))];
      var editItem = editArr.find((item) => {
        return item.id === parseInt(props.match.params.id);
      });
      setName(editItem.name);
      setPhone(editItem.phone);
      setType(editItem.type);
      setIsWhatsapp(editItem.isWhatsapp);
      setURL(editItem.url);
    }
  }, []);

  const saveContact = (e) => {
    e.preventDefault();
    //localStorage.setItem("Data" , "[]")
    var arr = localStorage.getItem("Data");
    console.log(JSON.parse(arr));
    var copyArr = [...JSON.parse(arr)];
    copyArr.push({
      id: parseInt(Math.ceil(Math.random() * Date.now()).toPrecision(16)),
      name: name,
      phone: phone,
      type: type,
      isWhatsapp: isWhatsapp,
      url: url,
    });
    localStorage.setItem("Data", JSON.stringify(copyArr));
    console.log(copyArr, localStorage.getItem("Data"));
    document.querySelector("#successBtn").click();
    setTimeout(() => {
      document.querySelector("#closeBtn").click();
      props.history.push("/");
    }, 1000);
  };

  const updateContact = (e) => {
    e.preventDefault();
    var editArr = [...JSON.parse(localStorage.getItem("Data"))];
    editArr.forEach((item) => {
      if (item.id === parseInt(props.match.params.id)) {
        item.name = name;
        item.phone = phone;
        item.type = type;
        item.isWhatsapp = isWhatsapp;
        item.url = url;
      }
    });
    localStorage.setItem("Data", JSON.stringify(editArr));
    document.querySelector("#successBtn").click();
    setTimeout(() => {
      document.querySelector("#closeBtn").click();
      props.history.push("/");
    }, 1000);
  };

  function handleChange(e) {
    setFile(e.target.files[0]);
  }

  function handleUpload(e) {
    e.preventDefault();
    const imagesRef = ref(storage, "images");
    const spaceRef = ref(storage, `/images/${file.name}`);
    const uploadTask = uploadBytesResumable(spaceRef, file);
    setUploading(false)
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        setUploading(true);
        setUploadingProgress(progress);
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
          setUploading(false)
        // Handle unsuccessful uploads
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          setURL(downloadURL);
          setFile(null);
          setUploading(false);
          console.log(url);
        });
      }
    );
  }
  console.log(url);
  return (
    <>
      <div style={{ backgroundColor: "#f6f6f6", height: "100vh" }}>
        <div className="container">
          {props.updating ? (
            <div className="pt-5">
              <div
                class="card text-light"
                style={{ backgroundColor: "#00aef3" }}
              >
                <div class="card-body p-3">
                  <h5 className="mb-0">Update Contact</h5>
                </div>
              </div>
            </div>
          ) : (
            <div className="pt-5">
              <div
                class="card text-light"
                style={{ backgroundColor: "#00aef3" }}
              >
                <div class="card-body p-3">
                  <h5 className="mb-0">Create Contact</h5>
                </div>
              </div>
            </div>
          )}

          <form onSubmit={props.updating ? updateContact : saveContact}>
            <div
              className="mt-5 border p-5"
              style={{ backgroundColor: "#fff" }}
            >
              <div className="row">
                <div className="col-md-4">
                  <div class="form-group">
                    <label htmlFor="name">Name:</label>
                    <input
                      type="text"
                      class="form-control"
                      id="name"
                      value={name}
                      pattern="^[A-Za-z ]+$"
                      title="Special characters like @,!,# and numbers like 1,2,3,4 are not allowed"
                      required
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  <div class="form-group">
                    <label htmlFor="phone">Phone Number:</label>
                    <input
                      type="number"
                      class="form-control"
                      id="phone"
                      value={phone}
                      required
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  <div class="form-group">
                    <label htmlFor="type">Type:</label>
                    <select
                      class="form-control"
                      id="type"
                      value={type}
                      required
                      onChange={(e) => setType(e.target.value)}
                    >
                      <option value="">Select</option>
                      <option value="Personal">Personal</option>
                      <option value="Office">Office</option>
                    </select>
                  </div>
                </div>
                <div className="col-md-12">
                  <form>
                    <div className="row">
                      <div className="col-md-9">
                        <div class="custom-file">
                          <input
                            type="file"
                            class="custom-file-input"
                            id="customFile"
                            onChange={handleChange}
                          />
                          <label class="custom-file-label" htmlFor="customFile">
                            {file ? (file.name ? file.name : "Choose file") : "Choose file"}
                            
                          </label>
                          {url && <p className="text-success">
                              <i
                                  className="fa fa-trash text-danger"
                                  style={{
                                    fontSize: "12px",
                                    fontWeight: "normal",
                                    cursor:'pointer'
                                  }}
                                  onClick={() => {setURL("");setFile(null)}}
                                ></i> Image Uploaded <a href={url} target="_blank"><i class="fa fa-file text-info" style={{
                                    fontSize: "12px",
                                    fontWeight: "normal",
                                    cursor:'pointer'
                                  }}></i></a></p>}
                        </div>
                      </div>
                      <div className="col-md-3">
                        <button
                          className="btn text-light"
                          style={{ backgroundColor: "#00aef3" }}
                          disabled={!file || uploading}
                          onClick={handleUpload}
                        >
                            {uploading ? `Uploading ${uploadingProgress}%` : "Upload"}
                        
                        </button>
                        
                      </div>
                    </div>
                  </form>
                </div>
                <div className="col-md-12">
                  <div class="form-check my-4">
                    <label class="form-check-label">
                      <input
                        type="checkbox"
                        class="form-check-input"
                        checked={isWhatsapp}
                        value={isWhatsapp}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setIsWhatsapp(true);
                          } else {
                            setIsWhatsapp(false);
                          }
                        }}
                      />
                      Whatsapp Number
                    </label>
                  </div>
                </div>
              </div>
              {props.updating ? (
                <div className="mt-5 clearfix">
                  <button type="submit" className="btn btn-primary float-right">
                    Update
                  </button>
                </div>
              ) : (
                <div className="mt-5 clearfix">
                  <button
                    type="button"
                    className="btn btn-dark float-left"
                    onClick={() => props.history.goBack()}
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="btn float-right text-light"
                    style={{ backgroundColor: "#00aef3" }}
                  >
                    Submit
                  </button>
                </div>
              )}
            </div>
          </form>
        </div>
        <button
          type="button"
          id="successBtn"
          style={{ display: "none" }}
          class="btn btn-primary"
          data-toggle="modal"
          data-target="#myModal"
        >
          Open modal
        </button>

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
              {props.updating ? (
                <div class="modal-body">Contact Updated Successfully</div>
              ) : (
                <div class="modal-body">Contact Saved Successfully</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateContact;
