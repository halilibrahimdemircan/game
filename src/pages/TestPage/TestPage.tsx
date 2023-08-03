import React, { useState, useEffect } from "react";

const TestPage = () => {
  const [creatures, setCreatures] = useState([]);
  const getCreatures = async () => {
    const creatures = await fetch("https://gapi.nftinit.io/api/get_creature/", {
      method: "POST",
      mode: "cors",
      headers: {
        "Access-Control-Allow-Origin": "*",
        Accept: "application/json",
        "Content-Type": "application/json",
        userInfo: JSON.stringify({
          token: "12345",
          character_id: "12",
        }),
      },
      // body:JSON.stringify({

      // })
    }).then((res) => res.json());
    // console.log("creatures :>> ", creatures);
    setCreatures(creatures);

    // burada gelen creatureları setleyeceğiz
  };
  const startBattle = async () => {
    const battle = await fetch("https://gapi.nftinit.io/api/battle_start/", {
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
        creature_id: 6,
      }),
    }).then((res) => res.json());
    console.log("battle :>> ", battle);

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
        battle_id: "",
        skill_id: 11,
      }),
    }).then((res) => res.json());
    console.log("attack :>> ", attack);
    // burada logları setleyeceğiz
  };

  useEffect(() => {
    getCreatures();
  }, []);

  const handleChangeSelection = (selection: any) => {};

  return (
    <div className="flex justify-center items-center">
      <div className="border p-4 flex flex-col gap-8">
        <select name="" id="">
          {creatures.map((option: any) => {
            return (
              <option
                onChange={() => handleChangeSelection(option.id)}
                value=""
              >
                {}
              </option>
            );
          })}
          <option value="">solucan</option>
          <option value="">aslan</option>
        </select>

        <button className="border p-2 rounded border-zinc-50 ">
          Start Battle
        </button>
        <button className="border p-2 rounded border-zinc-50 ">Attack</button>
      </div>
      <div>Loglar buraya</div>
    </div>
  );
};

export default TestPage;
