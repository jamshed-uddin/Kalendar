import { useContext } from "react";
import { DataContext } from "../contexts/DataContextProvider";

const useData = () => {
  const dataContext = useContext(DataContext);
  return dataContext;
};

export default useData;
