import React, { useState, useEffect } from "react";
import { Button, Breadcrumb, BreadcrumbItem, Alert } from "reactstrap";
import { Link, useParams } from "react-router-dom";
import getGame from "../use_cases/getGame";
import getQuestions from "../use_cases/getQuestions";
import { EditableQuestion } from "../view_components/EditableQuestion";
import saveQuestion from "../use_cases/saveQuestion";
import CenteredContainer from "../view_components/CenteredContainer";


const GameDetailsRoute = (props) => {
  const { gameId } = useParams();
  const [game, setGame] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [save, setSave] = useState(false);

  const savedMessage = () => {
    setTimeout(() => {
      setSave(true);
    }, 2000);
    setTimeout(() => {
      setSave(false);
    }, 5000);
  };

  useEffect(() => {
    if (gameId && game === null) {
      getGame(gameId)
        .then((game) => {
          setGame(game);
          return game;
        })
        .then((game) => getQuestions({ gameId: game.id }))
        .then(setQuestions);
    }
  }, [gameId, game]);

  if (game) {
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
        <div className={save ? "d-block" : "d-none"}>
          <Alert className="text-center" color="primary">
            Test saqlandi
          </Alert>
        </div>
        <CenteredContainer maxWidth={500}>
          <div className="game-details">
            <h1 className="mb-4">{game.name}</h1>
            {questions.length > 0 ? (
              <Link to={`/lobby/${gameId}`}>
                <Button color="primary" size="lg">
                  Testni boshlash
                </Button>
              </Link>
            ) : null}
            {questions.map((question, index) => (
              <EditableQuestion savedMessage={savedMessage} key={question.id} index={index} question={question} />
            ))}
            {questions.length > 0 ? (
              <Button
                color="primary"
                onClick={() => {
                  saveQuestion({
                    gameId: gameId,
                    order: questions.length + 1,
                  }).then((newQn) => setQuestions(questions.concat([newQn])));
                }}
              >
                Yana savol qo'shing
              </Button>
            ) : (
              <Button
                color="primary"
                onClick={() => {
                  saveQuestion({
                    gameId: gameId,
                    order: questions.length + 1,
                  }).then((newQn) => setQuestions(questions.concat([newQn])));
                }}
              >
                Savol qo'shing
              </Button>
            )}
          </div>
        </CenteredContainer>
      </div>
    );
  } else {
    return <CenteredContainer maxWidth={500}>Loading...</CenteredContainer>;
  }
};

export default GameDetailsRoute;
