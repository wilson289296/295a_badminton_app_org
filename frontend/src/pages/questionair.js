import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/esm/Container";
import { QuestionairCardComponent } from "../components/Card";
import { Row, Col, Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { getRandomUsers, getUserInfo, addAImodelData } from "../api";
import "./questionair.css";

const Questionair = () => {
  const navigate = useNavigate();

  const [randomUsers, setRandomUsers] = useState([]);
  const [userChoices, setUserChoices] = useState([]);
  const [currentStep, setCurrentStep] = useState(1);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [active, setActive] = useState(-1);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  useEffect(() => {
    fetchUsersData();
  }, []);

  const fetchUsersData = async () => {
    try {
      const result = await getRandomUsers();
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
        setRandomUsers((prevState) => [...prevState, result.body]);
      }
    } catch (error) {
      return;
    }
  };

  const handleConfirm = () => {
    if (active === -1) {
      return;
    }
    const userIndex = (currentStep - 1) * 2;
    const choices = [
      ...userChoices,
      [
        randomUsers[currentIndex].email,
        randomUsers[currentIndex + 1].email,
        active,
      ],
    ];
    setUserChoices(choices);
    if (currentStep === 10) {
      setShowModal(true);
      submitChoicesToServer(choices);
      return;
    }
    setCurrentStep(currentStep + 1);
    setCurrentIndex(userIndex + 2);
    setActive(-1);
  };

  const submitChoicesToServer = async (choices) => {
    try {
      console.log(choices);
      const result = await addAImodelData({
        email: sessionStorage.getItem("email"),
        choices,
      });
      if (result && result.statusCode == 200) {
        setModalMessage("Thanks for let us know you better");
      }
    } catch (error) {
      setModalMessage("Failed to submit your choices, please try again later.");
    }
  };

  const handleChoice = (index) => {
    setActive(index);
  };

  const handleContinue = () => {
    setShowModal(false);
    navigate("/home");
  };
  return (
    <Container className="questionair">
      <Row>
        <span className="questionair-text">
          Let’s get better. Please let us know which recommendation you like
          better?
        </span>
        <p className="questionair-text mt-5">Current Choice: {currentStep}</p>
      </Row>

      <Row className="my-5">
        {randomUsers.length > 0 &&
          randomUsers
            .slice(currentIndex, currentIndex + 2)
            .map((option, index) => (
              <Col
                className="d-flex justify-content-center mb-4"
                sm
                key={option.id}
                onClick={() => handleChoice(index)}
              >
                <QuestionairCardComponent
                  item={option}
                  selected={active === index}
                />
              </Col>
            ))}
      </Row>
      <Row className="justify-content-center">
        <Button
          className="questionair-confirm-btn"
          variant="primary"
          onClick={handleConfirm}
        >
          Confirm
        </Button>
      </Row>
      <Modal
        show={showModal}
        size="lg"
        centered
        contentClassName="questionair-modal-content"
      >
        <Modal.Body>
          <div className="questionair-body-content">
            <p className="questionair-text">{modalMessage}</p>
            <Button variant="primary" onClick={handleContinue}>
              Continue
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </Container>
  );
};
export default Questionair;
