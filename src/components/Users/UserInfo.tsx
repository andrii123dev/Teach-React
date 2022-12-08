import React, { Fragment, Dispatch, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateCurrentPath } from "../../store/actions/root.actions";
import ViewUserDetail from "./ViewUserDetail";
import BaseUrl from "../../BaseUrl/BaseUrl";
import EditUserDetail from "./EditUserDetail";
import { Col, Row, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Image from "react-bootstrap/Image";
import { getBadge } from "../../utils";
import { ToastContainer, toast } from "react-toastify";
import { getStatus } from "../../utils";
import Chat from "../Chat";

var options: any = { year: "numeric", month: "long", day: "numeric" };
var status = ["upcoming", "completed", "cancelled"];

const DateFunc = (val: any) => {
  const formatedDate = new Date(parseInt(val)).toLocaleString("en-US", options);
  return formatedDate;
};

const Users: React.FC = (props: object) => {
  const dispatch: Dispatch<any> = useDispatch();
  dispatch(updateCurrentPath("user", "list"));
  const [showModal, setShowModal] = useState(false);
  const [viewDetail, setViewDetail] = useState(false);
  const [chatDetail, setChatDetail] = useState(false);
  const [userData, setUserData] = useState([]);

  const [userId, setUserId] = useState("");
  const [userStatus, setUserStatus] = useState("");
  const [detail, setDetail] = useState();
  const [searchText, setSearchText] = useState("");
  const [totalCount, setTotalCount] = useState(1);
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedStaus, setSelectedStatus] = useState("");
  const [loader, setLoader] = useState(true);

  const handleParentCallback = (childData: any) => {
    setShowModal(childData);
  };

  const handleChatParentCallback = (childData: any) => {
    setChatDetail(childData);
  };

  const handleViewParentCallback = (childData: any) => {
    setViewDetail(childData);
  };

  const handleShowModal = (id: any, status: string) => {
    setShowModal(true);
    setUserId(id);
    setUserStatus(status);
  };
  const handleShowChatModal = (id: any) => {
    setChatDetail(true);
    // setUserId(id);
    // setUserStatus(status);
  };
  const handleViewShowModal = (item: any) => {
    setViewDetail(true);
    setDetail(item);
  };

  useEffect(() => {
    const axiosConfig: any = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("teache_token")}`,
      },
    };
    BaseUrl.get(
      `/user?page=${selectedOption}&search=${searchText}&filter=${selectedStaus}`,
      axiosConfig
    ).then((res) => {
      if (res.status === 200) {
        if (res.data) {
          setUserData(res.data.data);
          setTotalCount(res.data.count);
          console.log(res.data.data, "------------count");
        } else {
          setUserData([]);
          setTotalCount(0);
        }
      } else {
        setUserData([]);
        setTotalCount(0);
      }
    });
  }, [showModal, searchText, selectedOption, selectedStaus]);

  const handleOption = () => {
    let content = [];
    for (var index = 1; index <= Math.ceil(totalCount / 10); index++) {
      content.push(
        <option key={index} value={index}>
          {index}
        </option>
      );
    }
    console.log(Math.ceil(totalCount / 10), "-----------content");
    return content;
  };
  const handleSelectedOption = (e: any) => {
    setSelectedOption(e.target.value);
  };
  const handleStatusSelection = (e: any) => {
    setSelectedStatus(e.target.value);
  };

  return (
    <Fragment>
      <ToastContainer />
      <div className="row" style={{ background: "#F3F7FF" }}>
        <div className="col-xl-12 col-lg-12" style={{ padding: "0px" }}>
          <div
            className="card mb-4"
            style={{
              border: "none",
              borderRadius: "0px",
              background: "#F9FBFF",
            }}
          >
            <div
              className="card-header"
              style={{ border: "none", background: "#F3F7FF", padding: "25px" }}
            >
              <div>
                <Col md={{ span: 2, offset: 5 }}  style={{textAlign: 'center'}}>
                  <Image
                    className="customAvatar"
                    fluid
                    src="/userInfo.png"
                    style={{
                      borderRadius: "20px",
                      width: "110px",
                      height: "110px",
                    }}
                  />
                </Col>
              </div>
            </div>
            <div
              className="card-body"
              style={{ padding: "0px", background: "#F3F7FF" }}
            >
              <div
                className="table-responsive portlet"
                style={{
                  borderRadius: "10px",
                  boxShadow: "-10px 1px 53px 7px rgba(27, 30, 123, 0.1)",
                  margin: "auto",
                  width: "98%",
                }}
              >
                <table className="table">
                  <thead>
                    <tr
                      style={{
                        backgroundColor: "#6460F2",
                        color: "white",
                        height: "62px",
                      }}
                      className="rounded-top"
                    >
                      {/* <th scope="col">#</th> */}
                      <th
                        scope="col"
                        style={{
                          paddingLeft: 15 + "px",
                          verticalAlign: "middle",
                        }}
                      >
                        User
                      </th>
                      <th scope="col" style={{ verticalAlign: "middle" }}>
                        ID
                      </th>
                      <th scope="col" style={{ verticalAlign: "middle" }}>
                        City
                      </th>
                      <th
                        scope="col"
                        style={{ verticalAlign: "middle", textAlign: "center" }}
                      >
                        State
                      </th>
                      <th scope="col" style={{ verticalAlign: "middle" }}>
                        Email
                      </th>
                      <th
                        scope="col"
                        style={{ verticalAlign: "middle", textAlign: "center" }}
                      >
                        Classes
                      </th>
                      <th
                        scope="col"
                        style={{ verticalAlign: "middle", textAlign: "center" }}
                      >
                        Status
                      </th>
                      <th scope="col" style={{ verticalAlign: "middle" }}>
                        Activated
                      </th>
                      <th scope="col" style={{ verticalAlign: "middle" }}>
                        Last
                      </th>
                      <th
                        scope="col"
                        style={{ verticalAlign: "middle" }}
                        className="text-center"
                      >
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody style={{ color: "#6460F2" }}>
                    {userData && userData.length ? (
                      <tr>
                        <td
                          style={{
                            paddingLeft: 15 + "px",
                            color: "#817EB7",
                          }}
                        >
                          {userData[0].first_name} {userData[0].last_name}
                        </td>
                        <td style={{ color: "#817EB7" }}>{userData[0].id}</td>
                        <td style={{ color: "#817EB7" }}>Seattle</td>
                        <td style={{ color: "#817EB7", textAlign: "center" }}>
                          AL
                        </td>
                        <td style={{ color: "#817EB7" }}>
                          {userData[0].email}
                        </td>
                        <td style={{ color: "#817EB7", textAlign: "center" }}>
                          <Link
                            style={{ color: "#817EB7" }}
                            to={`/users/${userData[0].id}`}
                          >
                            2433
                            {/* {userData[0].classes} */}
                          </Link>
                        </td>
                        <td style={{ color: "#817EB7", textAlign: "center" }}>
                          {getBadge(userData[0].status)}
                        </td>
                        <td style={{ color: "#817EB7" }}>
                          {DateFunc(userData[0].created_at)}
                        </td>
                        <td style={{ color: "#817EB7" }}>
                          {DateFunc(userData[0].updated_at)}
                        </td>
                        <td
                          className="justify-content-center t1"
                          style={{
                            // paddingLeft: "30px",
                            color: "#817EB7",
                            textAlign: "center",
                          }}
                        >
                          <button
                            className="btn btn-primary btn-sm actionBtn"
                            onClick={() => handleViewShowModal(userData[0])}
                          >
                            <img src="/eye.png" alt="" width={16} height={16} />
                          </button>
                          <button
                            onClick={() =>
                              handleShowModal(
                                userData[0].id,
                                userData[0].status
                              )
                            }
                            className="btn btn-secondary btn-sm actionBtn2"
                          >
                            <svg
                              width="17"
                              height="17"
                              viewBox="0 0 17 17"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M10.571 2.82325L14.0292 6.28141L5.27558 15.035L1.81936 11.5769L10.571 2.82325ZM16.6533 1.98923L15.1111 0.44701C14.5151 -0.149003 13.5473 -0.149003 12.9492 0.44701L11.4719 1.9243L14.9301 5.38248L16.6533 3.65931C17.1156 3.19701 17.1156 2.4515 16.6533 1.98923ZM0.00962331 16.4376C-0.0533112 16.7208 0.202413 16.9746 0.485682 16.9057L4.33925 15.9714L0.883025 12.5132L0.00962331 16.4376Z"
                                fill="#807CD6"
                              />
                            </svg>
                          </button>
                          <button className="btn btn-danger btn-sm actionBtn2">
                            {/* <i className="fas fa-trash"></i> */}
                            <svg
                              width="17"
                              height="19"
                              viewBox="0 0 17 19"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M15.375 3.25H11.625V2.625C11.625 1.59125 10.7837 0.75 9.75 0.75H7.25C6.21625 0.75 5.375 1.59125 5.375 2.625V3.25H1.625C0.935625 3.25 0.375 3.81063 0.375 4.5V5.125C0.375 5.47 0.655 5.75 1 5.75H16C16.345 5.75 16.625 5.47 16.625 5.125V4.5C16.625 3.81063 16.0644 3.25 15.375 3.25ZM6.625 2.625C6.625 2.28062 6.90562 2 7.25 2H9.75C10.0944 2 10.375 2.28062 10.375 2.625V3.25H6.625V2.625Z"
                                fill="#807CD6"
                              />
                              <path
                                d="M2.25 7V16.375C2.25 17.4087 3.09125 18.25 4.125 18.25H12.875C13.9087 18.25 14.75 17.4087 14.75 16.375V7H2.25ZM10.8169 13.4331C11.0613 13.6775 11.0613 14.0725 10.8169 14.3169C10.5725 14.5613 10.1775 14.5613 9.93312 14.3169L8.5 12.8837L7.06687 14.3169C6.8225 14.5613 6.4275 14.5613 6.18313 14.3169C5.93875 14.0725 5.93875 13.6775 6.18313 13.4331L7.61625 12L6.18313 10.5669C5.93875 10.3225 5.93875 9.9275 6.18313 9.68312C6.4275 9.43875 6.8225 9.43875 7.06687 9.68312L8.5 11.1163L9.93312 9.68312C10.1775 9.43875 10.5725 9.43875 10.8169 9.68312C11.0613 9.9275 11.0613 10.3225 10.8169 10.5669L9.38375 12L10.8169 13.4331Z"
                                fill="#807CD6"
                              />
                            </svg>
                          </button>
                        </td>
                        <td style={{ textAlign: "center" }} className="t2">
                          <div id="btn_container">
                            <i
                              className="fas fa-ellipsis-h"
                              style={{ color: "#817EB7" }}
                            ></i>
                            <div id="btn_group">
                              <button
                                className="btn btn-primary btn-sm actionBtn"
                                onClick={() => handleViewShowModal(userData[0])}
                              >
                                <img
                                  src="/eye.png"
                                  alt=""
                                  width={16}
                                  height={16}
                                />
                              </button>
                              <button
                                onClick={() =>
                                  handleShowModal(
                                    userData[0].id,
                                    userData[0].status
                                  )
                                }
                                className="btn btn-secondary btn-sm actionBtn2"
                              >
                                <svg
                                  width="17"
                                  height="17"
                                  viewBox="0 0 17 17"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M10.571 2.82325L14.0292 6.28141L5.27558 15.035L1.81936 11.5769L10.571 2.82325ZM16.6533 1.98923L15.1111 0.44701C14.5151 -0.149003 13.5473 -0.149003 12.9492 0.44701L11.4719 1.9243L14.9301 5.38248L16.6533 3.65931C17.1156 3.19701 17.1156 2.4515 16.6533 1.98923ZM0.00962331 16.4376C-0.0533112 16.7208 0.202413 16.9746 0.485682 16.9057L4.33925 15.9714L0.883025 12.5132L0.00962331 16.4376Z"
                                    fill="#807CD6"
                                  />
                                </svg>
                              </button>
                              <button className="btn btn-danger btn-sm actionBtn2">
                                {/* <i className="fas fa-trash"></i> */}
                                <svg
                                  width="17"
                                  height="19"
                                  viewBox="0 0 17 19"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M15.375 3.25H11.625V2.625C11.625 1.59125 10.7837 0.75 9.75 0.75H7.25C6.21625 0.75 5.375 1.59125 5.375 2.625V3.25H1.625C0.935625 3.25 0.375 3.81063 0.375 4.5V5.125C0.375 5.47 0.655 5.75 1 5.75H16C16.345 5.75 16.625 5.47 16.625 5.125V4.5C16.625 3.81063 16.0644 3.25 15.375 3.25ZM6.625 2.625C6.625 2.28062 6.90562 2 7.25 2H9.75C10.0944 2 10.375 2.28062 10.375 2.625V3.25H6.625V2.625Z"
                                    fill="#807CD6"
                                  />
                                  <path
                                    d="M2.25 7V16.375C2.25 17.4087 3.09125 18.25 4.125 18.25H12.875C13.9087 18.25 14.75 17.4087 14.75 16.375V7H2.25ZM10.8169 13.4331C11.0613 13.6775 11.0613 14.0725 10.8169 14.3169C10.5725 14.5613 10.1775 14.5613 9.93312 14.3169L8.5 12.8837L7.06687 14.3169C6.8225 14.5613 6.4275 14.5613 6.18313 14.3169C5.93875 14.0725 5.93875 13.6775 6.18313 13.4331L7.61625 12L6.18313 10.5669C5.93875 10.3225 5.93875 9.9275 6.18313 9.68312C6.4275 9.43875 6.8225 9.43875 7.06687 9.68312L8.5 11.1163L9.93312 9.68312C10.1775 9.43875 10.5725 9.43875 10.8169 9.68312C11.0613 9.9275 11.0613 10.3225 10.8169 10.5669L9.38375 12L10.8169 13.4331Z"
                                    fill="#807CD6"
                                  />
                                </svg>
                              </button>
                            </div>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      ""
                    )}
                  </tbody>
                </table>
              </div>

              <div className="d-flex mb-2" style={{ marginTop: "30px" }}>
                <div
                  style={{
                    fontWeight: 600,
                    fontSize: "32px",
                    lineHeight: "160%",
                    color: "#6460F2",
                    paddingLeft: "1%",
                  }}
                >
                  <b>Classes</b>
                </div>
                <div
                  className="ms-auto"
                  style={{ paddingTop: "30px", paddingRight: "1.5%" }}
                >
                  <span
                    style={{
                      fontWeight: 400,
                      fontSize: "16px",
                      lineHeight: "160%",
                      color: "#817EB7",
                    }}
                  >
                    Total users
                  </span>
                  <span
                    style={{
                      fontWeight: 500,
                      fontSize: "16px",
                      lineHeight: "160%",
                      color: "#5D59B4",
                      paddingLeft: "20px",
                    }}
                  >
                    {}
                  </span>
                </div>
              </div>
              {showModal && (
                <EditUserDetail
                  userId={userId}
                  userStatus={userStatus}
                  showModal={showModal}
                  handleCallback={handleParentCallback}
                />
              )}
              {chatDetail && (
                <Chat
                  userId={userId}
                  showModal={chatDetail}
                  handleCallback={handleChatParentCallback}
                />
              )}
              {viewDetail && (
                <ViewUserDetail
                  detail={detail}
                  viewDetail={viewDetail}
                  handleViewParentCallback={handleViewParentCallback}
                />
              )}
              <div
                className="table-responsive portlet"
                style={{
                  borderRadius: "10px",
                  boxShadow: "-10px 1px 53px 7px rgba(27, 30, 123, 0.1)",
                  margin: "auto",
                  width: "98%",
                }}
              >
                <table className="table">
                  <thead>
                    <tr
                      style={{
                        backgroundColor: "#DDE9FF",
                        color: "#6460F2",
                        height: "62px",
                      }}
                      className="rounded-top"
                    >
                      <th
                        scope="col"
                        style={{
                          paddingLeft: 15 + "px",
                          verticalAlign: "middle",
                          border: "none",
                        }}
                      >
                        Class Type
                      </th>
                      <th
                        scope="col"
                        style={{
                          verticalAlign: "middle",
                          textAlign: "center",
                          border: "none",
                        }}
                      >
                        Class ID
                      </th>
                      <th
                        scope="col"
                        style={{ verticalAlign: "middle", border: "none" }}
                      >
                        Instructor
                      </th>
                      <th
                        scope="col"
                        style={{ verticalAlign: "middle", border: "none" }}
                      >
                        Ins ID
                      </th>
                      <th
                        scope="col"
                        style={{ verticalAlign: "middle", border: "none" }}
                      >
                        Date
                      </th>
                      <th
                        scope="col"
                        style={{
                          verticalAlign: "middle",
                          textAlign: "center",
                          border: "none",
                        }}
                      >
                        Status
                      </th>
                      <th
                        scope="col"
                        style={{
                          verticalAlign: "middle",
                          textAlign: "center",
                          border: "none",
                        }}
                      >
                        Cost
                      </th>
                      <th
                        scope="col"
                        style={{
                          verticalAlign: "middle",
                          textAlign: "center",
                          border: "none",
                        }}
                      >
                        Payment
                      </th>
                      <th
                        scope="col"
                        className="text-center"
                        style={{ verticalAlign: "middle", border: "none" }}
                      >
                        Chat
                      </th>
                    </tr>
                  </thead>
                  <tbody style={{ color: "#6460F2" }}>
                    {userData &&
                      userData.length > 0 &&
                      userData.map((item: any, index) => (
                        <tr key={index}>
                          <td
                            style={{
                              paddingLeft: 15 + "px",
                              color: "#817EB7",
                            }}
                          >
                            {item.first_name} {item.last_name}
                          </td>
                          <td style={{ textAlign: "center" }}>
                            <Link
                              to={{
                                pathname: `/cancelledclasses/${item.id}`,
                                state: {
                                  userinfo: item,
                                },
                              }}
                              style={{ color: "#817EB7" }}
                            >
                              <span>{item.id}</span>
                            </Link>
                          </td>
                          <td style={{ color: "#817EB7" }}>
                            <span>Tony C</span>
                          </td>
                          <td style={{ color: "#817EB7" }}>
                            <span>245</span>
                          </td>
                          <td style={{ color: "#817EB7" }}>07-08-2022</td>
                          <td style={{ color: "#817EB7", textAlign: "center" }}>
                            {getStatus(status[index % 3])}
                          </td>
                          <td
                            style={{
                              color: "#817EB7",
                              textAlign: "center",
                              verticalAlign: "middle",
                            }}
                          >
                            $ 155
                          </td>
                          <td
                            style={{
                              color: "#817EB7",
                              textAlign: "center",
                              verticalAlign: "middle",
                            }}
                          >
                            Pending
                          </td>
                          <td style={{ color: "#817EB7", textAlign: "center" }}>
                            <Button
                              onClick={() => handleShowChatModal(item.id)}
                              style={{
                                background: "none",
                                border: "none",
                                color: "#817EB7",
                              }}
                            >
                              Chat
                            </Button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              <div
                className="d-flex"
                style={{ color: "#6460F2", marginTop: "30px" }}
              >
                <div className="p-2 flex-grow-1">
                  <div style={{ paddingLeft: "1%" }}>
                    <label
                      className="totaluser"
                      style={{ marginRight: 10, color: "#817EB7" }}
                    >
                      Item per page:
                    </label>
                    <select
                      value={selectedOption}
                      onChange={(e) => handleSelectedOption(e)}
                      className="classic"
                    >
                      {handleOption()}
                    </select>
                  </div>
                </div>
                <div className="p-2">
                  <div>
                    <label
                      className="totaluser"
                      style={{ marginRight: 10, color: "#817EB7" }}
                    >
                      Move to:
                    </label>
                    <select
                      value={selectedOption}
                      onChange={(e) => handleSelectedOption(e)}
                      className="classic"
                    >
                      {handleOption()}
                    </select>
                  </div>
                </div>
                <div
                  style={{
                    marginRight: "1.5%",
                    // marginLeft: "20px",
                    paddingTop: "8px",
                  }}
                >
                  <div>
                    <label
                      className="totaluser"
                      style={{ color: "#817EB7", marginRight: "20px" }}
                    >
                      10 of 250
                    </label>
                    <button
                      style={{
                        marginRight: 10,
                        background: "#DDE9FF",
                        width: "42px",
                        height: "42px",
                      }}
                      type="button"
                      className="btn btn-default btn-sm"
                    >
                      <i
                        style={{ color: "#5D59B4" }}
                        className="fas fa-angle-left"
                      ></i>
                    </button>

                    <button
                      type="button"
                      className="btn btn-default btn-sm"
                      style={{
                        background: "#DDE9FF",
                        width: "42px",
                        height: "42px",
                      }}
                    >
                      <i
                        style={{ color: "#5D59B4" }}
                        className="fas fa-angle-right"
                      ></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Users;
