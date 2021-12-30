import { useState, useEffect } from "react";
import axios from "axios";

export const usePeopleFetch = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  let currentOffset = 0;

  useEffect(() => {
    fetchUsers();
  }, [currentOffset]);


  async function fetchUsers(currentOffset) {
    currentOffset += 1;
    setIsLoading(true);
    const response = await axios.get(`https://randomuser.me/api/?results=25&page=${currentOffset}`);
    setIsLoading(false);
    setUsers(users.concat(response.data.results));
  }

  return { users, isLoading, fetchUsers };
};