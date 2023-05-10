import React, { useEffect } from "react"

const UserGamesList = ({user, userGames, setUserGames}) => {

    useEffect(() => {
        const getUserGames = async () => {
          const requestOptions = {
            method: "GET",
          };
          console.log(user)
          return await fetch(`api/buyingGame/${user.id}`, requestOptions)
            .then((response) => response.json())
            .then(
              (data) => {
                console.log("Data:", data);
                setUserGames(data);
                console.log(userGames)
              },
              (error) => {
                console.log(error);
              }
            );
        };
        getUserGames();
      }, [setUserGames]);

      return (
        <React.Fragment>
            {userGames.map(
                ({
                    id,
                    game
                }) => (
                    <div className="userGame" key={id} id={id}>
                        {game.name}
                    </div>
                )
            )
            }
        </React.Fragment>
      )
}

export default UserGamesList