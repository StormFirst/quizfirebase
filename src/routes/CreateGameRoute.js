import React, { useState, useEffect } from "react";
import {
  Container,
  FormGroup,
  Label,
  Input,
  Button,
  Breadcrumb,
  BreadcrumbItem,
} from "reactstrap";
import getCurrentUser from "../use_cases/getCurrentUser";
import createGame from "../use_cases/createGame";
import { Redirect } from "react-router-dom";

const save = (gameAttributes, onCreate) => {
  return createGame(gameAttributes).then(onCreate);
};

const CreateGameRoute = (props) => {
  const [user, setUser] = useState(null);
  const [gameName, setGameName] = useState("");
  const [game, setGame] = useState(null);

  useEffect(() => {
    getCurrentUser().then(setUser);
  }, []);

  if (game) {
    return <Redirect to="/games" />;
  } else {
    return (
      <div>
        <Breadcrumb>
          <BreadcrumbItem>
            <a href="/#">Bosh sahifa</a>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <a href="/#/games">Testlar</a>
          </BreadcrumbItem>
          <BreadcrumbItem active>Test yaratish</BreadcrumbItem>
        </Breadcrumb>
        <Container style={{ maxWidth: "500px" }}>
          <div className="content-center two-height-view">
            <h1>Test yarating</h1>
            <FormGroup>
              <Label for="name">Sarlovha</Label>
              <Input
                id="name"
                name="name"
                value={gameName}
                onChange={(e) => setGameName(e.target.value)}
              />
            </FormGroup>
            <Button
              color="primary"
              onClick={() =>
                save({ name: gameName, ownerId: user.id }, setGame)
              }
            >
              Saqlamoq
            </Button>
          </div>
        </Container>
      </div>
    );
  }
};

export default CreateGameRoute;
