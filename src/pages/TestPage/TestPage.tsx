import React, { useState, useEffect } from "react";

const TestPage = () => {
  const [creatures, setCreatures] = useState([]);
  const [gameState, setGameState] = useState({
    creature: {
      id: undefined,
    },
    battle: {
      id: undefined,
      logs: [],
    },
  });
  const getCreatures = async () => {
    const creatures = await fetch("https://gapi.nftinit.io/api/get_creature/", {
      method: "POST",
      //   mode: "cors",
      headers: {
        // "Access-Control-Allow-Origin": "*",
        Accept: "application/json",
        "Content-Type": "application/json",
        // userInfo: JSON.stringify({
        //   //   token: "12345",
        //   //   character_id: "12",
        // }),
      },
      body: JSON.stringify({
        token: "12345",
      }),
    }).then((res) => res.json());
    console.log("creatures :>> ", creatures);
    setCreatures(creatures.creature_list);

    setGameState((prevGameState) => ({
      ...prevGameState,
      creature: {
        ...prevGameState.creature,
        id: creatures.creature_list[0].creature_id,
      },
    }));

    // burada gelen creatureları setleyeceğiz
  };
  const startBattle = async () => {
    const battle = await fetch("https://gapi.nftinit.io/api/battle_start/", {
      method: "POST",
      //   mode: "cors",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",

        userInfo: JSON.stringify({
          token: "12345",
          character_id: "12",
        }),
      },
      body: JSON.stringify({
        creature_id: gameState.creature.id,
      }),
    }).then((res) => res.json());
    console.log("battle :>> ", battle);
    setGameState((prevGameState) => ({
      ...prevGameState,
      battle: {
        ...prevGameState.battle,
        id: battle.battle_id,
      },
    }));

    // burada battle idyi setleyeceğiz
  };
  const attackBattle = async () => {
    const attack = await fetch("https://gapi.nftinit.io/api/battle_attack/", {
      method: "POST",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
        userInfo: JSON.stringify({
          token: "12345",
          character_id: "12",
        }),
      },
      body: JSON.stringify({
        battle_id: gameState.battle.id,
        skill_id: 11,
      }),
    }).then((res) => res.json());
    console.log("attack :>> ", attack);
    setGameState((prevGameState: any) => ({
      ...prevGameState,
      battle: {
        ...prevGameState.battle,
        // logs: [...prevGameState.battle.logs, ...attack.battle_logs],
        logs: [...attack.battle_logs],
      },
    }));
    // burada logları setleyeceğiz
  };

  useEffect(() => {
    getCreatures();
  }, []);

  const handleChangeSelection = (creatureId: any) => {
    console.log("girdi");
    setGameState((prevGameState) => ({
      ...prevGameState,
      creature: {
        ...prevGameState.creature,
        id: creatureId,
      },
    }));
  };
  useEffect(() => {
    console.log("gameState:>> ", gameState);
  }, [gameState]);

  return (
    <div className="flex justify-center items-center">
      <div className="border p-4 flex flex-col gap-8">
        <select
          className="text-black"
          name=""
          id=""
          value={gameState.creature.id}
          onChange={(e) => handleChangeSelection(e.target.value)}
        >
          {creatures?.map((option: any) => {
            return (
              <option
                className="text-black"
                key={option.creature_id}
                value={option.creature_id}
              >
                {option.name}
              </option>
            );
          })}
          {/* <option key={2} value={3}>
            {"aslan"}
          </option> */}
        </select>

        <button
          onClick={() => startBattle()}
          className="border p-2 rounded border-zinc-50 "
        >
          Start Battle
        </button>
        <button
          onClick={() => attackBattle()}
          className="border p-2 rounded border-zinc-50 "
        >
          Attack
        </button>
      </div>
      <div>
        {gameState.battle.logs?.map((log: any) => {
          return (
            <ul>
              <li>{`${log.description}`}</li>
              {/* <div>{log.description}</div> */}
            </ul>
          );
        })}
      </div>
    </div>
  );
};

export default TestPage;
