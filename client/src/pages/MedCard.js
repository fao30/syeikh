import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import PersonPinIcon from "@mui/icons-material/PersonPin";
import { useNavigate } from "react-router";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchMedcardByPatient } from "../store/actionCreator/itemAction";
import { formatDateWithZone } from "../store/helper/timeHelper";

function HeaderAndFooterExample() {
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const [tabActive, setTabActive] = useState("allData");
  const { medcardByPatient } = useSelector((state) => state.clinic);
  const [dataMedcardByPatient, setDataMedcardByPatient] = useState([]);

  useEffect(() => {
    dispatch(fetchMedcardByPatient(params.id));
  }, [params.id]);

  useEffect(() => {
    setDataMedcardByPatient(medcardByPatient);
  }, [medcardByPatient]);

  function handleChange(e, value) {
    if (value === "logout") {
      localStorage.clear();
      Navigate("/login");
    } else {
      Navigate("/");
    }
  }
  return (
    <>
      <Tabs
        value={tabActive}
        onChange={handleChange}
        textColor="secondary"
        indicatorColor="secondary"
        aria-label="secondary tabs example"
      >
        <Tab value="back" label="Back To Home" />;
        <Tab icon={<PersonPinIcon />} aria-label="person" value="logout" />
      </Tabs>
      {dataMedcardByPatient?.map((e, i) => (
        <div className="mt-4">
          <Card className="text-center">
            <Card.Header>
              Мед-карта {e?.Visitor?.name} {i + 1}{" "}
            </Card.Header>
            <Card.Body>
              <Card.Title>
                Лечение: {e?.status || "еще не заполнено"}
              </Card.Title>
              <Card.Text>Врач: {e?.doctorFkId?.name}</Card.Text>
              <Button
                onClick={() => {
                  Navigate(`/visit/${e.id}`);
                }}
                variant="primary"
              >
                Детали лечения
              </Button>
            </Card.Body>
            <Card.Footer className="text-muted">
              {formatDateWithZone(e?.timeVisit, "Europe/Moscow")}
            </Card.Footer>
          </Card>
        </div>
      ))}
    </>
  );
}

export default HeaderAndFooterExample;
