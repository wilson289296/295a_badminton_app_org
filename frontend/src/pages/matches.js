import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/esm/Container";
import { Row, Col, Button, Image, Modal, Form } from "react-bootstrap";
import { addMatchHistory, getMatchHistory, getUserInfo } from "../api";

const Matches = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [formData, setFormData] = useState({
    playformat: "Single",
    opponentemail: undefined,
    opponentemail2: undefined,
    yourscores: undefined,
    opponentscores: undefined,
    teammateemail: undefined,
    date: undefined,
  });
  const handleChange = (type, data) => {
    setFormData({ ...formData, [type]: data });
  };

  const handleAdd = async () => {
    const email = sessionStorage.getItem("email");
    const today = new Date();
    const date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();

    const obj =
      formData.playformat === "Single"
        ? {
            email,
            format: formData.playformat,
            date: formData.date || date,
            yourScore: formData.yourscores,
            opponentScore: formData.opponentscores,
            opponentEmail: [formData.opponentemail],
          }
        : {
            email,
            format: formData.playformat,
            date: formData.date || date,
            yourScore: formData.yourscores,
            opponentScore: formData.opponentscores,
            partnerEmail: formData.teammateemail,
            opponentEmail: [formData.opponentemail, formData.opponentemail2],
          };
    try {
      const result = await addMatchHistory(obj);
      if (result && result.statusCode == 200) {
        handleClose();
        fetchMatchHistory();
      }
    } catch (error) {
      return;
    }
  };

  useEffect(() => {
    fetchMatchHistory();
  }, []);

  const [matchHistory, setMatchHistory] = useState([]);
  const [userList, setUserList] = useState([]);
  const fetchMatchHistory = async () => {
    const email = sessionStorage.getItem("email");
    try {
      const result = await getMatchHistory({ email });
      if (result && result.statusCode == 200) {
        const matchlist = result.body;
        const users = [];
        matchlist.forEach((match) => {
          if (!users.includes(match.email)) {
            users.push(match.email);
          }
          match.matchingOpponents.forEach((email) => {
            if (!users.includes(email)) {
              users.push(email);
            }
          });
          if (
            match.matchingPartners &&
            !users.includes(match.matchingPartners)
          ) {
            users.push(match.matchingPartners);
          }
        });

        await Promise.all(
          users.map(async (email) => {
            const name = await getUserNameByEmail(email);
            return { email, name };
          })
        ).then((userDetails) => {
          setUserList(userDetails);
        });

        setMatchHistory(matchlist);
      }
    } catch (error) {
      return;
    }
  };

  const getUserNameByEmail = async (email) => {
    const result = await getUserInfo({ email });
    if (result && result.statusCode == 200) {
      return result.body.name;
    } else {
      return "";
    }
  };

  const getNameByEmail = (email) => {
    const idx = userList.findIndex((user) => user.email === email);
    return idx === -1 ? "" : userList[idx].name;
  };

  const formatDate = (date) => {
    const d = new Date(date);
    return d.toDateString();
  };

  return (
    <Container>
      <div className="d-flex align-items-center">
        <h3 className="my-4" style={{ marginRight: 100 }}>
          Your Match History
        </h3>
        <Button onClick={handleShow}>Add Match</Button>
      </div>
      <div>
        <Row>
          <Col className="my-3" sm md={3}>
            <span style={{ color: "rgba(180, 180, 180, 1)", fontSize: 20 }}>
              Date
            </span>
          </Col>
          <Col className="my-3" sm md={3}>
            <span style={{ color: "rgba(180, 180, 180, 1)", fontSize: 20 }}>
              Play Format
            </span>
          </Col>
          <Col className="my-3" sm md={6}>
            <span style={{ color: "rgba(180, 180, 180, 1)", fontSize: 20 }}>
              Result
            </span>
          </Col>
        </Row>
        {matchHistory.length > 0 &&
          matchHistory.map((match, index) => {
            return (
              <Row
                key={index}
                style={{ borderBottom: "1px solid rgba(180, 180, 180, 1)" }}
              >
                <Col className="my-3 d-flex align-items-center" sm md={3}>
                  <span>{formatDate(match.date)}</span>
                </Col>
                <Col className="my-3 d-flex align-items-center" sm md={3}>
                  <span>{match.format}</span>
                </Col>
                <Col sm md={6}>
                  {String(match.format).toLowerCase() === "single" ? (
                    <Row className="d-flex justify-content-around align-items-center my-3">
                      <Col md={5}>
                        <div>
                          <span>
                            <Image
                              style={{ height: "2em", marginRight: "20px" }}
                              src="https://github.com/mdo.png"
                              roundedCircle
                            />
                            <span>{getNameByEmail(match.email)}</span>
                          </span>
                        </div>
                      </Col>
                      <Col md={2}>
                        <div>
                          <span>
                            {match.yourScore} vs {match.opponentScore}
                          </span>
                        </div>
                      </Col>
                      <Col md={5}>
                        <div>
                          <span>
                            <Image
                              style={{ height: "2em", marginRight: "20px" }}
                              src="https://github.com/mdo.png"
                              roundedCircle
                            />
                            <span>
                              {getNameByEmail(match.matchingOpponents[0])}
                            </span>
                          </span>
                        </div>
                      </Col>
                    </Row>
                  ) : (
                    <Row className="d-flex justify-content-around align-items-center my-3">
                      <Col md={5}>
                        <div className="d-flex flex-column">
                          <div className="my-2">
                            <Image
                              style={{ height: "2em", marginRight: "20px" }}
                              src="https://github.com/mdo.png"
                              roundedCircle
                            />
                            <span>{getNameByEmail(match.email)}</span>
                          </div>
                          <div className="my-2">
                            <Image
                              style={{ height: "2em", marginRight: "20px" }}
                              src="https://github.com/mdo.png"
                              roundedCircle
                            />
                            <span>
                              {getNameByEmail(match.matchingPartners)}
                            </span>
                          </div>
                        </div>
                      </Col>
                      <Col md={2}>
                        <div>
                          <span>
                            {match.yourScore} vs {match.opponentScore}
                          </span>
                        </div>
                      </Col>
                      <Col md={5}>
                        <div className="d-flex flex-column">
                          <div className="my-2">
                            <Image
                              style={{ height: "2em", marginRight: "20px" }}
                              src="https://github.com/mdo.png"
                              roundedCircle
                            />
                            <span>
                              {getNameByEmail(match.matchingOpponents[0])}
                            </span>
                          </div>
                          <div className="my-2">
                            <Image
                              style={{ height: "2em", marginRight: "20px" }}
                              src="https://github.com/mdo.png"
                              roundedCircle
                            />
                            <span>
                              {getNameByEmail(match.matchingOpponents[1])}
                            </span>
                          </div>
                        </div>
                      </Col>
                    </Row>
                  )}
                </Col>
              </Row>
            );
          })}
        {matchHistory.length === 0 && (
          <div className="my-3">No match records for now.</div>
        )}
      </div>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add Match</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Hi {sessionStorage.getItem("username")}, how is your game?</h4>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Play Format</Form.Label>
              <Form.Select
                value={formData.playformat}
                onChange={(e) => {
                  handleChange("playformat", e.target.value);
                }}
              >
                <option value="Single">Single</option>
                <option value="Double">Double</option>
                <option value="Mix">Mix</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                value={formData.date}
                onChange={(e) => {
                  handleChange("date", e.target.value);
                }}
              />
            </Form.Group>
            {(formData.playformat.toLowerCase() === "double" ||
              formData.playformat.toLowerCase() === "mix") && (
              <>
                <Form.Group className="mb-3">
                  <Form.Label>Teammate Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="email"
                    value={formData.teammateemail}
                    onChange={(e) => {
                      handleChange("teammateemail", e.target.value);
                    }}
                  />
                </Form.Group>
              </>
            )}

            {formData.playformat.toLowerCase() === "single" && (
              <>
                <Form.Group className="mb-3">
                  <Form.Label>Opponent Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="email"
                    value={formData.opponentemail}
                    onChange={(e) => {
                      handleChange("opponentemail", e.target.value);
                    }}
                    autoFocus
                  />
                </Form.Group>
              </>
            )}

            {(formData.playformat.toLowerCase() === "double" ||
              formData.playformat.toLowerCase() === "mix") && (
              <>
                <Form.Group className="mb-3">
                  <Form.Label>Opponent Email 1</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="email"
                    value={formData.opponentemail}
                    onChange={(e) => {
                      handleChange("opponentemail", e.target.value);
                    }}
                    autoFocus
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Opponent Email 2</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="email"
                    value={formData.opponentemail2}
                    onChange={(e) => {
                      handleChange("opponentemail2", e.target.value);
                    }}
                  />
                </Form.Group>
              </>
            )}
            <Form.Group>
              <Form.Label>Your Scores</Form.Label>
              <Form.Control
                type="number"
                value={formData.yourscores}
                onChange={(e) => {
                  handleChange("yourscores", e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Opponent Scores</Form.Label>
              <Form.Control
                type="number"
                value={formData.opponentscores}
                onChange={(e) => {
                  handleChange("opponentscores", e.target.value);
                }}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleAdd}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};
export default Matches;
