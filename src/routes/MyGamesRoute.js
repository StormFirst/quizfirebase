import React, { useState, useEffect } from "react";
import {
  Container,
  ListGroup,
  ListGroupItem,
  Breadcrumb,
  BreadcrumbItem,
} from "reactstrap";
import getCurrentUserGames from "../use_cases/getCurrentUserGames";
import { Redirect } from "react-router-dom";

const MyGamesRoute = () => {
  const [games, setGames] = useState([]);
  const [redirectUrl, setRedirectUrl] = useState(null);

  useEffect(() => {
    getCurrentUserGames().then(setGames);
  }, []);

  if (redirectUrl) {
    return <Redirect to={redirectUrl} />;
  } else {
    return (
      <div>
        <Breadcrumb>
          <BreadcrumbItem>
            <a href="#">Bosh sahifa</a>
          </BreadcrumbItem>
          <BreadcrumbItem active>Testlar</BreadcrumbItem>
        </Breadcrumb>
        <Container style={{ maxWidth: "500px" }}>
          <div className="content-center">
            <h1 className="text-red">Testlar ro'yhati</h1>
            <ListGroup>
              {games.map((game) => (
                <ListGroupItem
                  key={game.id}
                  onClick={() => setRedirectUrl(`/games/${game.id}`)}
                  tag="button"
                  action
                >
                  {game.name}
                </ListGroupItem>
              ))}
              <ListGroupItem
                onClick={() => setRedirectUrl("/games/create")}
                tag="button"
                color="info"
                action
              >
                Yangi test yaratish
              </ListGroupItem>
            </ListGroup>
          </div>
        </Container>
      </div>
    );
  }
};

export default MyGamesRoute;
