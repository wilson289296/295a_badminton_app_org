import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/esm/Container";
import { Row, Col, Image } from "react-bootstrap";
import { findInvitationRecord, getNotification, getUserInfo } from "../api";

const Invitation = () => {
    const [type, setType] = useState(1); // 1:invitations you sent 2:invitations to you, 

    useEffect(() => {
        if (type === 1) {
            fetchInvitationRecord();
        } else {
            fetchNotification();
        }
    }, [type])

    const [invitationRecord, setInvitationRecord] = useState([]);
    const [invitations, setInvitations] = useState([]);
    const [userList, setUserList] = useState([]);

    const fetchInvitationRecord = async () => {
        const email = sessionStorage.getItem("email");

        const result = await findInvitationRecord({ email });
        if (result && result.statusCode == 200) {
            const list = result.body;
            const users = [];
            list.forEach((item) => {
                if (!users.includes(item.invitorEmail)) {
                    users.push(item.invitorEmail);
                }
                item.inviteeEmail.forEach((innerItem) => {
                    if (typeof innerItem === 'string') {
                        if (!users.includes(innerItem)) {
                            users.push(innerItem);
                        }
                    }
                    if (innerItem.partner) {
                        if (!users.includes(innerItem.partner)) {
                            users.push(innerItem.partner);
                        }
                    }
                    if (innerItem.opponent) {
                        if (typeof innerItem.opponent === 'string') {
                            if (!users.includes(innerItem.opponent)) {
                                users.push(innerItem.opponent);
                            }
                        }
                        if (typeof innerItem.opponent === "object" && innerItem.opponent.length > 0)
                            innerItem.opponent.forEach((opponent) => {
                                if (!users.includes(opponent)) {
                                    users.push(opponent);
                                }
                            });
                    }
                });
            });

            await Promise.all(
                users.map(async (email) => {
                    const name = await getUserNameByEmail(email);
                    return { email, name };
                })
            ).then((userDetails) => {
                setUserList(userDetails);
            });
            setInvitationRecord(list);
        }
    };

    const fetchNotification = async () => {
        const email = sessionStorage.getItem("email");
        const result = await getNotification({ email });
        if (result && result.statusCode == 200) {
            const list = result.body;
            const users = [];
            list.forEach((item) => {
                if (!users.includes(item.invitor)) {
                    users.push(item.invitor);
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
            setInvitations(list);
        }
    };

    const getUserNameByEmail = async (email) => {
        try {
            const result = await getUserInfo({ email });
            if (result && result.statusCode == 200) {
                return result.body.name;
            } else {
                return "user not found";
            }
        } catch (error) {
            if (error.statusCode === 404) {
                return "user not found";
            }
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

    const isSingle = (record) => {
        if (typeof record.inviteeEmail[0] === 'string') return true;
        if (record.inviteeEmail[0] && record.inviteeEmail[0].opponent && typeof record.inviteeEmail[0].opponent === 'string') return true;
        return false
    }
    return (
        <Container>
            <div className="d-flex justify-content-between align-items-center">
                <h3 className="my-4" style={{ marginRight: 100 }}>
                    Invitations
                </h3>
                <div className="d-flex align-items-center">
                    <div>
                        <span
                            style={
                                type === 1
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
                                setType(1);
                            }}
                        >
                            invitations you sent
                        </span>
                        <span
                            style={
                                type === 2
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
                                setType(2);
                            }}
                        >
                            invitations to you
                        </span>
                    </div>
                </div>
            </div>
            {type === 1 && <div>
                <Row>
                    <Col className="my-3" sm md={2}>
                        <span style={{ color: "rgba(180, 180, 180, 1)", fontSize: 20 }}>
                            Date
                        </span>
                    </Col>
                    <Col className="my-3" sm md={2}>
                        <span style={{ color: "rgba(180, 180, 180, 1)", fontSize: 20 }}>
                            PhoneNumber
                        </span>
                    </Col>
                    <Col className="my-3" sm md={2}>
                        <span style={{ color: "rgba(180, 180, 180, 1)", fontSize: 20 }}>
                            StartTime
                        </span>
                    </Col>
                    <Col className="my-3" sm md={1}>
                        <span style={{ color: "rgba(180, 180, 180, 1)", fontSize: 20 }}>
                            Address
                        </span>
                    </Col>
                    <Col className="my-3" sm md={1}>
                        <span style={{ color: "rgba(180, 180, 180, 1)", fontSize: 20 }}>
                            ZipCode
                        </span>
                    </Col>
                    <Col className="my-3" sm md={4}>
                        <span style={{ color: "rgba(180, 180, 180, 1)", fontSize: 20 }}>
                            Detail
                        </span>
                    </Col>
                </Row>
                {invitationRecord.length > 0 &&
                    invitationRecord.map((record, index) => {
                        return (
                            <Row
                                key={index}
                                style={{ borderBottom: "1px solid rgba(180, 180, 180, 1)" }}
                            >
                                <Col className="my-3 d-flex align-items-center" sm md={2}>
                                    <span>{formatDate(record.gamingDate)}</span>
                                </Col>
                                <Col className="my-3 d-flex align-items-center" sm md={2}>
                                    <span>{record.phoneNumber}</span>
                                </Col>
                                <Col className="my-3 d-flex align-items-center" sm md={2}>
                                    <span>{record.gameStartTime}</span>
                                </Col>
                                <Col className="my-3 d-flex align-items-center" sm md={1}>
                                    <span>{record.address}</span>
                                </Col>
                                <Col className="my-3 d-flex align-items-center" sm md={1}>
                                    <span>{record.zipCode}</span>
                                </Col>
                                <Col sm md={4}>
                                    {isSingle(record) ? (
                                        <Row className="d-flex justify-content-around align-items-center my-3">
                                            <Col md={5}>
                                                <div>
                                                    <span>
                                                        <Image
                                                            style={{ height: "2em", marginRight: "20px" }}
                                                            src="https://github.com/mdo.png"
                                                            roundedCircle
                                                        />
                                                        <span>{getNameByEmail(record.invitorEmail)}</span>
                                                    </span>
                                                </div>
                                            </Col>
                                            <Col md={1}>
                                                <div>
                                                    <span>
                                                        vs
                                                    </span>
                                                </div>
                                            </Col>
                                            <Col md={6}>
                                                <div>
                                                    <span>
                                                        <Image
                                                            style={{ height: "2em", marginRight: "20px" }}
                                                            src="https://github.com/mdo.png"
                                                            roundedCircle
                                                        />
                                                        <span>
                                                            {getNameByEmail(typeof record.inviteeEmail[0] === "string" ? record.inviteeEmail[0] : record.inviteeEmail[0].opponent)}
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
                                                        <span>{getNameByEmail(record.invitorEmail)}</span>
                                                    </div>
                                                    <div className="my-2">
                                                        <Image
                                                            style={{ height: "2em", marginRight: "20px" }}
                                                            src="https://github.com/mdo.png"
                                                            roundedCircle
                                                        />
                                                        <span>
                                                            {getNameByEmail(record.inviteeEmail[0] && record.inviteeEmail[0].partner)}
                                                        </span>
                                                    </div>
                                                </div>
                                            </Col>
                                            <Col md={1}>
                                                <div>
                                                    <span>
                                                        vs
                                                    </span>
                                                </div>
                                            </Col>
                                            <Col md={6}>
                                                <div className="d-flex flex-column">
                                                    <div className="my-2">
                                                        <Image
                                                            style={{ height: "2em", marginRight: "20px" }}
                                                            src="https://github.com/mdo.png"
                                                            roundedCircle
                                                        />
                                                        <span>
                                                            {getNameByEmail(record.inviteeEmail[1] && record.inviteeEmail[1].opponent[0])}
                                                        </span>
                                                    </div>
                                                    <div className="my-2">
                                                        <Image
                                                            style={{ height: "2em", marginRight: "20px" }}
                                                            src="https://github.com/mdo.png"
                                                            roundedCircle
                                                        />
                                                        <span>
                                                            {getNameByEmail(record.inviteeEmail[1] && record.inviteeEmail[1].opponent[1])}
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
                {invitationRecord.length === 0 && (
                    <div className="my-3">No invitation records for now.</div>
                )}
            </div>}

            {type === 2 && <div>
                <Row>
                    <Col className="my-3" sm md={2}>
                        <span style={{ color: "rgba(180, 180, 180, 1)", fontSize: 20 }}>
                            Gaming Date
                        </span>
                    </Col>
                    <Col className="my-3" sm md={2}>
                        <span style={{ color: "rgba(180, 180, 180, 1)", fontSize: 20 }}>
                            PhoneNumber
                        </span>
                    </Col>
                    <Col className="my-3" sm md={2}>
                        <span style={{ color: "rgba(180, 180, 180, 1)", fontSize: 20 }}>
                            StartTime
                        </span>
                    </Col>
                    <Col className="my-3" sm md={3}>
                        <span style={{ color: "rgba(180, 180, 180, 1)", fontSize: 20 }}>
                            Message
                        </span>
                    </Col>
                    <Col className="my-3" sm md={3}>
                        <span style={{ color: "rgba(180, 180, 180, 1)", fontSize: 20 }}>
                            Invitor
                        </span>
                    </Col>
                </Row>
                {invitations.length > 0 &&
                    invitations.map((record, index) => {
                        return (
                            <Row
                                key={index}
                                style={{ borderBottom: "1px solid rgba(180, 180, 180, 1)" }}
                            >
                                <Col className="my-3 d-flex align-items-center" sm md={2}>
                                    <span>{formatDate(record.gamingDate)}</span>
                                </Col>
                                <Col className="my-3 d-flex align-items-center" sm md={2}>
                                    <span>{record.phoneNumber}</span>
                                </Col>
                                <Col className="my-3 d-flex align-items-center" sm md={2}>
                                    <span>{record.gameStartTime}</span>
                                </Col>
                                <Col className="my-3 d-flex align-items-center" sm md={3}>
                                    <span>{record.message}</span>
                                </Col>
                                <Col sm md={3}>
                                    <Row className="d-flex justify-content-around align-items-center my-3">
                                        <Col>
                                            <div>
                                                <span>
                                                    <Image
                                                        style={{ height: "2em", marginRight: "20px" }}
                                                        src="https://github.com/mdo.png"
                                                        roundedCircle
                                                    />
                                                    <span>
                                                        {getNameByEmail(record.invitor)}
                                                    </span>
                                                </span>
                                            </div>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        );
                    })}
                {invitations.length === 0 && (
                    <div className="my-3">No invitation records for now.</div>
                )}
            </div>}
        </Container>
    );
};
export default Invitation;
