import React, { useEffect, useState } from "react";
import Text from "components/Text";
import UserList from "components/UserList";
import { usePeopleFetch } from "hooks";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import * as S from "./style";

const Favorites = () => {
    const { users, isLoading } = usePeopleFetch();

    const [favorites, setFavorites] = useState(() => {
    const savedAsFav = localStorage.getItem("favorites");
    const initialValue = JSON.parse(savedAsFav);
    return initialValue || []});
  
    useEffect(() => {
      console.log('effect in favorites');
      console.log(favorites);
    }, [favorites, localStorage]);


  const handleFavButton = (user) => {
    if (favorites.includes(user))
      setFavorites(favorites => favorites.filter(favorite => favorite.id !== user.id));
  };

  localStorage.setItem("favorites", JSON.stringify(favorites));

  return (
    <S.Favorites>
      <S.Content>
        <S.Header>
          <Text size="64px" bold>
            My Favorites
          </Text>
        </S.Header>
        <S.UserList>
        {/* <UserList users={users} isLoading={isLoading} /> */}
          <S.List>
            {favorites.map((user, index) => {
              return (
                <S.User key={index}>
                  <S.UserPicture src={user?.picture.large} alt="" />
                  <S.UserInfo>
                    <Text size="22px" bold>
                      {user?.name.title} {user?.name.first} {user?.name.last}
                    </Text>
                    <Text size="14px">{user?.email}</Text>
                    <Text size="14px">
                      {user?.location.street.number} {user?.location.street.name}
                    </Text>
                    <Text size="14px">
                      {user?.location.city} {user?.location.country}
                    </Text>
                  </S.UserInfo>
                  <S.IconButtonWrapper isVisible={true}>
                    <IconButton onClick={() => handleFavButton(user)}>
                      <FavoriteIcon color="error" />
                    </IconButton>
                  </S.IconButtonWrapper>
                </S.User>
              );
            })}
          </S.List>
        </S.UserList>
      </S.Content>
    </S.Favorites>
  );
};

export default Favorites;
