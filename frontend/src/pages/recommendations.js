import { useState, useEffect, useCallback } from "react";
import Container from "react-bootstrap/esm/Container";
import { SingleCardComponent } from "../components/Card";
import { Row, Col, Button, Alert, Modal, Form } from "react-bootstrap";
import {
  inviteSinglePlayer,
  inviteDoublePlayer,
  getUserInfo,
  getSinglePlayerRecommendations,
  getFirstDoublePlayerRecommendations,
  getSecondDoublePlayerRecommendations,
} from "../api";
import "./recommendations.css";

const Recommendations = () => {
  const [recommendUsers, setRecommendUsers] = useState([]);
  const [warning, setWarning] = useState({ visible: false, message: "" });

  useEffect(() => {
    fetchSingleUsersData();
  }, []);

  const fetchSingleUsersData = async () => {
    try {
      setRecommendUsers([]);
      const result = await getSinglePlayerRecommendations({
        email: sessionStorage.getItem("email"),
      });
      if (result && result.statusCode == 200) {
        console.log(result);
        result.body.forEach((email) => {
          fetchUserInfo(email);
        });
      }
    } catch (error) {
      return;
    }
  };

  const fetchFirstDoubleUsersData = async (email) => {
    try {
      setRecommendUsers([]);
      const result = await getFirstDoublePlayerRecommendations({
        email1: sessionStorage.getItem("email"),
        email2: email,
      });
      if (result && result.statusCode == 200) {
        console.log(result);
        result.body.forEach((email) => {
          fetchUserInfo(email);
        });
      }
    } catch (error) {
      return;
    }
  };

  const fetchSecondDoubleUsersData = async (email2, email3) => {
    try {
      setRecommendUsers([]);
      const result = await getSecondDoublePlayerRecommendations({
        email1: sessionStorage.getItem("email"),
        email2,
        email3,
      });
      if (result && result.statusCode == 200) {
        console.log(result);
        result.body.forEach((email) => {
          fetchUserInfo(email);
        });
      }
    } catch (error) {
      return;
    }
  };
  const fetchUserInfo = async (email) => {
    try {
      const result = await getUserInfo({ email: email });
      if (result && result.statusCode == 200) {
        setRecommendUsers((prevState) => [...prevState, result.body]);
      }
    } catch (error) {
      return;
    }
  };

  const [step, setStep] = useState(1); // 1: single, 2: partner, 3: double player I, 4: double player II
  const [singlePlayer, setSinglePlayer] = useState({});
  const [partner, setPartner] = useState({});
  const [doublePlayerList, setDoublePlayerList] = useState([]);

  const [format, setFormat] = useState("single");
  const [formatTo, setformatTo] = useState("double");

  const handleFormatChange = async (format) => {
    if (format === "single") {
      setFormat("single");
      await fetchSingleUsersData();
      setStep(1);
    } else {
      setformatTo(format);
      handleFormatShow();
    }
  };

  const [formatShow, setFormatShow] = useState(false);

  const handleFormatClose = () => setFormatShow(false);
  const handleFormatShow = () => setFormatShow(true);
  const handleFormatSubmit = async () => {
    if (email === "") return;
    try {
      const result = await getUserInfo({ email: email });
      if (result && result.statusCode == 200) {
        await fetchFirstDoubleUsersData(email);
        setFormat(formatTo);
        setFormatShow(false);
        setStep(3);
        setPartner(result.body);
      } else {
        return;
      }
    } catch (error) {
      return;
    }
  };

  const [email, setEmail] = useState("");

  const [inviteShow, setInviteShow] = useState(false);
  const handleInviteOpen = async (user) => {
    if (step === 1) {
      setSinglePlayer(user);
    }
    if (step === 2) {
      setPartner(user);
      await fetchFirstDoubleUsersData(user.email);
      setStep(3);
      setFormat(formatTo);
      return;
    }
    if (step === 3) {
      setDoublePlayerList([user]);
      await fetchSecondDoubleUsersData(partner.email, user.email);
      setStep(4);
      return;
    }
    if (step === 4) {
      setDoublePlayerList([doublePlayerList[0], user]);
    }
    setInviteShow(true);
  };
  const handleInviteClose = () => setInviteShow(false);

  const [formData, setFormData] = useState({
    phonenumber: undefined,
    gamingdate: undefined,
    gamingstarttime: undefined,
    gamingendtime: undefined,
    gamelocation: undefined,
    notes: "",
    zip: undefined,
  });

  const phoneNumberAutoFormat = (phoneNumber) => {
    const number = phoneNumber.trim().replace(/[^0-9]/g, "");

    if (number.length < 4) return number;
    if (number.length < 7) return number.replace(/(\d{3})(\d{1})/, "$1-$2");
    if (number.length < 11)
      return number.replace(/(\d{3})(\d{3})(\d{1})/, "$1-$2-$3");
    return number.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3");
  };

  const handleChange = (key, value) => {
    setFormData({ ...formData, [key]: value });
  };

  const validateInvite = () => {
    const {
      phonenumber,
      gamingdate,
      gamingstarttime,
      gamingendtime,
      gamelocation,
      zip,
    } = formData;
    if (!phonenumber || phonenumber.length < 1) {
      setWarning({ visible: true, message: "Please type your phonenumber." });
      return false;
    }
    if (
      phonenumber.length !== 12 ||
      phonenumber[3] !== "-" ||
      phonenumber[7] !== "-"
    ) {
      setWarning({
        visible: true,
        message: "Please type your valid phonenumber.",
      });
      return false;
    }
    if (!gamingdate || gamingdate.length < 1) {
      setWarning({ visible: true, message: "Please type your gamingdate." });
      return false;
    }
    if (!gamingstarttime || gamingstarttime.length < 1) {
      setWarning({
        visible: true,
        message: "Please type your gamingstarttime.",
      });
      return false;
    }
    if (!gamingendtime || gamingendtime.length < 1) {
      setWarning({ visible: true, message: "Please type your gamingendtime." });
      return false;
    }
    if (!gamelocation || gamelocation.length < 1) {
      setWarning({ visible: true, message: "Please type your gamelocation." });
      return false;
    }
    if (!zip || zip.length < 5) {
      setWarning({ visible: true, message: "Please type your zipcode." });
      return false;
    }
    setWarning({ visible: false, message: "" });
    return true;
  };

  const handleInviteSubmit = async () => {
    const validateStatus = validateInvite();
    if (!validateStatus) return;
    if (step === 1) {
      await inviteSinglePlayer({
        invitorEmail: sessionStorage.getItem("email"),
        inviteeEmail: singlePlayer.email,
        phoneNumber: formData.phonenumber,
        gamingDate: formData.gamingdate,
        gameStartTime: formData.gamingstarttime,
        gameEndTime: formData.gamingendtime,
        address: formData.gamelocation,
        zipCode: formData.zip,
      });
    }
    if (step === 4) {
      await inviteDoublePlayer({
        invitorEmail: sessionStorage.getItem("email"),
        invitorPartnerEmail: partner.email,
        inviteePlayer1Email: doublePlayerList[0].email,
        inviteePlayer2Email: doublePlayerList[1].email,
        phoneNumber: formData.phonenumber,
        gamingDate: formData.gamingdate,
        gameStartTime: formData.gamingstarttime,
        gameEndTime: formData.gamingendtime,
        address: formData.gamelocation,
        zipCode: formData.zip,
      });
    }
    setInviteShow(false);
  };

  const handleRedirectToPartnerList = () => {
    setStep(2);
    handleFormatClose();
  };

  const getTitle = useCallback(() => {
    if (step === 1) {
      return <h4>Recommendations for you</h4>;
    }
    if (step === 2) {
      return (
        <h4>
          We founds some partners for you! Have a partner already? Click{" "}
          <span
            style={{ color: "blue", cursor: "pointer" }}
            onClick={handleFormatShow}
          >
            here
          </span>{" "}
        </h4>
      );
    }
    if (step === 3) {
      return <h4>Double play recommendation: player I</h4>;
    }
    if (step === 4) {
      return <h4>Double play recommendation: player II</h4>;
    }
  }, [step]);

  const getInviteTitle = useCallback(() => {
    if (step === 1) {
      return (
        <h4>
          Hi {sessionStorage.getItem("username")}, please fill up your
          invitation for {singlePlayer.name}
        </h4>
      );
    }
    if (step === 2) {
      return (
        <h4>
          Hi {sessionStorage.getItem("username")}, please fill up your
          invitation for inviting {partner.name} as your partner
        </h4>
      );
    }
    if (step === 4) {
      return (
        <h4>
          Hi {sessionStorage.getItem("username")}, please fill up your
          invitation for inviting {partner.name}(partner),{" "}
          {doublePlayerList[0].name}, and{" "}
          {doublePlayerList[1] && doublePlayerList[1].name}
        </h4>
      );
    }
  }, [step, singlePlayer, partner, doublePlayerList]);

  return (
    <Container>
      <div className="recommd-tool">
        {getTitle()}
        {step !== 2 && (
          <div className="d-flex align-items-center">
            <span style={{ marginRight: 20 }}>Game Format</span>
            <div>
              <span
                style={
                  format === "single"
                    ? {
                        color: "rgb(45,116,229)",
                        borderBottom: "2px solid rgb(45, 116, 229)",
                        display: "inline-block",
                        padding: "8px",
                        margin: "0 10px",
                        cursor: "pointer",
                      }
                    : {
                        display: "inline-block",
                        padding: "8px",
                        margin: "0 10px",
                        cursor: "pointer",
                      }
                }
                onClick={() => {
                  handleFormatChange("single");
                }}
              >
                Single
              </span>
              <span
                style={
                  format === "double"
                    ? {
                        color: "rgb(45,116,229)",
                        borderBottom: "2px solid rgb(45, 116, 229)",
                        display: "inline-block",
                        padding: "8px",
                        margin: "0 10px",
                        cursor: "pointer",
                      }
                    : {
                        display: "inline-block",
                        padding: "8px",
                        margin: "0 10px",
                        cursor: "pointer",
                      }
                }
                onClick={() => {
                  handleFormatChange("double");
                }}
              >
                Double
              </span>
              <span
                style={
                  format === "mix"
                    ? {
                        color: "rgb(45,116,229)",
                        borderBottom: "2px solid rgb(45, 116, 229)",
                        display: "inline-block",
                        padding: "8px",
                        margin: "0 10px",
                        cursor: "pointer",
                      }
                    : {
                        display: "inline-block",
                        padding: "8px",
                        margin: "0 10px",
                        cursor: "pointer",
                      }
                }
                onClick={() => {
                  handleFormatChange("mix");
                }}
              >
                Mix
              </span>
            </div>
          </div>
        )}
      </div>
      <div>
        <Row className="my-4">
          {recommendUsers.length > 0 &&
            recommendUsers.map((user, index) => {
              return (
                <Col
                  md={6}
                  xl={4}
                  xxl={3}
                  className="d-flex justify-content-center mb-4"
                  sm
                  key={index}
                >
                  <SingleCardComponent
                    user={user}
                    invite
                    onInviteClick={() => handleInviteOpen(user)}
                  />
                </Col>
              );
            })}
        </Row>
      </div>

      <Modal show={formatShow} onHide={handleFormatClose} centered size="lg">
        <Modal.Body>
          <div style={{ textAlign: "center", padding: 40 }}>
            <h4>Please let use know who is your partner</h4>
            <div className="d-flex align-items-center my-5">
              <Form.Control
                type="email"
                placeholder="Type in your partner's email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <Button style={{ marginLeft: 10 }} onClick={handleFormatSubmit}>
                Submit
              </Button>
            </div>
            <h4>
              Don’t have a partner yet? Click{" "}
              <span
                style={{ color: "blue", cursor: "pointer" }}
                onClick={handleRedirectToPartnerList}
              >
                here
              </span>{" "}
              to find a partner first.
            </h4>
          </div>
        </Modal.Body>
      </Modal>

      <Modal show={inviteShow} onHide={handleInviteClose} centered>
        <Modal.Body>
          {getInviteTitle()}
          {warning.visible && (
            <Alert variant="warning">{warning.message}</Alert>
          )}
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Your Phone Number</Form.Label>
              <Form.Control
                value={formData.phonenumber}
                maxLength={12}
                onChange={(e) => {
                  handleChange(
                    "phonenumber",
                    phoneNumberAutoFormat(e.target.value)
                  );
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Gaming Date</Form.Label>
              <Form.Control
                type="date"
                value={formData.gamingdate}
                onChange={(e) => {
                  handleChange("gamingdate", e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Gaming Start Time</Form.Label>
              <Form.Control
                type="time"
                value={formData.gamingstarttime}
                onChange={(e) => {
                  console.log(e.target.value);
                  handleChange("gamingstarttime", e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Gaming End Time</Form.Label>
              <Form.Control
                type="time"
                value={formData.gamingendtime}
                onChange={(e) => {
                  console.log(e.target.value);
                  handleChange("gamingendtime", e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Gaming Location</Form.Label>
              <Form.Control
                value={formData.gamelocation}
                onChange={(e) => {
                  handleChange("gamelocation", e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>ZipCode</Form.Label>
              <Form.Control
                value={formData.zip}
                maxLength={5}
                onChange={(e) => {
                  handleChange("zip", e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="notes">
              <Form.Label>Notes</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={formData.notes}
                onChange={(e) => {
                  handleChange("notes", e.target.value);
                }}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleInviteClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleInviteSubmit}>
            Send
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};
export default Recommendations;
