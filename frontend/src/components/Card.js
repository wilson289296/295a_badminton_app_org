import { useState } from "react";
import { Card, Button, Image } from "react-bootstrap";
import "./Card.css";

export const SingleCardComponent = (props) => {
  const { invite, user = { name: "Jennifer Lee", status: 0 }, onInviteClick } = props;
  return (
    <Card
      style={{
        width: "20rem",
        border: 0,
        boxShadow: "4px 3px 8px  rgba(0, 0, 0, 0.16)",
      }}
    >
      <Card.Body>
        <Card.Title>
          <div className="d-flex align-items-center">
            <Image
              style={{ height: "4em", marginRight: "20px" }}
              src="https://github.com/mdo.png"
              roundedCircle
            />
            <div>
              <div>
                <span>{user.name}</span>
              </div>
              <div className="mb-2 text-muted">
                <span style={{ fontSize: 12 }}>
                  YOE:{user.yearsOfExperience} | Style: {user.style} | {user.zipCode}
                </span>
              </div>
            </div>
          </div>
        </Card.Title>
        <Card.Text>
          {user.yourStory}
        </Card.Text>
        {invite && (
          <div className="text-center">
            <Button
              className="w-75"
              style={{ height: 56 }}
              variant="primary"
              size="large"
              onClick={onInviteClick}
            >
              Invite
            </Button>
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

export const MultipleCardComponent = (props) => {
  const { invite, onInviteClick } = props;
  const [users, setUser] = useState([
    { name: "Jennifer Lee", status: 0, description: "" },
    { name: "Jessica Ho", status: 0, description: "" },
  ]);
  return (
    <Card
      style={{
        width: "20rem",
        border: 0,
        boxShadow: "4px 3px 8px  rgba(0, 0, 0, 0.16)",
      }}
    >
      <Card.Body>
        {users.map((u, i) => {
          return (
            <>
              <Card.Title>
                <div className="d-flex align-items-center">
                  <Image
                    style={{ height: "4em", marginRight: "20px" }}
                    src="https://github.com/mdo.png"
                    roundedCircle
                  />
                  <div>
                    <div>
                      <span>{u.name}</span>
                    </div>
                    <div className="mb-2 text-muted">
                      <span style={{ fontSize: 12 }}>
                        YOE:2 | Style: All around | 95604
                      </span>
                    </div>
                  </div>
                </div>
              </Card.Title>
              <Card.Text>
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                diam nonumy eirmod tempor invidunt ut labore et.
              </Card.Text>
            </>
          );
        })}
        {invite && (
          <div className="text-center">
            <Button
              className="w-75"
              style={{ height: 56 }}
              variant="primary"
              size="large"
              onClick={onInviteClick}
            >
              Invite
            </Button>
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

export const QuestionairCardComponent = (props) => {
  const { item, selected } = props;
  return (
    <Card
      style={{
        width: "20rem",
        border: selected
          ? "2.5px solid rgba(45, 116, 229, 1)"
          : "2.5px solid rgba(0, 0, 0, 0)",
        boxShadow: "4px 3px 8px  rgba(0, 0, 0, 0.16)",
        cursor: "pointer",
      }}
    >
      <Card.Body>
        <Card.Title>
          <div className="d-flex align-items-center">
            <Image
              style={{ height: "4em", marginRight: "20px" }}
              src="https://github.com/mdo.png"
              roundedCircle
            />
            <div>
              <div>
                <span>{item.name}</span>
              </div>
              <div className="mb-2 text-muted">
                <span
                  style={{ fontSize: 12 }}
                >{`YOE:${item.yearsOfExperience} | Style: ${item.style} | ${item.zipCode}`}</span>
              </div>
            </div>
          </div>
        </Card.Title>
        <Card.Text>{item.yourStory}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export const QuestionairMultiCardComponent = (props) => {
  const { invite } = props;
  const [users, setUser] = useState([
    { name: "Jennifer Lee", status: 0, description: "" },
    { name: "Jessica Ho", status: 0, description: "" },
  ]);
  return (
    <Card
      style={{
        width: "20rem",
        border: 0,
        boxShadow: "4px 3px 8px  rgba(0, 0, 0, 0.16)",
        cursor: "pointer",
      }}
    >
      <Card.Body>
        {users.map((u, i) => {
          return (
            <>
              <Card.Title>
                <div className="d-flex align-items-center">
                  <Image
                    style={{ height: "4em", marginRight: "20px" }}
                    src="https://github.com/mdo.png"
                    roundedCircle
                  />
                  <div>
                    <div>
                      <span>{u.name}</span>
                    </div>
                    <div className="mb-2 text-muted">
                      <span style={{ fontSize: 12 }}>
                        YOE:2 | Style: All around | 95604
                      </span>
                    </div>
                  </div>
                </div>
              </Card.Title>
              <Card.Text>
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                diam nonumy eirmod tempor invidunt ut labore et.
              </Card.Text>
            </>
          );
        })}
      </Card.Body>
    </Card>
  );
};
