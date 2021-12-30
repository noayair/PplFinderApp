import React, { useEffect, useState } from "react";
import Text from "components/Text";
import Spinner from "components/Spinner";
import CheckBox from "components/CheckBox";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import * as S from "./style";

const UserList = ({ users, isLoading, fetchUsers }) => {
  const [hoveredUserId, setHoveredUserId] = useState();
  const [checkedCountries, setCheckedCountries] = useState([]);
  const [filteredUsers, setFilteredUseres] = useState([]);
  const [favorites, setFavorites] = useState(() => {
    const savedAsFav = localStorage.getItem("favorites");
    const initialValue = JSON.parse(savedAsFav);
    return initialValue || [];
  });

  useEffect(() => {
    if (checkedCountries.length === 0) {
      setFilteredUseres([...users]);
    } else {
      setFilteredUseres(
        users.filter((user) => checkedCountries.includes(user.location.country))
      );
    }
  }, [checkedCountries, users]);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites, filteredUsers]);

  const handleMouseEnter = (index) => {
    setHoveredUserId(index);
  };

  const handleMouseLeave = () => {
    setHoveredUserId();
  };

  const countryIsChecked = (countryName) => {
    checkedCountries.filter((country) => country === countryName);
  };

  const handleChecked = (label) => {
    if (checkedCountries.includes(label)) {
      setCheckedCountries((countries) =>
        countries.filter((country) => country !== label)
      );
    } else {
      setCheckedCountries([...checkedCountries, label]);
    }
  };

  const handleFavButton = (user) => {
    if (favorites.includes(user)) {
      setFavorites(favorites.filter((favorite) => favorite !== user));
    } else {
      setFavorites((favorites) => [...favorites, user]);
    }
  };

  const handleScroll = (event) => {
    const clientHeight = event.target.clientHeight;
    const scrollHeight = event.target.scrollHeight;
    const currentHeight = Math.ceil(
      event.target.scrollTop + clientHeight);
    if(currentHeight + 1 >= scrollHeight) fetchUsers();
  };

  return (
    <S.UserList>
      <S.Filters>
        <CheckBox
          isChecked={countryIsChecked("Brazil")}
          onChange={handleChecked}
          value="BR"
          label="Brazil"
        />
        <CheckBox
          isChecked={countryIsChecked("Australia")}
          onChange={handleChecked}
          value="AU"
          label="Australia"
        />
        <CheckBox
          isChecked={countryIsChecked("Canda")}
          onChange={handleChecked}
          value="CA"
          label="Canada"
        />
        <CheckBox
          isChecked={countryIsChecked("Germany")}
          onChange={handleChecked}
          value="DE"
          label="Germany"
        />
        <CheckBox
          isChecked={countryIsChecked("Israel")}
          onChange={handleChecked}
          value="IS"
          label="Israel"
        />
      </S.Filters>
      <S.List onScroll={handleScroll}>
        {filteredUsers.map((user, index) => {
          return (
            <S.User
              key={index}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
            >
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
              <S.IconButtonWrapper
                isVisible={favorites.includes(user) || index === hoveredUserId}
              >
                <IconButton onClick={() => handleFavButton(user)}>
                  <FavoriteIcon color="error" />
                </IconButton>
              </S.IconButtonWrapper>
            </S.User>
          );
        })}
        {isLoading && (
          <S.SpinnerWrapper>
            <Spinner color="primary" size="45px" thickness={6} variant="indeterminate" />
          </S.SpinnerWrapper>
        )}
      </S.List>
    </S.UserList>
  );
};

export default UserList;
