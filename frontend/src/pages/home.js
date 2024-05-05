import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/esm/Container";
import { Card, Image } from "react-bootstrap";
import { Row, Col } from "react-bootstrap";
import { getMatchHistory, getUserInfo } from "../api";

const Home = () => {
  useEffect(() => {
    fetchCurrentRating();
    fetchMatchHistory();
  }, []);

  const [currentRating, setCurrentRating] = useState(0);
  const fetchCurrentRating = async () => {
    const email = sessionStorage.getItem("email");
    try {
      const result = await getUserInfo({ email });
      if (result && result.statusCode == 200) {
        setCurrentRating(result.body.skillRating);
      }
    } catch (error) {
      return;
    }
  };

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
      <h3 className="my-4">Current Rating: {currentRating}</h3>
      <h3 className="my-4">Recent Games</h3>
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
    </Container>
  );
};
export default Home;
