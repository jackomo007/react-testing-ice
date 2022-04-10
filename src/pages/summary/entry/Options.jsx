import axios from "axios";
import { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";

import ScoopOtions from "./ScoopOption";
import ToppingOption from "./ToppingOption";

export default function Options({ optionType }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:3030/${optionType}`)
      .then((response) => setItems(response.data))
      .catch((error) => console.error(error));
  }, [optionType]);

  const ItemComponent = optionType === "scoops" ? ScoopOtions : ToppingOption;

  const optionsItems = items.map((item) => (
    <ItemComponent
      key={item.name}
      name={item.name}
      imagePath={item.imagePath}
    />
  ));

  return <Row>{optionsItems}</Row>;
}
