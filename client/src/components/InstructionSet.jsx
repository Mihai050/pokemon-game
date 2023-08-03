import React from "react";

export default function InstructionSet({ toDisplay }) {
  const text = {
    game: {
      key: 'game',
      header: "About this game",
      body: "Welcome to Pokémon Madness! Immerse yourself in the world of Pokémon as a skilled Trainer. Battle against other Pokémon that spawn across the map. Your goal is to capture as many Pokémon as possible and level them up. Track your progress with a win/loss ratio to gauge your strategic prowess. Get ready for an exciting adventure and have fun!",
    },
    fight: {
      key: 'fight',
      header: "Fighting & abilities",
      body: `In this engaging combat experience, each Pokémon will take turns engaging in fierce fights. The ultimate objective is to deplete your opponent's HP to zero, securing victory. To progress the battle and witness the thrilling clash of Pokémon, you must click on the attack button represented by two swords locked in combat. This action triggers a seamless exchange of turns between the battling creatures. Keep a close eye on the scoreboard, which diligently tracks the active Pokémon's turn, the inflicted damage, and the utilization of special abilities.<br><br>
Let's delve into the captivating realm of Pokémon types. There exist 18 unique Pokémon types, divided into six distinct groups, each boasting its own extraordinary special ability. Brace yourself for the following classifications:<br><br>
Group I: Normal, Water, and Grass Pokémon. This assemblage possesses a remarkable talent, enabling them to either heal themselves or deliver intensified damage to their adversaries during their turn.<br>
Group II: Dragon, Psychic, and Fighting Pokémon. These extraordinary beings possess the innate potential to unleash devastating attacks, inflicting greater damage upon their opponents.<br>
Group III: Rock, Steel, and Bug Pokémon. This group harnesses an exceptional capability to bolster their defensive prowess, acquiring permanent defense points during their encounters.<br>
Group IV: Poison, Fire, and Dark Pokémon. Within this formidable faction, Pokémon possess a distinctive chance to gain a permanent damage buff, further enhancing their offensive capabilities.<br>
Group V: Electric, Ice, and Ghost Pokémon. These enigmatic creatures possess a remarkable potential to immobilize their foes by either freezing or shocking them. Once incapacitated, they seize the opportunity to unleash an additional attack.<br>
Group VI: Flying, Fairy, and Ground Pokémon. This resilient group demonstrates an extraordinary capacity for self-preservation, allowing them to heal themselves and prolong their battles.<br><br>
Embrace the challenge, exhibit your strategic prowess, and embark on an exhilarating journey through the captivating world of Pokémon battles!`,
    },
    technical: {
      key: 'technical',
      header: "Project details",
      body: "We, Stefan Dan-Martin and Stroe Mihaita, are two junior programmers who embarked on this project with the aim of gaining valuable experience working with React JS. Our project encompasses a robust backend powered by Express JS and MongoDB. This backend diligently stores crucial player data and boasts a fully functional sign-up and login system.<br><br>On the front-end, we leverage the power of React JS to deliver a seamless user experience. We fetch comprehensive data about Pokémon, their respective locations, and relevant information from the PokeAPI (https://pokeapi.co/). This invaluable resource enables us to provide accurate and up-to-date content to our users.<br><br>We are proud to present this project as a significant contribution to our individual portfolios, which you can access below. Each portfolio showcases our expertise, growth, and dedication to the world of programming.<br><br>Thank you for joining us on this journey, and we sincerely hope that you enjoy exploring our creation!",
    },
  };

  return (
    <div className="instructionSet">
      <h2 className="instructionHeader">{text[toDisplay].header}</h2>
      <div
        className="instructionBody"
        dangerouslySetInnerHTML={{ __html: text[toDisplay].body}}
        key={text[toDisplay].key}
      ></div>
    </div>
  );
}
